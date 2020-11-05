import { request } from "../fetch";

export const TEST_USER = {
    email: 'testemail@gmail.com',
    password: 'password',
};

export const createTestUser = async () => await request('api/users/test/create', undefined, 'GET'),
    deleteTestUser = async () => await request('api/users/test/delete', undefined, 'GET');
