import * as React from 'react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { FormErrorMessage, FormWrapper, TextField } from 'src/components/Input';
import { routes } from 'src/components/routes';
import { store } from 'src/store';
import { apiActions } from 'src/store/api';

import { authRegister, AuthRegisterDto } from './action';

const defaultValues: AuthRegisterDto = {
	password: '',
	email: '',
	confirmPassword: '',
	name: '',
};

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	// const router = useRouter();
	const methods = useForm<AuthRegisterDto>({
		defaultValues,
	});

	React.useEffect(() => {
		store.dispatch(apiActions.resetState());
		return () => {};
	}, []);

	const handleOnSubmit = async (data: AuthRegisterDto) => {
		const res = await authRegister(data);
		if (res) {
			// router.push(routes.loginUrl);
			console.log('data', data);
		}
	};

	return (
		<FormWrapper methods={methods}>
			<FormErrorMessage />
			<div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
						Register
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={methods.handleSubmit(handleOnSubmit)}>
							<TextField commonField={{ label: 'Email', name: 'email' }} />
							<TextField commonField={{ label: 'Name', name: 'name' }} />
							<TextField commonField={{ label: 'Password', name: 'password' }} type="password" />
							<TextField
								commonField={{ label: 'Confirm Password', name: 'confirmPassword' }}
								type="password"
							/>
							<div className="flex flex-col items-center space-y-4">
								<button
									type="submit"
									className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Register
								</button>
								<div className="space-x-1 text-sm">
									<span className="">Already have an account?</span>
									<Link href={routes.loginUrl} legacyBehavior>
										<a className="font-medium text-indigo-600 underline hover:text-indigo-500">
											Login here
										</a>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</FormWrapper>
	);
};

export default Register;
