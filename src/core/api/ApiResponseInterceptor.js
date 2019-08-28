/**
 * 定义API响应拦截器
 * @author 姚尧<yaogaoyu@qq.com>
 */

// import { Log } from 'util';

export default class ApiResponseInterceptor {
    /**
     * 响应拦截处理
     * response Array|ApiResponseHandler Api响应处理对象，数组或对象
     */
    perform(response) {
        const { data } = response;
        const { code } = data;
        switch (code) {
            case 0:
            case '0':
            case 200:
            case '200':
                // Log.debug(`请求接口成功[${config.method}-${config.url}], ${JSON.stringify(data)}`);
                // return Promise.resolve(data);
                return data;
            default:
                // Log.debug(`接口返回异常数据[${config.method}-${config.url}], ${JSON.stringify(data)}`);
                return Promise.reject({
                    error: -1,
                    code: data.code,
                    reason: data.msg || '接口错误',
                    data: data.data || data.result,
                });
        }
        // return response;
    }

    errorHandler(err) {
        const { response } = err;
        return Promise.reject(response.data.message || `服务器错误[status=${response.status}]`);
    }
}
