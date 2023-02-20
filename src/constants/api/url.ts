export const API_URL = Object.freeze({
	// Auth
	LOGIN: '/student/login',
	REGISTER: '/auth/register',
	LOGOUT: '/auth/logout',
	LOGIN_ADMIN: '/admin/login',
	LOGIN_DOCTOR: '/doctor/login',

	// Student
	STUDENT_ME: '/student/me',
	UPDATE_STUDENT: '/student',

	// Doctor
	DOCTOR: '/doctor',
	DOCTOR_ME: '/doctor/me',
	UPDATE_DOCTOR: '/doctor',
	SLOTS_DOCTOR: (id: string) => `/doctor/${id}/slots`,

	// Admin
	ADMIN_ME: '/admin/me',
	UPDATE_ADMIN: '/admin',
	UPDATE_ADMIN_PASSWORD: '/admin/password',
	GET_ADMIN_LIST: '/admins',
	GET_DOCTOR_LIST: '/doctors',
	GET_STUDENT_LIST: '/students',
	UPDATE_DOCTOR_ACTIVE: (id: string, status: boolean) => `/doctor/${id}/status/${status}`,
	UPDATE_STUDENT_ACTIVE: (id: string, status: boolean) => `/student/${id}/status/${status}`,

	// Slot
	SLOTS: '/slots',
});
