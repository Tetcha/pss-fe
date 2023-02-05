import * as React from 'react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { FormWrapper } from 'src/components/Input';
import { useLogin } from 'src/hooks/auth';

import { auth } from '../../../config/firebase';
// import { authLogin } from './action';
import { AuthLoginDto } from './interface';

const defaultValues: AuthLoginDto = {
	accessToken: '',
};

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const methods = useForm<AuthLoginDto>({
		defaultValues,
	});

	const router = useRouter();
	const { mutateLogin, isSuccess } = useLogin();

	const handleOnSubmit = async (data: AuthLoginDto) => {
		mutateLogin(data);
	};

	React.useEffect(() => {
		if (isSuccess) {
			router.push('/student');
		}
	}, [isSuccess]);

	const googleAuth = new GoogleAuthProvider();
	// const [postToken, { status, data, error }] = useMutation(postAccessToken);

	const handleGoogleLogin = async () => {
		const res = await signInWithPopup(auth, googleAuth);
		console.log('respond', res);
		res.user.getIdToken().then((token) => {
			console.log('token', token);
			const studentData: AuthLoginDto = {
				accessToken: token,
			};
			handleOnSubmit(studentData);
		});
	};

	const facebookAuth = new FacebookAuthProvider();
	const handleFacebookLogin = async () => {
		const res = await signInWithPopup(auth, facebookAuth);
		console.log('respond', res);
	};
	return (
		<div className="flex flex-col justify-center w-full min-h-full py-12 intro-y sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-3xl font-extrabold text-center text-gray-900">Auth Login</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					<FormWrapper methods={methods}>
						<div className="flex flex-col items-center space-y-4">
							<button
								onClick={handleGoogleLogin}
								className="flex justify-center px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 cursor-pointer"
							>
								Login With Google
							</button>
							<button
								onClick={handleFacebookLogin}
								className="flex justify-center px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 cursor-pointer"
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
