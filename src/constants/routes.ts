export const ROUTES_URL = Object.freeze({
	// Home
	HOME: '/',

	// Auth
	LOGIN: '/login',
	REGISTER: '/register',
	ADMIN_LOGIN: '/admin/auth/login',
	DOCTOR_LOGIN: '/doctor/auth/login',

	// Admin
	ADMIN: '/admin',
	USERS: '/admin/users',
	ADD_DOCTOR: '/admin/users/doctors/add',
	DASHBOARD: '/admin/dashboard',
	EDIT_DOCTOR: (id: string) => `/admin/users/doctors/edit/${id}`,
	ADD_ADMIN: '/admin/users/admins/add',
	EDIT_ADMIN: (id: string) => `/admin/users/admins/edit/${id}`,
	ADMIN_TRANSACTION: '/admin/transaction',

	// Doctor
	DOCTOR: '/doctor',
	DOCTOR_CALENDAR: '/doctor/calendar',
	DOCTOR_SLOT: '/doctor/calendar/slot',
	DOCTOR_TRANSACTION: '/doctor/transaction',
});
