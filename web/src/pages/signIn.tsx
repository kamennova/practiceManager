import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { Button } from "../components/Button";
import { FormControl } from "../components/FormControl";
import { TextInput } from "../components/inputs/TextInput";
import { useUser } from "../ts/user";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const userCtx = useUser();

    const signIn = async () => {
        const res = await fetch('/api/users/signIn', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }).then(resp => resp.json()).catch(err => console.log(err));

        if (res.error) {
            setError(res.error);
        } else {
            userCtx.setUser(res.user, res.jwtToken);
            document.cookie = 'authToken=' + res.jwtToken;
            router.push('/dashboard')
        }
    };

    return (
        <div className={'form-wrapper main-content'}>
            <h2>Sign in!</h2>
            <FormControl label={'Email'}>
                <TextInput name={'email'} value={email} onChange={setEmail}/>
            </FormControl>


            <FormControl label={'Password'}>
                <TextInput name={'password'} value={password} onChange={setPassword} type={"password"}/>
            </FormControl>

            <p>{error}</p>

            <Button onClick={error == '' ? signIn : undefined}>Submit</Button>

            <p className={'sign-in-options'}>Don't have an account? <Link href={'/signUp'}>Sign up</Link>
            </p>
        </div>
    );
}
