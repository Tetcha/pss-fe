import LoginAdmin from 'src/screens/Admin/LoginAdmin';
import { GetCurrentAdminWrapper } from 'src/components/wrappers';
import { RouterUnAuthAdminProtectionWrapper } from 'src/components/wrappers/routerUnAuthAdminProtectionWrapper';

export default function LoginAdminPage() {
	return (
		<>
			<GetCurrentAdminWrapper>
				<RouterUnAuthAdminProtectionWrapper>
					<LoginAdmin />
				</RouterUnAuthAdminProtectionWrapper>
			</GetCurrentAdminWrapper>
		</>
	);
}
