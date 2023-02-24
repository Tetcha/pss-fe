import { CheckCircleFilled, CheckOutlined, EditFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import { FormWrapper, InputRadioGroup, TextField } from 'src/components/Input';
import InputDatePicker from 'src/components/Input/InputDatePicker';
import { ROUTES_URL } from 'src/constants/routes';
import { useUpdateStudent } from 'src/hooks/auth';
import { StudentUpdateDTO, StudentUpdateForm } from 'src/interface/auth';
import { BookingHistoryListFilter } from 'src/interface/booking';
import { Gender } from 'src/interface/common';
import { useStoreUser } from 'src/store';
import BookingHistory from '../Booking/BookingHistory';

interface StudentProfileProps {
	filters: Partial<BookingHistoryListFilter>;
}

const defaultValues: StudentUpdateForm = {
	name: '',
	studentCode: '',
	email: '',
	gender: Gender.MALE,
	birthday: moment('2000-01-01'),
	phone: '',
};

const StudentProfile: React.FunctionComponent<StudentProfileProps> = ({ filters }) => {
	const methods = useForm<StudentUpdateForm>({ defaultValues });

	const { mutateUpdate, isSuccess } = useUpdateStudent();

	const { name, studentCode, email, gender, birthday, phone, avatar, balance } = useStoreUser();

	//check value first
	React.useEffect(() => {
		methods.reset({
			name,
			studentCode,
			email,
			gender: gender ? gender : Gender.MALE,
			birthday: birthday ? moment(birthday) : moment('2000-01-01'),
			phone,
		});
	}, [methods, birthday, email, gender, name, phone, studentCode]);

	const handleOnSubmit = async (data: StudentUpdateForm) => {
		const { birthday, ...other } = data;

		const payload: StudentUpdateDTO = {
			...other,
			birthday: birthday.format('YYYY-MM-DD'),
		};
		mutateUpdate(payload);
	};

	// React.useEffect(() => {
	// 	methods.setValue('name', name);
	// 	methods.setValue('studentCode', studentCode);
	// 	methods.setValue('email', email);
	// 	methods.setValue('gender', gender);
	// 	methods.setValue('birthday', moment(birthday));
	// 	methods.setValue('phone', phone);
	// }, [methods, birthday, email, gender, name, phone, studentCode]);

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Update profile successfully');
		}
	}, [isSuccess]);

	return (
		<>
			<div className="h-full px-2 py-5 w-full flex flex-col justify-center items-center">
				<div className="w-full h-[250px]">
					<LazyLoadImage
						src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
						className="w-full h-full rounded-tl-lg rounded-tr-lg"
					/>
				</div>
				<div className="bg-white rounded-lg shadow-xl pb-8 w-full max-w-container">
					<div className="flex flex-col items-center -mt-20">
						<LazyLoadImage
							src={
								avatar
									? avatar
									: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
							}
							className="w-40 border-4 border-white rounded-full"
						/>
						<div className="flex items-center justify-center space-x-2 mt-2">
							<div className="text-2xl">{name}</div>
							<CheckCircleFilled
								type="icon"
								style={{
									fontSize: '16px',
									color: '#08c',
									marginBottom: '-6px',
								}}
							/>
						</div>
						<p className="text-gray-700">Student At FPT University</p>
						<p className="text-sm text-gray-500">Thu Duc, HCM City</p>
					</div>
					<div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
						<div className="flex items-center space-x-4 mt-2">
							<Link
								href={ROUTES_URL.DOCTORS}
								className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 cursor-pointer border-none"
								type="submit"
							>
								<SearchOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
								<span>Doctors</span>
							</Link>
						</div>
					</div>
					<div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2"></div>
					<div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
						<div className="w-full flex flex-col 2xl:w-1/3">
							<div className="flex-1 bg-white rounded-lg shadow-xl p-8">
								<h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
								<FormWrapper methods={methods}>
									<form
										onSubmit={methods.handleSubmit(handleOnSubmit)}
										className="mt-2 text-gray-700"
									>
										<li className="flex border-y py-2">
											<TextField commonField={{ label: 'Full Name:', name: 'name' }} type="text" />
										</li>
										<li className="flex border-y py-2">
											<TextField
												commonField={{ label: 'Student Code:', name: 'studentCode' }}
												type="text"
											/>
										</li>
										<li className="flex border-y py-2">
											<TextField commonField={{ label: 'Email:', name: 'email' }} type="text" />
										</li>
										<li className="flex border-y py-2">
											<InputRadioGroup<string>
												commonField={{
													name: 'gender',
													label: 'GENDER',
												}}
												options={[
													{
														label: 'Male',
														value: Gender.MALE,
													},
													{
														label: 'Female',
														value: Gender.FEMALE,
													},
													{
														label: 'Others',
														value: Gender.OTHERS,
													},
												]}
											/>
										</li>
										<li className="flex border-y py-2">
											<InputDatePicker commonField={{ name: 'birthday', label: 'Birthday' }} />
										</li>
										<li className="flex border-y py-2">
											<TextField
												commonField={{ label: 'Phone Number:', name: 'phone' }}
												type="phone"
											/>
										</li>
										<li className="flex border-y py-2">
											<TextField
												commonField={{ label: 'Balance:', name: 'balance' }}
												type="phone"
												value={balance + ' VND'}
											/>
										</li>
										<div className="flex items-center justify-end space-x-4 mt-2">
											<button
												className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 cursor-pointer border-none"
												type="submit"
											>
												<CheckOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
												<span>Save</span>
											</button>
										</div>
									</form>
								</FormWrapper>
							</div>
						</div>
						<div className="flex flex-col w-full 2xl:w-2/3">
							<BookingHistory filters={filters} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentProfile;
