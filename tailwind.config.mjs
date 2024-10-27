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
			},
			keyframes: {
				'slide-up': {
				  '0%': { transform: 'scaleY(1)' },
				  '100%': { transform: 'scaleY(0)' },
				},
				'slide-down': {
				  '0%': { transform: 'scaleY(0)' },
				  '100%': { transform: 'scaleY(1)' },
				},
				'fade-out': {
				  '0%': { opacity: '1' },
				  '100%': { opacity: '0' },
				},
			},
			animation: {
				'fade-out': 'fade-out 1.5s ease-out forwards',
				'slide-down': 'slide-down 0.3s ease-in-out forwards',
				'slide-up': 'slide-up 0.3s ease-in-out forwards',
			},
		}
	},
	plugins: [],
}
