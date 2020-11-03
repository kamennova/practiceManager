import { Database } from "../../db/Postgres";
import { fetchData } from "../../ts/fetch";

beforeAll(async (done) => {
    const db = await Database.connect();
    await db.client.query('insert into users (email, password_hash) values ($1, $2)',
        ['test_user', 'test_user_pass']);
    await db.client.end();
    done();
});

afterAll(async (done) => {
    const db = await Database.connect();
    await db.client.query('delete from users where email = $1', ['test_user']);
    await db.client.end();
    done();
});

test('login successful', async () => {
    const res = await fetchData('api/users/signIn.ts', { email: 'mmm', password: 'pp' });
    expect(res.error).toBeUndefined();
    expect(res.user).toBeDefined();
});

test('login with invalid email', async () => {
    const res = await fetchData('api/users/signIn.ts', { email: 'asd', password: 'asd' });
    expect(res.error).toBeDefined();
    expect(res.id).toBeUndefined();
});

test('login with invalid password', async () => {
    const res = await fetchData('api/users/signIn.ts', { email: 'mmm', password: 'a' });
    expect(res.error).toBeDefined();
    expect(res.id).toBeUndefined();
});
