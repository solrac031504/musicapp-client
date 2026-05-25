import type { BaseItemRequest } from "../../../types/api.request-types.ts";
import type { BaseItemResponse } from "../../../types/api.response-types.ts";

interface LoginRequestPayload {
	username: string;
	password: string;
}

interface LoginResponsePayload {
	isAuthenticated: boolean;
	authExpiration: Date | null;
	isAdmin: boolean;
	errorMessage: string | null;
}

export type LoginRequest = BaseItemRequest<LoginRequestPayload>;
export type LoginResponse = BaseItemResponse<LoginResponsePayload>;
