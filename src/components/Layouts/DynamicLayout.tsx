import { useRouter } from 'next/router';
import * as React from 'react';
import { AdminWrapper } from '../wrappers/adminWrapper';
import { DoctorWrapper } from '../wrappers/doctorWrapper';
import DashboardDoctorLayout from './DashboardDoctorLayout';
import DashboardLayout from './DashboardLayout';

interface DynamicLayoutProps extends React.PropsWithChildren {}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({ children }) => {
	const router = useRouter();

	if (router.pathname === '/admin/auth/login' || router.pathname === '/doctor/auth/login') {
		return <>{children}</>;
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

	return <>{children}</>;
};
