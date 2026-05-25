import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../services/api.client.ts";
import type { GenreResponse } from "../../types/Genre.types.ts";

const Genre: React.FC = () => {
	const _navigate = useNavigate();
	const { id } = useParams();

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

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="genre-container">
			<main className="container mt-4">
				<h1>{genreName}</h1>
				<p>Description: {genreDescription}</p>
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
