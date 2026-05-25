/**
 * @returns Current user from session storage
 */
export function getCurrentUser(): string {
	return sessionStorage.getItem("user") ?? "Web";
}
