import { API_URL } from './../../constants/api/url';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Doctor } from 'src/models/doctor';

import { http } from '../../config/axios';

export const doctorThunk = {
	getCurrentDoctor: createAsyncThunk<Doctor, void>(
		'getCurrentDoctor',
		async (_, { rejectWithValue }) => {
			try {
				const res = await http.get<Doctor>(API_URL.DOCTOR_ME);
				return res.data;
			} catch (error) {
				return rejectWithValue(null);
			}
		},
	),
};
