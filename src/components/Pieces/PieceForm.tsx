import { ImagePickerResult } from "expo-image-picker";
import React, { Component } from 'react';
import { Route, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { validatePiece } from "../../db/validation";
import { PIECE } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkAddPiece, thunkEditPiece } from "../../store/thunks";
import { ActionType } from "../../types/ActionType";
import { EmptyPiece } from "../../types/EmptyPiece";
import { Piece } from "../../types/Piece";
import { trimStrArr } from "../../utils/strings";
import { MinorButton, PrimaryButton } from "../basic/Buttons/Button";
import { ErrorAlert } from "../basic/ErrorAlert";
import { MyImagePicker } from "../basic/ImagePicker";
import { TagInput } from "../basic/Inputs/TagInput";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ItemButtonsWrap } from "../basic/ItemButtons";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { PieceNotifications } from "./PieceNotifications";

type FormProps = {
    route: Route & { params: { mode?: ActionType.Create } | { mode: ActionType.Edit, piece: Piece } },
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
        piece: this.props.route.params.mode === ActionType.Edit ? this.props.route.params.piece : EmptyPiece,
        errors: '',
    };

    resetState = () => this.setState({ piece: EmptyPiece, errors: '' });
    cancel = () => {
        this.resetState();
        this.props.navigation.goBack()
    };

    setPiece = (pieceUpd: Piece) => {
        this.setState({
            errors: this.state.errors,
            piece: pieceUpd,
        });
    };

    setAuthors = (a: string) => this.setPiece({ ...this.state.piece, authors: a.split(',') });
    setName = (name: string) => this.setPiece({ ...this.state.piece, name });
    setTags = (tags: string[]) => this.setPiece({ ...this.state.piece, tags });

    toggleNotifs = () => this.setPiece({
        ...this.state.piece,
        notifications: {
            interval: this.state.piece.notifications.interval,
            enabled: !this.state.piece.notifications.enabled
        }
    });

    updateInterval = (val: number) => this.setPiece({
        ...this.state.piece,
        notifications: {
            interval: val,
            enabled: this.state.piece.notifications.enabled,
        }
    });

    async validateAndSave() {
        this.setPiece({ ...this.state.piece, authors: trimStrArr(this.state.piece.authors) });
        const res = await validatePiece(this.state.piece);

        if (res.valid) {
            await this.props.onHandlePiece(this.state.piece);

            if (this.mode === ActionType.Create && this.props.addedPieceId === undefined) {
                await Promise.reject('Added piece id should be already updated ');
            }

            this.props.navigation.navigate(PIECE, {
                id: this.props.route.params.mode === ActionType.Edit ?
                    this.props.route.params.piece.id : this.props.addedPieceId,
                lastUpdated: this.mode === ActionType.Edit ? Date.now() : undefined
            });
            this.resetState();
        } else {
            this.setState({ piece: this.state.piece, errors: res.errors });
        }
    };

    pickImage = (res: ImagePickerResult) => {
        if (!res.cancelled) {
            this.setPiece({ ...this.state.piece, imageUri: res.uri });
        }
    };

    fav = () => this.mode === ActionType.Create ? {
        val: this.state.piece.isFavourite,
        update: () => this.setPiece({ ...this.state.piece, isFavourite: !this.state.piece.isFavourite }),
    } : undefined;

    render() {
        console.log('render');
        return (
            <ScreenWrapper fav={this.fav()}>

                <MyImagePicker src={this.state.piece.imageUri}
                               onDelete={() => this.setPiece({ ...this.state.piece, imageUri: undefined })}
                               onChoose={this.pickImage}/>

                <View style={AppPaddingStyle}>
                    <MyTextInput placeholder={'Title'}
                                 isRequired={true}
                                 value={this.state.piece.name}
                                 autoFocus={this.props.route.params.mode === ActionType.Create}
                                 onChangeText={this.setName}/>

                    <MyTextInput placeholder='Author'
                                 value={this.state.piece.authors.toString()}
                                 onChangeText={this.setAuthors}/>

                    <TagInput list={this.state.piece.tags}
                              onUpdateTags={this.setTags}/>

                    {this.state.errors.length !== 0 ? <ErrorAlert message={this.state.errors}/> : undefined}
                </View>

                {this.props.route.params.mode === ActionType.Create ?
                    <PieceNotifications interval={this.state.piece.notifications.interval}
                                        enabled={this.state.piece.notifications.enabled}
                                        updateInterval={this.updateInterval}
                                        updateEnabled={this.toggleNotifs.bind(this)}/>
                    : undefined}

                <ItemButtonsWrap>
                    <MinorButton style={styles.minor}
                                 onPress={this.cancel}>Cancel</MinorButton>
                    <PrimaryButton style={styles.primary} onPress={async () => await this.validateAndSave()}>Save</PrimaryButton>
                </ItemButtonsWrap>
            </ScreenWrapper>
        );
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: FormProps) => ({
    onHandlePiece: (ownProps.route.params.mode === ActionType.Edit) ?
        (piece: Piece) => dispatch(thunkEditPiece(piece)) :
        (piece: Piece) => dispatch(thunkAddPiece(piece)),
});

const mapStateToProps = (state: StateShape) => ({
    addedPieceId: state.pieces.lastAddedId,
});

export const PieceForm = connect(mapStateToProps, mapDispatchToProps)(PieceFormComponent);

const styles = StyleSheet.create({
    minor: { marginTop: 10, alignSelf: 'center' },
    primary: { marginLeft: 'auto' },
});
