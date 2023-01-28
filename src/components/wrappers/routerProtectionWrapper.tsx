import * as React from 'react';
import { useRouter } from 'next/router';

import { routes } from 'src/components/routes';
import { UserRole } from 'src/models/user';
import { useStoreUser } from 'src/store';

interface RouterProtectionWrapperProps extends React.PropsWithChildren {
	acceptRoles: Array<UserRole>;
}

export const RouterProtectionWrapper: React.FC<RouterProtectionWrapperProps> = ({
	children,
	acceptRoles,
}) => {
	const user = useStoreUser();
	const router = useRouter();

	React.useEffect(() => {
		if (
			user.isLogin &&
			(!user.id || acceptRoles.findIndex((item) => user.role && item === user.role) === -1)
		) {
			router.push(routes.loginUrl);
		}
	}, [acceptRoles, user, router]);

	return <>{children}</>;
};
