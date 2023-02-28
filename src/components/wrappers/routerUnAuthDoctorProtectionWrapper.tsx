import * as React from 'react';
import { useRouter } from 'next/router';

import { ROUTES_URL } from 'src/constants/routes';
import { useStoreDoctor } from 'src/store';

interface RouterUnAuthDoctorProtectionWrapperProps extends React.PropsWithChildren {}

export const RouterUnAuthDoctorProtectionWrapper: React.FC<
	RouterUnAuthDoctorProtectionWrapperProps
> = ({ children }) => {
	const doctor = useStoreDoctor();
	const router = useRouter();

	React.useEffect(() => {
		if (doctor.isLogin && doctor.id) {
			if (router.asPath.includes('redirectUrl')) return;
			router.push(ROUTES_URL.DOCTOR);
		}
	}, [doctor, router]);

	return <>{children}</>;
};
