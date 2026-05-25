export interface BaseRequest {
	requestStarted?: Date;
}

export interface BaseIdRequest extends BaseRequest {
	id: number;
}

export interface BaseItemRequest<T> extends BaseRequest {
	item: T;
}
