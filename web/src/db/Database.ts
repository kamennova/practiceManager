import { IDatabase } from "./IDatabase";
import {Database as PostgresDatabase} from './Postgres';

export const Database: IDatabase<number> = PostgresDatabase;
