import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';
import { ISignInViewModel, SignInViewModel } from './sign-in-view-model';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PrimaryButton } from '../shared/buttons/buttons';
import { BaseInput } from '../shared/input/input';
import { FlexWrapper, SpaceBetweenWrapper, FullHeightFlexWrapper } from '../shared/wrappers/styled-divs';

// TODO: Integrate AppState
@observer
export class SignIn extends React.Component {
	private viewmodel: ISignInViewModel = new SignInViewModel();

	render() {
		const {
			userName,
			email,
			password,
			showErrorNotification,
			errorMessage,
			signedUp,
			loginSuccessful,
			resetRequested,
			submitButtonText,
			signInHeadingText,
			signUpMode,
			signInDescriptionText,
			showNameInputs,
			showPasswordInput,
			showRememberMeAndPassword,
			rememberMe,
			disableSubmit,
			requestInProgress
		} = this.viewmodel;

		// if sign up successful, redirect to onboarding
		// TODO: for below redirects, make dummy pages with those paths to test 
		if (signedUp) {
			return <Navigate to="/onboarding" />;
		}
		// if login successful, redirect to home page
		if (loginSuccessful) {
			return <Navigate to="/home" />;
		}
		// if not logged in, load the login page
		return (
			<FullHeightFlexWrapper>
				<ContentWrapper>
					<Helmet>
						<title>HobbyHall - Sign In</title>
						<meta
							name="description"
							content="Sign in to get hobbying."
						/>
					</Helmet>
					<LeftColumnWrapper>
						<IntrosLogo
							src="/assets/react.svg"
							alt="sign in logo"
						/>
						<IntrosDescription>
							Find the hobby thats right for you
						</IntrosDescription>
						<SignInGraphic
							src="/assets/react.svg"
							alt="sign in graphic"
						/>
					</LeftColumnWrapper>
					<RightColumnWrapper>
						<RightColumnContent>
								<>
									<HeadingAndDescriptionWrapper>
										<SignInHeading>
											{signInHeadingText}
										</SignInHeading>
										{signUpMode ? (
											<SignInDescription>
												{signInDescriptionText}
											</SignInDescription>
										) : (
											<NoAccountWrapper>
												<DontHaveAccount>
													Don't have an account?
												</DontHaveAccount>
												<SignUpHereLink
													onClick={
														this
															.handleTogglePageMode
													}
												>
													Sign up here
												</SignUpHereLink>
											</NoAccountWrapper>
										)}
										{showPasswordInput && (
											<>
												<SeparatorWrapper>
													<Separator />
													<SeparatorLabel>
														or
													</SeparatorLabel>
													<Separator />
												</SeparatorWrapper>
											</>
										)}
									</HeadingAndDescriptionWrapper>
									{!resetRequested ? (
										<FormWrapper>
											{showNameInputs && (
												<FirstAndLastNameRow>
													<FirstNameInput
														type="text"
														placeholder="User Name"
														value={userName}
														onChange={
															this.handleChangeUserName
														}
														autofocus
													/>
												</FirstAndLastNameRow>
											)}
											<EmailInput
												type="email"
												placeholder="Email"
												value={email}
												onChange={
													this.handleChangeEmail
												}
												hasError={
													this.handleSetErrorState
												}
												autofocus={!showNameInputs}
											/>
											{showPasswordInput ? (
												<PasswordInput
													type="password"
													placeholder="Password"
													value={password}
													onChange={
														this
															.handleChangePassword
													}
													onSubmit={this.handleSubmit}
												/>
											) : undefined}
											{showRememberMeAndPassword ? (
												<RememberMeAndResetPasswordWrapper>
													<RememberMeWrapper
														onClick={
															this
																.handleCheckedRememberMe
														}
													>
														<RememberMeInput
															type="checkbox"
															onChange={undefined}
															checked={rememberMe}
														/>
														<RememberMeLabel>
															Remember Me
														</RememberMeLabel>
													</RememberMeWrapper>
													<ResetPassword
														onClick={
															this
																.handleResetPasswordLink
														}
													>
														Reset Password
													</ResetPassword>
												</RememberMeAndResetPasswordWrapper>
											) : undefined}
											{/* <div style={{width: '100%'}}> */}
											{showErrorNotification ? (
												<ErrorNotification>
													<ErrorMessage>
														{errorMessage}
													</ErrorMessage>
												</ErrorNotification>
											) : undefined}
											{/* </div> */}
											<SubmitButton
												onClick={this.handleSubmit}
												label={submitButtonText}
												disabled={disableSubmit}
												loading={requestInProgress}
											/>
										</FormWrapper>
									) : undefined}
								</>
							
						</RightColumnContent>
					</RightColumnWrapper>
				</ContentWrapper>
			</FullHeightFlexWrapper>
		);
	}

	private handleSetErrorState = (val: boolean) => {
		this.viewmodel.setErrorState(val);
	};

