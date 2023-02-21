export const currencyFormat = (value: number) => {
	const formatted = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(value);

	return formatted;
};
