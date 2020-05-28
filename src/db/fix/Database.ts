import { Piece, PieceBase, PieceStatus } from "../../types/piece";
import { CheckResult } from "../validation";
import { db } from "./Db";
import { PieceRow } from "./RowTypes";

const rowToPieceBase = (row: PieceRow): PieceBase => ({
    id: row.id,
    imageUri: row.imageUri !== null ? row.imageUri : undefined,
    isFavourite: row.isFavourite !== 0,
    name: row.name,
    timeSpent: row.timeSpent,
    lastPracticedOn: row.lastPracticedOn !== null ? new Date(row.lastPracticedOn) : undefined,
    authors: row.authors !== '' ? row.authors.split(', ') : [],
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
    console.log('db funcs');

    const getPiecesMeta = async (): Promise<PieceBase[]> => {
        return new Promise((resolve, reject) =>
            db.transaction(tx =>
                tx.executeSql('SELECT *, (SELECT tag FROM Tags WHERE pieceId = Pieces.id) as tags FROM Pieces',
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
                        piece.imageUri !== undefined ? piece.imageUri : null,
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
                        piece.imageUri !== undefined ? piece.imageUri : null,
                        piece.isFavourite ? 1 : 0,
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
                            console.log('tag inserted,', tag);
                        },
                        (_tr, err) => {
                            console.log('error inserting tag');
                            reject(err);
                            return false;
                        }
                    )
                })))]);
    };

    const toggleIsFavourite = async (id: number): Promise<void> => {
        await new Promise((_, reject) =>
            db.transaction(tx => {
                tx.executeSql(`UPDATE Pieces
                               SET isFavourite = CASE isFavourite WHEN 0 THEN 1 ELSE 0 END
                               WHERE id = ?`,
                    [id],
                    () => console.log('toggle fav'),
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

    const getPieceById = async (id: number): Promise<Piece | undefined> => {
        return await new Promise((resolve, reject) =>
            db.transaction(tx => {
                tx.executeSql(`SELECT *, (SELECT tag FROM Tags WHERE pieceId = Pieces.id) as tags
                               FROM Pieces
                               WHERE id = ?`,
                    [id],
                    // @ts-ignore
                    (_tr, { rows }) => {
                        console.log(rows);

                        if (rows.length === 0) {
                            return resolve(undefined);
                        }

                        return resolve(rowToPiece(rows._array[0]));
                    },
                    (_tr, err) => {
                        console.log('error getting piece by id');
                        reject(err);
                        return false;
                    }
                )
            }));
    };

    const updateNotifInterval = async (id: number, interval: number): Promise<void> => {
        console.log('updating interval, ', id, interval);
    };

    const updateNotifId = async (pieceId: number, notifId: number | null): Promise<void> => {
        console.log('updating notif id, ', pieceId, notifId);
    };

    const updatePracticeDetails = async (pieceId: number, practiceTime: number): Promise<void> => {
        console.log('update practice details', pieceId, practiceTime);
    };

    return {
        getPiecesMeta,
        addPieceToDb,
        updatePieceInDb,
        deletePieceFromDb,
        getNotificationId,
        toggleIsFavourite,
        validatePiece,
        getPieceById,
        updateNotifInterval,
        updateNotifId,
        updatePracticeDetails,
    };
};
