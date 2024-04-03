import { IErrorResponse } from '../../../data-models/response/error/ErrorResponse';

/**
 * Declares valid request methods for the RestApiClientModel
 */
export enum HttpMethodEnum {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	GET = 'GET'
}

/**
 * Response received by Axios after a request to our api
 */
export type AxiosResponseWrapper<T> = {
	/**
	 * Base Http Response wrapped by Axios
	 */
	response: BaseHttpResponse<T>;
};

/**
 * Base Http Response returned by our api
 */
export type BaseHttpResponse<T> = {
	/**
	 * Status code of the response
	 */
	status: number;
	/**
	 * Data response from the endpoint
	 */
	data?: T;
	/**
	 * Error response from the endpoint
	 */
	error?: IErrorResponse;
};

export type HttpRequestParams<TBody = unknown> =
	| {
			method: HttpMethodEnum.GET;
	  }
	| {
			method: HttpMethodEnum.DELETE;
			body: TBody;
	  }
	| {
			method: HttpMethodEnum.POST;
			body: TBody;
	  }
	| {
			method: HttpMethodEnum.PUT;
			body: TBody;
	  };
