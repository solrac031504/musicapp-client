export interface BaseRequest {
	requestStarted: Date;
}

export interface BaseItemRequest<T> extends BaseRequest {
	item: T;
}
