import React, { useState } from 'react';
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { Piece } from "../../types/Piece";
import { Button } from "../basic/Buttons/Button";
import { MyCheckbox } from "../basic/Inputs/Checkbox";
import { DaysInput } from "../basic/Inputs/DaysInput";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

const EmptyPiece: Piece = {
    name: '',
    timeSpent: 0,
    notificationsInterval: 1,
    notificationsOn: true,
};

export const PieceForm = () => {
    const [piece, updatePiece] = useState<Piece>(EmptyPiece);
    const [errors, updateErrors] = useState('');
    const [notifOn, updateNotifOn] = useState(false);

    const validateAndSave = () => {
        if (validate(piece)) {
            // addPiece(piece);
        } else {
            updateErrors('Error str');
        }
    };

    return (
        <ScreenWrapper>
            <View style={{
                borderWidth :3,
                borderColor: 'red',
                ...AppPaddingStyle,
                flexGrow: 1,
                justifyContent: 'flex-start'
                // height: '100%',
            }}>
                <ScreenTitle>
                    Add piece
                </ScreenTitle>
                <View style={{ marginTop: 15 }}>
                    <View>
                        <MyTextInput onChangeText={(val) => updatePiece({ ...piece, name: val })}
                                     placeholder={'Piece title'}/>
                        <MyTextInput placeholder={'Authors'}
                                     onChangeText={(val) => updatePiece({ ...piece, authors: [val] })}/>

                        <MyTextInput placeholder={'Tags'}
                                     onChangeText={(val) => updatePiece({ ...piece, tags: [val] })}/>


                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: 'grey',
                            marginBottom: 20,
                            marginTop: 14
                        }}/>

                        <MyCheckbox onValueChange={() => updateNotifOn(false)} value={notifOn}
                                    title={'Notifications on'}/>

                        <Text style={{
                            fontSize: 16,
                        }}>Remind every <DaysInput value={'1'}
                                                   onChange={(val) => updatePiece({
                                                       ...piece,
                                                       notificationsInterval: Number(val)
                                                   })}/> day</Text>
                    </View>
                </View>
                <Text>{errors}</Text>
                <Button onPress={validateAndSave} style={{ marginTop: 20 }}>Save</Button>
            </View>
        </ScreenWrapper>
    );
};

const validate = (piece: Piece): boolean => {
    return (piece.name.length !== 0)
};
