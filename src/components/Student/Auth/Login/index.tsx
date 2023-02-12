import * as React from 'react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { FormWrapper } from 'src/components/Input';
import { auth } from 'src/config/firebase';
import { useLogin } from 'src/hooks/auth';

// import { authLogin } from './action';
import { LoginTokenPayload } from './interface';

const defaultValues: LoginTokenPayload = {
	accessToken: '',
};

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const methods = useForm<LoginTokenPayload>({
		defaultValues,
	});

	const router = useRouter();
	const { mutateLogin, isSuccess } = useLogin();

	const handleOnSubmit = async (data: LoginTokenPayload) => {
		mutateLogin(data);
	};

	React.useEffect(() => {
		if (isSuccess) {
			router.push('/student/me');
		}
	}, [isSuccess]);

	const googleAuth = new GoogleAuthProvider();

	const handleGoogleLogin = async () => {
		try {
			const res = await signInWithPopup(auth, googleAuth);
			res.user.getIdToken().then((token) => {
				const payload: LoginTokenPayload = {
					accessToken: token,
				};
				handleOnSubmit(payload);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const facebookAuth = new FacebookAuthProvider();
	facebookAuth.addScope('email');
	const handleFacebookLogin = async () => {
		const res = await signInWithPopup(auth, facebookAuth);
		res.user.getIdToken().then((token) => {
			const payload: LoginTokenPayload = {
				accessToken: token,
			};
			handleOnSubmit(payload);
		});
	};

	return (
		<div className="flex flex-col justify-center w-full min-h-screen py-12 intro-y sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-3xl font-extrabold text-center text-gray-900">Auth Login</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					<FormWrapper methods={methods}>
						<div className="flex flex-col items-center space-y-4">
							<button
								onClick={handleGoogleLogin}
								className="flex justify-center px-6 py-2.5 text-white border-none font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 cursor-pointer"
							>
								Login With Google
							</button>
							<button
								onClick={handleFacebookLogin}
								className="flex justify-center px-6 py-2.5 border-none text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 cursor-pointer"
							>
								Login With Facebook
							</button>
						</div>
					</FormWrapper>
				</div>
			</div>
		</div>
	);
};

export default Login;
