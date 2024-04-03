import styled from '@emotion/styled';

/**
 * Empty wrapper for an unstyled div component
 */
export const Wrapper = styled.div``;

/**
 * Common flex display wrapper
 */
export const FlexWrapper = styled(Wrapper)`
	display: flex;
`;

/**
 * Common flex wrapper with content justified with space between
 */
export const SpaceBetweenWrapper = styled(FlexWrapper)`
	justify-content: space-between;
`;

/**
 * Common flex wrapper with column flex direction
 */
export const FlexColumnWrapper = styled(FlexWrapper)`
	flex-direction: column;
`;

/**
 * Common flex wrapper with centered content
 */
export const CenteredFlexWrapper = styled(FlexWrapper)`
	justify-content: center;
`;

/**
 * Common flex wrapper with full heights (100%)
 */
export const FullHeightFlexWrapper = styled(FlexWrapper)`
	height: 100%;
`;

/**
 * Common flex wrapper with centered content and flex-direction column
 */
export const CenteredFlexColumnWrapper = styled(FlexColumnWrapper)`
	justify-content: center;
`;
