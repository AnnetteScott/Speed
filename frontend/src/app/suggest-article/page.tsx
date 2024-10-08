'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import NavBar from '../../components/navBar';
import { Article, DefaultEmptyArticle } from '@/components/Article';
import { parseBibtex } from '../../utils/bibtexParser';
export default function SuggestArticle() {

	const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
	const [fileContent, setFileContent] = useState<string | null>(null);
	const navigate = useRouter();

	// Handle manual input changes
	function onChange(event: ChangeEvent<HTMLInputElement>) {
		setArticle({ ...article, [event.target.name]: event.target.value });
	};

	// Handle file input (BibTeX format)
	function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target?.result as string;
				setFileContent(content);
				const parsedArticle = parseBibtex(content);
				setArticle({
					title: parsedArticle.title || "",
					doi: parsedArticle.doi || "",
					authors: parsedArticle.authors || "",
					source: parsedArticle.source || "",
					pages: parsedArticle.pages || "",
					pubYear: parsedArticle.pubYear || 0,
					volume: parsedArticle.volume || 0,
					number: parsedArticle.number || 0,
					claims: [],
					method: "",
					ratings: [],
					moderated: false,
					analysed: false,
					approved: false,
					rejected: false,
				});
			};
			reader.readAsText(file);
		}
	}

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(article)
		})
			.then((res) => {
				setArticle(DefaultEmptyArticle);
				navigate.push("/");
			})
			.catch((err) => {
				console.log('Error from article submission: ' + err);
			});
	}

	return (
		<main>
			<NavBar />
			<form onSubmit={onSubmit}>
				<h3>
					Upload BibTeX File
				</h3>
				<input
					type="file"
					accept=".bib"
					onChange={handleFileChange}
				/>
				<h3 >OR</h3>
				<label>
					Title:
					<input
						type="text"
						name="title"
						value={article.title}
						onChange={onChange}
					/>
				</label>
				<label>
					DOI:
					<input
						type="text"
						name="doi"
						placeholder="10.1000/82"
						value={article.doi}
						onChange={onChange}
						required
					/>
				</label>
				<label>
					Source:
					<input
						type="text"
						name="source"
						value={article.source}
						onChange={onChange}
					/>
				</label>
				<label>
					Pages:
					<input
						type="text"
						name="pages"
						value={article.pages}
						onChange={onChange}
					/>
				</label>
				<label>
					Volume:
					<input
						type="text"
						name="volume"
						value={article.volume}
						onChange={onChange}
					/>
				</label>
				<label>
					Number:
					<input
						type="text"
						name="number"
						value={article.number}
						onChange={onChange}
					/>
				</label>
				<label>
					Published Year:
					<input
						type="text"
						name="pubYear"
						value={article.pubYear}
						onChange={onChange}
					/>
				</label>
				<label>
					Authors:
					<input
						type="text"
						name="authors"
						value={article.authors}
						onChange={onChange}
					/>
				</label>


				<input type="submit" />
			</form>
		</main>
	);
}