import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { Gender } from 'src/interface/common';
import { Doctor } from 'src/models/doctor';

import { constant } from '../../constants/api/token';
import { doctorThunk } from './thunks';

export interface DoctorState extends Doctor {
	isLogin: boolean;
}

const initialState: DoctorState = {
	id: '',
	name: '',
	username: '',
	avatar: '',
	briefInfo: '',
	createAt: '',
	updateAt: '',
	isActive: false,
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
			localStorage.removeItem('access-token');

			return { ...state, isLogin: true };
		});
	},
});
export const doctorActions = {
	...reducer.actions,
};
export const doctorReducer = reducer.reducer;
