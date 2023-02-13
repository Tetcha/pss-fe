import { API_URL } from 'src/constants/api/url';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Admin } from 'src/models/admin';

import { http } from '../../config/axios';

export const adminThunk = {
	getCurrentAdmin: createAsyncThunk<Admin, void>(
		'getCurrentAdmin',
		async (_, { rejectWithValue }) => {
			try {
				const res = await http.get<Admin>(API_URL.ADMIN_ME);
				return res.data;
			} catch (error) {
				return rejectWithValue(null);
			}
		},
	),
};
