import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { Gender } from 'src/interface/common';

import { constant } from '../../constants/api/token';
import { User, UserStatus } from '../../models/user';
import { userThunk } from './thunks';

export interface UserState extends User {
	isLogin: boolean;
}

const initialState: UserState = {
	email: '',
	name: '',
	id: '',
	status: UserStatus.ACTIVE,
	isLogin: false,
	balance: 0,
	birthday: '',
	gender: Gender.MALE,
	phone: '',
	studentCode: '',
	avatar: '',
};

const reducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetState: () => ({ ...initialState }),
		updateLogin: (state) => ({ ...state, isLogin: true }),
	},
	extraReducers: (builder) => {
		builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
			return { ...state, ...payload, isLogin: true };
		});
		builder.addCase(userThunk.getCurrentUser.rejected, (state) => {
			localStorage.removeItem('access-token');

			return { ...state, isLogin: true };
		});
	},
});
export const userActions = {
	...reducer.actions,
};
export const userReducer = reducer.reducer;
