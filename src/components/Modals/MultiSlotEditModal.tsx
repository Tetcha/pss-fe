import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Modal } from 'antd';

import { useModalContext } from 'src/contexts/ModalContext';
import { EditMultiSlotForm, EditSlotDTO } from 'src/interface/slot';

import { FormWrapper, InputCheckboxGroup } from '../Input';
import InputDateRangePicker from '../Input/InputDateRangePicker';
import { usePostSlots } from 'src/hooks/slot';
import { useQuery } from '@tanstack/react-query';
import { getSlots } from 'src/api/slot';
import { Slot } from 'src/models/slot';

interface MultiSlotEditModalProps {}

const defaultValues: EditMultiSlotForm = {
	dates: [],
	slots: [],
};

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

const MultiSlotEditModal: React.FunctionComponent<MultiSlotEditModalProps> = () => {
	const { handleCloseModal, modal } = useModalContext();
	const { multiSlotEdit } = modal;
	const [isVisible, setIsVisible] = React.useState(multiSlotEdit.isOpen);

	const { isSuccess, mutatePostSlots } = usePostSlots();

	const methods = useForm<EditMultiSlotForm>({
		defaultValues,
	});

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

	const handleOnSubmit = (data: EditMultiSlotForm) => {
		const dates = data.dates.map((item) => item.format('YYYY-MM-DD'));
		console.log('data', data);
		console.log('dates', dates);
		// const dataPost: EditSlotDTO = {
		// 	dates,
		// 	slots: data.slots,
		// };
		// mutatePostSlots(dataPost);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Edit slots successfully');
			setIsVisible(false);
		}
	}, [isSuccess]);

	return (
		<Modal
			title="Edit multiple slots"
			open={isVisible}
			onCancel={() => setIsVisible(false)}
			width={920}
			onOk={() => {
				methods.handleSubmit(handleOnSubmit)();
				setIsVisible(false);
			}}
			afterClose={() => handleCloseModal('multiSlotEdit')}
		>
			<FormWrapper methods={methods}>
				<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
					<InputDateRangePicker
						commonField={{ name: 'dates', label: 'Select date' }}
						options={{ className: 'w-full max-w-lg' }}
					/>
					<InputCheckboxGroup
						commonField={{
							name: 'slots',
							label: 'Select Available Slots',
						}}
						optionsDirection="row"
						options={querySlots.data.map((item) => ({
							label: `${item.name}: ${item.startTime} - ${item.endTime}`,
							value: item.id,
						}))}
					/>
				</form>
			</FormWrapper>
		</Modal>
	);
};

export default MultiSlotEditModal;
