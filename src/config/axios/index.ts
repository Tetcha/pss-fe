import axios, { AxiosError } from 'axios';

import { ENV_VARIABLES } from 'src/constants/env';

const http = axios.create({
	baseURL: ENV_VARIABLES.BASE_URL,
	withCredentials: true,
});

http.interceptors.request.use(function (req) {
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
