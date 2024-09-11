'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from "../../components/auth";
import NavBar from '../../components/navBar'

export default function ManageUsers() {
	const [users, setUsers] = useState<[User?]>([]);

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth')
		.then((res) => {
			return res.json();
		})
		.then((users) => {
			setUsers(users);
		})
		.catch((err) => {
			console.log('Error from ShowBookList: ' + err);
		});
	}, []);

	const deleteUser = (id: string | undefined) => {
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
	</main>
);
}