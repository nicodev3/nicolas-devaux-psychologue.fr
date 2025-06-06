/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'primary': '#a1b5a0',
			'secondary' : '#f2e9e1',
			'tertiary': '#5a5a4e',
			'accent': '#E07A5F',
			'accent-dark': '#C85D46',
			'white': '#fff',
			'black': '#000',
			'black-dark': '#000',
			'transparent': 'transparent',
			        // Ajout pour "Derniers articles"
			'articles-bg': '#F9F5EE',    // Beige Pâle (Fond des articles)
			'articles-title': '#365943', // Brun Foncé (Titre de la section articles)
			'articles-item': '#4C7C5F',  // Vert Foncé (Titres des articles)
			'articles-date': '#7A431F',  // Orange Clair (Date des articles)
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
