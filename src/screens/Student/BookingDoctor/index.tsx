import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { getSlots } from 'src/api/slot';
import { FormWrapper, InputSelect, TextareaField, TextField } from 'src/components/Input';
import InputDatePicker from 'src/components/Input/InputDatePicker';
import { useModalContext } from 'src/contexts/ModalContext';
import { DoctorInfo } from 'src/interface/doctor';
import { Doctor } from 'src/models/doctor';
// import { StudentBookingForm } from 'src/interface/student';
import { Slot } from 'src/models/slot';
import { useStoreUser } from 'src/store';

interface BookingDoctorProps {
	doctor?: Doctor;
}

// const values = {
// 	name: '',
// 	birthday: moment('2000-01-01'),
// 	nameDoctor: '',
// 	slot: '',
// 	question: '',
// };

const BookingDoctor: React.FunctionComponent<BookingDoctorProps> = ({ doctor }) => {
	console.log('doctor', doctor);
	const methods = useForm({});
	const { handleCloseModal, modal } = useModalContext();
	const { bookingDoctor } = modal;
	const [isVisible, setIsVisible] = React.useState(true);
	const { name, birthday } = useStoreUser();
	const handleOnSubmit = async (data: any) => {
		console.log(data);
	};

	const querySlots = useQuery<Slot[]>(
		['slots'],
		async () => {
			const { data } = await getSlots();

			return data;
		},
		{
			initialData: [],
		},
	);

	return (
		<>
			<Modal
				title="Booking Doctor"
				open={isVisible}
				onCancel={() => setIsVisible(false)}
				width={600}
				onOk={() => {
					methods.handleSubmit(handleOnSubmit)();
					setIsVisible(false);
				}}
				afterClose={() => handleCloseModal('BookingDoctor')}
			>
				<FormWrapper methods={methods}>
					<form onSubmit={methods.handleSubmit(handleOnSubmit)}>
						<TextField
							commonField={{ name: 'nameDoctor', label: 'Doctor In Charge:' }}
							value={doctor?.name}
						/>
						<TextField commonField={{ name: 'name', label: 'Name:' }} value={name} />
						{/* <InputDatePicker
							commonField={{ name: 'birthday', label: 'Birthday:' }}
							defaultValue={birthday}
						/> */}
						<InputSelect
							commonField={{
								label: 'Select Slot:',
								name: 'slot',
							}}
							options={querySlots.data.map((item) => ({
								label: `${item.name}: ${item.startTime} - ${item.endTime}`,
								value: item.id,
							}))}
							className="w-full"
						/>
						<TextareaField commonField={{ name: 'question', label: 'Question:' }} rows={5} />
					</form>
				</FormWrapper>
			</Modal>
		</>
	);
};

export default BookingDoctor;
