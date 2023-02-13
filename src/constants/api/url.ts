export const API_URL = Object.freeze({
	// Auth
	LOGIN: '/student/login',
	REGISTER: '/auth/register',
	LOGOUT: '/auth/logout',
	LOGIN_ADMIN: '/admin/login',
	LOGIN_DOCTOR: '/doctor/login',

	// Doctor
	DOCTOR: '/doctor',

	// Admin
	UPDATE_ADMIN: '/admin',
	UPDATE_ADMIN_PASSWORD: '/admin/password',
	GET_ADMIN_LIST: '/admins',
	GET_DOCTOR_LIST: '/doctors',
	GET_STUDENT_LIST: '/students',
});
