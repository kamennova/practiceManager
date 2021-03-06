import { request } from "../../src/ts/fetch";
import { createTestUser, deleteTestUser } from "../../src/ts/utils/test";
import { TEST_USER } from "../../src/ts/utils/test";

beforeAll(async (done) => {
    await deleteTestUser();
    done();
});

afterAll(async (done) => {
    await deleteTestUser();
    done();
});

test('sign up successful', async () => {
    const res = await request('api/users/', { email: TEST_USER.email, password: TEST_USER.password }, 'PUT');
    expect(res.error).toBeUndefined();
    expect(res.id).toBeDefined();
    await deleteTestUser();
});

test('sign up, existing email', async () => {
    await createTestUser();
    const res = await request('api/users/', { email: TEST_USER.email, password: 'pppp' }, 'PUT');
    expect(res.error).toBe("User with such email already exists!");
    expect(res.id).toBeUndefined();
});
