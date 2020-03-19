import React, { Component } from 'react';
import { Route, Text, View } from "react-native";
import { AppPaddingStyle, PrimaryButtonStyle } from "../../AppStyle";
import { addPiece } from "../../backend/db";
import { validatePiece } from "../../backend/validation";
import { PIECE } from "../../NavigationPath";
import { ActionType } from "../../types/FormType";
import { Piece } from "../../types/Piece";
import { Button } from "../basic/Buttons/Button";
import { ErrorAlert } from "../basic/ErrorAlert";
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
    authors: [],
    tags: [],
};

type FormProps = {
    route: Route,
    navigation: any,
    updatePieces: () => void
};

export class PieceForm extends Component<FormProps> {
    state = {
        piece: this.props.route.params.mode === ActionType.Create ? EmptyPiece : this.props.route.params.piece,
        errors: '',
    };

    updatePiece(pieceUpd: Piece) {

        this.setState({
            ...this.state,
            piece: pieceUpd
        });
    };

    async validateAndSave() {
        const res = await validatePiece(this.state.piece);

        if (res.valid) {
            this.setState({ ...this.state, errors: '' });
            const addedPiece = await addPiece(this.state.piece);

            this.props.navigation.navigate(PIECE, { piece: addedPiece });
        } else {
            this.setState({ ...this.state, errors: res.errors });
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
                            <MyTextInput placeholder={'Authors'}
                                         onChangeText={(val) => this.updatePiece({
                                             ...this.state.piece,
                                             authors: [val]
                                         })}/>

                            <MyTextInput placeholder={'Tags'}
                                         onChangeText={(val) => this.updatePiece({
                                             ...this.state.piece,
                                             tags: [val]
                                         })}/>

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
                                notificationsOn: !this.state.piece.notificationsOn
                            })} value={this.state.piece.notificationsOn}
                                        title={'Notifications on'}/>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, }}>Remind to practice every</Text>
                                <DaysInput value={this.state.piece.notificationsInterval}
                                           onChange={(val) => this.updatePiece({
                                               ...this.state.piece,
                                               notificationsInterval: val
                                           })}
                                           minVal={1} maxVal={100}/>
                                <Text>day{this.state.piece.notificationsInterval > 1 ? 's' : undefined} </Text>
                            </View>
                        </View>
                    </View>

                    <Button onPress={async () => await this.validateAndSave()}
                            style={{ marginTop: 'auto', ...PrimaryButtonStyle }}>Save</Button>
                </View>
            </ScreenWrapper>
        );
    }
}