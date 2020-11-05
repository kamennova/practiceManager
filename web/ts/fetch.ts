import fetch from "node-fetch";

export const fetchData = async (apiUrl: string, data?: any, method: string = 'POST', headers?: any) => await fetch(`http://localhost:3000/${apiUrl}`, {
    method,
    headers: headers !== undefined ? headers : undefined,
    body: JSON.stringify(data),
}).then(resp => resp.json());
