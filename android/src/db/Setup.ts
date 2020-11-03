import { db } from "./Db";

/*
* Creating tables:
* - Pieces, Tags, Notes,
* - Activities
* - Plans, PlanActivities
* - Sessions, SessionActivities
* */
export const setUpDb = async () => {
    return new Promise((_resolve, reject) => db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Pieces (' +
            'id integer primary key not null, ' +
            'name varchar(225) not null, ' +
            'addedOn timestamp not null, ' +
            'timeSpent smallint not null default 0, ' +
            'isFavourite integer not null default 0, ' +
            'imageUri varchar(225), ' +
            'lastPracticedOn integer, ' +
            'notifsOn integer not null default 0,' +
            'notifsInterval smallint default 3, ' +
            'notifId smallint, ' +
            'author varchar(225)' +
            ')',
            [],
            undefined,
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
            undefined,
            (_tr, err) => {
                console.log('error creating table tags', err);
                return false
            });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Notes (' +
            'id integer primary key not null, ' +
            'pieceId integer not null, ' +
            'addedOn integer not null default current_timestamp, ' +
            'content varchar(225) not null ' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('Error creating table Notes', err);
                reject(err);
                return false;
            });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Plans (' +
            'id integer primary key not null, ' +
            'name varchar(225) not null, ' +
            'addedOn timestamp not null, ' +
            'isFavourite integer not null default 0 ' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('error creating table plans', err);
                reject(err);
                return false;
            });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS PlanActivities (' +
            'activityId integer not null, ' +
            'planId integer not null ' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('error creating table plan activities', err);
                reject(err);
                return false;
            });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Activities (' +
            'id integer primary key not null, ' +
            'type varchar(225) not null, ' +
            'duration integer not null, ' +
            'activityOrder integer not null, ' +
            'exercise varchar(225), ' +
            'tonality varchar(225), ' +
            'pieceId integer ' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('Error creating table Activities:', err);
                reject(err);
                return false;
            });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Sessions (' +
            'id integer primary key not null, ' +
            'planId integer, ' +
            'startedOn timestamp not null ' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('Error creating table Sessions:', err);
                reject(err);
                return false;
            });

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS SessionActivities (' +
            'activityId integer not null, ' +
            'sessionId integer not null ' +
            ')',
            [],
            undefined,
            (_tr, err) => {
                console.log('Error creating table Session activities', err);
                reject(err);
                return false;
            });

        _resolve(null);
    }));
};
