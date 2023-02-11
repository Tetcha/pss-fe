import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { FormErrorMessage, FormWrapper, TextField } from 'src/components/Input';
import { ROUTES_URL } from 'src/constants/routes';
import { useUpdateAdminPassword } from 'src/hooks/admin';
import { AdminPasswordDTO, AdminPasswordForm } from 'src/interface/admin';

interface AdminPasswordProps {}

const defaultValues: AdminPasswordForm = {
	confirmPassword: '',
	password: '',
};

const AdminPassword: React.FunctionComponent<AdminPasswordProps> = () => {
	const methods = useForm<AdminPasswordForm>({
		defaultValues,
	});

	const { mutateUpdatePassword, isSuccess } = useUpdateAdminPassword();

	const handleOnSubmit = async (data: AdminPasswordForm) => {
		const payload: AdminPasswordDTO = {
			password: data.password,
			confirmPassword: data.confirmPassword,
		};

		mutateUpdatePassword(payload);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Update password successfully');
		}
	}, [isSuccess]);

	return (
		<>
			<div className="flex flex-col justify-center flex-1 py-12 sm:px-6 lg:px-8 intro-y">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-0 text-3xl font-extrabold text-center text-gray-900">Admin Password</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex flex-col gap-5 px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
						<FormWrapper methods={methods}>
							<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
								<TextField commonField={{ name: 'password', label: 'Password' }} type="password" />
								<TextField
									commonField={{ name: 'confirmPassword', label: 'Confirm Password' }}
									type="password"
								/>

								<FormErrorMessage />
								<div className="flex space-x-2">
									<button
										type="submit"
										className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Save
									</button>
								</div>
							</form>
						</FormWrapper>
						<Link href={ROUTES_URL.ADMIN_ME}>
							<button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Change Profile
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminPassword;
