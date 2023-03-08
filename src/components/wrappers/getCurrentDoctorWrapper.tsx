import * as React from 'react';

import { constant } from 'src/constants/api/token';
import { store } from 'src/store';
import { doctorActions } from 'src/store/doctor';
import { doctorThunk } from 'src/store/doctor/thunks';
interface GetCurrentDoctorWrapperProps extends React.PropsWithChildren {}

export const GetCurrentDoctorWrapper: React.FC<GetCurrentDoctorWrapperProps> = ({ children }) => {
	React.useEffect(() => {
		const token = localStorage.getItem(constant.TOKEN_KEY);
		if (token) {
			store.dispatch(doctorThunk.getCurrentDoctor());
		} else {
			store.dispatch(doctorActions.updateLogin());
		}
	}, []);

	return <>{children}</>;
};
