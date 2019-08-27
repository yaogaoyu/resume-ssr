/**
 * 定义参数异常组件。
 *
 * @author    姚尧 <yaoyao2@douyu.tv>
 */

export default class ParameterNotMatchException extends Error {
    /* Exceptions for Remote START */
    static MSG = '传入参数不匹配';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ParameterNotMatchException);
        }
        this.name = 'ParameterNotMatchException';
        this.message = `${ParameterNotMatchException.MSG}. ${message}`;
    }
}
