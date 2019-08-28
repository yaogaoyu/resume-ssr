/**
 * 定义接口异常组件。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 */

export default class ApiPerformException extends Error {
    /* Exceptions for Remote START */
    static MSG = '接口错误';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ApiPerformException);
        }
        this.name = 'ApiPerformException';
        this.message = `${ApiPerformException.MSG}. ${message}`;
    }
}
