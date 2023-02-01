import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { constant } from '../../constants/api/token';
import { doctorThunk } from './thunks';
import { Doctor } from 'src/models/doctor';
import { Gender } from 'src/interface/common';

export interface DoctorState extends Doctor {
	isLogin: boolean;
}

const initialState: DoctorState = {
	id: '',
	name: '',
	email: '',
	balance: 0,
	birthday: '',
	phone: '',
	gender: Gender.MALE,
	isLogin: false,
};

const reducer = createSlice({
	name: 'doctor',
	initialState,
	reducers: {
		resetState: () => ({ ...initialState }),
		updateLogin: (state) => ({ ...state, isLogin: true }),
	},
	extraReducers: (builder) => {
		builder.addCase(doctorThunk.getCurrentDoctor.fulfilled, (state, { payload }) => {
			return { ...state, ...payload, isLogin: true };
		});
		builder.addCase(doctorThunk.getCurrentDoctor.rejected, (state) => {
			const cookies = new Cookies();
			cookies.set(constant.TOKEN_COOKIE_KEY, '', { maxAge: -999 });

			return { ...state, isLogin: true };
		});
	},
});
export const doctorActions = {
	...reducer.actions,
};
export const doctorReducer = reducer.reducer;
