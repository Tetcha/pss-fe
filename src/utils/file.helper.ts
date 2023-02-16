import { toast } from 'react-toastify';

export const checkFileType = (file: File, cb: () => void) => {
	if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') cb();
	else toast.warning('Invalid file, file type should be png/jpg/jpeg');
};
