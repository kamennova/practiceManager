import React from "react";
import { ActivityBlockStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";
import { Direction } from "../../types/Direction";
import { ArrowIcon } from "../basic/icons/ArrowIcon";
import { DotsIcon } from "../basic/icons/DotsIcon";
import { ActivityBlock, BlockProps } from "./ActivityBlock";

type EditableBlockProps = BlockProps & {
    onShowMenu: () => void,
    onMove: (pos: -1 | 1) => void,
}

const IconSize = 15;

export const EditableActivityBlock = (props: EditableBlockProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <ActivityBlock activity={props.activity}
                       isLast={props.isLast}
                       isFirst={props.isFirst}>
            <ArrowIcon size={IconSize}
                       wrapStyle={{ ...styles.iconStyle, opacity: props.isFirst ? 0.3 : 1 }}
                       onPress={props.isFirst ? undefined : () => props.onMove(-1)}
                       direction={Direction.Top}/>
            <ArrowIcon size={IconSize}
                       wrapStyle={{ ...styles.iconStyle, opacity: props.isLast ? 0.3 : 1 }}
                       onPress={props.isLast ? undefined : () => props.onMove(1)}
                       direction={Direction.Bottom}/>
            <DotsIcon wrapStyle={{ width: 25, marginLeft: 10 }} onPress={props.onShowMenu}/>
        </ActivityBlock>
    );
};
