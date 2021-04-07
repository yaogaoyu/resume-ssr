/**
 * 描述模块业务
 */

// import ApiClient from 'core/api/ApiClient';
import { findArray } from 'core/mongo/MongoClient';

/**
 * Description - Action
 * 负责Description的业务处理
 */
export const getJobs = async () => {
    // const result = await ApiClient.get('api test1');
    let result = await findArray('jobs', {});
    // eslint-disable-next-line no-underscore-dangle
    result = result.sort((a, b) => { return b._id - a._id; });
    return {
        type: 'jobs-init-data',
        data: result,
    };
};
