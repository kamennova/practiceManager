import { SQLTransaction } from "expo-sqlite";
import { db } from "./Db";

export const executeSql = async (query: string, params: any[] = []): Promise<SQLResultSet> =>
    new Promise((resolve, reject) =>
        db.transaction(tx =>
            tx.executeSql(
                query,
                params,
                (_, res) => resolve(res),
                (_, err) => {
                    console.log(err);
                    reject(err);
                    return false;
                }))
    );

export const parallelSql = async (sql: Array<{ query: string, params: any[] }>): Promise<SQLResultSet> =>
    new Promise((resolve, reject) =>
        db.transaction(tx => {
            sql.map(sqlItem => tx.executeSql(
                sqlItem.query,
                sqlItem.params,
                (_, res) => resolve(res),
                (_, err) => {
                    console.log(err);
                    reject(err);
                    return false;
                }));
        })
    );

export const executeTx = (tx: SQLTransaction, query: string, params: any[] = []): Promise<SQLResultSet> =>
    new Promise((resolve, reject) => {
        tx.executeSql(query, params,
            (_, res) => resolve(res),
            (_, err) => {
                console.log('err', err);
                reject(err);
                return false;
            });
    });
