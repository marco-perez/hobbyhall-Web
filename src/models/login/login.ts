import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IErrorResponse } from '../../data-models/response/error/ErrorResponse';
import { ILoginPostResponse } from '../../data-models/response/rest/login/LoginPostResponse';
import { RestApiClient } from '../api/rest/restApiClientModel';
import { HttpMethodEnum } from '../api/rest/types';

export interface ILoginParams {
	/**
	 * Email to log in this user
	 */
	email?: string;
	/**
	 * Password to log in this user
	 */
	pw?: string;
	/**
	 * Cookie to log in this user
	 */
	cookie?: string;
	/**
	 * Optional: True when we should SUPPRESS saving a cookie
	 */
	suppressSavingCookie?: boolean;
}

export class LoginModel {
	static login(params: ILoginParams): Observable<IErrorResponse> {
		return RestApiClient.request<ILoginPostResponse>('/login', {
			method: HttpMethodEnum.POST,
			body: params
		}).pipe(
			map((response: ILoginPostResponse | IErrorResponse) => {
				const baseResponse = response as ILoginPostResponse;
				if (baseResponse.success) {
					// TODO: integrate AppState
					// const loginData = baseResponse.data;
					// set the user id
					// AppState.setUser(
					// 	loginData.uid,
					// 	loginData.cookie,
					// 	loginData.email,
					// 	loginData.firstLogin > 0,
					// 	!params.suppressSavingCookie
					// );
				}
				return response as IErrorResponse;
			})
		);
	}

	static forgotPassword(email: string): Observable<IErrorResponse> {
		return RestApiClient.request('/login/forgot-password', {
			method: HttpMethodEnum.POST,
			body: {
				email: email
			}
		});
	}

	static resetPassword(
		nonce: string,
		password: string
	): Observable<IErrorResponse> {
		return RestApiClient.request(`/login/reset`, {
			method: HttpMethodEnum.POST,
			body: {
				nonce: nonce,
				pw: password
			}
		});
	}
}
