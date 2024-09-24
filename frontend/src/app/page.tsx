import Image from "next/image";
import styles from "./page.module.css";
import NavBar from '../components/navBar'

import ModeratorPage from "../app/moderator/page";

export default function Home() {
	return (
		<main>
			<NavBar />

		{/* TEMPORARY */}
		<ModeratorPage/>
		{/* TEMPORARY */}
			
		</main>
	);
}
