import fetch from "node-fetch";

export const fetchData = async (apiUrl: string, data: any, method: string = 'POST') => await fetch(`http://localhost:3000/${apiUrl}`, {
    method,
    body: JSON.stringify(data),
}).then(resp => resp.json());
