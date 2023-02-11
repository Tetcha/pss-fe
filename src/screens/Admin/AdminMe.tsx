import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { FormErrorMessage, FormWrapper, TextField } from 'src/components/Input';
import { ROUTES_URL } from 'src/constants/routes';
import { useUpdateAdmin } from 'src/hooks/admin';
import { AdminUpdateDTO, AdminUpdateForm } from 'src/interface/admin';
import { useStoreAdmin } from 'src/store';

interface AdminMeProps {}

const defaultValues: AdminUpdateForm = {
	name: '',
};

const AdminMe: React.FunctionComponent<AdminMeProps> = () => {
	const { name } = useStoreAdmin();

	const methods = useForm<AdminUpdateForm>({
		defaultValues,
	});

	const { mutateUpdate, isSuccess } = useUpdateAdmin();

	const handleOnSubmit = async (data: AdminUpdateForm) => {
		const payload: AdminUpdateDTO = {
			name: data.name,
		};

		mutateUpdate(payload);
	};

	React.useEffect(() => {
		methods.setValue('name', name);
	}, []);

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Update profile successfully');
		}
	}, [isSuccess]);

	return (
		<>
			<div className="flex flex-col justify-center flex-1 py-12 sm:px-6 lg:px-8 intro-y">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-0 text-3xl font-extrabold text-center text-gray-900">Admin Profile</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex flex-col gap-5 px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
						<FormWrapper methods={methods}>
							<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
								<TextField commonField={{ name: 'name', label: 'Fullname' }} />

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
						<Link href={ROUTES_URL.ADMIN_PASSWORD}>
							<button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Change Password
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminMe;
