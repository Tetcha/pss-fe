import * as React from 'react';
import { useRouter } from 'next/router';

import { ROUTES_URL } from 'src/constants/routes';
import { useStoreDoctor } from 'src/store';

interface RouterProtectionDoctorWrapperProps extends React.PropsWithChildren {}

export const RouterProtectionDoctorWrapper: React.FC<RouterProtectionDoctorWrapperProps> = ({
	children,
}) => {
	const doctor = useStoreDoctor();
	const router = useRouter();

	React.useEffect(() => {
		if (doctor.isLogin && !doctor.id) {
			router.push(ROUTES_URL.DOCTOR_LOGIN);
		}
	}, [doctor, router]);

	return <>{children}</>;
};
