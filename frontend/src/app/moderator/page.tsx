"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner, Form } from 'react-bootstrap';

interface Article {
    _id: string;
    title: string;
    doi: string;
    authors: string;
    source: string;
    pages: string;
    pubYear: number;
    volume: number;
    number: number;
    claim: string[];
    evidence: string;
    ratings: number[];
    moderated: boolean;
    analysed: boolean;
    approved: boolean;
    rejected: boolean;
}

const ModeratorPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showDuplicates, setShowDuplicates] = useState<boolean>(true);
    const [showRejected, setShowRejected] = useState<boolean>(true);
    const [duplicateArticles, setDuplicateArticles] = useState<Article[]>([]);

    // Columns visibility state, including DOI
    const [visibleColumns, setVisibleColumns] = useState({
        title: true,
        doi: true,
        authors: true,
        source: true,
        pages: true,
        pubYear: true,
        volume: true,
        number: true,
        claim: true,
        evidence: true,
        note: true // New column for NOTE
    });

    // Toggle column visibility
    const toggleColumn = (column: keyof typeof visibleColumns) => {
        setVisibleColumns({
            ...visibleColumns,
            [column]: !visibleColumns[column]
        });
    };

    // Fetch pending articles
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

    // Identify duplicate articles based on DOI
    const findDuplicateArticles = () => {
        const articleMap = new Map<string, Article[]>();

        articles.forEach((article) => {
            const doiKey = article.doi;

            if (!articleMap.has(doiKey)) {
                articleMap.set(doiKey, []);
            }
            articleMap.get(doiKey)?.push(article);
        });

        // Filter articles that have more than one entry with the same DOI
        const duplicates = articles.filter(article => {
            return (articleMap.get(article.doi)?.length ?? 0) > 1;
        });

        return duplicates;
    };

    const handleShowDuplicates = () => {
        if (!showDuplicates) {
            const duplicates = findDuplicateArticles();
            setDuplicateArticles(duplicates);
        } else {
            setDuplicateArticles([]);
        }
        setShowDuplicates(!showDuplicates);
    };

    // Fetch rejected articles from the backend
    const fetchRejectedArticles = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/rejected`);

            if (!response.ok) {
                throw new Error(`Failed to fetch rejected articles: ${response.statusText}`);
            }

            const rejectedArticles: Article[] = await response.json();
            setArticles((prevArticles) =>
                prevArticles.map(article =>
                    rejectedArticles.find(rejected => rejected._id === article._id) ? { ...article, rejected: true } : article
                )
            );
        } catch (error) {
            console.error("Error fetching rejected articles:", error);
        }
    };

    // Toggle showing rejected articles
    const handleShowRejected = () => {
        if (!showRejected) {
            fetchRejectedArticles();
        }
        setShowRejected(!showRejected);
    };

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <h1 className="text-center">Moderator Page</h1>
                    <p className="text-center">Welcome to the moderator page. Here you can manage articles pending review.</p>
                </Col>
            </Row>

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
                        <thead style={{ border: "2px solid" }}>
                            <tr style={{ borderBottom: '2px solid' }}>
                                {Object.keys(visibleColumns).map((col) => (
                                    <th key={col} style={{ border: 'none' }}>
                                        <Form.Check
                                            inline
                                            label={col.charAt(0).toUpperCase() + col.slice(1)}
                                            checked={visibleColumns[col as keyof typeof visibleColumns]}
                                            onChange={() => toggleColumn(col as keyof typeof visibleColumns)}
                                        />
                                    </th>
                                ))}
                                <th style={{ border: 'none' }}>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleShowDuplicates}
                                    >
                                        {showDuplicates ? "Hide Duplicates" : "Show Duplicates"}
                                    </Button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleShowRejected}
                                    >
                                        {showRejected ? "Hide Rejected" : "Show Rejected"}
                                    </Button>
                                </th>
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
                            {visibleColumns.claim && <th>Claims</th>}
                            {visibleColumns.evidence && <th>Evidence</th>}
                            {visibleColumns.note && <th>Note</th>} {/* Added NOTE column */}
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {articles.map(article => {
                                const isDuplicate = duplicateArticles.some(dup => dup.doi === article.doi);
                                const isRejected = article.rejected;
                                const note = isRejected ? "REJECTED" : isDuplicate ? "DUPLICATE" : "";

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
                                        {visibleColumns.claim && <td>{article.claim.join(', ')}</td>}
                                        {visibleColumns.evidence && <td>{article.evidence}</td>}
                                        {visibleColumns.note && <td>{note}</td>} {/* Display NOTE content */}
                                        <td>
                                            <Button variant="success" size="sm" className="me-2">Approve</Button>
                                            <Button variant="danger" size="sm">Reject</Button>
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
    );
};

export default ModeratorPage;
