import { useRouter } from "next/router";
import React, { useState } from 'react';
import { clearCookie } from "../ts/helpers";
import { useUser } from "../ts/user";

const Links = [
    { src: '/dashboard', name: 'Dashboard', icon: 'bar_chart' },
    { src: '/pieces', name: 'Pieces', icon: 'library_music' },
    { src: '/plans', name: 'Plans', icon: 'storage' },
    { src: '/sessions', name: 'Sessions', icon: 'history' },
];

export const Menu = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
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
                    {email}
                    {userMenuOpen && <ul/>}
                </div>
                <ul className={'main-links'}>
                    {Links.map(item => (
                        <li onClick={() => router.push(item.src)} key={item.name}>
                            <i className={'material-icons'}>{item.icon}</i>
                            <span>{item.name}</span>
                        </li>))}
                </ul>
                <button onClick={logout} className={'btn-logout user-btn'}><i
                    className={'material-icons'}>exit_to_app</i></button>
            </nav>
        </aside>
    );
};
