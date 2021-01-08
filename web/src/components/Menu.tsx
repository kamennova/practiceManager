import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React from 'react';
import { clearCookie } from "../ts/helpers";
import { useUser } from "../ts/user";

const Links = [
    { src: '/dashboard', name: 'Dashboard', icon: 'bar_chart' },
    { src: '/pieces', name: 'Pieces', icon: 'library_music' },
    { src: '/plans', name: 'Plans', icon: 'storage' },
    { src: '/sessions', name: 'Sessions', icon: 'history' },
    { src: '/sessionStart', name: 'Practice', icon: 'play_arrow' }
];

export const Menu = () => {
    const { user, setUser } = useUser();
    const router = useRouter();

    const logout = () => {
        clearCookie('authToken');
        setUser(undefined, '');
        router.push('/signIn');
    };

    return (
        <aside className={'main-sidebar'}>
            <nav className={'main-nav'}>
                <div className={'user-link'}>
                    <Link href={'/profile'}>
                        <a className={'profile-link'}>
                            <img
                                src={user?.picSrc ? user.picSrc : 'https://www.classicsforkids.com/images/composers/Bach.jpg'}
                                width={40} height={40} className={'circle'}/>
                            <span>{user?.email}</span>
                        </a>
                    </Link>
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
