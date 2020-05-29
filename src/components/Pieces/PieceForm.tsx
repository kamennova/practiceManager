import { ImagePickerResult } from "expo-image-picker";
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle, TotalHeaderHeight } from "../../AppStyle";
import { validatePiece } from "../../db/fix/piece";
import { PIECE } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkAddPiece, thunkEditPiece } from "../../store/thunks";
import { ActionType } from "../../types/ActionType";
import { FormProps, FormState } from "../../types/item/ItemForm";
import { EmptyPiece, Piece } from "../../types/piece";
import { trimStrArr } from "../../utils/strings";
import { ErrorAlert } from "../basic/alerts";
import { SaveButton } from "../basic/buttons/ActionButton";
import { MyImagePicker } from "../basic/inputs/ImagePicker";
import { TagInput } from "../basic/inputs/TagInput";
import { MyTextInput } from "../basic/inputs/TextInput";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { PieceNotifications } from "./PieceNotifications";

class PieceFormComponent extends Component<FormProps<Piece, { piece: Piece }>, FormState<{ piece: Piece }>> {
    mode = this.props.route.params.mode === undefined ? ActionType.Create : this.props.route.params.mode;

    state = {
        piece: this.props.route.params.mode === ActionType.Edit ? this.props.route.params.piece : EmptyPiece,
        errors: '',
    };

    resetState = () => this.setState({ piece: EmptyPiece, errors: '' });

    setPiece = (pieceUpd: Piece) => {
        this.setState({
            errors: this.state.errors,
            piece: pieceUpd,
        });
    };

    setAuthors = (a: string) => this.setPiece({ ...this.state.piece, authors: a.split(',') });
    setName = (name: string) => this.setPiece({ ...this.state.piece, name });
    setTags = (tags: string[]) => this.setPiece({ ...this.state.piece, tags });

    toggleNotifs = () => this.setPiece({ ...this.state.piece, notifsOn: !this.state.piece.notifsOn });
    updateInterval = (val: number) => this.setPiece({ ...this.state.piece, notifsInterval: val });

    async validateAndSave() {
        this.setPiece({ ...this.state.piece, authors: trimStrArr(this.state.piece.authors) });
        const res = await validatePiece(this.state.piece);

        if (res.valid) {
            await this.props.onHandleSave(this.state.piece);

            if (this.mode === ActionType.Create && this.props.addedItemId === undefined) {
                await Promise.reject('Added piece id should be already updated ');
            }

            this.props.navigation.navigate(PIECE, {
                id: this.props.route.params.mode === ActionType.Edit ?
                    this.props.route.params.piece.id : this.props.addedItemId,
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
        return (
            <ScreenWrapper fav={this.fav()}>
                <ScrollView contentContainerStyle={styles.wrap}>
                    <View style={AppPaddingStyle}>

                        <MyTextInput label={'Title'}
                                     isRequired={true}
                                     value={this.state.piece.name}
                                     autoFocus={this.props.route.params.mode === ActionType.Create}
                                     onChangeText={this.setName}/>

                        <MyTextInput label='Author'
                                     value={this.state.piece.authors.toString()}
                                     onChangeText={this.setAuthors}/>

                        <TagInput list={this.state.piece.tags} onUpdateTags={this.setTags}/>

                        <MyImagePicker src={this.state.piece.imageUri}
                                       onDelete={() => this.setPiece({ ...this.state.piece, imageUri: undefined })}
                                       onChoose={this.pickImage}/>

                        {this.state.errors.length !== 0 ? <ErrorAlert message={this.state.errors}/> : undefined}
                    </View>

                    {this.props.route.params.mode === ActionType.Create ?
                        <PieceNotifications interval={this.state.piece.notifsInterval}
                                            enabled={this.state.piece.notifsOn}
                                            updateInterval={this.updateInterval}
                                            updateEnabled={this.toggleNotifs.bind(this)}/>
                        : undefined}
                </ScrollView>

                <SaveButton onPress={async () => await this.validateAndSave()}/>
            </ScreenWrapper>
        );
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: FormProps<Piece, { piece: Piece }>) => ({
    onHandleSave: (ownProps.route.params.mode === ActionType.Edit) ?
        (piece: Piece) => dispatch(thunkEditPiece(piece)) :
        (piece: Piece) => dispatch(thunkAddPiece(piece)),
});

const mapStateToProps = (state: StateShape) => ({ addedItemId: state.pieces.lastAddedId, });

export const PieceForm = connect(mapStateToProps, mapDispatchToProps)(PieceFormComponent);

const styles = StyleSheet.create({
    wrap: { paddingBottom: 60, paddingTop: TotalHeaderHeight + 20 },
});
