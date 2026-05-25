const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const ENV = import.meta.env.VITE_ENV || "development";

interface RequestOptions {
	method?: "GET" | "POST" | "PATCH" | "DELETE";
	body?: unknown;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		method: options.method ?? "GET",
		headers: { "Content-Type": "application/json" },
		body: options.body ? JSON.stringify(options.body) : undefined,
	});

	if (!res.ok) throw new Error(`HTTP error: status ${res.status}`);

	const retVal = res.json() as Promise<T>;

	if (ENV === "development") console.log(await retVal);

	return retVal;
}
