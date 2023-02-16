export const FormParser = (input: any): FormData => {
	let form = new FormData();

	for (const key in input) {
		if (Object.prototype.hasOwnProperty.call(input, key)) {
			const element = (input as any)[key];
			form.append(key, element);
		}
	}

	return form;
};

export const SendFormRequestConfig = () => {
	return {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
};
