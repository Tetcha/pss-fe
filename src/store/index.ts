import { useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiReducer, ApiState } from './api';
import { userReducer, UserState } from './user';

export interface RootState {
	api: ApiState;
	user: UserState;
}

const reducers = combineReducers<RootState>({
	api: apiReducer,
	user: userReducer,
});

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
});

export const useStoreApi = () => useSelector<RootState, ApiState>((state) => state.api);
export const useStoreUser = () => useSelector<RootState, UserState>((state) => state.user);
