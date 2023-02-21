export const currencyFormat = (value: number) => {
	const formatted = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(value);

	return formatted;
};

export const capitalizeFirstLetter = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
