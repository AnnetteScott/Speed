'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { User, DefaultEmptyUser } from "../../components/auth";
import NavBar from '../../components/navBar'

export default function Login() {
	const [user, setUser] = useState<User>(DefaultEmptyUser);
	const navigate = useRouter();

	function onChange(event: ChangeEvent<HTMLInputElement>){
		setUser({ ...user, [event.target.name]: event.target.value });
	};
	
	function onSubmit(event: FormEvent<HTMLFormElement>){
		event.preventDefault()
		fetch(process.env.NEXT_PUBLIC_BACKEND_URL  + `/api/auth/login/${user.username}/${user.password}`, {
			method: 'GET',
			headers: {"Content-Type": "application/json"}
		})
		.then(async (res) => {
			const json = await res.json();
			localStorage.setItem("auth", JSON.stringify(json));
			console.log(localStorage.getItem("auth"));
			setUser(DefaultEmptyUser);
			navigate.push("/");
		})
		.catch((err) => {
			localStorage.removeItem("auth");
			console.log('Error from Login: ' + err);
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
						value={user.username} 
						onChange={onChange}
					/>
				</label>
				<label>
					Password:
					<input 
						type="password" 
						name="password" 
						value={user.password} 
						onChange={onChange}
					/>
				</label>
				<input type="submit" />
			</form>
		</main>
	);
}