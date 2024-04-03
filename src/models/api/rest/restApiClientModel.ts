import Axios from 'axios-observable';
import { HttpMethodEnum, HttpRequestParams } from './types';
import { Observable, of } from 'rxjs';

import { AxiosError, AxiosResponse } from 'axios';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { catchError, map } from 'rxjs/operators';
import { IErrorResponse } from '../../../data-models/response/error/ErrorResponse';
import { IBaseResponse } from '../../../data-models/response/BaseResponse';

export interface IRestApiClientModel {
	/**
	 * Send an api request
	 */
	request(
		path: string,
		params: HttpRequestParams,
		managementAPI: boolean
	): Observable<IBaseResponse | IErrorResponse>;
}

export class RestApiClientModel implements IRestApiClientModel {
	/**
	 * An axios instance that we will use to send requests to our api
	 */
	private instance: Axios = Axios.create({});

	/**
	 * Responsible for configuring our axios instance
	 */
	constructor() {
		/**
		 * TODO: THIS IS TEMPORARY - JUST FOR DEVELOPMENT
		 */
		// set base url of our axios instance
		console.log('Base URL -> ' + import.meta.env.VITE_BASE_URL);
		this.instance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
		// set timeout to 30 seconds
		this.instance.defaults.timeout = 30000;
	}

	request<T = IBaseResponse>(
		path: string,
		params: HttpRequestParams,
		managementAPI: boolean = false
	) {
		// Send the correct bearer token in request headers
		if (managementAPI) {
			this.instance.defaults.headers.common[
				'Authorization'
			] = ('Bearer ' +
			import.meta.env.VITE_AUTH0_MGM_ACCESS_TOKEN) as string;
		} else {
			this.instance.defaults.headers.common[
				'Authorization'
			] = ('Bearer ' +
			import.meta.env.VITE_AUTH0_ACCESS_TOKEN) as string;
		}

		// execute the request
		let response: AxiosObservable<T>;
		switch (params.method) {
			case HttpMethodEnum.GET:
				response = this.instance.get(path);
				break;
			case HttpMethodEnum.POST:
				response = this.instance.post(path, params.body);
				break;
			case HttpMethodEnum.PUT:
				response = this.instance.put(path, params.body);
				break;
			case HttpMethodEnum.DELETE:
				response = this.instance.delete(path, {
					data: params.body
				});
				break;
		}
		return response.pipe(
			map((value: AxiosResponse<T>) => {
				return value.data as T;
			}),
			catchError((error: AxiosError<IErrorResponse>) => {
				console.log(error);
				return of(error.response?.data as IErrorResponse);
			})
		);
	}
}

export const RestApiClient = new RestApiClientModel();
