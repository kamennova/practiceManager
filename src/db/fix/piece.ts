import { Piece, PieceBase, PieceStatus } from "../../types/piece";
import { CheckResult } from "../validation";
import { db } from "./Db";
import { executeSql } from "./common";
import { PieceRow } from "./RowTypes";

const rowToPieceBase = (row: PieceRow, tags?: string[]): PieceBase => ({
    id: row.id,
    imageUri: row.imageUri !== null ? row.imageUri : undefined,
    isFavourite: row.isFavourite !== 0,
    name: row.name,
    timeSpent: row.timeSpent,
    lastPracticedOn: row.lastPracticedOn !== null ? new Date(row.lastPracticedOn) : undefined,
    authors: row.authors !== '' ? row.authors.split(', ') : [],
    addedOn: new Date(row.addedOn),
    status: row.timeSpent > 0 ? PieceStatus.InWork : PieceStatus.NotStarted,
    tags: tags !== undefined ? tags : [],
});

const rowToPiece = (row: PieceRow, tags: string[], notes: []): Piece => ({
    ...rowToPieceBase(row, tags),
    notifsOn: row.notifsOn,
    notifsInterval: row.notifsInterval,
    notifId: row.notifId,
    notes,
    recordings: [],
});

export const getPiecesMeta = async (): Promise<PieceBase[]> => {
    console.log('get pieces');
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

export const addPieceToDb = async (piece: Piece): Promise<number> => {
    const pieceId = await insertPiece(piece);

    if (piece.tags.length > 0) {
        await insertTags(piece.tags, pieceId);
    }

    return pieceId;
};

export const updatePieceInDb = async (piece: Piece): Promise<void> => {
    await new Promise((_, reject) =>
        db.transaction(tx => {
            tx.executeSql('UPDATE Pieces SET name = ?, imageUri = ?, authors  = ? WHERE id = ?',
                [
                    piece.name,
                    piece.imageUri !== undefined ? piece.imageUri : null,
                    piece.authors.length > 0 ? piece.authors.join(', ') : '',
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

export const insertPiece = async (piece: Piece): Promise<number> => {
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

export const insertTags = async (tags: string[], pieceId: number) => {
    return await Promise.all([
        tags.map(tag => new Promise((_, reject) =>
            db.transaction(tx => {
                tx.executeSql('INSERT INTO Tags (tag, pieceId) VALUES (?, ?)',
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

export const toggleIsFavourite = async (id: number): Promise<void> => {
    await executeSql('UPDATE Pieces SET isFavourite = CASE isFavourite WHEN 0 THEN 1 ELSE 0 END WHERE id = ?',
        [id]);
};

export const deletePieceFromDb = async (id: number): Promise<void> => {
    await executeSql('DELETE FROM Pieces WHERE id = ?', [id]);
};

export const getNotificationId = async (id: number): Promise<number | null> =>
    await executeSql('SELECT notifId FROM Pieces WHERE id = ?', [id])
    // @ts-ignore
        .then((res) => res.rows._array[0].notifId);

export const validatePiece = async (piece: Piece): Promise<CheckResult> => {
    if (piece.name.length === 0) {
        return Promise.resolve({ valid: false, errors: 'You forgot to enter piece title ✍' });
    }

    return await executeSql('SELECT COUNT(*) as count FROM Pieces WHERE name = ? AND NOT id = ?',
        [piece.name, piece.id])
    // @ts-ignore
        .then((res) => res.rows._array[0].count > 0 ? ({
            valid: false,
            errors: 'Piece with the same name already exists'
        }) : ({ valid: true }));
};

export const getPieceById = async (id: number): Promise<Piece | undefined> => {
    const piece = await fetchPiece(id);

    if (piece === undefined) {
        return undefined;
    }

    const tags = await fetchTags(id);

    return rowToPiece(piece, tags, []);
};

export const fetchPiece = (id: number): Promise<PieceRow | undefined> => new Promise((resolve, reject) =>
    db.transaction(tx => tx.executeSql('SELECT * FROM Pieces WHERE id = ?',
        [id],
        // @ts-ignore
        (_tr, { rows }) => rows.length === 0 ? resolve(undefined) : resolve(rows._array[0]),
        (_tr, err) => {
            console.log('error getting piece by id');
            reject(err);
            return false;
        })
    ));

export const fetchTags = async (pieceId: number): Promise<string[]> =>
    await executeSql('SELECT tag FROM Tags WHERE pieceId = ?',
        [pieceId])
    // @ts-ignore
        .then((res) => res.rows._array.map(item => item.tag));

export const updateNotifInterval = async (id: number, interval: number): Promise<void> => {
    console.log('updating interval, ', id, interval);
};

export const updateNotifId = async (pieceId: number, notifId: number | null): Promise<void> => {
    console.log('updating notif id, ', pieceId, notifId);
};

export const updatePracticeDetails = async (pieceId: number, practiceTime: number): Promise<void> => {
    await executeSql('UPDATE Pieces SET timeSpent = timeSpent + ? WHERE id = ?',
        [practiceTime, pieceId],
    );
};
