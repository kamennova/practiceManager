import { Piece, PieceBase, PieceComplexity, PieceMood, PieceStatus, Author } from "common/types/piece";
import { SessionPlan } from "common/types/plan";
import { Pool } from 'pg';
import { User } from "../ts/user";
import { data } from "./connection";
import { IDatabase } from "./IDatabase";
import { Tip } from "common/types/Tip";
import { Tag } from "common/types/Tag";

const pool = new Pool(data);

class PostgresDatabase implements IDatabase<number> {
    private static rowToPiece(row: any): Piece {
        return {
            ...this.rowToPieceBase(row),
            notifsOn: row.notifs_on,
            notes: [],
            recordings: [],
            notifId: null,
            notifsInterval: 4,
        };
    }

    private static rowToPieceBase(row: any): PieceBase {
        return {
            name: row.name,
            tags: row.tags !== null ? row.tags : [],
            author: row.author_id !== null ? {
                fullName: row.author_name,
                id: row.author_id,
                picSrc: row.author_pic !== null ? row.author_pic : undefined
            } : undefined,
            status: PieceStatus.NotStarted,
            addedOn: row.added_on,
            id: row.id,
            timeSpent: row.time_spent,
            isFavourite: row.is_favourite,
            imageUri: row.image_src !== null ? row.image_src : undefined,
            complexity: row.complexity !== null ? row.complexity as PieceComplexity : undefined,
            mood: row.mood !== null ? row.mood as PieceMood : undefined,
        };
    }

    private static rowToPlan(row: any): SessionPlan {
        return {
            addedOn: row.added_on,
            name: row.name,
            id: row.id,
            isFavourite: row.is_favourite,
            schedule: [],
        };
    }

    public async createUser(email: string, password: string): Promise<number> {
        const id = await pool.query('insert into users(email, password_hash) values ($1, $2) returning id',
            [email, password]);

        return id.rows[0].id;
    }

    public async addPlan(plan: SessionPlan): Promise<number> {
        return Promise.resolve(plan.id);
    }


    public async deletePlan() {

    }

    public async updatePlan() {

    }

    public async findUserPlanById(id: number, userId: number): Promise<SessionPlan | undefined> {
        const res = await pool.query('select * from plan where user_id = $1 and id = $2 limit 1',
            [userId, id]);

        if (res.rows.length === 0) {
            return Promise.resolve(undefined);
        }

        return PostgresDatabase.rowToPlan(res.rows[0]);

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
            await this.getPieceAuthorId(piece.author.fullName) : null;

        const res = await pool.query(
                `insert into piece (name, is_favourite, notifs_on, user_id, author_id, image_src, complexity, mood)
                 values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
            [piece.name, piece.isFavourite, piece.notifsOn, userId, authorId, piece.imageUri, piece.complexity, piece.mood]);

        await this.addPieceTags(res.rows[0].id, piece.tags);

        return Promise.resolve(res.rows[0].id);
    }

    public async getNotificationId(pieceId: number): Promise<number> {
        return Promise.resolve(pieceId);
    }

    public async getPiecesMeta(userId: number): Promise<PieceBase[]> {
        const res = await pool.query(`select piece.*,
                                             (select array_agg(t.tag_name)
                                              from piece_tags
                                                     left join tags t on piece_tags.tag_id = t.id
                                              where piece_tags.piece_id = piece.id) tags
                                      from piece
                                      where user_id = $1`,
            [userId]);

        return res.rows.map(row => PostgresDatabase.rowToPieceBase(row));
    }

    public async toggleIsFavourite(id: number): Promise<void> {
        await pool.query('update piece set is_favourite = not is_favourite where id = $1',
            [id]);
    }

    public async updatePiece(piece: Piece): Promise<void> {
        await pool.query('update piece set name = $1, image_src = $2, complexity = $3, mood = $4 where id = $5', [
            piece.name,
            piece.imageUri,
            piece.complexity,
            piece.mood,
            piece.id
        ]);
    }

    public async findUserPieceById(id: number, userId: number): Promise<Piece | undefined> {
        const res = await pool.query(
                `select piece.*,
                        (select array_agg(t.tag_name)
                         from piece_tags
                                left join tags t on piece_tags.tag_id = t.id
                         where piece_tags.piece_id = piece.id) tags,
                        a.name                                 author_name,
                        a.id                                   author_id,
                        a_pic.pic_src                          author_pic
                 from piece
                        left join authors a on piece.author_id = a.id
                        left join author_pic a_pic on a_pic.author_id = piece.author_id
                 where piece.id = $1
                   and user_id = $2
                 limit 1`,
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

    public getPlansMeta(_: number): Promise<SessionPlan[]> {
        return Promise.resolve([]);
    }

    public findUserPlanByName(_: string, _userId: number): Promise<SessionPlan | undefined> {
        return Promise.resolve(undefined);
    }

    public async countUserPieces(userId: number): Promise<number> {
        const res = await pool.query(
            'select count(*) count from piece where user_id = $1', [userId]);

        return res.rows[0].count;
    }

    public async findUserPiecesLike(input: string, userId: number): Promise<Tip[]> {
        const res = await pool.query('select id, "name" label, image_src picSrc from piece where user_id = $1 and name like $2', [userId, input]);

        return res.rows;
    }

    public async findAuthorsLike(input: string): Promise<Author[]> {
        const res = await pool.query(`select authors.id, authors.name, author_pic.pic_src
                                      from authors
                                             left join author_pic on authors.id = author_pic.author_id
                                      where authors.name ilike $1`,
            ['%' + input + '%']);

        return res.rows.map(r => ({ fullName: r.name, picSrc: r.pic_src !== null ? r.pic_src : undefined, id: r.id }));
    }

    public async getUserTags(userId: number): Promise<Tag[]> {
        const res = await pool.query('select id, color, tag_name from tags where user_id = $1',
            [userId]);

        return res.rows.map(r => ({ color: r.color, id: r.id, name: r.tag_name }));
    }

    private async getPieceAuthorId(name: string): Promise<number> {
        const existingId = await this.getExistingAuthorId(name);

        if (existingId !== undefined) {
            return Promise.resolve(existingId);
        }

        const insert = await pool.query('insert into authors (name) values ($1) returning id',
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
        const res = await pool.query('select id from authors where name = $1 limit 1',
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

    public async createUserTag(name: string, color: string, userId: number): Promise<number> {
        const res = await pool.query('insert into tags(tag_name, user_id, color) values ($1, $2, $3) returning id',
            [name, userId, color]);

        return res.rows[0].id;
    }
}

export const Database = new PostgresDatabase();
