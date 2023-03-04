import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
	const { avatar, birthday, briefInfo, gender, name, phone } = useStoreDoctor();

	return (
		<>
			<div className="flex items-center">
				<div className="w-[400px] h-full">
					<LazyLoadImage src={avatar} className="object-cover w-full h-auto"></LazyLoadImage>
				</div>
				<ul className="mt-2 ml-2 text-gray-700">
					<li className="flex border-y py-2">
						<span className="font-bold w-32">Full name:</span>
						<span className="text-gray-700">{name}</span>
					</li>
					<li className="flex border-b py-2">
						<span className="font-bold w-32">Brief Information:</span>
						<span className="text-gray-700">{briefInfo}</span>
					</li>
					{/* <li className="flex border-b py-2">
						<span className="font-bold w-32">Email:</span>
						<span className="text-gray-700">{email}</span>
					</li> */}
					<li className="flex border-b py-2">
						<span className="font-bold w-32">Gender:</span>
						<span className="text-gray-700">{gender}</span>
					</li>
					<li className="flex border-b py-2">
						<span className="font-bold w-32">Birthday:</span>
						<span className="text-gray-700">{moment(birthday).format('YYYY-MM-DD')}</span>
					</li>
					<li className="flex border-b py-2">
						<span className="font-bold w-32">Phone Number</span>
						<span className="text-gray-700">{phone}</span>
					</li>
					{/* <li className="flex border-b py-2">
						<span className="font-bold w-32">Balance:</span>
						<span className="text-gray-700">{balance} VND</span>
					</li> */}
					<div className="flex items-center justify-end space-x-4 mt-2">
						<button
							className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 cursor-pointer border-none"
							type="button"
						>
							<EditOutlined type="icon" style={{ fontSize: '16px', color: '#fff' }} />
							<span>Update Profile</span>
						</button>
					</div>
				</ul>
			</div>
		</>
	);
};

export default DoctorMe;
