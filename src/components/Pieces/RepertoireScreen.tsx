import React, { Component } from 'react';
import { View } from "react-native";
import { connect } from 'react-redux'
import { AppPaddingStyle } from "../../AppStyle";
import { PIECE_FORM } from "../../NavigationPath";
import { StateShape } from "../../StoreState";
import { thunkGetPieces } from "../../thunks";
import { ActionType } from "../../types/ActionType";
import { Piece } from "../../types/Piece";
import { AddButton } from "../basic/Buttons/AddButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";
import { PieceFilters } from "./PieceFilters";
import { PiecesList } from "./PiecesList";

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces,
});

const mapDispatchToProps = (dispatch: any) => ({
    getPieces: () => dispatch(thunkGetPieces()),
});

class Repertoire extends Component<{ pieces: Piece[], getPieces: () => void, navigation: any }> {
    componentDidMount() {
        this.props.getPieces();
    }

    render() {
        return (
            <ScreenWrapper>
                <View style={{
                    ...AppPaddingStyle
                }}>
                    <View style={{
                        marginBottom: 20,
                    }}>
                        <ScreenTitle>Repertoire</ScreenTitle>
                        <AddButton
                            onPress={() => this.props.navigation.navigate(PIECE_FORM, {
                                mode: ActionType.Create,
                            })}/>
                        <PieceFilters/>
                    </View>
                    <PiecesList pieces={this.props.pieces}/>
                </View>
            </ScreenWrapper>
        );
    }
}

const RepertoireScreen = connect(mapStateToProps, mapDispatchToProps)(Repertoire);
export default RepertoireScreen;
