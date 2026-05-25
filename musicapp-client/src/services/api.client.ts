const BASE_URL = Deno.env.get("REACT_BASE_URL") || "http://localhost:5000";

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

	return res.json() as Promise<T>;
}
