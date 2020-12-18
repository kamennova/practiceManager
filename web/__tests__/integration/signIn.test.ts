import { request } from "../../ts/fetch";
import { createTestUser, deleteTestUser, TEST_USER } from "../../ts/utils/test";

beforeAll(async (done) => {
    await createTestUser();
    done();
});

afterAll(async (done) => {
    await deleteTestUser();
    done();
});

test('login successful', async () => {
    const res = await request('api/users/signIn', { email: TEST_USER.email, password: TEST_USER.password });
    expect(res.error).toBeUndefined();
    expect(res.user).toBeDefined();
});

test('login with invalid email', async () => {
    const res = await request('api/users/signIn', { email: 'asd', password: 'asd' });
    expect(res.error).toBeDefined();
    expect(res.id).toBeUndefined();
});

test('login with invalid password', async () => {
    const res = await request('api/users/signIn', { email: TEST_USER.email, password: 'a' });
    expect(res.error).toBeDefined();
    expect(res.id).toBeUndefined();
});
