/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#000000', 
				secondary: '#99c9bd',
				fondo: '#f5cac3',
				accent: '#f28482',
				button: '#84a59d',
			},
			fontFamily: {
				cinzel: ['Cinzel', 'serif'],
				playfair: ['Playfair', 'serif'],
			},
			gridTemplateColumns: {
				bento: 'repeat(auto-fit, minmax(320px, 1fr))'
			},
			gridTemplateRows: {
				template: 'auto 1fr auto'
			}
		}
	},
	plugins: [],
}
