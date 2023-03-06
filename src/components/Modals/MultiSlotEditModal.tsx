import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Modal } from 'antd';

import { useModalContext } from 'src/contexts/ModalContext';
import { EditMultiSlotForm, EditSlotDTO } from 'src/interface/slot';

import { FormWrapper, InputCheckboxGroup } from '../Input';
import InputDateRangePicker from '../Input/InputDateRangePicker';
import { usePostSlots } from 'src/hooks/slot';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSlots } from 'src/api/slot';
import { Slot } from 'src/models/slot';

interface MultiSlotEditModalProps {}

const defaultValues: EditMultiSlotForm = {
	dates: [],
	slots: [],
};

const MultiSlotEditModal: React.FunctionComponent<MultiSlotEditModalProps> = () => {
	const queryClient = useQueryClient();
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
		let dates: string[] = [];

		const [start, end] = data.dates;

		const diff = end.diff(start, 'days');

		for (let i = 0; i <= diff; i++) {
			dates.push(start.clone().add(i, 'days').format('YYYY-MM-DD'));
		}

		const dataPost: EditSlotDTO = {
			dates,
			slots: data.slots,
		};
		mutatePostSlots(dataPost);
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
