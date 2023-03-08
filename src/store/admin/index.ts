import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { Admin } from 'src/models/admin';

import { constant } from '../../constants/api/token';
import { adminThunk } from './thunks';

export interface AdminState extends Admin {
	isLogin: boolean;
}

const initialState: AdminState = {
	id: '',
	name: '',
	username: '',
	isLogin: false,
};

const reducer = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		resetState: () => ({ ...initialState }),
		updateLogin: (state) => ({ ...state, isLogin: true }),
	},
	extraReducers: (builder) => {
		builder.addCase(adminThunk.getCurrentAdmin.fulfilled, (state, { payload }) => {
			return { ...state, ...payload, isLogin: true };
		});
		builder.addCase(adminThunk.getCurrentAdmin.rejected, (state) => {
			localStorage.removeItem('access-token');

			return { ...state, isLogin: true };
		});
	},
});
export const adminActions = {
	...reducer.actions,
};
export const adminReducer = reducer.reducer;
