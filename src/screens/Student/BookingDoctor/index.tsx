import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { getSlots } from 'src/api/slot';
import { FormWrapper, InputSelect, TextareaField, TextField } from 'src/components/Input';
import InputDatePicker from 'src/components/Input/InputDatePicker';
import { useModalContext } from 'src/contexts/ModalContext';
import { useStudentBooking } from 'src/hooks/booking';
import { StudentBookingDTO, StudentBookingForm } from 'src/interface/booking';
import { DoctorInfo } from 'src/interface/doctor';
import { SlotForm } from 'src/interface/slot';
import { Doctor } from 'src/models/doctor';
// import { StudentBookingForm } from 'src/interface/student';
import { Slot } from 'src/models/slot';
import { useStoreUser } from 'src/store';

interface BookingDoctorProps {
	doctor?: Doctor;
	slot?: SlotForm;
}

const values: StudentBookingDTO = {
	name: '',
	date: moment('2000-01-01'),
	nameDoctor: '',
	slotId: '',
	question: '',
};

const BookingDoctor: React.FunctionComponent<BookingDoctorProps> = ({ doctor, slot }) => {
	const methods = useForm<StudentBookingDTO>({ values });
	const { handleCloseModal, modal } = useModalContext();
	const { BookingDoctor } = modal;
	const [isVisible, setIsVisible] = React.useState(BookingDoctor.isOpen);
	const { name } = useStoreUser();

	console.log('Slot: ', slot);

	React.useEffect(() => {
		methods.reset({
			name,
			nameDoctor: doctor?.name,
			date: slot?.date ? slot?.date : moment('2000-01-01'),
			slotId: slot?.slots,
			question: '',
		});
	}, [methods, name, slot?.date, doctor?.name, slot?.slots]);

	const { mutateStudentBooking, isSuccess } = useStudentBooking();

	const handleOnSubmit = async (data: StudentBookingDTO) => {
		console.log('Data: ', data);
		const { slotId } = data;
		console.log('SlotId: ', slotId);
		const payload: StudentBookingForm = {
			slotId,
		};
		mutateStudentBooking(payload);
	};

	React.useEffect(() => {
		if (isSuccess) {
			setIsVisible(false);
		}
	}, [isSuccess]);

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
						<InputDatePicker commonField={{ name: 'date', label: 'Date:' }} />
						<InputSelect
							commonField={{
								label: 'Select Slot:',
								name: 'slotId',
							}}
							options={slot?.slots.map((item: any) => ({
								label: `${item.startTime} - ${item.endTime}`,
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
