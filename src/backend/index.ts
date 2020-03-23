import "reflect-metadata";
import { createConnection } from "typeorm";
import { Author } from "./entity/Author";
import { PieceEntity } from "./entity/Piece";
import { Tag } from "./entity/Tag";

export const connectToDb = async () => createConnection({
    type: "expo",
    driver: require('expo-sqlite'),
    database: "practiceManagerDB",
    entities: [
        PieceEntity,
        Author,
        Tag,
    ],
    synchronize: true,
    logging: true
}).catch(error => console.log(error));
