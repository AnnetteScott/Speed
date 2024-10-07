"use client";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "../components/navBar";
import { useState, ChangeEvent, useEffect } from "react";
import { Article } from "@/components/Article";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [fromYear, setFromYear] = useState<number>(2000);
  const [toYear, setToYear] = useState<number>(2024);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>(""); // State for selected SE method
  const [claims, setClaims] = useState<string[]>([]); // State for claims associated with the selected method

  // Event to detect user input
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function fromChange(event: ChangeEvent<HTMLInputElement>) {
    setFromYear(parseInt(event.target.value));
  }

  function toChange(event: ChangeEvent<HTMLInputElement>) {
    setToYear(parseInt(event.target.value));
  }

  // Handle SE method selection
  function handleMethodChange(event: ChangeEvent<HTMLSelectElement>) {
    const method = event.target.value;
    setSelectedMethod(method);

    // Fetch claims for the selected method
    if (method) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/claims?method=${method}`)
        .then((res) => res.json())
        .then((data) => {
          setClaims(data.claims || []); // Assuming the response contains an array of claims
        })
        .catch((err) => {
          console.log("Error fetching claims: " + err);
          setClaims([]); // Reset claims on error
        });
    } else {
      setClaims([]); // Reset claims if no method is selected
    }
  }

  const filtered = articles
    .filter((a) => a?.title.toLowerCase().includes(search.toLowerCase()) || a?.doi.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => a.pubYear >= fromYear && a.pubYear <= toYear)
    .map((article) => (
      <tr key={article?.doi}>
        <td>{article?.title}</td>
        <td>
          <a href={`https://doi.org/${article?.doi}`}>{article?.doi}</a>
        </td>
        <td>{(article?.ratings.reduce((partialSum, a) => partialSum + a, 0)) / article?.ratings.length} / 5</td>
      </tr>
    ));

  // Fetches all articles and makes sure only approved ones are displayed
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/articles")
      .then((res) => res.json())
      .then((articles) => {
        const approved = (articles as Article[]).filter((a) => a.approved);
        setArticles(approved);
      })
      .catch((err) => {
        console.log("Error from Articles: " + err);
      });
  }, []);

  return (
    <main>
      <NavBar />
      <label>
        Search:
        <input type="search" value={search} onChange={onChange} />
      </label>
      <label>
        From Year:
        <input type="number" value={fromYear} onChange={fromChange} step="1"/>
      </label>
      <label>
        To Year:
        <input type="number" value={toYear} onChange={toChange} step="1"/>
      </label>
      <label>
        Select SE Method:
        <select value={selectedMethod} onChange={handleMethodChange}>
          <option value="">--Select Method--</option>
          {/* This would ideally be dynamically populated from the backend as well */}
          <option value="SEMETHOD1">SEMETHOD1</option>
          <option value="SEMETHOD2">SEMETHOD2</option>
          <option value="SEMETHOD7">SEMETHOD7</option>
        </select>
      </label>
      {claims.length > 0 && (
        <div>
          <h3>Claims for {selectedMethod}:</h3>
          <ul>
            {claims.map((claim, index) => (
              <li key={index}>{claim}</li>
            ))}
          </ul>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>DOI</th>
            <th>Ratings</th>
          </tr>
        </thead>
        <tbody>{filtered}</tbody>
      </table>
    </main>
  );
}
