import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CookiePage() {
	const [token, setToken] = useState<string>('');

	useEffect(() => {
		const storedToken = localStorage.getItem('access-token') || '';

		if (storedToken) {
			setToken(storedToken);
		} else {
			axios
				.post('http://localhost:3000/api/setCookie', { token: 'my-token' })
				.then(() => {
					const cookie = document.cookie;
					const token = cookie.split('=')[1];
					localStorage.setItem('access-token', token);
					setToken(token);
				})
				.catch((error) => console.error(error));
		}
	}, []);

	return <div>{token ? token : 'Token not found'}</div>;
}
