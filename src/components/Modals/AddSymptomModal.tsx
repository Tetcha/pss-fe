import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getCategories } from 'src/api/category';
import { useModalContext } from 'src/contexts/ModalContext';
import { useAddSymptom } from 'src/hooks/symptom';
import { EditMultiSlotForm } from 'src/interface/slot';
import { SymptomForm } from 'src/interface/symptom';
import { SortOrder } from 'src/models/interface';
import { pagingMapper } from 'src/utils/object.helper';
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

	const query = useQuery(
		['categories'],
		async () => {
			const filterProps = {
				orderBy: 'name',
				order: SortOrder.ASC,
				page: 0,
				pageSize: 100,
			};
			const res = await getCategories(pagingMapper(filterProps));
			return res.data;
		},
		{
			initialData: {
				data: [],
				count: 0,
			},
		},
	);

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
							className="w-full bg-black"
							options={query.data.data.map((category) => ({
								label: category.name,
								value: category.id,
							}))}
						/>
					</div>
				</form>
			</FormWrapper>
		</Modal>
	);
};

export default AddSymptomModal;
