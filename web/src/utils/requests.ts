import { Piece } from "common/types/piece/Piece";

export const getUserTags = async (jwt: string) => await fetch('/api/users/tags/',
    { method: 'GET', headers: { authorization: jwt } }).then(res => res.json());

export const addUserTag = async (name: string, color: string, jwt: string) => await fetch('/api/users/tags/',
    { method: 'POST', body: JSON.stringify({ name, color, jwt }) }).then(res => res.json());

export const deletePieceQuery = async (id: number, jwt: string) => await fetch('/api/pieces/' + id, {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        'Authorization': jwt
    }
}).then(resp => resp.json());

export const updatePieceQuery = async (piece: Piece, jwt: string) => await fetch('/api/pieces/' + piece.id, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        'Authorization': jwt
    },
    body: JSON.stringify({ piece, jwt }),
}).then(resp => resp.json());

export const getPlanQuery = async (id: number, token: string) => await fetch(`/api/plans/${id}`, {
    method: 'GET',
    headers: { authorization: token }
}).then(res => res.json());

export const getPieceQuery = async (id: number, token: string) => await fetch(`/api/pieces/${id}`, {
    method: 'GET',
    headers: { authorization: token }
}).then(res => res.json());

export const addPiece = async (piece: { name: string, isFavourite: boolean }, jwt: string) => await fetch('/api/pieces', {
    method: 'PUT',
    body: JSON.stringify({ ...piece, jwt })
})
    .then(resp => resp.json());

export const getPieces = async (token: string) => await fetch('/api/pieces', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        'Authorization': token
    }
}).then(resp => resp.json());
