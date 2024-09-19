'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { User, DefaultEmptyUser } from "../../components/auth";
import NavBar from '../../components/navBar'

export default function ManageUsers() {
	const [newUser, setNewUser] = useState<User>(DefaultEmptyUser);
	const navigate = useRouter();

	function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
		setNewUser({ ...newUser, [event.target.name]: event.target.value });
	};
	
	function onSubmit(event: FormEvent<HTMLFormElement>){
		event.preventDefault();
		console.log(newUser);
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/", {
			method: 'POST', 
			headers: {"Content-Type": "application/json"}, 
			body: JSON.stringify(newUser)
		})
		.then((res) => {
			navigate.push("/manage-users")
		})
		.catch((err) => {
			console.log('Error from CreateBook: ' + err);
		});
	};

	return (
		<main>
			<NavBar />
			<form onSubmit={onSubmit}>
				<label>
					Username:
					<input 
						type="text" 
						name="username" 
						value={newUser.username} 
						onChange={onChange}
					/>
				</label>
				<label>
					Email:
					<input 
						type="text" 
						name="email" 
						value={newUser.email} 
						onChange={onChange}
					/>
				</label>
				<label>
					Password:
					<input 
						type="text" 
						name="password" 
						value={newUser.password} 
						onChange={onChange}
					/>
				</label>
				<label>
					Role:
					<select name="role" value={newUser.role} onChange={onChange}>
						<option value="Moderator">Moderator</option>
						<option value="Analyst">Analyst</option>
					</select>
				</label>
				<input type="submit" />
			</form>

		</main>
	);
}