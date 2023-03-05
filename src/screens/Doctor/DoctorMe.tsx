import { EditOutlined } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ROUTES_URL } from 'src/constants/routes';
import { Gender } from 'src/interface/common';
import { DoctorUpdateForm } from 'src/interface/doctor';
import { useStoreDoctor } from 'src/store';

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
	const { avatar, birthday, briefInfo, gender, name, phone, balance, username } = useStoreDoctor();

	const category = [
		{
			id: 1,
			name: 'Dentist',
		},
		{
			id: 2,
			name: 'Dermatologist',
		},
		{
			id: 3,
			name: 'Gynecologist',
		},
		{
			id: 4,
			name: 'Pediatrician',
		},
		{
			id: 5,
			name: 'Psychiatrist',
		},
		{
			id: 6,
			name: 'Surgeon',
		},
		{
			id: 7,
			name: 'Urologist',
		},
		{
			id: 8,
			name: 'Ophthalmologist',
		},
		{
			id: 9,
			name: 'Cardiologist',
		},
	];

	const randColor = () => {
		return (
			'#' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0')
				.toUpperCase()
		);
	};

	return (
		<>
			<div className="w-full mx-auto loopple-min-height-10vh text-slate-500">
				<div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4">
					<div className="flex flex-wrap -mx-3">
						<div className="flex-none w-auto max-w-full px-3">
							<div className="text-size-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200 h-[100px] object-cover w-[100px]">
								<LazyLoadImage
									src={
										avatar
											? avatar
											: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=32`
									}
									className="w-full shadow-soft-sm rounded-xl"
								></LazyLoadImage>
							</div>
						</div>
						<div className="flex-none w-auto max-w-full px-3 my-auto">
							<div className="h-full flex flex-col gap-1">
								<h5 className="mb-1 text-xl uppercase">{username}</h5>
								<p className="mb-0 font-semibold leading-normal text-base">
									{briefInfo ? briefInfo : 'Chuyên gia tư vấn tâm lý '}
								</p>
							</div>
						</div>
						<div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12" />
					</div>
				</div>
				<div className="w-full mt-6 mx-auto removable">
					<div className="flex flex-wrap -mx-3">
						<div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4">
							<div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
								<div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
									<div className="flex flex-wrap -mx-3">
										<div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
											<h6 className="mb-0 text-xl font-bold">Profile Information</h6>
										</div>
										<div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
											<a href="javascript:;" data-target="tooltip_trigger" data-placement="top">
												<i
													className="leading-normal fas fa-user-edit text-size-sm text-slate-400"
													aria-hidden="true"
												/>
											</a>
											<div
												data-target="tooltip"
												className="px-2 py-1 text-center text-white bg-black rounded-lg text-size-sm hidden"
												role="tooltip"
												data-popper-placement="top"
												style={{
													position: 'absolute',
													inset: 'auto auto 0px 0px',
													margin: 0,
													transform: 'translate3d(869.5px, -417.5px, 0px)',
												}}
											>
												Edit Profile
												<div
													className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
													data-popper-arrow=""
													style={{
														position: 'absolute',
														left: 0,
														transform: 'translate3d(0px, 0px, 0px)',
													}}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex-auto p-4">
									<p className="leading-normal text-size-sm">
										Hi, I&amp;m Alec Thompson, Decisions: If you can&amp;t decide, the answer is no.
										If two equally difficult paths, choose the one more painful in the short term
										(pain avoidance is creating an illusion of equality).
									</p>
									<hr className="h-px my-6 bg-transparent bg-gradient-horizontal-light" />
									<ul className="flex flex-col pl-0 mb-0 rounded-lg">
										<li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
											<strong className="text-slate-700">Doctor:</strong> &nbsp;{name}
										</li>
										<li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
											<strong className="text-slate-700">Mobile:</strong> &nbsp;{' '}
											{phone.replace(/^0/, '(+84) ').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}
										</li>
										<li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
											<strong className="text-slate-700">BirthDay:</strong> &nbsp;
											{moment(birthday).format('YYYY-MM-DD')}
										</li>
										<li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
											<strong className="text-slate-700">Gender:</strong> &nbsp; {gender}
										</li>
										<li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
											<strong className="text-slate-700">Balance:</strong> &nbsp;
											{balance.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
										</li>
										<div className="flex items-center justify-end space-x-4 mt-2">
											<Link
												href={ROUTES_URL.DOCTOR_UPDATE}
												className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 cursor-pointer border-none"
												type="button"
											>
												<EditOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
												<span>Update Profile</span>
											</Link>
										</div>
									</ul>
								</div>
							</div>
						</div>
						<div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4">
							<div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border p-4 gap-4">
								<div className="bg-white border-b-0 rounded-t-2xl">
									<h6 className="mb-0 text-xl font-bold">Skills</h6>
								</div>
								<Space size={[0, 8]} wrap>
									{category.map(
										(item) =>
											item && (
												<Tag color={randColor()} key={item.id} className="font-semibold">
													# {item.name}
												</Tag>
											),
									)}
								</Space>
							</div>
						</div>
						<div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4">
							<div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border p-4 gap-4">
								<div className="bg-white border-b-0 rounded-t-2xl">
									<h6 className="mb-0 text-xl font-bold">Skills</h6>
								</div>
								<Space size={[0, 8]} wrap>
									{category.map(
										(item) =>
											item && (
												<Tag color={randColor()} key={item.id} className="font-semibold">
													# {item.name}
												</Tag>
											),
									)}
								</Space>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DoctorMe;
