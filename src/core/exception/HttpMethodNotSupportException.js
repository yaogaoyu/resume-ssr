/**
 * 定义网络请求Method不支持异常组件。
 *
 * @author    姚尧 <yaoyao2@douyu.tv>
 */

export default class HttpMethodNotSupportException extends Error {
    /* Exceptions for Remote START */
    static MSG = '不支持的请求Method';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, HttpMethodNotSupportException);
        }
        this.name = 'HttpMethodNotSupportException';
        this.message = `${HttpMethodNotSupportException.MSG}. ${message}`;
    }
}
