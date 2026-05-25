import type { BaseIdRequest } from "../../../types/api.request-types.ts";
import type { BaseItemResponse, BaseListResponse } from "../../../types/api.response-types.ts";

interface GenreResponsePayload {
	id: number;
	genreName: string;
	description: string;
	createdBy: string;
	modifiedBy: string;
}

export type GenreRequest = BaseIdRequest;

export type GenreResponse = BaseItemResponse<GenreResponsePayload>;
export type GenreListResponse = BaseListResponse<GenreResponsePayload>;
