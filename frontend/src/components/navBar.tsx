'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DefaultEmptyUser, User } from './auth';

export default function NavCard() {
	const [user, setUser] = useState<User>(DefaultEmptyUser);

	useEffect(() => {
		const auth = localStorage.getItem('auth');
		if (auth) {
			setUser(JSON.parse(auth));
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("auth");
		setUser(DefaultEmptyUser);
	}

	return (
		<div className="nav">
			{ user._id ? <button onClick={() => logout()}>Logout</button> : 
				<Link href='/login'>login</Link> 
			}
		</div>
	);
};