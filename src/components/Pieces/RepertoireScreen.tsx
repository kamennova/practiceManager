import React, { Component } from 'react';
import { ScrollView, View } from "react-native";
import { connect } from 'react-redux'
import { AppPaddingStyle } from "../../AppStyle";
import { PIECE_FORM } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkGetPiecesMeta } from "../../store/thunks";
import { ActionType } from "../../types/ActionType";
import { PieceBase } from "../../types/Piece";
import { AddButton } from "../basic/Buttons/AddButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { PieceFilters } from "./PieceFilters";
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
            <ScreenWrapper title='Repertoire'>
                <ScrollView style={{
                    ...AppPaddingStyle,
                    marginBottom: 100
                }}>
                    <View style={{
                        marginBottom: 20,
                    }}>
                        <PieceFilters/>
                    </View>
                    <PiecesList pieces={this.props.pieces}/>
                </ScrollView>
                <AddButton
                    onPress={() => this.props.navigation.navigate(PIECE_FORM, { mode: ActionType.Create, })}/>
            </ScreenWrapper>
        );
    }
}

const RepertoireScreen = connect(mapStateToProps, mapDispatchToProps)(Repertoire);
export default RepertoireScreen;
