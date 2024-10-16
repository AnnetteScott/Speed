"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner, Form, Nav } from 'react-bootstrap';
import NavBar from '../../components/navBar'
import { Article } from '@/components/Article';

const ModeratorPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const [visibleColumns, setVisibleColumns] = useState({
        title: true,
        doi: true,
        authors: true,
        source: true,
        pages: true,
        pubYear: true,
        volume: true,
        number: true,
        note: true
    });

    const toggleColumn = (column: keyof typeof visibleColumns) => {
        setVisibleColumns({
            ...visibleColumns,
            [column]: !visibleColumns[column]
        });
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/pending`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch articles: ${response.statusText}`);
                }

                const data: Article[] = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);


    const checkIfDuplicate = (doi: string, index: number): boolean => {
		const duplicates: number[] = []
		articles.forEach((art, i) => {
			if(art.doi === doi){
				duplicates.push(i);
			}
		})

		if(duplicates[0] === index){
			return false;
		}else if(duplicates.length > 1){
			return true;
		}
        
		return false;
    };

    const handleApprove = async (id: string | undefined) => {
		if(!id){
			return;
		}

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/approvedByModerator/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
          })
            .then(() => {
              setArticles(articles.filter(article => article._id !== id));
            })
            .catch((err) => {
              console.log('Error approving article: ' + err);
            });
        
    };
    const handleReject = async (id: string | undefined) => {
		if(!id){
			return;
		}

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/reject/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
          })
            .then(() => {
              setArticles(articles.filter(article => article._id !== id));
            })
            .catch((err) => {
              console.log('Error rejecting article: ' + err);
            });
    };

    const deleteArticle = async (id: string | undefined) => {
		if(!id){
			return;
		}

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
          })
            .then(() => {
              setArticles(articles.filter(article => article._id !== id));
            })
            .catch((err) => {
              console.log('Error rejecting article: ' + err);
            });
    };


    return (
        <main>
            <NavBar />
			<br />
			<h1 className="text-center">Articles to be Moderated</h1>
            <Container className="mt-5">
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <>
                        <Table striped bordered hover responsive>
                            <thead style={styles.tableHeader}>
                                <tr style={styles.headerRow}>
                                    {Object.keys(visibleColumns).map((col) => (
                                        <th key={col} style={styles.headerCell}>
                                            <Form.Check
                                                inline
                                                label={col.charAt(0).toUpperCase() + col.slice(1)}
                                                checked={visibleColumns[col as keyof typeof visibleColumns]}
                                                onChange={() => toggleColumn(col as keyof typeof visibleColumns)}
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        </Table>

                        <Table striped bordered hover responsive>
                            <thead>
                                {visibleColumns.title && <th>Title</th>}
                                {visibleColumns.doi && <th>DOI</th>}
                                {visibleColumns.authors && <th>Authors</th>}
                                {visibleColumns.source && <th>Source</th>}
                                {visibleColumns.pages && <th>Pages</th>}
                                {visibleColumns.pubYear && <th>Year</th>}
                                {visibleColumns.volume && <th>Volume</th>}
                                {visibleColumns.number && <th>Number</th>}
                                {visibleColumns.note && <th>Note</th>}
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                {articles.map((article, i) => {
                                    const isDuplicate = checkIfDuplicate(article.doi, i);
                                    const isRejected = article.rejected;
                                    const note = (isDuplicate && isRejected) ? "REJECTED AND DUPLICATE" : isRejected ? "REJECTED" : isDuplicate ? "DUPLICATE" : "";


                                    return (
                                        <tr key={article._id}>
                                            {visibleColumns.title && <td >{article.title}</td>}
                                            {visibleColumns.doi && <td>{article.doi}</td>}
                                            {visibleColumns.authors && <td>{article.authors}</td>}
                                            {visibleColumns.source && <td>{article.source}</td>}
                                            {visibleColumns.pages && <td>{article.pages}</td>}
                                            {visibleColumns.pubYear && <td>{article.pubYear}</td>}
                                            {visibleColumns.volume && <td>{article.volume}</td>}
                                            {visibleColumns.number && <td>{article.number}</td>}
                                            {visibleColumns.note && <td>{note}</td>}
                                            <td>
												{ checkIfDuplicate(article.doi, i) ? null :
													<button onClick={() => handleApprove(article._id)}>
														Approve
													</button>
												}
												{ checkIfDuplicate(article.doi, i) ? null :
													<button onClick={() => handleReject(article._id)}>
														Reject
													</button>
												}
												{ checkIfDuplicate(article.doi, i) ?
													<button onClick={() => deleteArticle(article._id)}>
														Delete
													</button>
													: null
												}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </>
                )
                }
            </Container >
        </main>
    );
};

const styles = {
    tableHeader: { border: "2px solid" },
    headerRow: { borderBottom: '2px solid' },
    headerCell: { border: 'none' },
};

export default ModeratorPage;