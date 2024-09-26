"use client";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "../components/navBar";
import { useState, ChangeEvent, useEffect } from "react";
import { Article } from "@/components/Article";

import ModeratorPage from "./moderator/page";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);

  // Event to detect user input
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filtered = articles
    .filter((a) => a?.title.toLowerCase().includes(search.toLowerCase()) || a?.doi.toLowerCase().includes(search.toLowerCase()))
    .map((article) => (
      <tr key={article?.doi}>
        <td>{article?.title}</td>
        <td>
          <a href={`https://doi.org/${article?.doi}`}>{article?.doi}</a>
        </td>
        <td>{(article?.ratings.reduce((partialSum, a) => partialSum + a, 0)) / article?.ratings.length} / 5</td> {/*Sums up rating value for this article*/}
      </tr>
    ));

  // Fetches all articles and makes sure only approved onees are displayed
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/articles")
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        const approved = (articles as Article[]).filter(
          (a) => a.approved
        ) as any;
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
