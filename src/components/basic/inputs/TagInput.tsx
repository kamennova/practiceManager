import React, { useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { TagInputStyle, TagInputTagStyle, TextInputStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { FormInputWrap } from "./FormInputWrap";

const DEFAULT_SEPARATOR = ',';

type InputProps = {
    onUpdateTags: (tags: string[]) => void,
    list: string[],
    placeholder?: string,
    style?: ViewStyle,
    tagStyle?: ViewStyle,
    separator?: string,
    // todo show tips when typing
    onChangeText?: () => void,
    tips?: string[],
};

export const TagInput = (props: InputProps) => {
    const [val, updateVal] = useState('');
    const separator = props.separator !== undefined ? props.separator : DEFAULT_SEPARATOR;
    const styles = { ...TextInputStyle(useTheme().colors), ...TagInputStyle, ...props.style };

    const sendTag = () => {
        const last = val.length - 1;
        const input = (val[last] === separator ? val.slice(0, last) : val).trim();
        updateVal('');

        if (input !== '' && props.list.find(v => v === input) === undefined) {
            props.onUpdateTags([...props.list, input]);
        }
    };

    const deleteTag = (tag: string) => props.onUpdateTags(props.list.filter(t => t !== tag));

    return (
        <FormInputWrap label='Tags' style={{marginBottom: 12}}>
            <TextInput
                onSubmitEditing={sendTag}
                style={styles}
                value={val}
                onChangeText={updateVal}
                onKeyPress={({ nativeEvent: { key } }) => {
                    if (key === separator) sendTag();
                }}
                placeholder={props.placeholder !== undefined ? props.placeholder : `Separated by «${separator}»`}
                placeholderTextColor={'grey'}
                keyboardType={'default'}/>
            {props.list.length > 0 ?
                <TagWrapper>
                    {props.list.map(tag => <Tag style={props.tagStyle} tag={tag} onDelete={deleteTag}/>)}
                </TagWrapper> : undefined
            }
        </FormInputWrap>
    );
};

const TagWrapper = (props: { children?: JSX.Element[] | JSX.Element }) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, paddingLeft: 5, paddingRight: 5 }}>
        {props.children}
    </View>
);

type TagProps = {
    tag: string,
    onDelete: (tag: string) => void,
    style?: ViewStyle,
};

const Tag = (props: TagProps) => {
    const style = TagInputTagStyle(useTheme().colors);

    return (
        <View style={{
            ...style.wrap,
            ...props.style
        }}>
            <Text style={style.text}>
                {props.tag}
            </Text>
            <TouchableWithoutFeedback onPress={() => props.onDelete(props.tag)}>
                <Text style={style.close}>✖</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};
