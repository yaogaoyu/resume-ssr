/**
 * 教育模块业务
 */

import { findArray } from 'core/mongo/MongoClient';

/**
 * Educations - Action
 * 负责Educations的业务处理
 */
export const getEducations = async () => {
    const result = await findArray('educations', {});
    return {
        type: 'edu-init-data',
        data: result,
    };
};
