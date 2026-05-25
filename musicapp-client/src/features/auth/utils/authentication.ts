export const isAuthenticated = (): boolean => {
	const user = sessionStorage.getItem('user');
	const loginExpiration = sessionStorage.getItem('loginExpiration');

	if (!user || !loginExpiration) return false;

	return new Date() <= new Date(loginExpiration);
};

export const isAdminUser = (): boolean => {
	return sessionStorage.getItem('isAdmin') === 'true';
};
