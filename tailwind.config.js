/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",               // Vite's root HTML file
		"./src/**/*.{js,ts,jsx,tsx}", // All JS, TS, JSX, and TSX files in the src folder
	],
	theme: {
		extend: {
			colors: {
				primary: '#4B5563',
				secondary: '#9CA3AF',
				accent: '#F59E0B',
				lightTeal: '#d0fcf4',
				darkTeal: '#558b88',
				lightGrey: '#808080',
				darkGrey: '#696969'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
			},
		}
	},
	darkMode: ['media', "class"], // Enables dark mode based on the user's device settings
	plugins: [require("tailwindcss-animate")],
}
