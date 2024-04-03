
import { action, computed, makeObservable, observable } from 'mobx';
import {
	IApiErrorData,
	IErrorResponse
} from '../../data-models/response/error/ErrorResponse';
import { LoginModel } from '../../models/login/login';
import { UserProfile } from '../../models/user/UserProfile';

// TODO: Integrate AppState
/**
 * Strictly types the Sign In Modes
 */
export enum SignInModeEnum {
	SignIn = 'Sign In',
	SignUp = 'Sign Up',
	ResetPassword = 'Reset Password'
}

/**
 * Enumizes the pathnames of our web app
 */
export enum PathNamesEnum {
	SignUp = '/sign-up',
	SignIn = '/sign-in',
	ResetPassword = '/forgot',
	Onboarding = '/onboarding',
	Home = '/home'
}

/**
 * Interface for sign in view model
 */
export type ISignInViewModel = Readonly<SignInViewModel>;

/**
 * View model to store login data and submit login request for user
 */
export class SignInViewModel {
	/**
	 * First name for user sign up
	 */
	@observable
	public userName: string = '';
	/**
	 * Email for this login
	 */
	@observable
	public email: string = '';
	/**
	 * Password for this login
	 */
	@observable
	public password: string = '';
	/**
	 * Error to display on the UI
	 */
	@observable
	public error: IApiErrorData | undefined;
	/**
	 * True when the user has successfully been signed up, False otherwise
	 */
	@observable
	public signedUp: boolean = false;
	/**
	 * True when the login is successful, False otherwise
	 */
	@observable
	public loginSuccessful: boolean = false;
	/**
	 * True when a password reset has been successfully requested, False otherwise
	 */
	@observable
	public resetRequested: boolean = false;
	/**
	 * True when the Remember Me checkbox is checked
	 */
	@observable
	public rememberMe: boolean = true;
	/**
	 * Set to the custom redirect url
	 */
	// TODO: uncomment
	// @observable
	// public redirectUrl: string | null;
	/**
	 * True when we login/sign-up request in progress
	 */
	@observable
	public requestInProgress: boolean = false;
	/**
	 * Represents what mode the sign-in page is currently in
	 */
	@observable
	private mode: SignInModeEnum = SignInModeEnum.SignUp;
	/**
	 * True when there is an error with at least one input on the sign-in / sign-up / reset password form
	 */
	@observable
	private hasError: boolean = false;


	constructor() {
		makeObservable(this);
		// TODO: use cookie login
		// create url search params object
		// const urlParams = new URLSearchParams(window.location.search);
		// this.redirectUrl = urlParams.get('redirect');

		// AppState.attemptCookieLogin();
		// AppState.userInitialized.subscribe(() => {
		// 	this.login();
		// });

		const location: string = window.location.pathname;
		switch (location) {
			case PathNamesEnum.SignIn:
				this.mode = SignInModeEnum.SignIn;
				break;
			case PathNamesEnum.SignUp:
				this.mode = SignInModeEnum.SignUp;
				break;
			case PathNamesEnum.ResetPassword:
				this.mode = SignInModeEnum.ResetPassword;
				break;
		}
	}

	/**
	 * Display text for the sign up / in heading
	 */
	@computed
	public get signInHeadingText() {
		if (this.resetRequested) {
			return 'Check your email!';
		}

		switch (this.mode) {
			case SignInModeEnum.SignUp:
				return 'Sign up ';
			case SignInModeEnum.SignIn:
				return 'Sign in';
			case SignInModeEnum.ResetPassword:
				return 'Forgot your Password?';
			default:
				return '';
		}
	}

	/**
	 * Display text for the sign up / in description
	 */
	@computed
	public get signInDescriptionText() {
		if (this.resetRequested) {
			return 'You should receive an email in the next few minutes that will allow you to reset your password.';
		}

		switch (this.mode) {
			case SignInModeEnum.SignUp:
				return 'Get to hobbying!';
			case SignInModeEnum.SignIn:
				return 'Welcome back! Please enter your email address and password to enter your homebase';
			case SignInModeEnum.ResetPassword:
				return 'Enter your email address to reset your password. You may need to check your spam folder or unblock manage@hobbyhall.net.';
			default:
				return '';
		}
	}


	/**
	 * True if we should show the name input
	 */
	@computed
	public get showNameInputs(): boolean {
		return this.mode === SignInModeEnum.SignUp;
	}

	/**
	 * True if we should show the password input
	 */
	@computed
	public get showPasswordInput(): boolean {
		return this.mode !== SignInModeEnum.ResetPassword;
	}

	/**
	 * True if we should show Remember Me and Reset Password features
	 */
	@computed
	public get showRememberMeAndPassword(): boolean {
		return this.mode === SignInModeEnum.SignIn;
	}

	/**
	 * True if we should show the error notification
	 */
	@computed
	public get showErrorNotification(): boolean {
		return this.error?.message.length > 0;
	}

	/**
	 * Error message to display to the user
	 */
	@computed get errorMessage(): string | undefined {
		return this.error?.message;
	}

	/**
	 * Display text for the submit button
	 */
	@computed
	public get submitButtonText() {
		switch (this.mode) {
			case SignInModeEnum.SignUp:
				return 'Sign Up';
			case SignInModeEnum.SignIn:
				return 'Login';
			case SignInModeEnum.ResetPassword:
				return 'Submit';
			default:
				return '';
		}
	}

