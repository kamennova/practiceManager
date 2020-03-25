import React, { Component } from 'react';
import { Route, Text, View } from "react-native";
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
import { Divider } from "../basic/Divider";
import { ErrorAlert } from "../basic/ErrorAlert";
import { MyCheckbox } from "../basic/Inputs/Checkbox";
import { DaysInput } from "../basic/Inputs/DaysInput";
import { TagInput } from "../basic/Inputs/TagInput";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

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

    updatePiece(pieceUpd: Piece) {
        this.setState({
            errors: this.state.errors,
            piece: pieceUpd,
        });
    };

    async validateAndSave() {
        const res = await validatePiece(this.state.piece);

        if (res.valid) {
            this.props.onSavePiece(this.state.piece)
                .then(() => {
                    this.setState({ piece: EmptyPiece, errors: '' });
                    if (this.props.addedPieceId === undefined) {
                        throw new Error('Added piece id should be already updated ');
                    }

                    return getPieceById(this.props.addedPieceId);
                })
                .then((piece: Piece) => this.props.navigation.navigate(PIECE, { piece }));
        } else {
            this.setState({ piece: this.state.piece, errors: res.errors });
        }
    };

    render() {
        return (
            <ScreenWrapper fullHeight={true}>
                <View style={{
                    ...AppPaddingStyle,
                    paddingBottom: 30,
                    flexGrow: 1,
                }}>
                    <ScreenTitle style={{ marginBottom: 25 }}>Add piece</ScreenTitle>

                    <MyTextInput onChangeText={(val) => this.updatePiece({ ...this.state.piece, name: val })}
                                 placeholder={'Piece title'}/>

                    <TagInput placeholder={'Authors (separated by «,»)'}
                              onUpdateTags={authors => this.updatePiece({ ...this.state.piece, authors })}/>

                    <TagInput onUpdateTags={tags => this.updatePiece({ ...this.state.piece, tags })}/>

                    {this.state.errors.length !== 0 ? <ErrorAlert message={this.state.errors}/> : undefined}

                    <Divider style={{ marginBottom: 25, marginTop: 10 }}/>

                    <MyCheckbox onValueChange={() => this.updatePiece({
                        ...this.state.piece,
                        notifications: {
                            interval: this.state.piece.notifications.interval,
                            enabled: !this.state.piece.notifications.enabled
                        }
                    })} value={this.state.piece.notifications.enabled}
                                title={'Notifications on'}/>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, }}>Remind to practice every</Text>
                        <DaysInput value={this.state.piece.notifications.interval}
                                   onChange={(val) => this.updatePiece({
                                       ...this.state.piece,
                                       notifications: {
                                           interval: val,
                                           enabled: this.state.piece.notifications.enabled
                                       }
                                   })}
                                   minVal={1} maxVal={100}/>
                        <Text
                            style={{ fontSize: 17 }}>day{this.state.piece.notifications.interval > 1 ? 's' : undefined}
                        </Text>
                    </View>

                    <PrimaryButton style={{ marginTop: 'auto' }}
                                   onPress={async () => await this.validateAndSave()}>Save</PrimaryButton>
                    <MinorButton style={{ marginTop: 10, alignSelf: 'center' }}
                                 onPress={() => this.props.navigation.goBack()}>Cancel</MinorButton>
                </View>
            </ScreenWrapper>
        );
    }
}

export const PieceForm = connect(mapStateToProps, mapDispatchToProps)(PieceFormComponent);
