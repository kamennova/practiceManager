import { Database } from "../../db/Postgres";
import { fetchData } from "../../ts/fetch";

const RESERVED_EMAILS = [
    'test_user@gmail.com',
    'test_user2@gmail.com',
];

beforeAll(async (done) => {
    const db = await Database.connect();

    await db.client.query('delete from users where email = $1 or email = $2',
        [RESERVED_EMAILS[1], RESERVED_EMAILS[0]]);
    await db.client.query('insert into users (email, password_hash) values ($1, $2)',
        [RESERVED_EMAILS[0], 'test_user_pass']);
    await db.client.end();
    done();
});

afterAll(async (done) => {
    const db = await Database.connect();
    await db.client.query('delete from users where email = $1 or email = $2',
        [RESERVED_EMAILS[0], RESERVED_EMAILS[1]]);
    await db.client.end();
    done();
});

test('sign up successful', async () => {
    const res = await fetchData('api/users/', { email: RESERVED_EMAILS[1], password: 'pppp' }, 'PUT');
    expect(res.error).toBeUndefined();
    expect(res.id).toBeDefined();
});

test('sign up, existing email', async () => {
    const res = await fetchData('api/users/', { email: RESERVED_EMAILS[0], password: 'pppp' }, 'PUT');
    expect(res.error).toBe("User with such email already exists!");
    expect(res.id).toBeUndefined();
});
