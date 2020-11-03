import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";
import { SendButton } from "./buttons/SendButton";
import { MyTextInput } from "./inputs/TextInput";
import { OpacityModal } from "./OpacityModal";

type ModalProps = {
    isVisible: boolean,
    onHideModal: () => void,
    onSaveNote: (content: string) => void,
};

export const PieceNoteModal = (props: ModalProps) => {
    return (
        <OpacityModal isVisible={props.isVisible} hideModal={props.onHideModal}>
            <PieceNoteForm onSave={props.onSaveNote}/>
        </OpacityModal>
    );
};

const PieceNoteForm = (props: { onSave: (note: string) => void }) => {
    const [content, setContent] = useState('');
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            <MyTextInput placeholder='Enter note...' lines={5} onChangeText={setContent} value={content}/>
            <SendButton onSave={() => props.onSave(content)}/>
        </View>
    );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.appBg,
        padding: 20,
    },
});
