/**
 * 定义字段未定义异常组件。
 *
 * @author    姚尧 <yaoyao2@douyu.tv>
 */

export default class NetworkException extends Error {
    /* Exceptions for Remote START */
    static MSG = '网络异常或服务器错误';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, NetworkException);
        }
        this.name = 'NetworkException';
        this.message = `${NetworkException.MSG}. ${message}`;
    }
}
