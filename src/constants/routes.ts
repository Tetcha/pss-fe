export const ROUTES_URL = Object.freeze({
	// Home
	HOME: '/',

	// Auth
	LOGIN: '/login',
	REGISTER: '/register',
	ADMIN_LOGIN: '/admin/auth/login',

	// Admin
	ADMIN: '/admin',

	// Users Admin
	USERS: '/admin/users',
	ADD_DOCTOR: '/admin/users/doctor/add',
	EDIT_DOCTOR: (id: string) => `/admin/users/doctor/edit/${id}`,
});
