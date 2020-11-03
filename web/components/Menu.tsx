import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React from 'react';
import { useUser } from "../ts/user";
import { Button } from "./Button";

const Links = [
    { src: '/dashboard', name: 'Dashboard' },
    { src: '/pieces', name: 'Pieces' },
    { src: '/plans', name: 'Plans' },
];

export const Menu = () => {
    const userCtx = useUser();
    const router = useRouter();

    const logout = () => {
        userCtx.setUser(undefined, '');
        router.push('/signIn');
    };

    return (
        <nav className={'main-nav'}>
            <div>
                Welocme, {userCtx.user?.email}!
            </div>
            <ul>
                {Links.map(item => <li><Link href={item.src}>{item.name}</Link></li>)}
                <li><Button onClick={logout}>Log out</Button></li>
            </ul>
        </nav>
    );
};
