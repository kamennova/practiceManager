import * as SQLite from 'expo-sqlite';
import { Piece, PieceBase, PieceStatus } from "../../types/piece";
import { CheckResult } from "../validation";

import { createOneToManyTable, dbHelpers } from './dbCommon';

const AuthorItem = 'author';
const TagItem = 'tag';

const rowToPiece = (row: any): PieceBase => ({
    id: row.id,
    isFavourite: row.isFavourite,
    name: row.pieceName,
    timeSpent: 0,
    authors: row.authors.split(','),
    lastPracticedOn: new Date(row.lastPracticedOnDate),
    tags: [],
    addedOn: row.addedOn,
    status: PieceStatus.NotStarted,
});

export default () => {
    const db = SQLite.openDatabase('PracticeManager');
    const { insertOneToManyItem } = dbHelpers(db);

    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Pieces (' +
            'id integer primary key not null, ' +
            'name varchar(225) not null, ' +
            'addedOn timestamp not null, ' +
            'timeSpent smallint not null default 0, ' +
            'isFavourite boolean not null default false, ' +
            'imageUri varchar(225), ' +
            'lastPracticedOn timestamp, ' +
            'notifsOn smallint default 0,' +
            'notifsInterval smallint default 3, ' +
            'notifId varchar(225) ' +
            ')',
            [],
            () => {
                console.log('table created')
            },
            (_tr, err) => {
                console.log('error creating table pieces', err);
                return false
            });

        createOneToManyTable(AuthorItem, tx);
        createOneToManyTable(TagItem, tx);
    });

    const getPiecesMeta = async (): Promise<PieceBase[]> => {
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

    const addPieceToDb = async (piece: Piece): Promise<number> => {
        const pieceId = await insertPiece(piece);

        if (piece.authors !== undefined) {
            await Promise.all(piece.authors.map(author => insertPieceAuthor(pieceId, author)));
        }

        if (piece.tags !== undefined) {
            await Promise.all(piece.tags.map(tag => insertPieceTag(pieceId, tag)));
        }

        return pieceId;
    };

    const updatePieceInDb = async (piece: Piece): Promise<void> => {
        await new Promise((_, reject) =>
            db.transaction(tx => {
                tx.executeSql(`UPDATE Pieces
                               SET name     = ?,
                                   imageUri = ?
                               WHERE id = ?`,
                    [
                        piece.name,
                        piece.imageUri,
                        piece.id,
                    ],
                    undefined,
                    (_tr, err) => {
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    const insertPiece = async (piece: Piece): Promise<number> => {
        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                tx.executeSql(`INSERT INTO Pieces (name,
                                                   addedOn,
                                                   notifsOn,
                                                   notifsInterval,
                                                   imageUri,
                                                   isFavourite,
                                                   timeSpent)
                               values (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        piece.name,
                        Date.now(),
                        piece.notifsOn,
                        piece.notifsInterval,
                        piece.imageUri !== undefined ? null : piece.imageUri,
                        piece.isFavourite,
                        0,
                    ],
                    (_tr, { insertId }) => resolve(insertId),
                    (_tr, err) => {
                        console.log('error inserting piece');
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    const toggleIsFavourite = async (id: number): Promise<void> => {
        await new Promise((_, reject) =>
            db.transaction(tx => {
                tx.executeSql(`UPDATE Pieces
                               SET isFavourite = NOT isFavourite
                               WHERE id = ?`,
                    [id],
                    undefined,
                    (_tr, err) => {
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    const deletePieceFromDb = async (id: number): Promise<void> => {
        await new Promise((_, reject) => db.transaction(tx =>
            tx.executeSql('DELETE FROM Pieces WHERE id = ?',
                [id],
                () => {
                    console.log('deleted successfully');
                },
                (_tr, err) => {
                    reject(err);
                    return false;
                }
            )));
    };

    const getNotificationId = async (id: number): Promise<number> => {
        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                tx.executeSql(`SELECT notifId
                               FROM Pieces
                               WHERE id = ?`,
                    [id],
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

    const validatePiece = async (piece: Piece): Promise<CheckResult> => {
        if (piece.name.length === 0) {
            return Promise.resolve({ valid: false, errors: 'You forgot to enter piece title ✍' });
        }

        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                tx.executeSql(`SELECT COUNT(*) as count
                               FROM Pieces
                               WHERE name = ?
                                 AND NOT id = ?`,
                    [piece.name, piece.id],
                    // @ts-ignore
                    (_tr, { rows }) => rows._array.count > 0 ? resolve({
                        valid: false,
                        errors: 'Same name'
                    }) : resolve({ valid: true }),
                    (_tr, err) => {
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    return {
        getPiecesMeta,
        addPieceToDb,
        updatePieceInDb,
        deletePieceFromDb,
        getNotificationId,
        toggleIsFavourite,
        validatePiece
    };
};
