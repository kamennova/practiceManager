import "reflect-metadata";
import { createConnection } from "typeorm";
import { getConnectionManager } from "typeorm/browser";
import { AuthorEntity, NoteEntity, PieceEntity, RecordingEntity, TagEntity } from "./entity/piece";
import {
    PieceActivityDetailsEntity,
    PlanActivityEntity,
    PlanEntity,
    TechniqueActivityDetailsEntity
} from "./entity/plan";

export const connectToDb = async () => createConnection({
    type: "expo",
    driver: require('expo-sqlite'),
    database: "practiceManagerDB6",
    entities: [
        PieceEntity,
        AuthorEntity,
        TagEntity,
        NoteEntity,
        RecordingEntity,
        PlanEntity,
        PlanActivityEntity,
        PieceActivityDetailsEntity,
        TechniqueActivityDetailsEntity
    ],
    synchronize: false,
    migrationsRun: true,
    logging: false,
}).catch(error => {
    if (error.name === "AlreadyHasActiveConnectionError") {
        const currentConnection = getConnectionManager().get("default");
        return currentConnection;
    }

    console.log(error);
    return Promise.reject(error)
});
