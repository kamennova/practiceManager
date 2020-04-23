import { StackActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { ScrollView } from "react-native";
import { connect } from 'react-redux'
import { AppPaddingStyle } from "../../AppStyle";
import { PIECE_FORM } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkGetPiecesMeta } from "../../store/thunks";
import { ActionType } from "../../types/ActionType";
import { PieceBase } from "../../types/Piece";
import { AddButton } from "../basic/Buttons/ActionButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { PiecesList } from "./PiecesList";

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

const mapDispatchToProps = (dispatch: any) => ({
    getPieces: () => dispatch(thunkGetPiecesMeta()),
});

class Repertoire extends Component<{ pieces: PieceBase[], getPieces: () => void, navigation: any }> {
    componentDidMount() {
        this.props.getPieces();
    }

    render() {
        return (
            <ScreenWrapper>
                <ScrollView contentContainerStyle={scrollStyle}>
                    <PiecesList pieces={this.props.pieces}/>
                </ScrollView>
                <AddButton onPress={() => this.props.navigation.dispatch(pushForm)}/>
            </ScreenWrapper>
        );
    }
}

const pushForm = StackActions.push(PIECE_FORM, { mode: ActionType.Create, });

const RepertoireScreen = connect(mapStateToProps, mapDispatchToProps)(Repertoire);
export default RepertoireScreen;

const scrollStyle = {
    ...AppPaddingStyle,
    paddingBottom: 90,
    paddingTop: 20,
};
