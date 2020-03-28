import { ImagePickerResult } from "expo-image-picker";
import React, { useState } from 'react';
import { Route, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { validatePiece } from "../../db/validation";
import { PIECE } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkAddPiece, thunkEditPiece } from "../../store/thunks";
import { ActionType } from "../../types/ActionType";
import { EmptyPiece } from "../../types/EmptyPiece";
import { Piece } from "../../types/Piece";
import { MinorButton, PrimaryButton } from "../basic/Buttons/Button";
import { ErrorAlert } from "../basic/ErrorAlert";
import { MyImagePicker } from "../basic/ImagePicker";
import { TagInput } from "../basic/Inputs/TagInput";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ItemButtonsWrap } from "../basic/ItemButtons";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { PieceNotifications } from "./PieceNotifications";

const mapDispatchToProps = (dispatch: any, ownProps: FormProps) => ({
    onHandlePiece: (ownProps.route.params.mode === undefined || ownProps.route.params.mode === ActionType.Create) ?
        (piece: Piece) => dispatch(thunkAddPiece(piece)) :
        (piece: Piece) => dispatch(thunkEditPiece(piece)),
});

const mapStateToProps = (state: StateShape) => ({
    addedPieceId: state.pieces.lastAddedId,
});

type FormProps = {
    route: Route & { params: { mode: ActionType.Create | ActionType.Edit, piece?: Piece } },
    navigation: any,
    onHandlePiece: (piece: Piece) => any,
    addedPieceId?: number,
};

const PieceFormComponent = (props: FormProps) => {
    const mode = props.route.params.mode === undefined ? ActionType.Create : props.route.params.mode;
    const [piece, updatePiece] = useState(ActionType.Create ? EmptyPiece :
        (props.route.params.piece !== undefined ? props.route.params.piece : EmptyPiece));
    const [errors, updateErrors] = useState('');

    const resetState = () => {
        updatePiece(EmptyPiece);
        updateErrors('');
    };

    const toggleNotifs = () => updatePiece({
        ...piece,
        notifications: {
            interval: piece.notifications.interval,
            enabled: !piece.notifications.enabled
        }
    });

    const updateInterval = (val: number) => updatePiece({
        ...piece,
        notifications: {
            interval: val,
            enabled: piece.notifications.enabled,
        }
    });

    console.log('form piece id, ', piece.id);

    const validateAndSave = async () => {
        const res = await validatePiece(piece);

        if (res.valid) {
            await props.onHandlePiece(piece);

            if (props.addedPieceId === undefined) {
                throw new Error('Added piece id should be already updated ');
            }

            console.log(props.addedPieceId);

            props.navigation.navigate(PIECE,
                { id: props.addedPieceId, lastUpdated: mode === ActionType.Edit ? Date.now() : undefined });
            resetState();
        } else {
            updateErrors(res.errors);
        }
    };

    const pickImage = (res: ImagePickerResult) => {
        if (!res.cancelled) {
            updatePiece({ ...piece, imageUri: res.uri });
        }
    };

    const fav = () => mode === ActionType.Create ? {
        val: piece.isFavourite,
        update: () => updatePiece({ ...piece, isFavourite: !piece.isFavourite }),
    } : undefined;


    return (
        <ScreenWrapper fav={fav()}>

            <MyImagePicker src={piece.imageUri}
                           onDelete={() => updatePiece({ ...piece, imageUri: undefined })}
                           onChoose={pickImage}/>

            <View style={AppPaddingStyle}>

                <MyTextInput placeholder={'Title'}
                             value={piece.name}
                             autoFocus={mode === ActionType.Create}
                             onChangeText={(val) => updatePiece({ ...piece, name: val })}
                             style={{ borderColor: 'blue' }}/>

                <MyTextInput placeholder='Author'
                             value={piece.authors.toString()}
                             onChangeText={authors => updatePiece({
                                 ...piece,
                                 authors: authors.split(',')
                             })}/>

                <TagInput list={piece.tags}
                          onUpdateTags={tags => updatePiece({ ...piece, tags })}/>

                {errors.length !== 0 ? <ErrorAlert message={errors}/> : undefined}
            </View>

            {mode === ActionType.Create ?
                <PieceNotifications interval={piece.notifications.interval}
                                    enabled={piece.notifications.enabled}
                                    updateInterval={updateInterval}
                                    updateEnabled={toggleNotifs}/>
                : undefined}

            <ItemButtonsWrap>
                <MinorButton style={{ marginTop: 10, alignSelf: 'center' }}
                             onPress={() => {
                                 props.navigation.goBack();
                                 resetState();
                             }}>Cancel</MinorButton>
                <PrimaryButton style={{ marginLeft: 'auto' }}
                               onPress={async () => await validateAndSave()}>Save</PrimaryButton>
            </ItemButtonsWrap>
        </ScreenWrapper>
    );
};

export const PieceForm = connect(mapStateToProps, mapDispatchToProps)(PieceFormComponent);
