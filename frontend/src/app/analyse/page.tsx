'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from "next/navigation";
import NavBar from '../../components/navBar'
import { Article, DefaultEmptyArticle } from '@/components/Article';
import ArticleCard from '@/components/ArticleCard';

export default function ManageUsers() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
	const [claims, setClaims] = useState<string>("");

	const navigate = useRouter();

	useEffect(() => {
		getArticles();
	}, []);

	function getArticles(){
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/articles/", {
			method: 'GET', 
			headers: {"Content-Type": "application/json"},
		}).then((res) => {
			return res.json();
		})
		.then((articlesDB) => {
			console.log(articlesDB)
			setArticles(articlesDB);
		})
		.catch((err) => {
			console.log('Error from fetching articles: ' + err);
		});
	}

	const handleArticleClick = (article: Article) => {
		console.log('Article clicked:', article);
		setArticle(article);
	};

	const articleQueue = articles.filter(a => !a.analysed && !a.rejected && a.moderated).map((art, k) => 
			<ArticleCard article={art} onArticleClick={handleArticleClick} key={k} />
	);

	function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
		setArticle({ ...article, [event.target.name]: event.target.value });
	};

	function onClaims(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
		setClaims(event.target.value);
	};
	
	function approve(){
		if(article._id === undefined){
			return;
		}

		article.analysed = true;
		article.approved = true;
		article.claims = claims.split(",");
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${article._id}`, {
			method: 'PUT', 
			headers: {"Content-Type": "application/json"}, 
			body: JSON.stringify(article)
		})
		.then((res) => {
			getArticles();
			setArticle(DefaultEmptyArticle);
		})
		.catch((err) => {
			console.log('Error from approve: ' + err);
		});
	};

	function reject(){
		if(article._id === undefined){
			return;
		}

		article.analysed = true;
		article.rejected = true;
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${article._id}`, {
			method: 'PUT',
			headers: {"Content-Type": "application/json"}, 
			body: JSON.stringify(article)
		})
		.then((res) => {
			getArticles();
			setArticle(DefaultEmptyArticle);
		})
		.catch((err) => {
			console.log('Error from reject: ' + err);
		});
	};

return (
	<main>
		<NavBar />
		<div className='queue'>{articleQueue.length == 0 ? 'There are no articles waiting!' : articleQueue}</div>
		<br />
		{ article._id != undefined ?
			<div>
				<button onClick={() => approve()} >Approve</button>
				<button onClick={() => reject()} >Reject</button>
			</div>
		:''}

		{ article._id != undefined ? 
			<a href={`https://doi.org/${article.doi}`}>https://doi.org/{article.doi}</a>
		:''}
		{ article._id != undefined ? 
			<div className="flex flex_row">
				<div className="flex column">
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
					<br />
					<label>
						Method:
						<input 
							type="text" 
							name="method" 
							value={article.method} 
							onChange={onChange}
						/>
					</label>
					<label>
						Claims:
						<input 
							type="text" 
							name="method"
							placeholder="Separate with comma"
							value={claims} 
							onChange={onClaims}
						/>
					</label>
				</div>
			</div>
		:''}
	</main>
);
}