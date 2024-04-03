import { IBaseResponse } from '../BaseResponse';
import { ErrorCodeEnum } from './types';

/**
 * Data on the error which occurred on the server
 */
export interface IApiErrorData {
	/**
	 * Details the type of error which occurred
	 */
	type: string;
	/**
	 * The numeric code associated with the error
	 */
	code: ErrorCodeEnum;
	/**
	 * Detailed message associated with the error
	 */
	message: string;
}

/**
 * Error response object that all Intros api responses will return if not successful
 */
export interface IErrorResponse extends IBaseResponse {
	/**
	 * Contains information on the error which occurred
	 */

	error: IApiErrorData;
}
