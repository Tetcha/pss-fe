/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				container: '1280px',
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [],
};
