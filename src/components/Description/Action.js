/**
 * 描述模块业务
 */

// import ApiClient from 'core/api/ApiClient';
import { findOne } from 'core/mongo/MongoClient';

/**
 * Description - Action
 * 负责Description的业务处理
 */
export const getInspect = async () => {
    // const result = await ApiClient.get('api test1');
    const result = await findOne('description', {});
    return {
        type: 'init-data',
        data: result,
    };
};
