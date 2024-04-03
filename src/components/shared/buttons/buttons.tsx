import styled from '@emotion/styled';
import { CSSProperties } from '@mui/material/styles/createTypography';
import React, { ForwardedRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { FlexWrapper } from '../wrappers/styled-divs';

/**
 * Interfaces the props that our buttons consume
 */
export interface IButtonProps {
	/**
	 * Optional id to pass to the button
	 */
	id?: string;
	/**
	 * Text to display inside the button
	 */
	label: string;
	/**
	 * Callback to trigger on click
	 */
	onClick: () => void;
	/**
	 * React fragment to include as an icon
	 */
	icon?: React.ReactFragment;
	/**
	 * True if we should place the icon in front of the text
	 */
	placeIconBeforeText?: boolean;
	/**
	 * True when the action associated with this button is in loading state
	 */
	loading?: boolean;
	/**
	 * True when this button should be disabled
	 */
	disabled?: boolean;
	/**
	 * Custom background color to provide this button
	 */
	backgroundColor?: string;
	/**
	 * Custom text color to provide this button
	 */
	textColor?: string;
	/**
	 * Additional styles to apply to the Button
	 */
	styles?: CSSProperties;
	/**
	 * Additional styles to apply to the Button Label
	 */
	labelStyles?: CSSProperties;
	// [key: string]: any
}


/**
 * Base Button for all other buttons to be derived
 */
const AbstractButton = React.forwardRef(
	(props: IButtonProps, ref: ForwardedRef<HTMLDivElement>) => (
		<Button
			{...props}
			onClick={
				props.disabled || props.loading ? undefined : props.onClick
			}
			style={props.styles}
			disabled={props.disabled}
			ref={ref}
		>
			{props.loading ? (
				<Loader />
			) : (
				<ButtonAndIconWrapper>
					{props.placeIconBeforeText && props.icon}
					<ButtonLabel style={props.labelStyles}>
						{props.label}
					</ButtonLabel>
					{!props.placeIconBeforeText && props.icon}
				</ButtonAndIconWrapper>
			)}
		</Button>
	)
);

/**
 * Primary Buttton for Intros
 */

export const PrimaryButton = styled(AbstractButton)<{
	disabled?: boolean;
	backgroundColor?: string;
	textColor?: string;
}>`
	opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
	color: ${({ textColor }) => textColor || 'var(--airfoil-blue)'};
	background-color: ${({ backgroundColor }) =>
		backgroundColor || 'var(--primary-button)'};

	&:hover {
		background-color: ${({ disabled, backgroundColor }) =>
			disabled
				? backgroundColor || 'var(--primary-button)'
				: backgroundColor || 'var(--primary-button-hovered)'};
		${({ disabled, backgroundColor }) =>
			!disabled && backgroundColor
				? 'background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);'
				: ''}
	}
`;

/**
 * Secondary Button for Intros
 */
export const SecondaryButton = styled(AbstractButton)`
	opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
	color: var(--airfoil-blue);
	background-color: var(--white);
	border: 1px solid var(--airfoil-blue);
	border-radius: 40px;
`;

/**
 * Negative Action Button for Intros
 */
export const NegativeActionButton = styled(AbstractButton)`
	font-weight: bold;
	line-height: 18px;
	color: var(--negative-action-text);
	border: 1px solid;

	border-image-source: linear-gradient(0deg, #dadce3, #dadce3),
		linear-gradient(0deg, rgba(68, 81, 113, 0.2), rgba(68, 81, 113, 0.2));
`;

/**
 * Danger button for Intros
 */
export const DangerButton = styled(AbstractButton)<{ disabled?: boolean }>`
	background: #ec4435;
	color: var(--white);
	opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
	height: 42px;
	width: 100px;
	border-radius: 20px;

	&:hover {
		background: #e73a2b;
	}
`;

const Button = styled(FlexWrapper)<{ disabled?: boolean }>`
	// Display styles
	height: 44px;
	border-radius: 40px;
	width: 100%;
	padding: 4px 0px;
	cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};

	// Text Styles
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: 0px;
	letter-spacing: 0em;
	text-align: center;
`;

const ButtonAndIconWrapper = styled(FlexWrapper)`
	margin: auto;
`;

const ButtonLabel = styled.div``;

const Loader = styled(ClipLoader)`
	margin: auto;
`;
