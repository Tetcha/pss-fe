import * as React from 'react';
import Cookies from 'universal-cookie';

import { constant } from 'src/constants/api/token';
import { store } from 'src/store';
import { doctorActions } from 'src/store/doctor';
import { doctorThunk } from 'src/store/doctor/thunks';
interface GetCurrentDoctorWrapperProps extends React.PropsWithChildren {}

export const GetCurrentDoctorWrapper: React.FC<GetCurrentDoctorWrapperProps> = ({ children }) => {
	React.useEffect(() => {
		const cookies = new Cookies();
		const token = cookies.get(constant.TOKEN_COOKIE_KEY);
		if (token) {
			store.dispatch(doctorThunk.getCurrentDoctor());
		} else {
			store.dispatch(doctorActions.updateLogin());
		}
	}, []);

	return <>{children}</>;
};
