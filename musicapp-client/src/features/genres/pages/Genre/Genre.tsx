import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../services/api.client.ts";
import { isAdminUser } from "../../../auth/index.ts";
import type { GenreResponse } from "../../types/Genre.types.ts";
import styles from "./Genre.module.css";

const Genre: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const isAdmin = isAdminUser();

	const [genreName, setGenreName] = useState<string>("");
	const [genreDescription, setGenreDescription] = useState<string>("");
	// const [genreHierarchy, setGenreHierarchy] = useState<string[]>([]);
	const genreHierarchy: string[] = []; // TODO: get genre hierarchy
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getGenre = async (genreId: number): Promise<void> => {
		try {
			setIsLoading(true);

			const result = await apiRequest<GenreResponse>(`/genres/${genreId}`, {
				method: "GET",
			});

			const genre = result.item;

			setGenreName(genre.genreName);
			setGenreDescription(genre.description);
		} catch (err) {
			console.error("Error retrieving genre info:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// Get the genre
	useEffect(() => {
		const genreId = isNaN(Number(id)) ? -1 : parseInt(id!, 10);

		getGenre(genreId);
	}, [id]);

	const handleEdit = (): void => {
		// TODO: implement edit navigation / modal
		console.log("Edit genre", id);
	};

	const handleDelete = async (): Promise<void> => {
		if (!confirm(`Are you sure you want to delete "${genreName}"?`)) return;

		try {
			await apiRequest(`/genres/${id}`, {
				method: "DELETE",
			});

			navigate("/genres");
		} catch (err) {
			console.error("Error deleting genre:", err);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>{genreName}</h1>
					{isAdmin && (
						<div className={styles.adminActions}>
							<button
								className={styles.editButton}
								onClick={handleEdit}
								title="Edit genre"
								aria-label="Edit genre"
								type="button"
							>
								Edit
							</button>
							<button
								className={styles.deleteButton}
								onClick={handleDelete}
								aria-label="Delete genre"
								type="button"
							>
								Delete
							</button>
						</div>
					)}
				</div>
				<p className={styles.description}>{genreDescription}</p>
				<table>
					<thead>
						<tr>
							<th>Hierarchy</th>
						</tr>
					</thead>
					<tbody>
						{genreHierarchy.map((result, index) => (
							<tr key={index}>
								<td>{result}</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default Genre;
