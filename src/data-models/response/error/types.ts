/**
 * Details all valid error codes to receive from the HobbyHall API
 */
export enum ErrorCodeEnum {
	Bad_Request = 400,
	Unauthorized = 401,
	Forbidden = 403,
	Not_Found = 404,
	Method_Not_Allowed = 405,
	Request_Timeout = 408,
	Too_Many_Requests = 429,
	Internal_Server_Error = 500,
	Bad_Gateway = 502,
	Service_Outage = 503
}
