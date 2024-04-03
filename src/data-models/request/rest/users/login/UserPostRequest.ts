/**
 * Enumizes our request to POST /users
 * This is used to create a new user
 */
export interface IUserPostRequest {
	/**
	 * Username
	 */
	name: string;
	/**
	 * User account email
	 */
	email: string;
	/**
	 * User account password
	 */
	password: string; 
}
