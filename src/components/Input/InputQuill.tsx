import dynamic from 'next/dynamic';

import CommonFieldWrapper from './CommonFieldWrapper';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface InputQuillProps {
	description: string;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	label?: string;
	name?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
}

export const InputQuill: React.FC<InputQuillProps> = ({
	description,
	setDescription,
	name = '',
	label = '',
	isRequire = true,
	direction,
}) => {
	return (
		<>
			<CommonFieldWrapper name={name} label={label} isRequire={isRequire} direction={direction}>
				<ReactQuill
					placeholder="Type something..."
					value={description}
					onChange={setDescription}
					className="col-span-2 min-h-2xl"
					modules={{
						toolbar: [
							['bold', 'italic', 'underline', 'strike'], // toggled buttons
							['blockquote', 'code-block'],
							['link', 'video', 'image'],
							[{ header: 1 }, { header: 2 }], // custom button values
							[{ list: 'ordered' }, { list: 'bullet' }],
							[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
							[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
							[{ direction: 'rtl' }], // text direction
							[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
							[{ header: [1, 2, 3, 4, 5, 6, false] }],
							[{ color: [] }, { background: [] }],
							[{ font: [] }],
							[{ align: [] }],
							['clean'], // remove formatting button
						],
					}}
				/>
			</CommonFieldWrapper>
		</>
	);
};
