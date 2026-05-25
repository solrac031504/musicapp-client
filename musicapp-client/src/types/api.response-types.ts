export interface BaseResponse {
	responseStarted?: Date;
	statusCode?: number;
}

export interface BaseListResponse<T> extends BaseResponse {
	items: T[];
	count: number;
}

export interface BaseItemResponse<T> extends BaseResponse {
	item: T;
}