	/**
	 * Binding handler for toggling the page mode
	 */
	private handleTogglePageMode = () => {
		this.viewmodel.toggleSignUpMode();
	};

	/**
	 * Binding handler for reset password link
	 */
	private handleResetPasswordLink = () => {
		this.viewmodel.startResetPasswordFLow();
	};

	/**
	 * Binding handler for toggling remember me
	 */
	private handleCheckedRememberMe = () => {
		this.viewmodel.toggleRememberMe();
	};

	/**
	 * Handles someone editing the userName
	 * @param event
	 */
	private handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
		this.viewmodel.onChangeUserName(event.target.value);
	};

	/**
	 * Handles someone editing the email
	 * @param event
	 */
	private handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		this.viewmodel.onChangeEmail(event.target.value);
	};

	/**
	 * Handles someone editing the password
	 * @param event
	 */
	private handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		this.viewmodel.onChangePassword(event.target.value);
	};

	/**
	 * Handle pressing of the submit / sign in / sign up button
	 */
	private handleSubmit = () => {
		this.viewmodel.submit();
	};

}

const ContentWrapper = styled(SpaceBetweenWrapper)`
	margin: auto;
	max-width: 1230px;
	max-height: 800px;
	overflow: hidden;
	position: relative;
`;

const LeftColumnWrapper = styled.div`
	text-align: left;
	margin-right: 48px;
	height: 100%;
`;

const IntrosLogo = styled.img`
	object-fit: contain;
	height: 48px;
`;

const SignInGraphic = styled.img`
	object-fit: contain;
	height: calc(100% - 98px);
	max-width: 500px;
	position: absolute;
	top: 98px;
`;

const RightColumnWrapper = styled(FlexWrapper)`
	background: white;
	height: 100%;
	min-width: 472px;
	border-radius: 24px;
	box-sizing: border-box;
	padding: 48px;
`;

const RightColumnContent = styled.div`
	margin: auto;
	width: 100%;
`;

const HeadingAndDescriptionWrapper = styled.div``;

const FormWrapper = styled.div``;

const RememberMeWrapper = styled(FlexWrapper)`
	margin-left: 12px;
	cursor: pointer;
`;

const RememberMeInput = styled.input`
	cursor: pointer;
`;

const RememberMeLabel = styled.div`
	margin-top: auto;
	margin-bottom: auto;
	margin-left: 8px;
`;

const IntrosDescription = styled.div`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0em;
	color: #58627a;
	max-width: 500px;
	margin-bottom: 28px;
`;

const SignInDescription = styled(IntrosDescription)`
	margin-top: 8px;
	max-width: 376px;
`;

const SignInHeading = styled.div`
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 36px;
	letter-spacing: 0em;
	color: var(--airfoil-blue);
`;

const FirstNameInput = styled(BaseInput)`
	max-width: 205px;
	margin-right: 12px;
`;

const EmailInput = styled(BaseInput)`
	margin-top: 12px;
`;

const PasswordInput = styled(BaseInput)`
	margin-top: 12px;
`;

const RememberMeAndResetPasswordWrapper = styled(SpaceBetweenWrapper)`
	margin-top: 12px;

	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 16px;
	letter-spacing: 0px;
	text-align: left;
	color: #58627a;
`;

const ResetPassword = styled.div`
	text-decoration: underline;
	cursor: pointer;
`;

const SubmitButton = styled(PrimaryButton)`
	margin-top: 32px;
	height: 48px;
	width: 100%;
`;

const ErrorNotification = styled(FlexWrapper)`
	background: #ec4435c7;
	color: var(--white);
	border-radius: 8px;
	box-sizing: border-box;
	margin-top: 24px;
	padding: 18px;
	width: 300px;
	margin-left: auto;
	margin-right: auto;
`;

const ErrorMessage = styled.div`
	margin: auto;
	text-align: center;
	font-size: 14px;
`;

const FirstAndLastNameRow = styled(FlexWrapper)`
	margin-top: 12px;
`;

const NoAccountWrapper = styled(FlexWrapper)`
	margin-top: 16px;
`;

const DontHaveAccount = styled.div`
	font-size: 14px;
	line-height: 16px;
	font-weight: bold;
`;

const SignUpHereLink = styled.div`
	font-size: 14px;
	line-height: 16px;
	color: var(--primary-button-hovered);
	cursor: pointer;
	margin-left: 4px;

	:hover {
		text-decoration: underline;
		font-weight: bold;
	}
`;


const SeparatorWrapper = styled(SpaceBetweenWrapper)`
	margin-top: 24px;
`;

const Separator = styled.div`
	height: 1px;
	background: #00000061;
	width: 100%;
	margin-top: auto;
	margin-bottom: auto;
`;

const SeparatorLabel = styled.div`
	color: var(--subtext-grey);
	margin-left: 32px;
	margin-right: 32px;
	font-size: 18px;
	line-height: 24px;
`;
