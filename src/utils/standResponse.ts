/**
 * create by yanle
 * create time 2019/7/21 6:55 PM
 */

export type StandResponse<T> = StandResponseSuccess<T> | StandResponseError;

interface StandResponseSuccess<T> {
  message: string;
  success: boolean;
  data: T;
}

interface StandResponseError {
  message: string;
  success: boolean;
}

export function responseSuccessData(data, message: string = '请求成功') {
  return {
    data,
    message,
    success: true,
  };
}

export function responseError(message: string = '请求失败') {
  return {
    message,
    success: false,
  }
};
