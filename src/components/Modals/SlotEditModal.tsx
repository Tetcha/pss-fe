import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Modal } from 'antd';

import { useModalContext } from 'src/contexts/ModalContext';
import { EditSlotDTO, EditSlotForm } from 'src/interface/slot';

import { FormWrapper, InputCheckboxGroup } from '../Input';
import InputDatePicker from '../Input/InputDatePicker';
import { useQuery } from '@tanstack/react-query';
import { Slot } from 'src/models/slot';
import { getSlots } from 'src/api/slot';
import { usePostSlots } from 'src/hooks/slot';

interface SlotEditModalProps {
	defaultValues?: EditSlotForm;
}

const SlotEditModal: React.FunctionComponent<SlotEditModalProps> = ({ defaultValues }) => {
	const { handleCloseModal, modal } = useModalContext();
	const { slotEdit } = modal;
	const [isVisible, setIsVisible] = React.useState(slotEdit.isOpen);

	const methods = useForm<EditSlotForm>({
		defaultValues,
	});

	const { isSuccess, mutatePostSlots } = usePostSlots();

	const handleOnSubmit = (data: EditSlotForm) => {
		const dates = data.dates.format('YYYY-MM-DD');
		const dataPost: EditSlotDTO = {
			dates: [dates],
			slots: data.slots,
		};
		mutatePostSlots(dataPost);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Edit slot successfully');
			setIsVisible(false);
		}
	}, [isSuccess]);

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
		<Modal
			title="Edit slots"
			open={isVisible}
			width={920}
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
							name: 'dates',
							label: 'Select Date',
						}}
						options={{ className: 'w-full max-w-sm' }}
					/>
					<InputCheckboxGroup
						commonField={{
							name: 'slots',
							label: 'Select Available Slots',
						}}
						optionsDirection="column"
						options={querySlots.data.map((item) => ({
							label: `${item.name}: ${item.startTime} - ${item.endTime}`,
							value: item.id,
						}))}
						defaultChecked={defaultValues?.slots.map((item) => item)}
					/>
				</form>
			</FormWrapper>
		</Modal>
	);
};

export default SlotEditModal;
