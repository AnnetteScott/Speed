"use client";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "../components/navBar";
import {
  MouseEventHandler,
  useCallback,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { Article } from "@/components/Article";

import ModeratorPage from "./moderator/page";
import ArticleDTO from "../../../backend/dist/api/articles/article.dto";
import { Row } from "react-bootstrap";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortKey, setSortKey] = useState<SortKeys>("title"); //default
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn"); //default

  type Data = typeof articles;
  type SortKeys = keyof Data[0];
  type SortOrder = "ascn" | "desc";

  //Define Table Headers
  const headers: { key: SortKeys; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "doi", label: "DOI" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pages", label: "Pages" },
    { key: "pubYear", label: "Pub. Year" },
    { key: "number", label: "Issue #" },
    { key: "volume", label: "Vol." },
    { key: "claim", label: "Claims" },
    { key: "evidence", label: "SE method" },
    { key: "ratings", label: "Ratings" },
  ];

  // Event to detect user input
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filtered = articles
    .filter(
      (a) =>
        a?.title.toLowerCase().includes(search.toLowerCase()) ||
        a?.doi.toLowerCase().includes(search.toLowerCase())
    )
    .map((article) => (
      <tr key={article?.doi}>
        <td>{article?.title}</td>
        <td>
          <a href={`https://doi.org/${article?.doi}`}>{article?.doi}</a>
        </td>
        <td>
          {article?.ratings.reduce((partialSum, a) => partialSum + a, 0) /
            article?.ratings.length}{" "}
          / 5
        </td>{" "}
        {/*Sums up rating value for this article*/}
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

  //Sorting Data Function
  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: Data;
    sortKey: SortKeys; //headers
    reverse: boolean;
  }) {
    if (!sortKey) return tableData;

    const sortedData = tableData.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
      return sortedData.reverse();
    }

    return sortedData;
  }

  //Sort button
  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
  }: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys; //headers
    onClick: MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sortOrder === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        ▲
      </button>
    );
  }

  function SortableTable({ data }: { data: Data }) {
    const sortedData = useCallback(
      () =>
        sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
      [data, sortKey, sortOrder]
    );
  }
  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }
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
            {headers.map((Row) => {
              return (
                <td key={Row.key}>
                  {Row.label}{" "}
                  <SortButton
                    columnKey={Row.key}
                    onClick={() => changeSort(Row.key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>{filtered}</tbody>
      </table>
    </main>
  );
}
