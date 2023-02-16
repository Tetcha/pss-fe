import { CheckCircleFilled, CheckOutlined, EditFilled } from '@ant-design/icons';
import moment from 'moment';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import { FormWrapper, InputRadioGroup, TextField } from 'src/components/Input';
import InputDatePicker from 'src/components/Input/InputDatePicker';
import { useUpdateStudent } from 'src/hooks/auth';
import { StudentUpdatetDTO, StudentUpdateForm } from 'src/interface/auth';
import { Gender } from 'src/interface/common';
import { useStoreUser } from 'src/store';

interface StudentProfileProps {}

const defaultValues: StudentUpdateForm = {
	name: '',
	studentCode: '',
	email: '',
	gender: Gender.MALE,
	birthday: moment(),
	phone: '',
};

const StudentProfile: React.FunctionComponent<StudentProfileProps> = () => {
	const { name, studentCode, email, gender, birthday, phone, avatar, balance } = useStoreUser();

	const methods = useForm({
		defaultValues,
	});

	const { mutateUpdate, isSuccess } = useUpdateStudent();

	const handleOnSubmit = async (data: StudentUpdateForm) => {
		const payload: StudentUpdatetDTO = {
			name: data.name,
			studentCode: data.studentCode,
			email: data.email,
			gender: data.gender,
			birthday: data.birthday,
			phone: data.phone,
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
			methods.reset({
				name: name,
				studentCode: studentCode,
				email: email,
				gender: gender,
				birthday: moment(birthday),
				phone: phone,
			});
		}
	}, [isSuccess, methods, birthday, email, gender, name, phone, studentCode, methods]);

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
											<TextField
												commonField={{ label: 'Full Name:', name: 'name' }}
												type="text"
												defaultValue={name}
											/>
										</li>
										<li className="flex border-y py-2">
											<TextField
												commonField={{ label: 'Student Code:', name: 'studentCode' }}
												type="text"
												defaultValue={studentCode}
											/>
										</li>
										<li className="flex border-y py-2">
											<TextField
												commonField={{ label: 'Email:', name: 'email' }}
												type="text"
												defaultValue={email}
											/>
										</li>
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

										<li className="flex border-y py-2">
											<InputDatePicker commonField={{ name: 'birthday', label: 'Birthday' }} />
										</li>
										<li className="flex border-y py-2">
											<TextField
												commonField={{ label: 'Phone Number:', name: 'phone' }}
												type="phone"
												placeholder={phone}
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
							<div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
								<h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
								<div className="relative px-4">
									<div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
									{/* start::Timeline item */}
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm">Profile informations changed.</p>
											<p className="text-xs text-gray-500">3 min ago</p>
										</div>
									</div>
									{/* end::Timeline item */}
									{/* start::Timeline item */}
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm">
												Connected with
												<a href="#" className="text-blue-600 font-bold">
													Colby Covington
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">15 min ago</p>
										</div>
									</div>
									{/* end::Timeline item */}
									{/* start::Timeline item */}
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm">
												Invoice
												<a href="#" className="text-blue-600 font-bold">
													#4563
												</a>
												was created.
											</p>
											<p className="text-xs text-gray-500">57 min ago</p>
										</div>
									</div>
									{/* end::Timeline item */}
									{/* start::Timeline item */}
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm">
												Message received from
												<a href="#" className="text-blue-600 font-bold">
													Cecilia Hendric
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">1 hour ago</p>
										</div>
									</div>
									{/* end::Timeline item */}
									{/* start::Timeline item */}
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm">
												New order received
												<a href="#" className="text-blue-600 font-bold">
													#OR9653
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">2 hours ago</p>
										</div>
									</div>
									{/* end::Timeline item */}
									{/* start::Timeline item */}
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm">
												Message received from
												<a href="#" className="text-blue-600 font-bold">
													Jane Stillman
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">2 hours ago</p>
										</div>
									</div>
									{/* end::Timeline item */}
								</div>
							</div>
						</div>
						<div className="flex flex-col w-full 2xl:w-2/3">
							<div className="flex-1 bg-white rounded-lg shadow-xl p-8">
								<h4 className="text-xl text-gray-900 font-bold">About</h4>
								<p className="mt-2 text-gray-700">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates
									obcaecati numquam error et ut fugiat asperiores. Sunt nulla ad incidunt
									laboriosam, laudantium est unde natus cum numquam, neque facere. Lorem ipsum dolor
									sit amet consectetur adipisicing elit. Ut, magni odio magnam commodi sunt ipsum
									eum! Voluptas eveniet aperiam at maxime, iste id dicta autem odio laudantium
									eligendi commodi distinctio!
								</p>
							</div>
							<div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
								<h4 className="text-xl text-gray-900 font-bold">Statistics</h4>
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
									<div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
										<div className="flex items-center justify-between">
											<span className="font-bold text-sm text-indigo-600">Total Revenue</span>
											<span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
												7 days
											</span>
										</div>
										<div className="flex items-center justify-between mt-6">
											<div>
												<svg
													className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1}
														d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<div className="flex items-end">
													<span className="text-2xl 2xl:text-3xl font-bold">$8,141</span>
													<div className="flex items-center ml-2 mb-1">
														<svg
															className="w-5 h-5 text-green-500"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
															/>
														</svg>
														<span className="font-bold text-sm text-gray-500 ml-0.5">3%</span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
										<div className="flex items-center justify-between">
											<span className="font-bold text-sm text-green-600">New Orders</span>
											<span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
												7 days
											</span>
										</div>
										<div className="flex items-center justify-between mt-6">
											<div>
												<svg
													className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1}
														d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<div className="flex items-end">
													<span className="text-2xl 2xl:text-3xl font-bold">217</span>
													<div className="flex items-center ml-2 mb-1">
														<svg
															className="w-5 h-5 text-green-500"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
															/>
														</svg>
														<span className="font-bold text-sm text-gray-500 ml-0.5">5%</span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
										<div className="flex items-center justify-between">
											<span className="font-bold text-sm text-blue-600">New Connections</span>
											<span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
												7 days
											</span>
										</div>
										<div className="flex items-center justify-between mt-6">
											<div>
												<svg
													className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1}
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<div className="flex items-end">
													<span className="text-2xl 2xl:text-3xl font-bold">54</span>
													<div className="flex items-center ml-2 mb-1">
														<svg
															className="w-5 h-5 text-green-500"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
															/>
														</svg>
														<span className="font-bold text-sm text-gray-500 ml-0.5">7%</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4">
									<canvas
										id="verticalBarChart"
										style={{
											display: 'block',
											boxSizing: 'border-box',
											height: 414,
											width: 828,
										}}
										width={1656}
										height={828}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentProfile;
