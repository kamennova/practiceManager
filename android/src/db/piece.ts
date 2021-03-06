import { Note } from "common/types/Note";
import { Piece, PieceBase } from "common/types/piece";
import { getSeconds } from "common/utils/time";
import { executeSql } from "./common";
import { rowToNote, rowToPiece } from "./RowTransform";
import { PieceRow } from "./RowTypes";

export const getPiecesMeta = async (): Promise<PieceBase[]> => {
    const pieces: Piece[] = await executeSql(
        'SELECT *, (SELECT tag FROM Tags WHERE pieceId = Pieces.id) as tags FROM Pieces', [])
    // @ts-ignore
        .then(({ rows }) => rows._array.map(row => rowToPiece(row, [], [])));

    return Promise.all(pieces.map(
        piece => Promise.all([fetchTags(piece.id), fetchNotes(piece.id)])
            .then(([tags, notes]) => ({ ...piece, tags, notes }))
    ))
};

export const addPieceToDb = async (piece: Piece): Promise<number> => {
    const pieceId = await insertPiece(piece);
    await insertTags(piece.tags, pieceId);

    return pieceId;
};

export const updatePieceInDb = async (piece: Piece): Promise<void> => {
    await Promise.all([
        executeSql('UPDATE Pieces SET name = ?, imageUri = ?, author = ? WHERE id = ?',
            [
                piece.name,
                piece.imageUri !== undefined ? piece.imageUri : null,
                piece.author !== undefined ? piece.author : null,
                piece.id,
            ]),
        deleteTags(piece.id)]);

    await insertTags(piece.tags, piece.id);
};

const deleteTags = async (pieceId: number): Promise<void> => {
    await executeSql('DELETE FROM Tags WHERE pieceId = ?', [pieceId]);
};

export const insertPiece = async (piece: Piece): Promise<number> =>
    await executeSql(
            `INSERT INTO Pieces (name, addedOn, notifsOn, notifsInterval, imageUri, isFavourite, timeSpent, author)
             values (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            piece.name,
            Date.now(),
            piece.notifsOn ? 1 : 0,
            piece.notifsInterval,
            piece.imageUri !== undefined ? piece.imageUri : null,
            piece.isFavourite ? 1 : 0,
            0,
            piece.author !== undefined ? piece.author : null,
        ]).then(({ insertId }) => {
        return insertId;
    });

export const insertTags = async (tags: string[], pieceId: number) =>
    await Promise.all([
        tags.map(tag =>
            executeSql('INSERT INTO Tags (tag, pieceId) VALUES (?, ?)', [tag, pieceId])
        )
    ]);

export const toggleIsFavourite = async (id: number): Promise<void> => {
    await executeSql('UPDATE Pieces SET isFavourite = CASE isFavourite WHEN 0 THEN 1 ELSE 0 END WHERE id = ?',
        [id]);
};

export const deletePieceFromDb = async (id: number): Promise<void> => {
    await Promise.all([
        executeSql('DELETE FROM Pieces WHERE id = ?', [id]),
        deleteTags(id),
        deletePieceActivities(id),
    ]);
};

const deletePieceActivities = async (pieceId: number): Promise<void> => {
    await executeSql(
        'DELETE FROM PlanActivities WHERE activityId IN (SELECT id FROM Activities WHERE Activities.pieceId = ?)',
        [pieceId])
        .then(() => executeSql('DELETE FROM Activities WHERE pieceId = ?', [pieceId]));
};

export const getNotificationId = async (id: number): Promise<number | null> =>
    await executeSql('SELECT notifId FROM Pieces WHERE id = ?', [id])
    // @ts-ignore
        .then((res) => res.rows._array[0].notifId);

export const getPieceById = async (id: number): Promise<Piece | undefined> => {
    const piece = await fetchPiece(id);

    if (piece === undefined) {
        return undefined;
    }

    const [tags, notes] = await Promise.all([fetchTags(id), fetchNotes(id)]);

    return rowToPiece(piece, tags, notes);
};

const fetchPiece = (id: number): Promise<PieceRow | undefined> =>
    executeSql('SELECT * FROM Pieces WHERE id = ?', [id])
    // @ts-ignore
        .then(({ rows }) => rows.length === 0 ? undefined : rows._array[0]);

const fetchTags = async (pieceId: number): Promise<string[]> =>
    await executeSql('SELECT tag FROM Tags WHERE pieceId = ?', [pieceId])
    // @ts-ignore
        .then((res) => res.rows._array.map(item => item.tag));

const fetchNotes = async (pieceId: number): Promise<Note[]> =>
    await executeSql('SELECT * FROM Notes WHERE pieceId = ?', [pieceId])
    // @ts-ignore
        .then((res) => res.rows._array
            .map(rowToNote));

export const addNoteToDb = async (content: string, pieceId: number): Promise<number> =>
    await executeSql('INSERT INTO Notes (content, pieceId, addedOn) VALUES (?, ?, ?)',
        [content, pieceId, getSeconds()])
        .then(({ insertId }) => insertId);

export const deleteNoteFromDb = async (id: number): Promise<void> => {
    await executeSql('DELETE FROM Notes WHERE id = ?', [id]);
};

export const updateNotifInterval = async (pieceId: number, interval: number): Promise<void> => {
    await executeSql('UPDATE Pieces SET notifsInterval = ? WHERE id = ?',
        [interval, pieceId],
    );
};

export const updateNotifId = async (pieceId: number, notifId: number | null): Promise<void> => {
    await executeSql('UPDATE Pieces SET notifId = ? WHERE id = ?',
        [notifId, pieceId],
    );
};

export const updatePracticeDetails = async (pieceId: number, practiceTime: number): Promise<void> => {
    await executeSql('UPDATE Pieces SET timeSpent = timeSpent + ?, lastPracticedOn = ? WHERE id = ?',
        [practiceTime, getSeconds(), pieceId],
    );
};
