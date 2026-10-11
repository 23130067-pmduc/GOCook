export interface BaseResponse<T> {
  success?: boolean;
  isSuccess?: boolean;
  message?: string;
  detail?: string;
  errorCode?: string;
  metadata?: T;
}

export interface PageResponse<T> {
  content: T[];
  number: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface UiMessage {
  type?: 'success' | 'error';
  text: string;
}
