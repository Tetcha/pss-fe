import * as React from 'react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from 'src/config/firebase';
import { useLogin } from 'src/hooks/auth';

// import { authLogin } from './action';
import { LoginTokenPayload } from './interface';
import { toast } from 'react-toastify';
import { ROUTES_URL } from 'src/constants/routes';
import Image from 'next/image';

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
			router.push(ROUTES_URL.STUDENT_ME);
		}
	}, [isSuccess, router]);

	const googleAuth = new GoogleAuthProvider();

	const handleGoogleLogin = async () => {
		try {
			const res = await signInWithPopup(auth, googleAuth);
			console.log(res.user);
			// console.log(res.user.email);
			res.user.getIdToken().then((token) => {
				console.log('token', token);
				const payload: LoginTokenPayload = {
					accessToken: token,
				};
				handleOnSubmit(payload);
			});
		} catch (error) {
			toast.error('Try Again!!!');
		}
	};

	const facebookAuth = new FacebookAuthProvider();
	const handleFacebookLogin = async () => {
		try {
			const res = await signInWithPopup(auth, facebookAuth);
			res.user.getIdToken().then((token) => {
				const payload: LoginTokenPayload = {
					accessToken: token,
				};
				facebookAuth.addScope('email');
				console.log(res.user);
				handleOnSubmit(payload);
			});
		} catch (error) {
			toast.error('Try Again!!!');
		}
	};

	return (
		<div className="flex flex-col justify-center w-full min-h-screen py-12 intro-y sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-3xl font-extrabold text-center text-gray-900">Auth Login</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					<div className="flex flex-col items-center space-y-4">
						<button
							onClick={handleGoogleLogin}
							className="flex justify-center items-center px-6 py-2.5 text-black border-none font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-800 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r cursor-pointer gap-2"
						>
							<Image src="/assets/images/login/gg.webp" alt="image banner" width="20" height="20" />
							Login With Google
						</button>
						<button
							onClick={handleFacebookLogin}
							className="flex justify-center items-center px-6 py-2.5 text-black border-none font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r cursor-pointer gap-2"
						>
							<Image src="/assets/images/login/fb.webp" alt="image banner" width="20" height="20" />
							Login With Facebook
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
