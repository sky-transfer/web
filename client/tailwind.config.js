/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			dropShadow: {
				glow: '0 0px 20px #ccccffaa',
			},
		},
	},
	plugins: [],
};
