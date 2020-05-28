import { db } from "./Db";

export const setUpDb = async () => {
    console.log('db set up');

    return new Promise((_resolve, reject) => db.transaction(tx => {
        tx.executeSql(
            // 'DROP Table Pieces;' +
            'CREATE TABLE IF NOT EXISTS Pieces (' +
            'id integer primary key not null, ' +
            'name varchar(225) not null, ' +
            'addedOn timestamp not null, ' +
            'timeSpent smallint not null default 0, ' +
            'isFavourite integer not null default 0, ' +
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
                reject(err);
                return false;
            });

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
    }));
};
