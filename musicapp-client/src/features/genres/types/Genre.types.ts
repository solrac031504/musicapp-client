import type { BaseIdRequest, BaseItemRequest } from "../../../types/api.request-types.ts";
import type { BaseItemResponse, BaseListResponse } from "../../../types/api.response-types.ts";

interface GenrePayload {
	id: number;
	genreName: string;
	description: string;
	createdBy: string;
	modifiedBy: string;
}

export type GenreRequest = BaseIdRequest;
export type UpdateGenreRequest = BaseItemRequest<GenrePayload>;

export type GenreResponse = BaseItemResponse<GenrePayload>;
export type GenreListResponse = BaseListResponse<GenrePayload>;
