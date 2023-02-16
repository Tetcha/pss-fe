import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from 'src/constants/api/url';

import { http } from '../../config/axios';
import { User } from '../../models/user';

export const userThunk = {
	getCurrentUser: createAsyncThunk<User, void>('getCurrentUser', async (_, { rejectWithValue }) => {
		try {
			const res = await http.get<User>(API_URL.STUDENT_ME);
			return res.data;
		} catch (error) {
			return rejectWithValue(null);
		}
	}),
};
