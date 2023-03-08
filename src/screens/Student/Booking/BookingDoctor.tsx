import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Input, Modal } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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

const defaultValues: StudentBookingDTO = {
	name: '',
	date: moment('2000-01-01'),
	nameDoctor: '',
	slotId: '',
	questionContent: [{}],
};

const BookingDoctor: React.FunctionComponent<BookingDoctorProps> = ({ doctor, slot }) => {
	const methods = useForm<StudentBookingDTO>({ defaultValues });
	const { control } = useForm({ defaultValues });
	const { handleCloseModal, modal } = useModalContext();
	const { BookingDoctor } = modal;
	const [isVisible, setIsVisible] = React.useState(BookingDoctor.isOpen);
	const { name } = useStoreUser();

	React.useEffect(() => {
		methods.reset({
			name,
			nameDoctor: doctor?.name,
			date: slot?.date ? slot?.date : moment('2000-01-01'),
			slotId: '',
			questionContent: [],
		});
	}, [methods, name, slot?.date, doctor?.name, slot?.slots, slot]);
	// @ts-ignore
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questionContent',
	});

	const { mutateStudentBooking, isSuccess } = useStudentBooking();

	const handleOnSubmit = async (data: StudentBookingDTO) => {
		const { slotId } = data;
		const payload: StudentBookingForm = {
			slotId,
			//@ts-ignore
			questionContent: data?.questionContent[0]?.questionContent
				? data.questionContent?.map((item) => item.questionContent)
				: [],
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
						<InputDatePicker commonField={{ name: 'date', label: 'Date:' }} disable={true} />
						<InputSelect
							commonField={{
								label: 'Select Slot:',
								name: 'slotId',
							}}
							options={slot?.slots
								.filter((item: any) => !item.booking[0])
								.map((item: any) => ({
									label: `${item.startTime.toUpperCase()} - ${item.endTime.toUpperCase()}`,
									value: item.id,
								}))}
							className="w-full"
						/>
						<label className="block text-sm font-medium text-gray-700 capitalize sm:mt-px">
							Question:
						</label>
						{fields.map((field, index) => {
							return (
								<div className="flex flex-row gap-2" key={field.id}>
									<TextField commonField={{ name: `questionContent.${index}.questionContent` }} />
									<button
										type="button"
										className="inline-flex items-center justify-center gap-2 px-2 py-2 my-2 text-sm font-medium bg-red-500 border border-transparent rounded-sm shadow-sm cursor-pointer focus:outline-none"
										onClick={() => remove(index)}
									>
										<CloseCircleOutlined style={{ fontSize: '16px', color: '#ffffff' }} />
									</button>
								</div>
							);
						})}
						<button
							type="button"
							className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 my-2 text-sm font-medium text-gray-400 border border-transparent rounded-sm shadow-sm cursor-pointer focus:outline-none"
							onClick={() =>
								append({
									questionContent: '',
								})
							}
						>
							<PlusCircleOutlined style={{ fontSize: '16px', color: '#7f7f7f' }} /> Add Question
						</button>
					</form>
				</FormWrapper>
			</Modal>
		</>
	);
};

export default BookingDoctor;
