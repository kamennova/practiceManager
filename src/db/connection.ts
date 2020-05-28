import "reflect-metadata";
import { createConnection, getConnectionManager } from "typeorm";
import { ActivityEntity } from "./entity/activity/Activity";
import { PieceActivityDetailsEntity } from "./entity/activity/PieceActivity";
import { TechniqueActivityDetailsEntity } from "./entity/activity/TechniqueActivity";
import { AuthorEntity, NoteEntity, PieceEntity, RecordingEntity, TagEntity } from "./entity/piece";
import { PlanActivityEntity, PlanEntity, } from "./entity/plan";
import { SessionActivityEntity, SessionEntity } from "./entity/session";

export const connectToDb = async () => createConnection({
    type: "expo",
    driver: require('expo-sqlite'),
    database: "practiceManagerDB6",
    entities: [
        SessionEntity,
        SessionActivityEntity,
        PieceEntity,
        AuthorEntity,
        TagEntity,
        NoteEntity,
        RecordingEntity,
        PlanEntity,
        PlanActivityEntity,
        PieceActivityDetailsEntity,
        TechniqueActivityDetailsEntity,
        ActivityEntity,
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
