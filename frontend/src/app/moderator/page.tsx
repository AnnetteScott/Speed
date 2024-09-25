
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

interface Article {
    _id: string;
    title: string;
    authors: string[];
    source: string;
    pubYear: number;
    claim: string[];
    evidence: string;
    createdAt: string;
    moderated: boolean;
    analysed: boolean;
    approved: boolean;
}

const ModeratorPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch pending articles
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles/pending');
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const approveArticle = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/approve/${id}`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Failed to approve article');
            }
            setArticles(articles.filter(article => article._id !== id));
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const rejectArticle = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/reject/${id}`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Failed to reject article');
            }
            setArticles(articles.filter(article => article._id !== id));
        } catch (error) {
            setError((error as Error).message);
        }
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
                    {articles.length === 0 ? (
                        <Alert variant="info" className="text-center">No articles waiting for moderation.</Alert>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Authors</th>
                                    <th>Source</th>
                                    <th>Year</th>
                                    <th>Claims</th>
                                    <th>Evidence</th>
                                    <th>Submitted On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(article => (
                                    <tr key={article._id}>
                                        <td>{article.title}</td>
                                        <td>{article.authors.join(', ')}</td>
                                        <td>{article.source}</td>
                                        <td>{article.pubYear}</td>
                                        <td>{article.claim.join(', ')}</td>
                                        <td>{article.evidence}</td>
                                        <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => approveArticle(article._id)}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => rejectArticle(article._id)}
                                            >
                                                Reject
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}
        </Container>
    );
};

export default ModeratorPage;