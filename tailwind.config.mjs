/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'primary': '#FCBE9E',
			'secondary' : '#F2E9DA',
			'accent': '#F47677',
			'accent-dark': '#e36767',
			'white': '#fff',
			'black': '#464646'
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '5rem',
			},
		},
		extend: {},
	},
	plugins: [],
}
