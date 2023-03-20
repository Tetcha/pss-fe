import {
	CheckCircleFilled,
	CheckOutlined,
	EditFilled,
	EditOutlined,
	RollbackOutlined,
	SearchOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

	const router = useRouter();

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Update profile successfully');
		}
	}, [isSuccess]);

	const [update, setUpdate] = React.useState(false);

	return (
		<>
			<div className="flex flex-col items-center justify-center w-full h-full px-2 py-5">
				<div className="w-full h-[250px]">
					<LazyLoadImage
						src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
						className="w-full h-full rounded-tl-lg rounded-tr-lg"
					/>
				</div>
				<div className="w-full pb-8 bg-white rounded-lg shadow-xl max-w-container">
					<div className="flex flex-col items-center -mt-20">
						<LazyLoadImage
							className="w-40 border-4 border-white rounded-full"
							src={
								avatar
									? avatar
									: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
							}
							alt=""
						/>

						<div className="flex items-center justify-center mt-2 space-x-2">
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
					{/* <div className="flex flex-col items-center justify-end flex-1 px-8 mt-2 lg:items-end">
						<div className="flex items-center mt-2 space-x-4">
							<Link
								href={ROUTES_URL.DOCTORS}
								className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-700"
								type="submit"
							>
								<SearchOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
								<span>Doctors</span>
							</Link>
						</div>
					</div> */}
					<div className="flex flex-col items-center justify-end flex-1 px-8 mt-2 lg:items-end"></div>
					<div className="flex flex-col my-4 space-y-4 2xl:flex-row 2xl:space-y-0 2xl:space-x-4">
						<div className="flex flex-col w-full 2xl:w-1/3">
							<div className="flex-1 p-8 bg-white rounded-lg shadow-xl">
								<h4 className="text-xl font-bold text-gray-900">Personal Info</h4>
								{update ? (
									<FormWrapper methods={methods}>
										<form
											onSubmit={methods.handleSubmit(handleOnSubmit)}
											className="mt-2 text-gray-700"
										>
											<li className="flex py-2 border-y">
												<TextField
													commonField={{ label: 'Full Name:', name: 'name' }}
													type="text"
												/>
											</li>
											<li className="flex py-2 border-y">
												<TextField
													commonField={{ label: 'Student Code:', name: 'studentCode' }}
													type="text"
												/>
											</li>
											<li className="flex py-2 border-y">
												<TextField commonField={{ label: 'Email:', name: 'email' }} type="text" />
											</li>
											<li className="flex py-2 border-y">
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
											<li className="flex py-2 border-y">
												<InputDatePicker commonField={{ name: 'birthday', label: 'Birthday' }} />
											</li>
											<li className="flex py-2 border-y">
												<TextField
													commonField={{ label: 'Phone Number:', name: 'phone' }}
													type="phone"
												/>
											</li>
											<div className="flex items-center justify-end mt-2 space-x-4">
												<button
													className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-700"
													type="submit"
												>
													<CheckOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
													<span>Save</span>
												</button>
												<button
													className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-700"
													type="button"
													onClick={() => setUpdate(!update)}
												>
													<RollbackOutlined
														type="icon"
														style={{ fontSize: '16px', color: '#fff' }}
													/>
													<span>Cancel</span>
												</button>
											</div>
										</form>
									</FormWrapper>
								) : (
									<ul className="mt-2 ml-2 text-gray-700">
										<li className="flex py-2 border-y">
											<span className="w-32 font-bold">Full name:</span>
											<span className="text-gray-700">{name}</span>
										</li>
										<li className="flex py-2 border-b">
											<span className="w-32 font-bold">Student Code:</span>
											<span className="text-gray-700">{studentCode}</span>
										</li>
										<li className="flex py-2 border-b">
											<span className="w-32 font-bold">Email:</span>
											<span className="text-gray-700">{email}</span>
										</li>
										<li className="flex py-2 border-b">
											<span className="w-32 font-bold">Gender:</span>
											<span className="text-gray-700">{gender}</span>
										</li>
										<li className="flex py-2 border-b">
											<span className="w-32 font-bold">Birthday:</span>
											<span className="text-gray-700">
												{birthday ? moment(birthday).format('YYYY-MM-DD') : ''}
											</span>
										</li>
										<li className="flex py-2 border-b">
											<span className="w-32 font-bold">Phone Number:</span>
											<span className="text-gray-700">{phone}</span>
										</li>
										<li className="flex py-2 border-b">
											<span className="w-32 font-bold">Balance:</span>
											<span className="text-gray-700">{balance} VND</span>
										</li>
										<div className="flex items-center justify-end mt-2 space-x-4">
											<button
												className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-700"
												type="button"
												onClick={() => router.push(ROUTES_URL.STUDENT_BALANCE)}
											>
												<WalletOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
												<span>Add Balance</span>
											</button>
											<button
												className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 border-none rounded cursor-pointer hover:bg-blue-700"
												type="button"
												onClick={() => setUpdate(!update)}
											>
												<EditOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
												<span>Update Profile</span>
											</button>
										</div>
									</ul>
								)}
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
