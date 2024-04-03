import { RestApiClient } from '../api/rest/restApiClientModel';
import { HttpMethodEnum } from '../api/rest/types';
import { ICreateUserPostResponse } from '../../data-models/response/rest/users/CreateUserPostResponse';
import {
	IErrorResponse
} from '../../data-models/response/error/ErrorResponse';
import { Observable} from 'rxjs';
import { action, makeObservable, observable } from 'mobx';
import { map } from 'rxjs/operators';


export type IUserProfile = Readonly<UserProfile>;

export interface IUserProfileParams {
	/**
	 * Unique id for this user
	 */
	// TODO: eventually makethis optional, we should use login cookies here
	uid: number;
	/**
	 * Name for logged in user
	 */
	name: string;
	/**
	 * Email for the logged in user
	 */
	email?: string;
	/**
	 * Cookie corresponding to this user's login
	 */
	cookie?: string;
}

export interface ICreateUserParams {
	/**
	 * Users name
	 */
	userName: string;
	/**
	 * Email of the user
	 */
	email: string;
	/**
	 * Password of the user
	 */
	password: string;
}

/**
 * Represents a user profile
 */
export class UserProfile implements IUserProfile {
	/**
	 * Display name of this user
	 */
	@observable
	public name: string;
	/**
	 * Unique identifier given to this user
	 *
	 */
	@observable
	public uid: number;
	/**
	 * Email for this user
	 */
	public email: string | undefined;

	/**
	 * Stores login cookie
	 */
	@observable
	public cookie: string | undefined;

	constructor(params: IUserProfileParams) {
		makeObservable(this);
		if (params.uid) {
			this.name = params.name;
			this.uid = params.uid;
			this.cookie = params.cookie;
			this.email = params.email;
		} else {
			console.error(
				'[UserProfile] no uid provided. Cannot create user profile...'
			);
			throw Error(
				'[UserProfile] no uid provided. Cannot create user profile...'
			);
		}
	}

	/**
	 * Create this users account
	 */
	static createUser(params: ICreateUserParams): Observable<IErrorResponse> {
		return RestApiClient.request<ICreateUserPostResponse>('/users', {
			method: HttpMethodEnum.POST,
			body: params
		}).pipe(
			map((response: ICreateUserPostResponse | IErrorResponse) => {
				const baseResponse = response as ICreateUserPostResponse;
				if (baseResponse.success) {
					// TODO: Use appState
					// const createUserData = (response as ICreateUserPostResponse)
						// .data;
					// set the user id
					// AppState.setUser(
					// 	createUserData.uid,
					// 	createUserData.cookie,
					// 	params.email,
					// 	true,
					// 	true
					// );
				}
				return response;
			})
		) as Observable<IErrorResponse>;
	}

}
