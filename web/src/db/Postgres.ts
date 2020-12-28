import { rowToPieceBase } from "common/db/RowTransform";
import { Piece, PieceBase, PieceStatus } from "common/types/piece";
import { Pool } from 'pg';
import { User } from "../ts/user";
import { data } from "./connection";
import { IDatabase } from "./IDatabase";

const pool = new Pool(data);

class PostgresDatabase implements IDatabase<number>{
    private static rowToPiece(row: any): Piece {
        return {
            name: row.name,
            tags: [],
            status: PieceStatus.NotStarted,
            addedOn: row.added_on,
            id: row.id,
            timeSpent: row.time_spent,
            isFavourite: row.is_favourite,
            notifsOn: row.notifs_on,
            notes: [],
            recordings: [],
            notifId: null,
            notifsInterval: 4,
        };
    }

    public async createUser(email: string, password: string): Promise<number> {
        const id = await pool.query('insert into users(email, password_hash) values ($1, $2) returning id',
            [email, password]);

        return id.rows[0].id;
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const res = await pool.query('select * from users where email = $1 and (is_deleted = false or is_deleted is null) limit 1',
            [email]);

        if (res.rows.length == 0) {
            return Promise.resolve(undefined);
        }

        const user = res.rows[0];
        return Promise.resolve({ id: user.id, email: user.email, password_hash: user.password_hash });
    }

    public async getUserById(id: number): Promise<User | undefined> {
        const res = await pool.query('select * from users where id = $1 limit 1',
            [id]);

        if (res.rows.length == 0) {
            return Promise.resolve(undefined);
        }

        const user = res.rows[0];
        return Promise.resolve({ id: user.id, email: user.email, password_hash: user.password_hash });
    }

    public async findUserPieceByName(name: string, userId: number): Promise<Piece | undefined> {
        const res = await pool.query('select * from piece where user_id = $1 and name = $2 limit 1',
            [userId, name]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return PostgresDatabase.rowToPiece(res.rows[0]);
    }

    public async addPiece(piece: Piece, userId: number): Promise<number> {
        const authorId = piece.author !== undefined ?
            await this.getPieceAuthorId(piece.author) : null;

        const res = await pool.query(
            'insert into piece(name, is_favourite, notifs_on, user_id, author_id) values ($1, $2, $3, $4, $5) returning id',
            [piece.name, piece.isFavourite, piece.notifsOn, userId, authorId]);

        await this.addPieceTags(res.rows[0].id, piece.tags);

        return Promise.resolve(res.rows[0].id);
    }

    public async getNotificationId(pieceId: number): Promise<number> {
        return Promise.resolve(pieceId);
    }

    public async getPiecesMeta(userId: number): Promise<PieceBase[]> {
        const res = await pool.query('select * from piece where user_id = $1',
            [userId]);

        return res.rows.map(row => rowToPieceBase(row));
    }

    public async toggleIsFavourite(id: number): Promise<void> {
        await pool.query('update piece set is_favourite = not is_favourite where id = $1',
            [id]);
    }

    public async updatePiece(piece: Piece): Promise<void> {
        await pool.query('update piece set name = $1 where id = $2', [
            piece.name,
            piece.id
        ]);
    }

    public async findUserPieceById(id: number, userId: number): Promise<Piece | undefined> {
        const res = await pool.query(
            'select piece.*, a.full_name author from piece left join authors a on piece.author_id = a.id where piece.id = $1 and user_id = $2 limit 1',
            [id, userId]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return PostgresDatabase.rowToPiece(res.rows[0]);
    }

    public async deletePiece(id: number) {
        await pool.query('delete from piece where id = $1', [id]);
        await pool.query('delete from piece_tags where piece_id = $1', [id]);
    }

    public async deleteUserById(id: number) {
        await pool.query('update users set is_deleted = true where id = $1', [id]);
    }

    public async deleteUserByEmail(email: string) {
        await pool.query('update users set is_deleted = true where email = $1 and is_deleted = false', [email]);
    }

    private async getPieceAuthorId(name: string): Promise<number> {
        const existingId = await this.getExistingAuthorId(name);

        if (existingId !== undefined) {
            return Promise.resolve(existingId);
        }

        const insert = await pool.query('insert into authors (full_name) values ($1) returning id',
            [name]);

        return insert.rows[0].id;
    }

    private async getPieceTagId(tag: string): Promise<number> {
        const existingId = await this.getExistingTagId(tag);

        if (existingId !== undefined) {
            return Promise.resolve(existingId);
        }

        const insert = await pool.query('insert into tags (tag_name) values ($1) returning id',
            [tag]);

        return insert.rows[0].id;
    }

    private async addPieceTags(pieceId: number, tags: string[]): Promise<void> {
        const ids = await Promise.all(tags.map(tag => this.getPieceTagId(tag)));
        await Promise.all(ids.map(id => pool.query(
            'insert into piece_tags(piece_id, tag_id) values ($1, $2)',
            [pieceId, id])));
    }

    private async getExistingAuthorId(name: string): Promise<number | undefined> {
        const res = await pool.query('select id from authors where full_name = $1 limit 1',
            [name]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return res.rows[0].id;
    }

    private async getExistingTagId(tag: string): Promise<number | undefined> {
        const res = await pool.query('select id from tags where tag_name = $1 limit 1',
            [tag]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return res.rows[0].id;
    }
}

export const Database = new PostgresDatabase();
