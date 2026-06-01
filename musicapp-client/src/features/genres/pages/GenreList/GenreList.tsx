import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../../../services/api.client.ts";
import type { BaseRequest } from "../../../../types/api.request-types.ts";
import type { GenreListResponse } from "../../types/Genre.types.ts";
import styles from "./GenreList.module.css";

const GenreList: React.FC = () => {
	const [genres, setGenres] = useState<GenreListResponse>({ items: [], count: 0 });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [activeLetter, setActiveLetter] = useState<string | null>(null);
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

	const getGenreList = async (): Promise<void> => {
		try {
			setIsLoading(true);
			const result = await apiRequest<BaseRequest, GenreListResponse>("/genres");
			setGenres(result);
		} catch (err) {
			console.error("Error fetching genres:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getGenreList();
	}, []);

	// Group genres by first letter
	const grouped = genres.items
		.slice()
		.sort((a, b) => a.genreName.localeCompare(b.genreName))
		.reduce<Record<string, typeof genres.items>>((acc, genre) => {
			const letter = /^[A-Z]/.test(genre.genreName[0].toUpperCase()) ? genre.genreName[0].toUpperCase() : "#";
			if (!acc[letter]) acc[letter] = [];
			acc[letter].push(genre);
			return acc;
		}, {});

	const availableLetters = Object.keys(grouped).sort();

	const handleLetterClick = (letter: string) => {
		setActiveLetter(letter);
		sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<h1 className={styles.title}>Genres</h1>

				{availableLetters.map((letter) => (
					<section
						key={letter}
						ref={(el) => {
							sectionRefs.current[letter] = el;
						}}
						className={styles.letterSection}
						id={`section-${letter}`}
					>
						<h2 className={styles.letterHeading}>{letter}</h2>
						<table className={styles.table}>
							<thead className={styles.tableHeader}>
								<tr>
									<th className={styles.headerCell}>Genre</th>
								</tr>
							</thead>
							<tbody>
								{grouped[letter].map((genre) => (
									<tr key={genre.id} className={styles.row}>
										<td className={styles.cell}>
											<Link to={`/genre/${genre.id}`} className={styles.genreLink}>
												{genre.genreName}
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				))}
			</main>

			{/* Sticky letter picker */}
			<nav className={styles.letterNav} aria-label="Jump to letter">
				{"#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
					const hasGenres = availableLetters.includes(letter);
					return (
						<button
							key={letter}
							className={`${styles.letterButton} ${activeLetter === letter ? styles.letterButtonActive : ""} ${
								!hasGenres ? styles.letterButtonDisabled : ""
							}`}
							onClick={() => hasGenres && handleLetterClick(letter)}
							disabled={!hasGenres}
							aria-label={`Jump to ${letter}`}
							type="button"
						>
							{letter}
						</button>
					);
				})}
			</nav>
		</div>
	);
};

export default GenreList;
