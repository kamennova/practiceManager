import { SQLTransaction, WebSQLDatabase } from "expo-sqlite";
import { capitalize } from "../../utils/strings";

export type ItemResult = {
    id: number,
    name: string,
}

const getItemTableName = (itemName: string): string => capitalize(itemName);

const getItemColName = (itemName: string): string => itemName + 'Name';

const getItemJointTableName = (itemName: string): string => 'Piece' + getItemTableName(itemName) + 's';

const getItemIdColName = (itemName: string) => itemName + 'Id';

export const dbHelpers = (db: WebSQLDatabase) => {

    const findItemByName = async (itemNameValue: string, tableName: string, colName: string): Promise<ItemResult | undefined> => new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(
            `SELECT *
                     FROM ${tableName}
                     WHERE ${colName} = ?
                     LIMIT 1`,
            [itemNameValue],
            (_, { rows }) => {
                if (rows.length === 0) {
                    resolve(undefined);
                } else {
                    resolve(
                        // @ts-ignore
                        rows._array.map(row => ({ name: row.authorName, id: row.id }))[0]
                    );
                }
            },
            (_tr, err) => {
                reject(err);
                return false
            }
        )
    }));

    const insertOneToManyItem = async (pieceId: number, itemValue: string, itemName: string): Promise<void> => {
        const tableName = getItemTableName(itemName);
        const colName = getItemColName(itemName);
        const jointTableName = getItemJointTableName(itemName);
        const idColName = getItemIdColName(itemName);

        const itemRes = await findItemByName(itemValue, tableName, colName);
        const itemId = itemRes === undefined ? await addItem(itemValue, tableName, colName) : itemRes.id;

        return new Promise((_resolve, reject) => db.transaction(tx => tx.executeSql(
            `INSERT INTO ${jointTableName} (pieceId, ${idColName}) VALUES (?, ?)`,
            [pieceId, itemId],
            undefined,
            (_tr, err) => {
                reject(err);
                return false;
            }
        )));
    };

    const addItem = async (itemNameValue: string, tableName: string, colName: string): Promise<number> => new Promise(
        (resolve, reject) => db.transaction(tx =>
            tx.executeSql(`INSERT INTO ${tableName} (${colName}) VALUES (?)`,
                [itemNameValue],
                (_tr, { insertId }) => resolve(insertId),
                (_tr, err) => {
                    reject(err);
                    return false;
                },
            )
        )
    );

    return { insertOneToManyItem };
};

export const createOneToManyTable = (itemName: string, tx: SQLTransaction) => {
    const tableName = getItemTableName(itemName);
    const colName = getItemColName(itemName);
    const jointTableName = getItemJointTableName(itemName);
    const itemIdColName = getItemIdColName(itemName);

    tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (id integer primary key not null, ${colName} varchar(225) UNIQUE not null )`,
        [],
        undefined,
        (_tr, err) => {
            console.log(`err creating table ${tableName}`, err);
            return false;
        });

    tx.executeSql(`CREATE TABLE IF NOT EXISTS ${jointTableName} (pieceId integer not null, ${itemIdColName} integer not null)`,
        [],
        undefined,
        (_tr, err) => {
            console.log(`err creating table ${jointTableName}`, err);
            return false;

        });
};
