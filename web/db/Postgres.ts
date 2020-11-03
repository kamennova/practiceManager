import { rowToPieceBase } from "common/db/RowTransform";
import { IDatabase } from "common/types/IDatabase";
import { Piece, PieceBase, PieceStatus } from "common/types/piece";
import { Client } from 'pg';
import { User } from "../ts/user";
import { data } from "./connection";

export class Database implements IDatabase {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public static async connect(): Promise<Database> {
        const client = new Client(data);
        await client.connect();
        return new Database(client);
    }

    private static rowToPiece(row: any): Piece {
        return {
            name: row.name,
            tags: [],
            status: PieceStatus.NotStarted,
            addedOn: row.added_on,
            id: row.id,
            timeSpent: row.timeSpent,
            isFavourite: row.isFavourite,
            notifsOn: row.notifs_on,
            notes: [],
            recordings: [],
            notifId: null,
            notifsInterval: 4,
        };
    }

    async getPiece(_id: number): Promise<Piece | undefined> {
        return undefined;
    }

    public async addPiece(piece: Piece, userId: number): Promise<number> {
        const res = await this.client.query('insert into piece(name, is_favourite, notifs_on, user_id) values ($1, $2, $3, $4) returning id',
            [piece.name, piece.isFavourite, piece.notifsOn, userId]);

        return Promise.resolve(res.rows[0].id);
    }

    async deletePiece(id: number): Promise<void> {
        await this.client.query('delete from piece where id = $1', [id]);
    }

    async getNotificationId(pieceId: number): Promise<number> {
        return Promise.resolve(pieceId);
    }

    public async getPiecesMeta(userId: number): Promise<PieceBase[]> {
        const res = await this.client.query('select * from piece where user_id = $1',
            [userId]);

        return res.rows.map(row => rowToPieceBase(row));
    }

    async toggleIsFavourite(id: number): Promise<void> {
        await this.client.query('update piece set is_favourite = not is_favourite where id = $1 limit 1',
            [id]);
    }

    async updatePiece(piece: Piece): Promise<void> {
        console.log('piece name', piece.name);
    }

    public async createUser(email: string, password: string): Promise<number> {
        const id = await this.client.query('insert into users(email, password_hash) values ($1, $2) returning id',
            [email, password]);

        return id.rows[0].id;
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const res = await this.client.query('select * from users where email = $1 limit 1',
            [email]);

        if (res.rows.length == 0) {
            return Promise.resolve(undefined);
        }

        const user = res.rows[0];
        return Promise.resolve({ id: user.id, email: user.email, password_hash: user.password_hash });
    }

    public async findUserPieceByName(name: string, userId: number): Promise<Piece | undefined> {
        const res = await this.client.query('select * from piece where user_id = $1 and name = $2 limit 1',
            [userId, name]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return Database.rowToPiece(res.rows[0]);
    }

    public async findUserPieceById(id: number, userId: number): Promise<Piece | undefined> {
        const res = await this.client.query('select * from piece where id = $1 and user_id = $2 limit 1',
            [id, userId]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return Database.rowToPiece(res.rows[0]);
    }
}
