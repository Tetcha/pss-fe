import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useModalContext } from 'src/contexts/ModalContext';
import { useAddSymptom } from 'src/hooks/symptom';
import { EditMultiSlotForm } from 'src/interface/slot';
import { SymptomForm } from 'src/interface/symptom';
import { FormWrapper, InputSelect, TextField } from '../Input';

interface AddSymptomModalProps {}

const defaultValues: SymptomForm = {
	name: '',
	categoryId: '',
};

const AddSymptomModal: React.FunctionComponent<AddSymptomModalProps> = () => {
	const { handleCloseModal, modal } = useModalContext();
	const { addSymptomModal } = modal;
	const [isVisible, setIsVisible] = React.useState(addSymptomModal.isOpen);

	const methods = useForm<SymptomForm>({
		defaultValues,
	});

	const { isSuccess, mutateAddSymptom } = useAddSymptom();

	const handleOnSubmit = (data: SymptomForm) => {
		mutateAddSymptom(data);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Add symptom successfully');
			setIsVisible(false);
		}
	}, [isSuccess]);

	return (
		<Modal
			title="Add Symptom"
			open={isVisible}
			onCancel={() => setIsVisible(false)}
			onOk={() => {
				methods.handleSubmit(handleOnSubmit)();
			}}
			afterClose={() => handleCloseModal('addSymptomModal')}
		>
			<FormWrapper methods={methods}>
				<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
					<div className="flex flex-col space-y-2">
						<TextField commonField={{ name: 'name', label: 'Name' }} />
						<InputSelect
							commonField={{ name: 'categoryId', label: 'Category' }}
							className="w-full"
							// options={[{ label: 'Select Category', value: '' }]}
							placeholder="Select Category"
						/>
					</div>
				</form>
			</FormWrapper>
		</Modal>
	);
};

export default AddSymptomModal;
