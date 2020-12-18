import fetch from "node-fetch";

export const request = async (apiUrl: string, data?: any, method: string = 'POST', auth?: string) => {
    const init =
        method === 'PUT' || method === 'POST' ?
            { method, body: JSON.stringify({ ...data, jwt: auth }) } :
            { method, body: JSON.stringify(data), headers: auth !== undefined ? { authorization: auth } : undefined };

    return await fetch(`http://localhost:3000/${apiUrl}`, init).then(resp => resp.json());
};

