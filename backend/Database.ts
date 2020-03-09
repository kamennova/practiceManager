import * as SQLite from 'expo-sqlite';
import { Piece } from "../types/Piece";

export default () => {
    const db = SQLite.openDatabase('PracticeManager');

    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Pieces (id integer primary key not null, pieceName varchar(225) not null, authors varchar(255), addedOnDate timestamp not null, lastPracticedOnDate timestamp)',
            [],
            undefined,
            (_tr, err) => {
                console.log('error creating table pieces', err);
                return false
            });

        tx.executeSql('CREATE TABLE IF NOT EXISTS Tag (id integer primary key not null, name varchar(225) not null)',
            [],
            undefined,
            (_tr, err) => {
                console.log('err creating table tags', err);
                return false
            }
        );

        tx.executeSql('CREATE TABLE IF NOT EXISTS PieceTag (tagId integer not null, pieceId integer not null )',
            [],
            undefined,
            (_tr, err) => {
                console.log('err creating table piece tags', err);
                return false
            }
        );
    });

    const getAllPieces = async (): Promise<Piece[]> =>
        new Promise((resolve, reject) =>
            db.transaction(tx =>
                tx.executeSql('SELECT * FROM Pieces',
                    [],
                    (_, { rows }) => resolve(
                        // @ts-ignore
                        rows._array.map(row => ({
                            name: row.pieceName,
                            timeSpent: 0,
                            notificationsOn: false,
                            notificationsInterval: 2,
                            authors: row.authors.split(','),
                            lastPracticedOnDate: new Date(row.lastPracticedOnDate),
                        }))
                    ),
                    (_tr, err) => {
                        reject(err);
                        return false
                    }
                )));

    const addPiece = (piece: Piece) => {
        const timestamp = Date.now();

        db.transaction(tx => {
            tx.executeSql(`INSERT INTO Pieces (pieceName, authors, addedOnDate) values (${piece.name}, ${piece.authors}, ${timestamp})`)
        })
    };

    return { getAllPieces, addPiece };
};
