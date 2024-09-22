'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { DefaultEmptyUser, User } from './auth';

export default function NavCard() {
	const [user, setUser] = useState<User>(DefaultEmptyUser);
	const navigate = useRouter();

	useEffect(() => {
		const auth = localStorage.getItem('auth');
		if (auth) {
			setUser(JSON.parse(auth));
		}
	}, []);

	function logout(){
		localStorage.removeItem("auth");
		setUser(DefaultEmptyUser);
		navigate.push("/");
	}

	return (
		<div className="nav">
			<Link href='/'>SPEED</Link>
			<Link href='/suggest-article'>Suggest Article</Link>
			{ user.role === "Admin" ? <Link href='/admin'>Admin Panel</Link> : null }
			{ user.role === "Analyst" ? <Link href='/analyse'>Analyse</Link> : null }

			<p className="username">{user.username ? 'Hi, ': ''} {user.username}</p>
			{ user._id ? 
				<button onClick={() => logout()}>Logout</button> : 
				<Link href='/login'>Login</Link> 
			}
		</div>
	);
};