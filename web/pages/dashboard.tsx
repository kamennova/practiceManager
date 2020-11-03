import React  from 'react';
import { useUser } from "../ts/user";

export default function Dashboard(){
    const userCtx = useUser();

    return (
        <div>
            Welcome, user!
            {userCtx.user?.email}
        </div>
    );
}
