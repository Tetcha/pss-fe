import * as React from 'react';
import Cookies from 'universal-cookie';

import { constant } from 'src/constants/api/token';
import { store } from 'src/store';
import { userActions } from 'src/store/user';
import { userThunk } from 'src/store/user/thunks';
interface GetCurrentUserWrapperProps extends React.PropsWithChildren {}

export const GetCurrentUserWrapper: React.FC<GetCurrentUserWrapperProps> = ({ children }) => {
	React.useEffect(() => {
		const cookies = new Cookies();
		const token = cookies.get(constant.TOKEN_COOKIE_KEY);
		if (token) {
			store.dispatch(userThunk.getCurrentUser());
		} else {
			store.dispatch(userActions.updateLogin());
		}
	}, []);

	return <>{children}</>;
};
