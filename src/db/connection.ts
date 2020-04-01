import "reflect-metadata";
import { createConnection } from "typeorm";
import { AuthorEntity } from "./entity/Author";
import { NoteEntity } from "./entity/Note";
import { PieceEntity } from "./entity/Piece";
import { RecordingEntity } from "./entity/Recording";
import { TagEntity } from "./entity/Tag";

export const connectToDb = async () => createConnection({
    type: "expo",
    driver: require('expo-sqlite'),
    database: "practiceManagerDB2",
    entities: [
        PieceEntity,
        AuthorEntity,
        TagEntity,
        NoteEntity,
        RecordingEntity,
    ],
    synchronize: false,
    migrationsRun: true,
    logging: false,
}).catch(error => Promise.reject(error));
