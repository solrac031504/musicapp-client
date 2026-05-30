import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../../services/api.client.ts";
import { isAdminUser } from "../../../auth/index.ts";
import { getCurrentUser } from "../../../shared/utils/session-info.ts";
import type { GenreRequest, GenreResponse, UpdateGenreRequest } from "../../types/Genre.types.ts";
import type { GenreHierarchyRequest, GenreHierarchyResponse } from "../../types/GenreHierarchy.types.ts";
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
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getGenre = async (genreId: number): Promise<void> => {
		try {
			setIsLoading(true);

			const result = await apiRequest<GenreRequest, GenreResponse>(`/genres/${genreId}`, {
				method: "GET",
			});

			const genre = result.item;

			setGenreName(genre.genreName);
			setGenreDescription(genre.description);
			setCreatedBy(genre.createdBy);

			const hierarchyResult = await apiRequest<GenreHierarchyRequest, GenreHierarchyResponse>(`/genre-hierarchies?genreId=${genreId}`);
			const hierarchies = hierarchyResult.items.map((h) => h.hierarchyPath);

			if (hierarchyResult.count > 0) setGenreHierarchy(hierarchies);
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
			</main>
		</div>
	);
};

export default Genre;
