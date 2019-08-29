import { MongoClient } from 'mongodb';
import Config from 'config/config.json';

let dbHandler = null;
let dbOperator = null;
export const connectMongo = () => {
    return new Promise((resolve) => {
        MongoClient.connect(Config.mongo.url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw new Error('无法连接mongo');
            console.log('mongo已连接');
            dbHandler = db;
            dbOperator = db.db();
            resolve();
        });
    });
};

export const closeConnection = () => {
    dbHandler.close();
};

export const findOne = (tableName, query) => {
    return new Promise(async (resolve) => {
        await connectMongo();
        await dbOperator.collection(tableName).findOne(query, (err, result) => {
            if (err) throw err;
            closeConnection();
            dbHandler = null;
            resolve(result);
        });
    });
};
