
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

interface Article {
    _id: string;
    title: string;
    doi: string;
    authors: string;  // authors is now a single string
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
    createdAt: string; // Assuming createdAt is being sent from backend
}

const ModeratorPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch pending articles
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                console.log("Fetching articles from:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/pending`);
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/pending`);
                console.log("Response status:", response.status);
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch articles: ${response.statusText}`);
                }
    
                const data: Article[] = await response.json();
                console.log("Data received from backend:", data);
    
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
                                    <th>Pages</th>
                                    <th>Year</th>
                                    <th>Volume</th>
                                    <th>Number</th>
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
                                        <td>{article.authors}</td> {/* Authors treated as a single string */}
                                        <td>{article.source}</td>
                                        <td>{article.pages}</td>
                                        <td>{article.pubYear}</td>
                                        <td>{article.volume}</td>
                                        <td>{article.number}</td>
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




// "use client";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import React, { useEffect, useState } from 'react';
// import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

// interface Article {
//     _id: string;
//     title: string;
//     authors: string[];
//     source: string;
//     pubYear: number;
//     claim: string[];
//     evidence: string;
//     createdAt: string;
//     moderated: boolean;
//     analysed: boolean;
//     approved: boolean;
// }

// const ModeratorPage: React.FC = () => {
//     const [articles, setArticles] = useState<Article[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // Dummy data to simulate the articles list
//     useEffect(() => {
//         const dummyData: Article[] = [
//             {
//                 _id: '1',
//                 title: 'Understanding React Hooks',
//                 authors: ['John Doe', 'Jane Smith'],
//                 source: 'React Journal',
//                 pubYear: 2021,
//                 claim: ['React is easy', 'Hooks are powerful'],
//                 evidence: 'Based on multiple case studies',
//                 createdAt: new Date().toISOString(),
//                 moderated: false,
//                 analysed: false,
//                 approved: false,
//             },
//             {
//                 _id: '2',
//                 title: 'The Rise of TypeScript',
//                 authors: ['Alice Johnson', 'Bob Brown'],
//                 source: 'TypeScript Weekly',
//                 pubYear: 2020,
//                 claim: ['TypeScript improves code quality'],
//                 evidence: 'Comparative analysis with JavaScript projects',
//                 createdAt: new Date().toISOString(),
//                 moderated: false,
//                 analysed: false,
//                 approved: false,
//             },
//             {
//                 _id: '3',
//                 title: 'Next.js in Modern Web Development',
//                 authors: ['Chris Green'],
//                 source: 'Web Dev Today',
//                 pubYear: 2022,
//                 claim: ['Next.js is optimized for SEO'],
//                 evidence: 'Google ranking improvements observed',
//                 createdAt: new Date().toISOString(),
//                 moderated: false,
//                 analysed: false,
//                 approved: false,
//             }
//         ];

//         // Set the dummy data after simulating a loading delay
//         setTimeout(() => {
//             setArticles(dummyData);
//             setLoading(false);
//         }, 1000); // Simulate a delay of 1 second
//     }, []);
    
//     const approveArticle = (id: string) => {
//         setArticles(articles.filter(article => article._id !== id));
//     };

//     const rejectArticle = (id: string) => {
//         setArticles(articles.filter(article => article._id !== id));
//     };

//     return (
//         <Container className="mt-5">
//             <Row className="mb-3">
//                 <Col>
//                     <h1 className="text-center">Moderator Page</h1>
//                     <p className="text-center">Welcome to the moderator page. Here you can manage articles pending review.</p>
//                 </Col>
//             </Row>
//             {error && <Alert variant="danger">{error}</Alert>}
//             {loading ? (
//                 <div className="d-flex justify-content-center">
//                     <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                 </div>
//             ) : (
//                 <>
//                     {articles.length === 0 ? (
//                         <Alert variant="info" className="text-center">No articles waiting for moderation.</Alert>
//                     ) : (
//                         <Table striped bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th>Title</th>
//                                     <th>Authors</th>
//                                     <th>Source</th>
//                                     <th>Year</th>
//                                     <th>Claims</th>
//                                     <th>Evidence</th>
//                                     <th>Submitted On</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {articles.map(article => (
//                                     <tr key={article._id}>
//                                         <td>{article.title}</td>
//                                         <td>{article.authors.join(', ')}</td>
//                                         <td>{article.source}</td>
//                                         <td>{article.pubYear}</td>
//                                         <td>{article.claim.join(', ')}</td>
//                                         <td>{article.evidence}</td>
//                                         <td>{new Date(article.createdAt).toLocaleDateString()}</td>
//                                         <td>
//                                             <Button
//                                                 variant="success"
//                                                 size="sm"
//                                                 className="me-2"
//                                                 onClick={() => approveArticle(article._id)}
//                                             >
//                                                 Approve
//                                             </Button>
//                                             <Button
//                                                 variant="danger"
//                                                 size="sm"
//                                                 onClick={() => rejectArticle(article._id)}
//                                             >
//                                                 Reject
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     )}
//                 </>
//             )}
//         </Container>
//     );
// };

// export default ModeratorPage;
