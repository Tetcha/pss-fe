import * as React from 'react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { FormErrorMessage, FormWrapper, TextField } from 'src/components/Input';
import { routes } from 'src/components/routes';
import { store } from 'src/store';
import { apiActions } from 'src/store/api';

import { authLogin } from './action';
import { AuthLoginDto } from './interface';

const defaultValues: AuthLoginDto = {
	password: '',
	email: '',
};

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const methods = useForm<AuthLoginDto>({
		defaultValues,
	});

	React.useEffect(() => {
		store.dispatch(apiActions.resetState());
		return () => {};
	}, []);

	const handleOnSubmit = async (data: AuthLoginDto) => {
		const res = await authLogin(data);
		// if (res) window.location.reload();
		if (res) console.log('data', data);
		// router.push(routes.homeUrl);
	};

	return (
		<div className="flex flex-col justify-center w-full min-h-full py-12 intro-y sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-3xl font-extrabold text-center text-gray-900">Auth Login</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					<FormWrapper methods={methods}>
						<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
							<TextField commonField={{ label: 'Email Address', name: 'email' }} type="email" />
							<TextField commonField={{ label: 'Password', name: 'password' }} type="password" />
							<FormErrorMessage />
							<div className="flex flex-col items-end justify-center mt-1">
								<div className="text-sm">
									<Link href={'./'} legacyBehavior>
										<a className="font-medium text-indigo-600 hover:text-indigo-500">
											Forgot your password?
										</a>
									</Link>
								</div>
							</div>
							<div className="flex flex-col items-center space-y-4">
								<button
									type="submit"
									className="flex justify-center px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700"
								>
									Sign in
								</button>

								<div className="space-x-1 text-sm">
									<span className="">Don&apos;t have account yet?</span>
									<Link href={routes.registerUrl} legacyBehavior>
										<a className="font-medium text-indigo-600 underline hover:text-indigo-500">
											Register here!
										</a>
									</Link>
								</div>
							</div>
						</form>
					</FormWrapper>
				</div>
			</div>
		</div>
	);
};

export default Login;
