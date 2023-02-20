export const ROUTES_URL = Object.freeze({
	// Home
	HOME: '/',

	// Auth
	STUDENT_LOGIN: '/student/auth/login',
	REGISTER: '/register',
	ADMIN_LOGIN: '/admin/auth/login',
	DOCTOR_LOGIN: '/doctor/auth/login',

	// Student
	STUDENT: '/student',
	STUDENT_ME: '/student/me',

	// Admin
	ADMIN: '/admin',
	ADMIN_ME: '/admin/me',
	ADMIN_PASSWORD: '/admin/password',
	USER_STUDENTS: '/admin/users/students',
	USER_DOCTORS: '/admin/users/doctors',
	USER_ADMINS: '/admin/users/admins',
	ADD_DOCTOR: '/admin/users/doctors/add',
	DASHBOARD: '/admin/dashboard',
	EDIT_DOCTOR: (id: string) => `/admin/users/doctors/edit/${id}`,
	ADD_ADMIN: '/admin/users/admins/add',
	EDIT_ADMIN: (id: string) => `/admin/users/admins/edit/${id}`,
	ADMIN_TRANSACTION: '/admin/transaction',

	// Doctor
	DOCTOR: '/doctor',
	DOCTOR_ME: '/doctor/me',
	DOCTOR_SLOTS_CALENDAR: '/doctor/slots/calendar',
	DOCTOR_SLOTS_WEEK_CALENDAR: '/doctor/slots/week-calendar',
	DOCTOR_BOOKING: '/doctor/booking',
	DOCTOR_TRANSACTION: '/doctor/transaction',
});
