import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React from 'react';
import { clearCookie } from "../ts/helpers";
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
        clearCookie('authToken');
        userCtx.setUser(undefined, '');
        router.push('/signIn');
    };

    const email = userCtx.user !== undefined ? userCtx.user.email : undefined;

    return (
        <aside className={'main-sidebar'}>
            <nav className={'main-nav'}>
                <div className={'user-link'}>
                    Welcome, {email}!
                </div>
                <ul className={'main-links'}>
                    {Links.map(item => <li><Link href={item.src}>{item.name}</Link></li>)}
                    <li><Button onClick={logout} className={'btn-logout'}>Log out</Button></li>
                </ul>
            </nav>
        </aside>
    );
};