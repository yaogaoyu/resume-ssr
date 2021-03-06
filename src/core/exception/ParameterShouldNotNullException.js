/**
 * 定义参数不应为空异常组件。
 *
 * @author    姚尧 <yaogaoyu@qq.com>
 */

export default class ParameterShouldNotNullException extends Error {
    static MSG = '传入参数不应为空';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ParameterShouldNotNullException);
        }
        this.name = 'ParameterShouldNotNullException';
        this.message = `${ParameterShouldNotNullException.MSG}. ${message}`;
    }
}
