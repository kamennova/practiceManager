import React, { useState } from "react";
import { Button } from "../components/Button";
import { FormControl } from "../components/FormControl";
import { TextInput } from "../components/inputs/TextInput";
import { useUser } from "../ts/user";

export default function Profile() {
    const userCtx = useUser();

    const changePass = (_: string) => {
        // todo
    };

    const pass = userCtx.user !== undefined ? userCtx.user.password_hash : '';

    return (
        <div>
            <FormControl label={'Username'}>
                <TextInput value={'username'} onChange={() => 2}/>
            </FormControl>
            <PasswordChange passwordHash={pass} onChangePass={changePass}/>
        </div>
    );
}

const PasswordChange = (props: { passwordHash: string, onChangePass: (p: string) => void }) => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const tryChange = () => {
        if (oldPass !== props.passwordHash) {
            setError('Old password does not match!');
        } else if (newPass !== confirm) {
            setError('New password does not match!');
        } else if (newPass.length < 4) {
            setError('Password is not long enough!');
        } else {
            props.onChangePass(newPass);
        }
    };

    return (
        <div>
            <FormControl label={'Old password'}>
                <TextInput value={oldPass} onChange={setOldPass}/>
            </FormControl>
            <FormControl label={'New password'}>
                <TextInput value={newPass} onChange={setNewPass}/>
            </FormControl>
            <FormControl label={'Confirm new password'}>
                <TextInput value={confirm} onChange={setConfirm}/>
            </FormControl>
            <p>{error}</p>
            <Button onClick={tryChange}>Submit</Button>
        </div>
    );
};
