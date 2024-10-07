"use client";
import NavBar from "../components/navBar";
import { useState, ChangeEvent, useEffect } from "react";
import { Article } from "@/components/Article";

export default function Home() {
	const [search, setSearch] = useState<string>("");
	const [fromYear, setFromYear] = useState<number>(2000);
	const [toYear, setToYear] = useState<number>(2024);
	const [articles, setArticles] = useState<Article[]>([]);

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

	const filtered = articles
		.filter((a) => a?.title.toLowerCase().includes(search.toLowerCase()) || a?.doi.toLowerCase().includes(search.toLowerCase()))
		.filter((a) => a.pubYear >= fromYear && a.pubYear <= toYear)
		.map((article) => (
			<tr key={article?.doi}>
				<td>{article?.title}</td>
				<td>
				<a href={`https://doi.org/${article?.doi}`}>{article?.doi}</a>
				</td>
				<td>{(article?.ratings.reduce((partialSum, a) => partialSum + a, 0)) / article?.ratings.length} / 5</td> {/*Sums up rating value for this article*/}
			</tr>
		));

	// Fetches all articles and makes sure only approved ones are displayed
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
		<label>
			From Year:
			<input type="number" value={fromYear} onChange={fromChange} step="1"/>
		</label>
		<label>
			To Year:
			<input type="search" value={toYear} onChange={toChange} step="1"/>
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
