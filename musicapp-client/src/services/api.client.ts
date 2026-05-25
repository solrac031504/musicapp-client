import type { BaseRequest } from "../types/api.request-types.ts";
import type { BaseResponse } from "../types/api.response-types.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const ENV = import.meta.env.VITE_ENV || "development";

interface RequestOptions<T extends BaseRequest> {
	method?: "GET" | "POST" | "PATCH" | "DELETE";
	body?: T;
}

export async function apiRequest<T extends BaseRequest, K extends BaseResponse>(path: string, options: RequestOptions<T> = {}): Promise<K> {
	const res = await fetch(`${BASE_URL}${path}`, {
		method: options.method ?? "GET",
		headers: { "Content-Type": "application/json" },
		body: options.body ? JSON.stringify(options.body) : undefined,
	});

	if (!res.ok) throw new Error(`HTTP error: status ${res.status}`);

	const data = await res.json() as K;

	if (ENV === "development") console.log(data);

	return data;
}
