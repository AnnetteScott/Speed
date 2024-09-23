'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from "next/navigation";
import NavBar from '../../components/navBar'
import { Article, DefaultEmptyArticle } from '@/components/Article';

export default function SuggestArticle() {

	const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
	const navigate = useRouter();

	function onChange(event: ChangeEvent<HTMLInputElement>){
		setArticle({ ...article, [event.target.name]: event.target.value });
	};
	
	function onSubmit(event: FormEvent<HTMLFormElement>){
		event.preventDefault()
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL  + `/api/articles`, {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(article)
		})
		.then((res) => {
			setArticle(DefaultEmptyArticle);
			navigate.push("/");
		})
		.catch((err) => {
			console.log('Error from article submission: ' + err);
		});
	};

	return (
		<main>
			<NavBar />
			<form onSubmit={onSubmit}>
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