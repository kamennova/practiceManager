import { useRouter } from "next/router";
import React from 'react';
import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Piece() {
    const router = useRouter();
    const { data, error } = useSwr(`/api/pieces/${router.query.id}`, fetcher);

    if (error) return (<div>Failed to load user</div>);
    if (!data) return (<div>Loading...</div>);

    return <div>{data.name}</div>
}
