export interface CommonResponse {
    success?: boolean;
    message?: string;
}

export interface ApiResponse<T = unknown> extends CommonResponse {
    data?: T
}