import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { Route, ScrollView } from "react-native";
import { ItemPaths, SESSION_START } from "../../../NavigationPath";
import { ActionType } from "../../../types/ActionType";
import { Item, ItemName } from "../../../types/item/Item";
import { Button } from "../buttons/Button";
import { NextButton, PrevButton } from "../buttons/Direction";
import { ConfirmDeleteModal } from "./ConfrmDeleteModal";
import { ItemButtonsWrap } from "./ItemButtons";
import { ScreenWrapper } from "../ScreenWrapper";

export type ItemScreenWrapperProps<ItemT extends Item> = {
    route: Route & { params: { id: number, lastUpdated?: number } },
    sideIds: {
        next?: number,
        prev?: number,
    },
    deleteItem: () => void,
    toggleItemFav: () => void,

    item: ItemT,
    setItem: (i: ItemT) => void,
    children: (JSX.Element | undefined)[] | JSX.Element,

    itemName: ItemName,
    onPractice?: () => void,
};

export const ItemScreenWrapper = <ItemType extends Item>(props: ItemScreenWrapperProps<ItemType>) => {
    const [showDeleteModal, updateShowDeleteModal] = useState(false),
        nav = useNavigation();

    const paths = ItemPaths[props.itemName];

    const onDelete = async () => {
        updateShowDeleteModal(false);
        await props.deleteItem();
        nav.navigate(paths.list);
    };

    const updateItemFav = () => {
        props.toggleItemFav();
        props.setItem({ ...props.item, isFavourite: !props.item.isFavourite });
    };

    const menu = [
        {
            label: 'Edit',
            func: () => nav.dispatch(StackActions.push(paths.form,
                { mode: ActionType.Edit, [props.itemName]: props.item }))
        },
        { label: 'Delete', func: () => updateShowDeleteModal(true) },
    ];

    const replaceItem = (id: number) => nav.dispatch(StackActions.replace(paths.item, { id }));

    // @ts-ignore
    const next = props.sideIds.next !== undefined ? () => replaceItem(props.sideIds.next) : undefined;
    // @ts-ignore
    const prev = props.sideIds.prev !== undefined ? () => replaceItem(props.sideIds.prev) : undefined;

    const onPractice = () => nav.dispatch(StackActions.push(SESSION_START));

    return (
        <ScreenWrapper itemMenu={menu} fav={{ val: props.item.isFavourite, update: updateItemFav }}>
            <ScrollView contentContainerStyle={scrollStyle}>
                {props.children}
            </ScrollView>
            {showDeleteModal ?
                <ConfirmDeleteModal onCancel={() => updateShowDeleteModal(false)} onOk={onDelete}/> : undefined}

            <ItemButtonsWrap>
                <PrevButton onPress={prev}/>
                <Button label='Practice' style={btnStyle} onPress={onPractice}/>
                <NextButton onPress={next}/>
            </ItemButtonsWrap>
        </ScreenWrapper>);
};

const scrollStyle = { paddingBottom: 65 };

const btnStyle = { marginRight: 15, marginLeft: 15 };
