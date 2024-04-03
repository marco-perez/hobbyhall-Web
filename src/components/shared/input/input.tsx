import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import { createRef, ChangeEvent, useState, KeyboardEvent } from 'react';
import isEmail from 'validator/lib/isEmail';

/**
 * Interfaces props for our input component
 */
export interface IInputProps {
	/**
	 * Type to use for the input - affects validation
	 */
	type: 'text' | 'email' | 'password' | 'number';
	/**
	 * Current value of the input
	 */
	value: string | number;
	/**
	 * Callback to trigger when the input is changed
	 */
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Optional: Callback to trigger on blur of the name input
	 */
	onBlur?: () => void;
	/**
	 * Optional: Callback to trigger submission of the input on Enter
	 */
	onSubmit?: () => void;
	/**
	 * Optional: Callback to set the error on any view model using this component
	 */
	hasError?: (val: boolean) => void;
	/**
	 * Optional: Subtext to display beneath the input when there is NOT an error
	 */
	subtext?: string;
	/**
	 * Optional: True if we should auto-focus this input
	 */
	autofocus?: boolean;
	/**
	 * Optional: True if we should disable this input
	 */
	disabled?: boolean;
	/**
	 * Optional: Placeholder to use in the input
	 */
	placeholder?: string;
	/**
	 * Optional: Maximum number of characters to allow
	 */
	limit?: number;
	/**
	 * Optional: Minimum value applied if this is a number input
	 */
	min?: number;
	/**
	 * Optional: External error to show on the input
	 */
	error?: string;
	/**
	 * Optional: Color scheme for the input
	 */
	scheme?: 'primary' | 'secondary';
	/**
	 * True if we should pass all props down to the input component
	 */
	passThroughProps?: boolean;
	/**
	 * Optional: Miscellaneous prop so that this can be additionally styled with @emotion/styled library
	 */
	[key: string]: any;
}

/**
 * Componentizes an input to use for all text-based inputs in Intros
 */
export const BaseInput = (props: IInputProps) => {
	const {
		type,
		value,
		onChange,
		onSubmit,
		onBlur,
		hasError,
		subtext,
		autofocus,
		disabled,
		placeholder,
		limit,
		error,
		scheme,
		min,
		passThroughProps,
		...additionalProps
	} = props;
	/**
	 * Track whether or not the component has been blurred
	 */
	const [blurred, setBlurred] = useState(false);
	/**
	 * Track whether or not the component is in focus
	 */
	const [focused, setFocused] = useState(false);

	/**
	 * Tracks validation errors from the input component
	 */
	let validationError: string | undefined = undefined;
	// Only run validation if the component has been blurred
	if (blurred) {
		switch (type) {
			case 'email':
				validationError =
					value && isEmail(value as string)
						? undefined
						: 'Please enter a valid mail address';
				break;
			case 'password':
				validationError =
					value && (value as string)?.length > 7
						? undefined
						: 'Passwords must be at least 8 characters long';
				break;
		}
	}
	/**
	 * True when this input has an error and we should it
	 */
	const showError: boolean = blurred && (!!validationError || !!error);
	// let the view model know the state of any errors
	hasError && hasError(showError);

	/**
	 * Ref to feed to out input
	 */
	const ref = createRef<HTMLInputElement>();

	/**
	 * Subtext string to display
	 */
	const subtextString =
		validationError ||
		error ||
		(limit ? `${(value as string)?.length || 0} / ${limit}` : undefined) ||
		subtext;

	/**
	 * Callback to determine if we should submit or change
	 */
	const triggerSubmission = debounce(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				// track if this is submitted
				let submitted: boolean = false;
				if (onSubmit) {
					switch (type) {
						case 'email':
							if (value && isEmail(value as string)) {
								onSubmit();
								submitted = true;
							}
							break;
						case 'password':
							if (value && (value as string)?.length > 7) {
								onSubmit();
								submitted = true;
							}
							break;
						default:
							if (onSubmit) {
								onSubmit();
								submitted = true;
							}
							break;
					}
				}
				if (submitted) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					setBlurred(true);
				}
			}
		},
		250
	);

	/**
	 * True when we should show the subtext
	 */
	const showSubtext = limit || showError || subtext;
	return (
		<Container {...additionalProps} showSubtext={!!showSubtext}>
			<StyledInput
				type={type}
				value={value}
				min={min}
				onChange={onChange}
				onKeyUp={triggerSubmission}
				autoFocus={autofocus}
				disabled={disabled}
				onBlur={() => {
					setBlurred(true);
					setFocused(false);
					onBlur && onBlur();
				}}
				onFocus={() => setFocused(true)}
				placeholder={placeholder}
				ref={ref}
				max={limit}
				maxLength={limit}
				hasError={showError}
				inFocus={focused}
				scheme={scheme}
				{...(passThroughProps ? additionalProps : {})}
			/>
			{showSubtext ? (
				<SubtextLabel hasError={showError}>
					{subtextString}
				</SubtextLabel>
			) : undefined}
		</Container>
	);
};

const Container = styled.div<{ showSubtext?: boolean }>`
	// Width declarations
	width: 100%;
	width: -moz-available; /* WebKit-based browsers will ignore this. */
	width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
	width: fill-available;
	outline: none;

	${({ showSubtext }) => (showSubtext ? 'margin-bottom: 16px;' : '')}
`;

const StyledInput = styled.input<{
	hasError?: boolean;
	inFocus?: boolean;
	scheme?: string;
}>`
	border: 1px #dadce3 solid;
	border-radius: 48px;
	border-color: ${({ hasError, inFocus, scheme }) =>
		hasError && !inFocus
			? '#EC4F42'
			: scheme === 'secondary'
			? '#DADCE3'
			: 'var(--airfoil-blue)'};
	height: 48px;
	color: var(--airfoil-blue);
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 20px;
	letter-spacing: 0px;
	text-align: left;
	outline: none;
	text-indent: 16px;

	// Width declarations
	width: 100%;
	width: -moz-available; /* WebKit-based browsers will ignore this. */
	width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
	width: fill-available;
	outline: none;
`;

const SubtextLabel = styled.div<{ hasError?: boolean }>`
	margin-top: 4px;
	margin-left: 20px;
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: 12px;
	letter-spacing: 0px;
	text-align: left;
	color: ${({ hasError }) => (hasError ? '#EC4F42' : '#58627A')};
`;
