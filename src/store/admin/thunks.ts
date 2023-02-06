import { createAsyncThunk } from '@reduxjs/toolkit';

import { Admin } from 'src/models/admin';

import { http } from '../../config/axios';

export const adminThunk = {
	getCurrentAdmin: createAsyncThunk<Admin, void>(
		'getCurrentAdmin',
		async (_, { rejectWithValue }) => {
			try {
				const res = await http.get<Admin>('/admin/me');
				return res.data;
			} catch (error) {
				return rejectWithValue(null);
			}
		},
	),
};
