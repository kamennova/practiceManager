import { ImagePickerResult } from "expo-image-picker";
import React, { Component } from 'react';
import { Route, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { getPieceById } from "../../db/db";
import { validatePiece } from "../../db/validation";
import { PIECE } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkAddPiece } from "../../store/thunks";
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

const mapDispatchToProps = (dispatch: any) => ({
    onSavePiece: (piece: Piece) => dispatch(thunkAddPiece(piece)),
});

const mapStateToProps = (state: StateShape) => ({
    addedPieceId: state.pieces.lastAddedId,
});

type FormProps = {
    route: Route,
    onSavePiece: (piece: Piece) => any,
    addedPieceId?: number,
    navigation: any,
};

class PieceFormComponent extends Component<FormProps> {
    state = {
        piece: this.props.route.params.mode === ActionType.Create ? EmptyPiece : this.props.route.params.piece,
        errors: '',
    };

    resetState = () => this.setState({ piece: EmptyPiece, errors: '' });

    updatePiece(pieceUpd: Piece) {
        this.setState({
            errors: this.state.errors,
            piece: pieceUpd,
        });
    };

    toggleNotifs = () => this.updatePiece({
        ...this.state.piece,
        notifications: {
            interval: this.state.piece.notifications.interval,
            enabled: !this.state.piece.notifications.enabled
        }
    });

    updateInterval = (val: number) => this.updatePiece({
        ...this.state.piece,
        notifications: {
            interval: val,
            enabled: this.state.piece.notifications.enabled,
        }
    });

    async validateAndSave() {
        const res = await validatePiece(this.state.piece);

        if (res.valid) {
            this.props.onSavePiece(this.state.piece)
                .then(() => {
                    this.resetState();
                    if (this.props.addedPieceId === undefined) {
                        throw new Error('Added piece id should be already updated ');
                    }

                    return getPieceById(this.props.addedPieceId);
                })
                .then((piece: Piece) => this.props.navigation.navigate(PIECE, { id: piece.id }));
        } else {
            this.setState({ piece: this.state.piece, errors: res.errors });
        }
    };

    pickImage = async (res: ImagePickerResult) => {
        if (!res.cancelled) {
            this.updatePiece({ ...this.state.piece, imageUri: res.uri });
        }
    };

    render() {
        return (
            <ScreenWrapper fullHeight={true} title={'Add piece'} isMain={false}
                           transparent={true}
                           headerStyle={{
                               borderBottomColor: this.state.piece.imageUri !== undefined ?
                                   'rgba(0, 0, 0, 0.1)' : 'lightgrey',
                           }}>

                <MyImagePicker src={this.state.piece.imageUri}
                               onDelete={() => this.updatePiece({ ...this.state.piece, imageUri: undefined })}
                               onChoose={this.pickImage}/>

                <View style={AppPaddingStyle}>

                    <MyTextInput placeholder={'Title'}
                                 value={this.state.piece.name}
                                 autoFocus={true}
                                 onChangeText={(val) => this.updatePiece({ ...this.state.piece, name: val })}
                                 style={{ borderColor: 'blue' }}/>

                    <MyTextInput placeholder='Author'
                                 value={this.state.piece.authors.toString(', ')}
                                 onChangeText={authors => this.updatePiece({
                                     ...this.state.piece,
                                     authors: authors.split(',')
                                 })}/>

                    <TagInput value={this.state.piece.tags}
                              onUpdateTags={tags => this.updatePiece({ ...this.state.piece, tags })}/>

                    {this.state.errors.length !== 0 ? <ErrorAlert message={this.state.errors}/> : undefined}
                </View>

                <PieceNotifications interval={this.state.piece.notifications.interval}
                                    enabled={this.state.piece.notifications.enabled}
                                    updateInterval={(val) => this.updateInterval.bind(this, val)}
                                    updateEnabled={this.toggleNotifs.bind(this)}/>

                <ItemButtonsWrap>
                    <MinorButton style={{ marginTop: 10, alignSelf: 'center' }}
                                 onPress={() => {
                                     this.resetState();
                                     this.props.navigation.goBack()
                                 }}>Cancel</MinorButton>
                    <PrimaryButton style={{ marginLeft: 'auto' }}
                                   onPress={async () => await this.validateAndSave()}>Save</PrimaryButton>
                </ItemButtonsWrap>
            </ScreenWrapper>
        );
    }
}

export const PieceForm = connect(mapStateToProps, mapDispatchToProps)(PieceFormComponent);
