import * as React from 'react';
import { useRouter } from 'next/router';

import { Navigation } from '../Navigation';
import { AdminWrapper } from '../wrappers/adminWrapper';
import { DoctorWrapper } from '../wrappers/doctorWrapper';
import { StudentWrapper } from '../wrappers/studentWrapper';
import DashboardDoctorLayout from './DashboardDoctorLayout';
import DashboardLayout from './DashboardLayout';
import { Footer } from '../Footer';

interface DynamicLayoutProps extends React.PropsWithChildren {}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({ children }) => {
	const router = useRouter();

	if (
		router.pathname === '/admin/auth/login' ||
		router.pathname === '/doctor/auth/login' ||
		router.pathname === '/student/auth/login'
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
			<StudentWrapper>
				<Navigation />
				{children}
				<Footer />
			</StudentWrapper>
		);
	}

	if (router.pathname.startsWith('/admin')) {
		return (
			<AdminWrapper>
				<DashboardLayout>{children}</DashboardLayout>
			</AdminWrapper>
		);
	}

	if (router.pathname.startsWith('/doctor')) {
		return (
			<DoctorWrapper>
				<DashboardDoctorLayout>{children}</DashboardDoctorLayout>
			</DoctorWrapper>
		);
	}

	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
};
