/**
 * 定义视图标识未定义的异常组件。
 *
 * @author    姚尧 <yaoyao2@douyu.tv>
 */

export default class ViewKeyUndefinedException extends Error {
    /* Exceptions for Remote START */
    static MSG = '视图标识未定义';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ViewKeyUndefinedException);
        }
        this.name = 'ViewKeyUndefinedException';
        this.message = `${ViewKeyUndefinedException.MSG}. ${message}`;
    }
}
