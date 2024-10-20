/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#000000', 
				secondary: '#84a59d',
				fondo: '#f5cac3',
				accent: '#f28482',
				button: '#84a59d',
			}
		},
		fontFamily: {
			cinzel: ['Cinzel', 'serif'],
			playfair: ['Playfair', 'serif'],
		}
	},
	plugins: [],
}
