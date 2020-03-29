import { ImagePickerResult } from "expo-image-picker";
import React, { Component } from 'react';
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
    onHandlePiece: ownProps.route.params.mode === ActionType.Create ? (piece: Piece) => dispatch(thunkAddPiece(piece)) :
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

type FormState = {
    piece: Piece,
    errors?: string
};

class PieceFormComponent extends Component<FormProps, FormState> {
    mode = this.props.route.params.mode === undefined ? ActionType.Create : this.props.route.params.mode;

    state = {
        piece: this.mode === ActionType.Create ? EmptyPiece :
            (this.props.route.params.piece !== undefined ? this.props.route.params.piece : EmptyPiece),
        errors: '',
    };

    resetState = () => this.setState({ piece: EmptyPiece, errors: '' });

    updatePiece = (pieceUpd: Piece) => {
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
            await this.props.onHandlePiece(this.state.piece);

            if (this.props.addedPieceId === undefined) {
                throw new Error('Added piece id should be already updated ');
            }

            this.props.navigation.navigate(PIECE,
                { id: this.props.addedPieceId, lastUpdated: this.mode === ActionType.Edit ? Date.now() : undefined });
            this.resetState();
        } else {
            this.setState({ piece: this.state.piece, errors: res.errors });
        }
    };

    pickImage = async (res: ImagePickerResult) => {
        if (!res.cancelled) {
            this.updatePiece({ ...this.state.piece, imageUri: res.uri });
        }
    };

    fav = () => this.mode === ActionType.Create ? {
        val: this.state.piece.isFavourite,
        update: () => this.updatePiece({ ...this.state.piece, isFavourite: !this.state.piece.isFavourite }),
    } : undefined;

    render() {
        return (
            <ScreenWrapper fav={this.fav()}>

                <MyImagePicker src={this.state.piece.imageUri}
                               onDelete={() => this.updatePiece({ ...this.state.piece, imageUri: undefined })}
                               onChoose={this.pickImage}/>

                <View style={AppPaddingStyle}>

                    <MyTextInput placeholder={'Title'}
                                 value={this.state.piece.name}
                                 autoFocus={this.mode === ActionType.Create}
                                 onChangeText={(val) => this.updatePiece({ ...this.state.piece, name: val })}
                                 style={{ borderColor: 'blue' }}/>

                    <MyTextInput placeholder='Author'
                                 value={this.state.piece.authors.toString()}
                                 onChangeText={authors => this.updatePiece({
                                     ...this.state.piece,
                                     authors: authors.split(',')
                                 })}/>

                    <TagInput value={this.state.piece.tags}
                              onUpdateTags={tags => this.updatePiece({ ...this.state.piece, tags })}/>

                    {this.state.errors.length !== 0 ? <ErrorAlert message={this.state.errors}/> : undefined}
                </View>

                {this.mode === ActionType.Create ?
                    <PieceNotifications interval={this.state.piece.notifications.interval}
                                        enabled={this.state.piece.notifications.enabled}
                                        updateInterval={(val) => this.updateInterval.bind(this, val)}
                                        updateEnabled={this.toggleNotifs.bind(this)}/>
                    : undefined}

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
