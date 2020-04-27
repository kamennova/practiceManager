import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { Route } from "react-native";
import { ItemPaths } from "../../../NavigationPath";
import { ActionType } from "../../../types/ActionType";
import { Item, ItemName } from "../../../types/item/Item";
import { PrimaryButton } from "../Buttons/Button";
import { NextButton, PrevButton } from "../Buttons/Direction";
import { ConfirmDeleteModal } from "../ConfrmDeleteModal";
import { ItemButtonsWrap } from "../ItemButtons";
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
    children: JSX.Element[] | JSX.Element,

    itemName: ItemName,
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

    const replace = (id: number) => StackActions.replace(paths.item, { id });

    // @ts-ignore
    const next = props.sideIds.next !== undefined ? () => nav.dispatch(replace(props.sideIds.next)) : undefined;
    // @ts-ignore
    const prev = props.sideIds.prev !== undefined ? () => nav.dispatch(replace(props.sideIds.prev)) : undefined;

    return (
        <ScreenWrapper itemMenu={menu} fav={{ val: props.item.isFavourite, update: updateItemFav }}>
            {props.children}
            {showDeleteModal ?
                <ConfirmDeleteModal onCancel={() => updateShowDeleteModal(false)} onOk={onDelete}/> : undefined}

            <ItemButtonsWrap>
                <PrevButton
                    onPress={prev}/>
                <PrimaryButton style={{ marginRight: 15, marginLeft: 15 }}>Practice</PrimaryButton>
                <NextButton
                    onPress={next}/>
            </ItemButtonsWrap>
        </ScreenWrapper>);
};
