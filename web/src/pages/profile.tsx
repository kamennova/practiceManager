import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { FormControl } from "../components/FormControl";
import { ColorPicker } from "../components/inputs/ColorPicker";
import { TextInput } from "../components/inputs/TextInput";
import { ItemSection } from "../components/Item/ItemSection";
import { TagList } from "../components/piece/TagList";
import { getJwt } from "../ts/hooks";
import { useUser } from "../ts/user";
import { addUserTag, getUserTags } from "../utils/requests";
import { Tag } from 'common/types/Tag';

export default function Profile() {
    const { user } = useUser();
    const [tags, setTags] = useState<Tag[]>([]);
    const [tag, setTag] = useState('');
    const [tagColor, setTagColor] = useState('red');
    const [showChangePassword, setShowchange] = useState(false);

    useEffect(() => {
        const jwt = getJwt();
        getUserTags(jwt).then(({ results }) => setTags(results));
    }, []);

    const changePass = (_: string) => {
        // todo
    };

    const onCreateTag = async () => {
        const jwt = getJwt();

        const id = (await addUserTag(tag, tagColor, jwt)).id;
        setTags([...tags, { name: tag, color: tagColor, id }]);
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

            <ItemSection title={'My tags'}>
                {tags.length > 0 ? <TagList tags={tags}/> : 'No tags yet'}
            </ItemSection>
            <ItemSection title={'Add tags'}>
                <div className={'flex'} style={{ alignItems: 'center' }}>
                    <FormControl label={'New tag'}>
                        <TextInput onChange={setTag} value={tag}/>
                    </FormControl>
                    <div style={{ width: 100, marginLeft: 10, marginRight: 10 }}>
                        <ColorPicker onChange={setTagColor} value={tagColor}/>
                    </div>
                    <Button onClick={onCreateTag} label={'Create'}/>
                </div>
            </ItemSection>

            {showChangePassword && <PasswordChange passwordHash={pass} onChangePass={changePass}/>}
        </div>
    );
}

const createTag = async () => await fetch('api/');

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
