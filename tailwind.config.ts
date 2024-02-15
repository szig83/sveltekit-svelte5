import type { Config } from 'tailwindcss';

// import tailwindForms from '@tailwindcss/forms';
// import tailwindTypography from '@tailwindcss/typography';

// 1. Import the Skeleton plugin

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: ['class'],
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
