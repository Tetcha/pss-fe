import axios, { AxiosError } from 'axios';
import { constant } from 'src/constants/api/token';

import { ENV_VARIABLES } from 'src/constants/env';
import { store } from 'src/store';
import { apiActions } from 'src/store/api';
import Cookies from 'universal-cookie';

const http = axios.create({
	baseURL: ENV_VARIABLES.BASE_URL,
	withCredentials: true,
});

http.interceptors.request.use(function (req) {
	store.dispatch(apiActions.initReq());
	const cookies = new Cookies();
	const token = cookies.get(constant.TOKEN_COOKIE_KEY) || '';

	if (token && req.headers) req.headers[constant.TOKEN_HEADER_KEY] = `Bearer ${token}`;
	// if (token && req.headers) req.headers[constant.TOKEN_HEADER_KEY] = `${token}`;

	return req;
});

http.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error: AxiosError) {
		return Promise.reject(error.response);
	},
);

export { http };
