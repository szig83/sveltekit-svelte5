import { cva, type RecipeVariantProps } from 'styled-system/css';

export const buttonStyle = cva({
	base: {
		bg: 'gray.500',
		color: 'neutral.200',
		paddingX: 2,
		paddingY: 1,
		borderRadius: 5,
		transition: 'colors',
		transitionTimingFunction: 'ease-in-out',
		m: 1,
		_hover: {
			bg: 'gray.600'
		},
		cursor: 'pointer'
	}
});

export type buttonVariants = RecipeVariantProps<typeof buttonStyle>; // { size?: 'small' | 'large' }
