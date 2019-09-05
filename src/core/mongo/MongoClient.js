import { MongoClient } from 'mongodb';
import Config from 'config/config.json';

// let dbHandler = null;
export const connectMongo = () => {
    // if (dbHandler) {
    //     const dbOperator = dbHandler.db();
    //     return Promise.resolve(dbOperator);
    // }
    return new Promise((resolve) => {
        MongoClient.connect(Config.mongo.url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw new Error('无法连接mongo');
            const dbHandler = db;
            const dbOperator = db.db();
            resolve({
                dbHandler,
                dbOperator,
            });
        });
    });
};

// export const closeConnection = () => {
//     dbHandler.close();
//     dbHandler = null;
//     console.log('连接已关闭');
// };

export const findOne = (tableName, query) => {
    return new Promise(async (resolve) => {
        const { dbHandler, dbOperator } = await connectMongo();
        await dbOperator.collection(tableName).findOne(query, (err, result) => {
            if (err) throw err;
            dbHandler.close();
            resolve(result);
        });
    });
};

export const findArray = (tableName, query) => {
    return new Promise(async (resolve) => {
        const { dbHandler, dbOperator } = await connectMongo();
        await dbOperator.collection(tableName).find(query || {}).toArray((err, result) => {
            if (err) throw err;
            dbHandler.close();
            resolve(result);
        });
    });
};
