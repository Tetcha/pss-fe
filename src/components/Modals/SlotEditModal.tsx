import { Modal } from 'antd';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useModalContext } from 'src/contexts/ModalContext';
import { EditSlotDTO, EditMultiSlotForm, EditSlotForm } from 'src/interface/slots';
import { FormWrapper, InputCheckboxGroup } from '../Input';
import InputDatePicker from '../Input/InputDatePicker';

interface SlotEditModalProps {
	defaultValues?: EditSlotForm;
}

const dataExample = {
	date: ['2021-08-01', '2021-08-02'],
	slots: [
		{ label: 'Slot 1: 07:00 - 08:00', value: '1' },
		{ label: 'Slot 2: 08:00 - 09:00', value: '2' },
		{
			label: 'Slot 3: 09:00 - 10:00',
			value: '3',
		},
		{
			label: 'Slot 4: 10:00 - 11:00',
			value: '4',
		},
		{
			label: 'Slot 5: 11:00 - 12:00',
			value: '5',
		},
		{
			label: 'Slot 6: 12:00 - 13:00',
			value: '6',
		},
		{
			label: 'Slot 7: 13:00 - 14:00',
			value: '7',
		},
	],
};

const SlotEditModal: React.FunctionComponent<SlotEditModalProps> = ({ defaultValues }) => {
	const { handleCloseModal, modal } = useModalContext();
	const { slotEdit } = modal;
	const [isVisible, setIsVisible] = React.useState(slotEdit.isOpen);
	const methods = useForm<EditSlotForm>({
		defaultValues,
	});

	const handleOnSubmit = (data: EditSlotForm) => {
		const date = data.date.format('YYYY-MM-DD');
		const dataPost: EditSlotDTO = {
			date: [date],
			slots: data.slots,
		};
		console.log(dataPost);
		toast.success('Edit slot successfully');
	};

	return (
		<Modal
			title="Edit slots"
			open={isVisible}
			onCancel={() => setIsVisible(false)}
			onOk={() => {
				methods.handleSubmit(handleOnSubmit)();
				setIsVisible(false);
			}}
			afterClose={() => handleCloseModal('slotEdit')}
		>
			<FormWrapper methods={methods}>
				<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
					<InputDatePicker
						commonField={{
							name: 'date',
							label: 'Select Date',
						}}
						options={{ className: 'w-full' }}
					/>
					<InputCheckboxGroup
						commonField={{
							name: 'slots',
							label: 'Select Available Slots',
						}}
						optionsDirection="column"
						options={dataExample.slots}
					/>
				</form>
			</FormWrapper>
		</Modal>
	);
};

export default SlotEditModal;
