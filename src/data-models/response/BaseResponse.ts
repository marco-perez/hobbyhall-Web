/**
 * Base shape for a response from the HobbyHall API
 */
export interface IBaseResponse {
	/**
	 * True if request successful, false otherwise
	 */
	success: boolean;
	/**
	 * Optional notification message to display to admins for successful requests
	 */
	successNotificationMessage: string;
}
