import * as React from 'react';
import Cookies from 'universal-cookie';

import { constant } from 'src/constants/api/token';
import { store } from 'src/store';
import { adminActions } from 'src/store/admin';
import { adminThunk } from 'src/store/admin/thunks';
interface GetCurrentAdminWrapperProps extends React.PropsWithChildren {}

export const GetCurrentAdminWrapper: React.FC<GetCurrentAdminWrapperProps> = ({ children }) => {
	React.useEffect(() => {
		const cookies = new Cookies();
		const token = cookies.get(constant.TOKEN_COOKIE_KEY);
		if (token) {
			store.dispatch(adminThunk.getCurrentAdmin());
		} else {
			store.dispatch(adminActions.updateLogin());
		}
	}, []);

	return <>{children}</>;
};
