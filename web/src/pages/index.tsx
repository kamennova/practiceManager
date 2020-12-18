import Link from "next/dist/client/link";
import React from 'react';

export default function HomePage() {
    return (
        <div>
            Welcome to home page!
            <Link href={'/signIn'}>Sign in</Link> <Link href={'/signUp'}>Sign up</Link>
        </div>
    );
}
