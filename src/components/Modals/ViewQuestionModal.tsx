import * as React from 'react';
import { Button, Modal } from 'antd';

import { useModalContext } from 'src/contexts/ModalContext';
import { QuestionPreview } from 'src/models/question';

interface ViewQuestionModalProps {
	questions?: QuestionPreview[];
}

const ViewQuestionModal: React.FunctionComponent<ViewQuestionModalProps> = ({ questions = [] }) => {
	const { handleCloseModal, modal } = useModalContext();
	const { viewQuestions } = modal;
	const [isVisible, setIsVisible] = React.useState(viewQuestions.isOpen);
	const handleOk = () => {
		setIsVisible(false);
	};

	return (
		<Modal
			title="Preview Questions"
			open={isVisible}
			afterClose={() => handleCloseModal('viewQuestions')}
			footer={[
				<Button key="back" type="primary" onClick={handleOk}>
					Return
				</Button>,
			]}
		>
			{questions?.map((question, index) => (
				<p key={question.id} className="text-base">
					<span className="font-bold ">Question {index}</span>: {question.content}
				</p>
			))}
		</Modal>
	);
};

export default ViewQuestionModal;
