import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { Button } from "../components/Button";
import { FormControl } from "../components/FormControl";
import { TextInput } from "../components/inputs/TextInput";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const validate = () => {
        if (!email.includes('@') || email.length < 5) {
            setError('Email is not correct');
        } else if (password.length < 5) {
            setError('pass should be at least 5 chars long');
        }
    };

    const canCreateUser = () => {
        validate();
        return error == '';
    };

    const createUser = async () => {
        if(!canCreateUser()) return;

        const res = await fetch('/api/users', { method: 'PUT', body: JSON.stringify({ email, password }) })
            .then(result => result.json());

        if (res.error) {
            setError(res.error);
        } else {
            router.push('/signIn');
        }
    };

    return (
        <div className={'form-wrapper'}>
            <h2>Sign up!</h2>
            <FormControl label={'Email'}>
                <TextInput name={'email'} value={email} onChange={setEmail}/>
            </FormControl>

            <FormControl label={'Password'}>
                <TextInput type='password' name='password' value={password} onChange={setPassword}/>
            </FormControl>

            <FormControl label={'Confirm password'}>
                <TextInput type='password' name='confirmPassword' value={confirmPass} onChange={setConfirmPass}/>
            </FormControl>

            <p>{error}</p>

            <Button onClick={error == '' ? createUser : undefined}>Submit</Button>

            <p className={'sign-in-options'}>Already have an account? <Link href={'/signIn'}>Sign in</Link>
            </p>
        </div>
    );
}
