import * as React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';

import { FormErrorMessage, FormWrapper, InputRadioGroup, TextField } from 'src/components/Input';
import InputDatePicker from 'src/components/Input/InputDatePicker';
import { ROUTES_URL } from 'src/constants/routes';
import { useAddDoctor } from 'src/hooks/doctor';
import { Gender } from 'src/interface/common';
import { AddDoctorDTO, AddDoctorForm } from 'src/interface/doctor';

interface AddDoctorProps {}

const defaultValues: AddDoctorForm = {
	birthday: moment('2000-01-01'),
	email: '',
	gender: Gender.MALE,
	name: '',
	phone: '',
	password: '',
	confirmPassword: '',
};

const AddDoctor: React.FunctionComponent<AddDoctorProps> = () => {
	const methods = useForm<AddDoctorForm>({
		defaultValues,
	});

	const router = useRouter();

	const { mutateAdd, isSuccess } = useAddDoctor();

	const handleOnSubmit = async (data: AddDoctorForm) => {
		const { birthday, ...propsData } = data;
		const dataPost: AddDoctorDTO = {
			birthday: birthday.format('YYYY-MM-DD'),
			...propsData,
		};

		mutateAdd(dataPost);
	};

	React.useEffect(() => {
		if (isSuccess) {
			methods.reset(defaultValues);
			router.push(ROUTES_URL.USER_DOCTORS);
		}
	}, [isSuccess]);

	return (
		<>
			<div className="flex flex-col justify-center flex-1 py-12 sm:px-6 lg:px-8 intro-y">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-0 text-3xl font-extrabold text-center text-gray-900">Add Doctor</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
						<FormWrapper methods={methods}>
							<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
								<div className="flex justify-center">
									{/* <img className="h-36 w-36" src={'https://fuquiz.s3.ap-southeast-1.amazonaws.com/avatar-among-us-3.png'} /> */}
								</div>
								<TextField commonField={{ name: 'name', label: 'Fullname' }} />
								<TextField commonField={{ name: 'email', label: 'Email' }} />
								<TextField commonField={{ name: 'password', label: 'Password' }} type="password" />
								<TextField
									commonField={{ name: 'confirmPassword', label: 'Confirm password' }}
									type="password"
								/>
								<TextField commonField={{ name: 'phone', label: 'Phone number' }} />
								<InputDatePicker commonField={{ name: 'birthday', label: 'Birthday' }} />
								<InputRadioGroup
									commonField={{ name: 'gender', label: 'Sex' }}
									options={[
										{ label: 'Male', value: Gender.MALE },
										{ label: 'Female', value: Gender.FEMALE },
										{
											label: 'Others',
											value: Gender.OTHERS,
										},
									]}
								/>

								<FormErrorMessage />
								<div className="flex space-x-2">
									<Link href={ROUTES_URL.USER_DOCTORS}>
										<div className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
											Cancel
										</div>
									</Link>
									<button
										type="submit"
										className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Add Doctor
									</button>
								</div>
							</form>
						</FormWrapper>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddDoctor;
