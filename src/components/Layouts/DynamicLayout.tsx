import * as React from 'react';
import { useRouter } from 'next/router';

import { Navigation } from '../Navigation';
import DashboardDoctorLayout from './DashboardDoctorLayout';
import DashboardLayout from './DashboardLayout';
import { Footer } from '../Footer';

interface DynamicLayoutProps extends React.PropsWithChildren {}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({ children }) => {
	const router = useRouter();

	if (
		router.pathname === '/admin/auth/login' ||
		router.pathname === '/doctor/auth/login'
		// ||router.pathname === '/student/auth/login'
	) {
		return (
			<>
				<Navigation />
				{children}
				<Footer />
			</>
		);
	}

	if (router.pathname.startsWith('/student')) {
		return (
			<>
				<Navigation />
				{children}
				<Footer />
			</>
		);
	}

	if (router.pathname.startsWith('/admin')) {
		return <DashboardLayout>{children}</DashboardLayout>;
	}

	if (router.pathname.startsWith('/doctor')) {
		return <DashboardDoctorLayout>{children}</DashboardDoctorLayout>;
	}

	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
};
