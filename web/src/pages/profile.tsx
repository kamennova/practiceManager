import React, { useState } from "react";
import { Button } from "../components/Button";
import { FormControl } from "../components/FormControl";
import { TextInput } from "../components/inputs/TextInput";
import { useUser } from "../ts/user";

export default function Profile() {
    const { user } = useUser();
    const [showChangePassword, setShowchange] = useState(false);

    const changePass = (_: string) => {
        // todo
    };

    const pass = user ? user.password_hash : '';

    return (
        <div className={'main-content'}>
            <header className={'flex profile-header'}>
                <img className={'circle'}
                     src={user?.picSrc ? user?.picSrc : 'https://www.classicsforkids.com/images/composers/Bach.jpg'}
                     width={100} height={100}
                />
                <h2>{user?.username ? user?.username : user?.email}</h2>
            </header>

            {showChangePassword && <PasswordChange passwordHash={pass} onChangePass={changePass}/>}
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
