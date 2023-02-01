import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ApiState {
	isGlobalLoading: boolean;
	isLocalLoading: boolean;
	errorDetails: Record<string, string>;
	isError: boolean;
	message: string;
	errorMessage: string;
}

const initialState: ApiState = {
	isGlobalLoading: false,
	isLocalLoading: false,
	errorDetails: {},
	isError: false,
	message: '',
	errorMessage: '',
};

const reducer = createSlice({
	name: 'api',
	initialState,
	reducers: {
		initReq: (state) => ({ ...state, isError: false, isGlobalLoading: true }),
		setGlobalLoading: (state, { payload }: PayloadAction<boolean>) => ({
			...state,
			isGlobalLoading: payload,
		}),
		setLocalLoading: (state, { payload }: PayloadAction<boolean>) => ({
			...state,
			isLocalLoading: payload,
		}),
		resetState: () => ({ ...initialState }),
		updateErrorDetails: (state, { payload }: PayloadAction<Record<string, string>>) => {
			const newState = { ...state };
			const { errorMessage, message, ...others } = payload;
			if (payload?.errorMessage) newState.errorMessage = errorMessage;

			newState.errorDetails = others;
			newState.isError = true;
			return newState;
		},
		updateSuccessMessage: (state, { payload }: PayloadAction<Record<string, string>>) => ({
			...state,
			message: payload.message || '',
		}),
	},
	extraReducers: () => {},
});

export const apiActions = {
	...reducer.actions,
};
export const apiReducer = reducer.reducer;
