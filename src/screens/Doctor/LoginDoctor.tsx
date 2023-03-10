import * as React from 'react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormErrorMessage, FormWrapper, TextField } from 'src/components/Input';
import { useLoginDoctor } from 'src/hooks/doctor';
import { LoginPayload } from 'src/interface/auth';

const defaultValues: LoginPayload = {
	password: '',
	username: '',
};

interface LoginDoctorProps {
	redirectUrl: string;
}

const LoginDoctor: FunctionComponent<LoginDoctorProps> = ({ redirectUrl }) => {
	const methods = useForm<LoginPayload>({
		defaultValues,
	});

	const router = useRouter();
	const { mutateLogin, isSuccess } = useLoginDoctor();

	const handleOnSubmit = async (data: LoginPayload) => {
		mutateLogin(data);
	};

	React.useEffect(() => {
		if (isSuccess) {
			if (redirectUrl) router.push(redirectUrl);
			router.push('/doctor');
		}
	}, [isSuccess]);

	return (
		<div className="flex flex-col justify-center w-full min-h-screen py-12 intro-y sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-3xl font-semibold text-center text-gray-900">Doctor Login</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					<FormWrapper methods={methods}>
						<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
							<TextField commonField={{ label: 'Username', name: 'username' }} />
							<TextField commonField={{ label: 'Password', name: 'password' }} type="password" />
							<FormErrorMessage />

							<div className="flex flex-col items-center space-y-4">
								<button
									type="submit"
									className="flex justify-center px-6 py-2.5 border-none text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 cursor-pointer"
								>
									Sign in
								</button>
							</div>
						</form>
					</FormWrapper>
				</div>
			</div>
		</div>
	);
};

export default LoginDoctor;
