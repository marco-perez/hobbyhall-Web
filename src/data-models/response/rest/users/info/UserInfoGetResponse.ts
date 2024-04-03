import { IBaseResponse } from '../../../BaseResponse';

/**
 * Response object for the /users/info request
 */
export interface IUserInfoGetResponse extends IBaseResponse {
	/**
	 * Response data for this request
	 */
	data: {
		profile: {
			name: string;
			id: number;
			email: string;
		};
		/**
		 * True when the user is a mock for testing (Not a real user)
		 */
		mockUser: boolean;
	};
}
