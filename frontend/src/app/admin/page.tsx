'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from "../../components/auth";
import NavBar from '../../components/navBar'
import { Article } from '@/components/Article';

export default function ManageUsers() {
	const [users, setUsers] = useState<[User?]>([]);
	const [articles, setArticles] = useState<[Article?]>([]);
	
	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth')
		.then((res) => {
			return res.json();
		})
		.then((users) => {
			setUsers(users);
		})
		.catch((err) => {
			console.log('Error from fetching users: ' + err);
		});
		
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles')
		.then((res) => {
			return res.json();
		})
		.then((articles) => {
			setArticles(articles);
		})
		.catch((err) => {
			console.log('Error from fetching articles: ' + err);
		});
	}, []);

	function deleteUser(id: string | undefined) {
		if(!id){
			return;
		}

		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/auth/${id}`, {
			method: 'DELETE',
			headers: {"Content-Type": "application/json"}
		})
		.then((res) => {
			window.location.reload();
		})
		.catch((err) => {
			console.log('Error from CreateBook: ' + err);
		});
	}

	function deleteArticle(id: string | undefined) {
		if(!id){
			return;
		}

		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`, {
			method: 'DELETE',
			headers: {"Content-Type": "application/json"}
		})
		.then((res) => {
			window.location.reload();
		})
		.catch((err) => {
			console.log('Error from CreateBook: ' + err);
		});
	}

return (
	<main>
		<NavBar />
		<Link href="/add-user">Add User</Link>
		<table>
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>
				{ users.map(user =>
					<tr key={user?._id}>
						<td>{user?.username}</td>
						<td>{user?.email}</td>
						<td>{user?.role}</td>
						<td>{ user?.role === "Admin" ? null :
							<button onClick={() => deleteUser(user?._id)}>Delete</button> }
						</td>
					</tr>
				)}
			</tbody>
		</table>
		
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>DOI</th>
					<th>Moderated</th>
					<th>Analysed</th>
					<th>Approved</th>
				</tr>
			</thead>
			<tbody>
				{ articles.map(article =>
					<tr key={article?._id}>
						<td>{article?.title}</td>
						<td>
							<a href={`https://doi.org/${article?.doi}`}>{article?.doi}</a>
						</td>
						<td>{article?.moderated ? "True" : "False"}</td>
						<td>{article?.analysed ? "True" : "False"}</td>
						<td>{article?.approved ? "True" : "False"}</td>
						<td>
							<button onClick={() => deleteArticle(article?._id)}>Delete</button>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	</main>
);
}