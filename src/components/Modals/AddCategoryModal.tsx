import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useModalContext } from 'src/contexts/ModalContext';
import { useAddCategory } from 'src/hooks/category';
import { useAddSymptom } from 'src/hooks/symptom';
import { AddCategoryForm } from 'src/interface/category';
import { EditMultiSlotForm } from 'src/interface/slot';
import { SymptomForm } from 'src/interface/symptom';
import { FormWrapper, InputSelect, TextField } from '../Input';

interface AddSymptomModalProps {}

const defaultValues: AddCategoryForm = {
	name: '',
};

const AddCategoryModal: React.FunctionComponent<AddSymptomModalProps> = () => {
	const { handleCloseModal, modal } = useModalContext();
	const { addCategoryModal } = modal;
	const [isVisible, setIsVisible] = React.useState(addCategoryModal.isOpen);

	const methods = useForm<AddCategoryForm>({
		defaultValues,
	});

	const { isSuccess, mutateAdd } = useAddCategory();

	const handleOnSubmit = (data: AddCategoryForm) => {
		mutateAdd(data);
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Add category successfully');
			setIsVisible(false);
		}
	}, [isSuccess]);

	return (
		<Modal
			title="Add Category"
			open={isVisible}
			onCancel={() => setIsVisible(false)}
			onOk={() => {
				methods.handleSubmit(handleOnSubmit)();
			}}
			afterClose={() => handleCloseModal('addCategoryModal')}
		>
			<FormWrapper methods={methods}>
				<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
					<div className="flex flex-col space-y-2">
						<TextField commonField={{ name: 'name', label: 'Name' }} />
					</div>
				</form>
			</FormWrapper>
		</Modal>
	);
};

export default AddCategoryModal;
