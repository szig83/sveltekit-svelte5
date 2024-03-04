import type { Config } from 'tailwindcss';

// import tailwindForms from '@tailwindcss/forms';
// import tailwindTypography from '@tailwindcss/typography';

const config = {
	darkMode: [
		'variant',
		['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)']
	],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [
		// tailwindForms,
		// tailwindTypography
	]
} satisfies Config;

export default config;
