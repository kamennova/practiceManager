import * as SQLite from 'expo-sqlite';
import { Piece } from "../types/Piece";
import { dbHelpers } from './dbCommon';
import { createOneToManyTable } from './dbCommon';

const AuthorItem = 'author';
const TagItem = 'tag';

const rowToPiece = (row: any) => ({
    name: row.pieceName,
    timeSpent: 0,
    notificationsOn: false,
    notificationsInterval: 2,
    authors: row.authors.split(','),
    lastPracticedOn: new Date(row.lastPracticedOnDate),
});

export default () => {
    const db = SQLite.openDatabase('PracticeManager');
    const { insertOneToManyItem } = dbHelpers(db);

    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Pieces (' +
            'id integer primary key not null,' +
            ' pieceName varchar(225) not null,' +
            ' addedOnDate timestamp not null,' +
            ' lastPracticedOnDate timestamp,' +
            'notificationsOn smallint default 0,' +
            'notifications interval smallint default 3' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('error creating table pieces', err);
                return false
            });

        createOneToManyTable(AuthorItem, tx);
        createOneToManyTable(TagItem, tx);
    });

    const getAllPieces = async (): Promise<Piece[]> => {
        return new Promise((resolve, reject) =>
            db.transaction(tx =>
                tx.executeSql('SELECT * FROM Pieces',
                    [],
                    (_, { rows }) => resolve(
                        // @ts-ignore
                        rows._array.map(rowToPiece)
                    ),
                    (_tr, err) => {
                        reject(err);
                        return false
                    }
                )));
    };

    const addPiece = async (piece: Piece): Promise<void> => {
        const pieceId = await insertPiece(piece);

        if (piece.authors !== undefined) {
            await Promise.all(piece.authors.map(author => insertPieceAuthor(pieceId, author)));
        }

        if (piece.tags !== undefined) {
            await Promise.all(piece.tags.map(tag => insertPieceTag(pieceId, tag)));
        }
    };

    const insertPiece = async (piece: Piece): Promise<number> => {
        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                tx.executeSql(`INSERT INTO Pieces (pieceName, addedOnDate, notificationsOn, notificationsInterval)
                               values (?, ?, ?, ?)`,
                    [
                        piece.name,
                        Date.now(),
                        piece.notificationsOn,
                        piece.notificationsInterval
                    ],
                    (_tr, { insertId }) => resolve(insertId),
                    (_tr, err) => {
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    const insertPieceAuthor = async (pieceId: number, author: string): Promise<void> => {
        await insertOneToManyItem(pieceId, author, AuthorItem);
    };

    const insertPieceTag = async (pieceId: number, tag: string): Promise<void> => {
        await insertOneToManyItem(pieceId, tag, TagItem,);
    };

    const getPiecesByName = async (name: string): Promise<Piece[]> =>
        new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(
                    `SELECT *
                     FROM Pieces
                     WHERE pieceName = ?`,
                [name],
                (_, { rows }) => resolve(
                    // @ts-ignore
                    rows._array.map(rowToPiece)
                ),
                (_tr, err) => {
                    reject(err);
                    return false
                }
            )
        }));

    return { getAllPieces, addPiece, getPiecesByName };
};
