import { IBaseResponse } from '../../BaseResponse';

/**
 * Response object from POST /users
 */
export interface ICreateUserPostResponse extends IBaseResponse {
	/**
	 * Data returned with the response from POST /v2/login
	 */
	data: {
		/**
		 * Unique id of the user we have logged in
		 */
		uid: number;
		/**
		 * Cookie for this user's login
		 */
		cookie?: string;
	};
}
