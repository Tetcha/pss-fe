import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormErrorMessage, FormWrapper, InputRadioGroup, TextField } from 'src/components/Input';
import InputDatePicker from 'src/components/Input/InputDatePicker';
import { ROUTES_URL } from 'src/constants/routes';
import { useUpdateDoctor } from 'src/hooks/doctor';
import { Gender } from 'src/interface/common';
import { DoctorUpdateDTO, DoctorUpdateForm } from 'src/interface/doctor';
import { store, useStoreDoctor } from 'src/store';
import { doctorThunk } from 'src/store/doctor/thunks';
import { fileHelper } from 'src/utils';

interface DoctorMeProps {}

const defaultValues: DoctorUpdateForm = {
	name: '',
	birthday: moment('1990-01-01'),
	briefInfo: '',
	gender: Gender.MALE,
	phone: '',
};

const DoctorMe: React.FunctionComponent<DoctorMeProps> = () => {
	const methods = useForm<DoctorUpdateForm>({ defaultValues });
	const [previewAvatarUrl, setPreviewAvatarUrl] = React.useState<string>('');
	const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

	const { mutateUpdate, isSuccess } = useUpdateDoctor();

	const { avatar, birthday, briefInfo, gender, name, phone } = useStoreDoctor();

	React.useEffect(() => {
		methods.reset({
			name,
			birthday: moment(birthday),
			briefInfo,
			phone,
			gender,
			image: null,
		});
		setPreviewAvatarUrl(avatar);
	}, [avatar, birthday, briefInfo, gender, name, phone, methods]);

	React.useEffect(() => {
		if (avatarFile) setPreviewAvatarUrl(URL.createObjectURL(avatarFile));
		return () => {
			URL.revokeObjectURL(previewAvatarUrl);
		};
	}, [avatarFile]);

	const _onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			fileHelper.checkFileType(file, () => {
				setAvatarFile(file);
			});
		}
	};

	const handleOnSubmit = async (form: DoctorUpdateForm) => {
		if (avatarFile) form.image = avatarFile;

		const { birthday, ...other } = form;
		const data: DoctorUpdateDTO = {
			...other,
			birthday: birthday.format('YYYY-MM-DD'),
		};

		mutateUpdate(data);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Update profile successfully');
			store.dispatch(doctorThunk.getCurrentDoctor());
		}
	}, [isSuccess]);

	return (
		<>
			<div className="flex flex-col justify-center flex-1 py-12 sm:px-6 lg:px-8 intro-y">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-0 text-3xl font-extrabold text-center text-gray-900">Doctor Profile</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex flex-col gap-5 px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
						<FormWrapper methods={methods}>
							<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
								<div className="flex justify-center">
									<div className="relative w-20 h-20 ">
										<input
											type={'file'}
											hidden
											id="avatarId"
											onChange={(e) => _onChangeAvatar(e)}
										/>
										<label
											htmlFor="avatarId"
											className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium text-center text-white duration-200 rounded-full opacity-0 bg-gray-400/70 hover:opacity-100"
										>
											Upload Avatar
										</label>
										<img
											className="w-full h-full rounded-full"
											src={previewAvatarUrl || `https://ui-avatars.com/api/?name=${name}`}
										/>
									</div>
								</div>
								<TextField commonField={{ name: 'name', label: 'Fullname' }} />
								<InputDatePicker commonField={{ name: 'birthday', label: 'Birthday' }} />
								<TextField commonField={{ name: 'briefInfo', label: 'Brief Info' }} />
								<InputRadioGroup
									commonField={{ name: 'gender', label: 'Sex' }}
									options={[
										{ label: 'Male', value: Gender.MALE },
										{ label: 'Female', value: Gender.FEMALE },
									]}
								/>
								<TextField commonField={{ name: 'phone', label: 'Phone number' }} />
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

export default DoctorMe;
