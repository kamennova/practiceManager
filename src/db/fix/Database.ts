import * as SQLite from 'expo-sqlite';
import { Piece, PieceBase, PieceStatus } from "../../types/piece";
import { CheckResult } from "../validation";

import { createOneToManyTable, dbHelpers } from './dbCommon';

const AuthorItem = 'author';
const TagItem = 'tag';

type PieceRow = {
    id: number,
    name: string,
    isFavourite: boolean,
    lastPracticedOn: number,
    imageUri: string | null,
    timeSpent: number,
    addedOn: number,
    notifsOn: boolean,
    notifsInterval: number,
    notifId: number | null,
};

const rowToPieceBase = (row: PieceRow): PieceBase => ({
    id: row.id,
    imageUri: row.imageUri !== null ? row.imageUri : undefined,
    isFavourite: row.isFavourite,
    name: row.name,
    timeSpent: row.timeSpent,
    lastPracticedOn: new Date(row.lastPracticedOn),
    authors: [],
    tags: [],
    addedOn: new Date(row.addedOn),
    status: row.timeSpent > 0 ? PieceStatus.InWork : PieceStatus.NotStarted,
});

const rowToPiece = (row: PieceRow): Piece => ({
    ...rowToPieceBase(row),
    notifsOn: row.notifsOn,
    notifsInterval: row.notifsInterval,
    notifId: row.notifId,
    notes: [],
    recordings: [],
});

export default () => {
    const db = SQLite.openDatabase('PracticeManager');
    const { insertOneToManyItem } = dbHelpers(db);

    db.transaction(tx => {
        tx.executeSql(
            // DROP Table Pieces;
            'CREATE TABLE IF NOT EXISTS Pieces (' +
            'id integer primary key not null, ' +
            'name varchar(225) not null, ' +
            'addedOn timestamp not null, ' +
            'timeSpent smallint not null default 0, ' +
            'isFavourite boolean not null default false, ' +
            'imageUri varchar(225), ' +
            'lastPracticedOn timestamp, ' +
            'notifsOn boolean not null default false,' +
            'notifsInterval smallint default 3, ' +
            'notifId smallint, ' +
            'authors varchar(225)' +
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
        createTableTags(tx);
    });

    const getPiecesMeta = async (): Promise<PieceBase[]> => {
        return new Promise((resolve, reject) =>
            db.transaction(tx =>
                tx.executeSql('SELECT *, (SELECT tagName from Tag LEFT JOIN PieceTags ON Tag.id = PieceTags.tagId WHERE PieceTags.pieceId = Pieces.id) as tags FROM Pieces',
                    [],
                    (_, { rows }) => resolve(
                        // @ts-ignore
                        rows._array.map(rowToPieceBase)
                    ),
                    (_tr, err) => {
                        reject(err);
                        return false
                    }
                )));
    };

    const addPieceToDb = async (piece: Piece): Promise<number> => {
        const pieceId = await insertPiece(piece);

        if (piece.tags.length > 0) {
            await insertTags(piece.tags, pieceId);
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
        console.log('inserting piece...');

        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                tx.executeSql(`INSERT INTO Pieces (name,
                                                   addedOn,
                                                   notifsOn,
                                                   notifsInterval,
                                                   imageUri,
                                                   isFavourite,
                                                   timeSpent,
                                                   authors)
                               values (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        piece.name,
                        Date.now(),
                        piece.notifsOn,
                        piece.notifsInterval,
                        piece.imageUri !== undefined ? null : piece.imageUri,
                        piece.isFavourite,
                        0,
                        piece.authors.length > 0 ? piece.authors.join(', ') : '',
                    ],
                    (_tr, { insertId }) => {
                        console.log('piece insert');
                        return resolve(insertId);
                    },
                    (_tr, err) => {
                        console.log('error inserting piece');
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    const insertTags = async (tags: string[], pieceId: number) => {
        return await Promise.all([
            tags.map(tag => new Promise((_, reject) =>
                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO Tags (tag, pieceId)
                                   values (?, ?)`,
                        [tag, pieceId],
                        (_tr) => {
                            console.log('tag inserted insert');
                        },
                        (_tr, err) => {
                            console.log('error inserting tag');
                            reject(err);
                            return false;
                        }
                    )
                })))]);
    };

    const createTableTags = (tx: SQLTransaction) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Tags (' +
            'pieceId integer not null, ' +
            'tag varchar(225) not null ' +
            ')',
            [],
            () => console.log('table tags created'),
            (_tr, err) => {
                console.log('error creating table tags', err);
                return false
            });
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
                    (_tr, { insertId }) => {
                        return resolve(insertId);
                    },
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
