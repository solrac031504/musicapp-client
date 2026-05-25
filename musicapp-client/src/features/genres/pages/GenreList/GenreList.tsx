import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../../../services/api.client.ts";
import type { GenreListResponse } from "../../types/Genre.types.ts";
import styles from "./GenreList.module.css";

const GenreList: React.FC = () => {
	const _navigate = useNavigate();
	const [genres, setGenres] = useState<GenreListResponse>({
		items: [],
		count: 0,
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Get the genres
	const getGenreList = async (): Promise<void> => {
		try {
			setIsLoading(true);

			const result = await apiRequest<GenreListResponse>("/genres", {
				method: "GET",
			});

			setGenres(result);
		} catch (err) {
			console.error("Error fetching genres:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// Use useEffect to call getGenreList only once on component mount
	useEffect(() => {
		getGenreList();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<main className={styles.title}>
				<h1>Genres</h1>
				<table className={styles.table}>
					<thead className={styles.tableHeader}>
						<tr>
							<th className={styles.headerCell}>Genre</th>
						</tr>
					</thead>
					<tbody>
						{genres.items.map((genre) => (
							<tr key={genre.id} className={styles.row}>
								<td className={styles.cell}>
									<Link
										to={`/genre/${genre.id}`}
										className={styles.genreLink}
									>
										{genre.genreName}
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default GenreList;
