import React, { Component } from 'react';
import { Route, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle, PrimaryButtonStyle } from "../../AppStyle";
import { getPieceById } from "../../backend/db";
import { validatePiece } from "../../backend/validation";
import { PIECE } from "../../NavigationPath";
import { StateShape } from "../../StoreState";
import { thunkAddPiece } from "../../thunks";
import { ActionType } from "../../types/ActionType";
import { Piece } from "../../types/Piece";
import { Button } from "../basic/Buttons/Button";
import { ErrorAlert } from "../basic/ErrorAlert";
import { MyCheckbox } from "../basic/Inputs/Checkbox";
import { DaysInput } from "../basic/Inputs/DaysInput";
import { TagInput } from "../basic/Inputs/TagInput";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

const EmptyPiece: Piece = {
    id: 0,
    name: '',
    timeSpent: 0,
    notifications: {
        interval: 3,
        enabled: true,
    },
    authors: [],
    tags: [],
};

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
            this.setState({ piece: this.state.piece, errors: '' });

            this.props.onSavePiece(this.state.piece)
                .then(() => {
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
                    <ScreenTitle>Add piece</ScreenTitle>

                    <View style={{ marginTop: 15 }}>
                        <View>
                            <MyTextInput onChangeText={(val) => this.updatePiece({ ...this.state.piece, name: val })}
                                         placeholder={'Piece title'}/>
                            <TagInput placeholder={'Authors (separated by «,»)'}
                                      onUpdateTags={authors => this.updatePiece({ ...this.state.piece, authors })}/>

                            <TagInput onUpdateTags={tags => this.updatePiece({ ...this.state.piece, tags })}/>

                            {this.state.errors.length !== 0 ? <ErrorAlert message={this.state.errors}/> : undefined}

                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: 'grey',
                                marginBottom: 20,
                                marginTop: 14
                            }}/>

                            <MyCheckbox onValueChange={() => this.updatePiece({
                                ...this.state.piece,
                                notifications: {
                                    interval: this.state.piece.notifications.interval,
                                    enabled: !this.state.piece.notifications.enabled
                                }
                            })} value={this.state.piece.notifications.enabled}
                                        title={'Notifications on'}/>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, }}>Remind to practice every</Text>
                                <DaysInput value={this.state.piece.notifications.interval}
                                           onChange={(val) => this.updatePiece({
                                               ...this.state.piece,
                                               notifications: {
                                                   interval: val,
                                                   enabled: this.state.piece.notifications.enabled
                                               }
                                           })}
                                           minVal={1} maxVal={100}/>
                                <Text>day{this.state.piece.notifications.interval > 1 ? 's' : undefined} </Text>
                            </View>
                        </View>
                    </View>

                    <Button onPress={async () => await this.validateAndSave()}
                            style={{ marginTop: 'auto', marginBottom: 15, ...PrimaryButtonStyle }}>Save</Button>
                    <Button onPress={() => this.props.navigation.goBack()}>Cancel</Button>
                </View>
            </ScreenWrapper>
        );
    }
}

export const PieceForm = connect(mapStateToProps, mapDispatchToProps)(PieceFormComponent);
