import { generateToken } from "../../ts/api";
import { request } from "../../ts/fetch";
import { createTestUser, deleteTestUser } from "../../ts/utils/test";

let TEST_JWT: string | undefined;

beforeAll(async (done) => {
    await createTestUser().then((res) => TEST_JWT = generateToken(res.userId));
    done();
});

afterAll(async (done) => {
    await deleteTestUser();
    done();
});

test('create piece', async () => {
    const piece = {
        name: 'My new piece',
        isFavourite: true,
    };

    if (TEST_JWT == undefined) throw Error('jwt should be defined');
    const res = await request('api/pieces', piece, 'PUT', TEST_JWT);

    expect(res.error).toBeUndefined();
    expect(res.pieceId).toBeDefined();

    const fetched = await request('api/pieces/' + res.pieceId, undefined, 'GET', TEST_JWT);
    expect(fetched.piece.name).toBe(piece.name);
    expect(fetched.piece.isFavourite).toBe(true);
});

test('list all pieces', async () => {

});
