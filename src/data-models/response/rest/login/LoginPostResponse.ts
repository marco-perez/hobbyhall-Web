import { IBaseResponse } from '../../BaseResponse';

/**
 * Response object from POST /login
 */
export interface ILoginPostResponse extends IBaseResponse {
	/**
	 * Data returned with the response from POST /login
	 */
	data: {
		/**
		 * Response code of the request
		 */
		response: number;
		/**
		 * Unique id of the user we have logged in
		 */
		uid: number;
		/**
		 * Email for the user who logged in
		 */
		email: string;
		/**
		 * Cookie for this user's login
		 */
		cookie: string;
		/**
		 * Nonzero if this is the user's first login
		 */
		firstLogin: number;
		/**
		 * One-time nonce associated with this user
		 */
		nonce: string;
	};
}