	/**
	 * True if we are in sign up mode
	 */
	@computed
	public get signUpMode(): boolean {
		return this.mode === SignInModeEnum.SignUp;
	}

	/**
	 * True if we should disable the Submit button
	 */
	@computed
	public get disableSubmit() {
		return (
			this.hasError ||
			(this.mode === SignInModeEnum.SignUp && this.invalidSignUp) ||
			(this.mode === SignInModeEnum.SignIn && this.invalidSignIn) ||
			(this.mode === SignInModeEnum.ResetPassword && this.invalidReset)
		);
	}

	/**
	 * True if sign up is invalid
	 */
	@computed
	private get invalidSignUp() {
		return (
			!this.userName.length ||
			this.invalidSignIn
		);
	}

	/**
	 * True if sign up will be invalid
	 */
	@computed
	private get invalidSignIn() {
		return !this.password.length || this.invalidReset;
	}

	/**
	 * True if reset password will be invalid
	 */
	@computed
	private get invalidReset() {
		return !this.email.length;
	}

	/**
	 * Sets the error state of the view model
	 */
	@action
	public setErrorState(value: boolean) {
		this.hasError = value;
	}

	/**
	 * Modify the userName
	 * @param value
	 */
	@action
	public onChangeUserName(value: string) {
		this.userName = value;
	}

	/**
	 * Modify the email
	 * @param value
	 */
	@action
	public onChangeEmail(value: string) {
		this.email = value;
	}

	/**
	 * Modify the password
	 * @param value
	 */
	@action
	public onChangePassword(value: string) {
		this.password = value;
	}


	/**
	 * Toggle the mode between Sign In and Sign Up
	 */
	@action
	public toggleSignUpMode() {
		if (this.mode === SignInModeEnum.SignUp) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			window.history.pushState({}, null as any, '/sign-in');
			this.mode = SignInModeEnum.SignIn;
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			window.history.pushState({}, null as any, '/sign-up');
			this.mode = SignInModeEnum.SignUp;
		}
	}

	/**
	 * Change the mode to reset password
	 */
	@action
	public startResetPasswordFLow() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		window.history.pushState({}, null as any, '/forgot');
		this.mode = SignInModeEnum.ResetPassword;
	}

	/**
	 * Toggle the value of remember me
	 */
	@action
	public toggleRememberMe() {
		this.rememberMe = !this.rememberMe;
	}

	public submit() {
		switch (this.mode) {
			case SignInModeEnum.SignIn:
				this.signIn();
				break;
			case SignInModeEnum.SignUp:
				this.signUp();
				break;
			case SignInModeEnum.ResetPassword:
				this.resetPassword();
				break;
		}
	}

	// TODO: authenticate with google option


	public signIn() {
		this.setRequestInProgress(true);
		LoginModel.login({
			email: this.email,
			pw: this.password,
			suppressSavingCookie: !this.rememberMe
		}).subscribe((response: unknown | IErrorResponse) => {
			const baseResponse = response as IErrorResponse;
			if (baseResponse.success) {
				// remove the error
				this.setError(undefined);
				// set login successful
				this.login();
			} else {
				const errorData: IApiErrorData = (response as IErrorResponse)
					.error;
				// set the error data
				this.setError({
					...errorData,
					message:
						'Invalid login. Please confirm your email and password are correct.'
				});
			}
			this.setRequestInProgress(false);
		});
	}

	/**
	 * Sign up a user
	 */
	public signUp() {
		this.setRequestInProgress(true);
		UserProfile.createUser({
			userName: this.userName,
			password: this.password,
			email: this.email
		}).subscribe((response: unknown | IErrorResponse) => {
			const baseResponse = response as IErrorResponse;
			if (baseResponse.success) {
				// remove the error
				this.setError(undefined);
				LoginModel.login({
					email: this.email,
					pw: this.password
				}).subscribe();
				//set login successful
				this.signUpSuccessful();
			} else {
				const errorData: IApiErrorData = (response as IErrorResponse)
					.error;
				// set the error data
				this.setError(errorData);
			}
			this.setRequestInProgress(false);
		});
	}

	public resetPassword() {
		if (!this.email.length) {
			this.setError({
				type: 'Constraint violation',
				code: 400,
				message:
					'Please provide your email to request a password reset.'
			});
		} else {
			this.setError(undefined);
			LoginModel.forgotPassword(this.email).subscribe(
				(response: IErrorResponse) => {
					if (response.success) {
						this.successfulResetRequest();
					} else {
						// set the error data
						this.setError(response.error);
					}
				}
			);
		}
	}

	/**
	 * Sets reset requested to true
	 */
	private successfulResetRequest() {
		this.resetRequested = true;
	}

	/**
	 * Modify the error
	 * @param value
	 */
	@action
	public setError(value: IApiErrorData | undefined) {
		this.error = value;
	}

	/**
	 * Trigger when sign-up was successful
	 */
	@action
	private signUpSuccessful() {
		this.signedUp = true;
	}

	/**
	 * Login successful
	 */
	@action
	private login() {
		this.loginSuccessful = true;
	}

	/**
	 * Sets authentication of the employee
	 * @param val
	 */
	@action
	private setRequestInProgress(val: boolean) {
		this.requestInProgress = val;
	}
}
