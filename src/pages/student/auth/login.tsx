import Head from 'next/head';

import Login from 'src/components/Student/Auth/Login';
import { GetCurrentUserWrapper, RouterProtectionWrapper } from 'src/components/wrappers';

export default function LoginPage() {
	return (
		<>
			<Head>
				<title>Login</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<GetCurrentUserWrapper>
				<RouterProtectionWrapper>
					<Login />
				</RouterProtectionWrapper>
			</GetCurrentUserWrapper>
		</>
	);
}