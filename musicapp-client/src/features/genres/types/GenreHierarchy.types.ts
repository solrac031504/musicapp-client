import { BaseIdRequest } from "../../../types/api.request-types.ts";
import { BaseListResponse } from "../../../types/api.response-types.ts";

interface GenreHierarchyResponsePayload {
	genreId: number;
	genreName: string;
	hierarchyPath: string;
	parentGenreId: number;
	level: number;
	rootGenreName: string;
	rootGenreId: number;
}

export type GenreHierarchyRequest = BaseIdRequest;
export type GenreHierarchyResponse = BaseListResponse<GenreHierarchyResponsePayload>;
