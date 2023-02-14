import Head from 'next/head';

import { GetCurrentAdminWrapper } from 'src/components/wrappers';
import { RouterUnAuthAdminProtectionWrapper } from 'src/components/wrappers/routerUnAuthAdminProtectionWrapper';
import LoginDoctor from 'src/screens/Doctor/LoginDoctor';

export default function LoginAdminPage() {
	return (
		<>
			<GetCurrentAdminWrapper>
				<RouterUnAuthAdminProtectionWrapper>
					<Head>
						<title>Login</title>
						<meta name="description" content="Generated by create next app" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<LoginDoctor />
				</RouterUnAuthAdminProtectionWrapper>
			</GetCurrentAdminWrapper>
		</>
	);
}
