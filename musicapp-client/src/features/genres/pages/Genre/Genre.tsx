import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../services/api.client.ts";
import { isAdminUser } from "../../../auth/index.ts";
import { getCurrentUser } from "../../../shared/utils/session-info.ts";
import type { GenreRequest, GenreResponse, UpdateGenreRequest } from "../../types/Genre.types.ts";
import type { GenreHierarchyRequest, GenreHierarchyResponse } from "../../types/GenreHierarchy.types.ts";
import genreListStyles from "../GenreList/GenreList.module.css";
import styles from "./Genre.module.css";

const Genre: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const isAdmin = isAdminUser();

	const [genreName, setGenreName] = useState<string>("");
	const [genreDescription, setGenreDescription] = useState<string>("");
	const [editedDescription, setEditedDescription] = useState<string>("");
	const [createdBy, setCreatedBy] = useState<string>("");
	const [genreHierarchy, setGenreHierarchy] = useState<string[]>([]);
	const [childGenres, setChildGenres] = useState<GenreHierarchyResponse>({ items: [], count: 0 });
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getGenre = async (genreId: number): Promise<void> => {
		try {
			setIsLoading(true);

			// Get genre info
			const result = await apiRequest<GenreRequest, GenreResponse>(`/genres/${genreId}`, {
				method: "GET",
			});

			const genre = result.item;

			setGenreName(genre.genreName);
			setGenreDescription(genre.description);
			setCreatedBy(genre.createdBy);

			// Get hierarchy info
			const hierarchyResult = await apiRequest<GenreHierarchyRequest, GenreHierarchyResponse>(`/genre-hierarchies?genreId=${genreId}`);
			// Sort by the level then alphabetically
			const hierarchies = hierarchyResult.items.sort((a, b) => a.level - b.level).map((h) => h.hierarchyPath).sort((a, b) => a.localeCompare(b));

			setGenreHierarchy(hierarchies);

			// Get child genres
			const childGenreResult = await apiRequest<GenreHierarchyRequest, GenreHierarchyResponse>(`/genre-hierarchies?parentGenreId=${genreId}`);

			// Dedupe keys
			const uniqueChildGenres = [...new Map(childGenreResult.items.map((genre) => [genre.genreId, genre])).values()];

			setChildGenres({ items: uniqueChildGenres, count: uniqueChildGenres.length });
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

	const handleEditStart = (): void => {
		setEditedDescription(genreDescription);
		setIsEditing(true);
	};

	const handleCancel = (): void => {
		setEditedDescription("");
		setIsEditing(false);
	};

	const handleSave = async (): Promise<void> => {
		try {
			setIsSaving(true);

			const request = {
				item: {
					genreName: genreName,
					description: editedDescription,
					createdBy: createdBy,
					modifiedBy: getCurrentUser(),
				},
			} as UpdateGenreRequest;

			const updatedGenre = await apiRequest<UpdateGenreRequest, GenreResponse>(`/genres/${id}`, {
				method: "PATCH",
				body: request,
			});

			setGenreDescription(updatedGenre.item.description);
			setIsEditing(false);
		} catch (err) {
			console.error("Error saving genre description:", err);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async (): Promise<void> => {
		if (!confirm(`Are you sure you want to delete "${genreName}"? This action will delete all linked items.`)) return;

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
			<div className={styles.backButtonWrapper}>
				<button
					className={styles.backButton}
					onClick={() => navigate(-1)}
					title="Go back"
					aria-label="Go back"
					type="button"
				>
					Back
				</button>
			</div>
			<main className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>{genreName}</h1>
					{isAdmin && !isEditing && (
						<div className={styles.adminActions}>
							<button
								className={styles.editButton}
								onClick={handleEditStart}
								title="Edit description"
								aria-label="Edit description"
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

				{isEditing
					? (
						<div className={styles.editSection}>
							<textarea
								className={styles.textarea}
								value={editedDescription}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedDescription(e.target.value)}
								rows={5}
								autoFocus
								disabled={isSaving}
							/>
							<div className={styles.editActions}>
								<button
									className={styles.saveButton}
									onClick={handleSave}
									disabled={isSaving}
									type="submit"
								>
									{isSaving ? "Saving..." : "Save"}
								</button>
								<button
									className={styles.cancelButton}
									onClick={handleCancel}
									disabled={isSaving}
									type="reset"
								>
									Cancel
								</button>
							</div>
						</div>
					)
					: <p className={styles.description}>{genreDescription}</p>}
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
				<table>
					<thead>
						<tr>
							<th>Child Genres</th>
						</tr>
					</thead>
					<tbody>
						{childGenres.items.sort((a, b) => a.genreName.localeCompare(b.genreName)).map((genre) => (
							<tr key={genre.genreId}>
								<td>
									<Link
										to={`/genre/${genre.genreId}`}
										className={genreListStyles.genreLink}
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

export default Genre;
