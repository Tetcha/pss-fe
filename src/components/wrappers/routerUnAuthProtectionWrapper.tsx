import * as React from 'react';
import { useRouter } from 'next/router';

import { routes } from 'src/components/routes';
import { useStoreUser } from 'src/store';

interface RouterUnAuthProtectionWrapperProps extends React.PropsWithChildren {}

export const RouterUnAuthProtectionWrapper: React.FC<RouterUnAuthProtectionWrapperProps> = ({
	children,
}) => {
	const user = useStoreUser();
	const router = useRouter();

	React.useEffect(() => {
		if (user.isLogin && user.id) {
			router.push(routes.homeUrl);
		}
	}, [user, router]);

	return <>{children}</>;
};
