"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Table, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import NavBar from "../components/navBar";
import { Article } from "@/components/Article";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Columns visibility state
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
    ratings: true,
  });

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };

  // Event to detect user input for search
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  // Filtered articles based on search
  const filtered = articles
    .filter((a) => a?.title.toLowerCase().includes(search.toLowerCase()) || a?.doi.toLowerCase().includes(search.toLowerCase()))
    .map((article) => (
      <tr key={article?.doi}>
        {visibleColumns.title && <td>{article?.title}</td>}
        {visibleColumns.doi && (
          <td>
            <a href={`https://doi.org/${article?.doi}`}>{article?.doi}</a>
          </td>
        )}
        {visibleColumns.authors && <td>{article?.authors}</td>}
        {visibleColumns.source && <td>{article?.source}</td>}
        {visibleColumns.pages && <td>{article?.pages}</td>}
        {visibleColumns.pubYear && <td>{article?.pubYear}</td>}
        {visibleColumns.volume && <td>{article?.volume}</td>}
        {visibleColumns.number && <td>{article?.number}</td>}
        {visibleColumns.claim && <td>{article?.claim.join(', ')}</td>}
        {visibleColumns.evidence && <td>{article?.evidence}</td>}
        {visibleColumns.ratings && (
          <td>
            {(article?.ratings.reduce((partialSum, a) => partialSum + a, 0)) / article?.ratings.length} / 5
          </td>
        )}
      </tr>
    ));

  // Fetch articles and only show approved ones
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/articles")
      .then((res) => res.json())
      .then((articles) => {
        const approved = (articles as Article[]).filter((a) => a.approved);
        setArticles(approved);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error from Articles: " + err);
        setError("Failed to fetch articles");
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <NavBar />
      <Container className="mt-5">
        <Row className="mb-3">
          <Col>
            <h1 className="text-center">Articles</h1>
            <p className="text-center">Search articles and manage table columns visibility below.</p>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="d-flex justify-content-center">
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <label>
              Search:
              <input type="search" value={search} onChange={onChange} />
            </label>

            {/* Column Visibility Toggle Table */}
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

            {/* Filtered Articles Table */}
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
                {visibleColumns.ratings && <th>Ratings</th>}
              </thead>
              <tbody>{filtered}</tbody>
            </Table>
          </>
        )}
      </Container>
    </main>
  );
}

const styles = {
  tableHeader: { border: "2px solid" },
  headerRow: { borderBottom: '2px solid' },
  headerCell: { border: 'none' },
};

