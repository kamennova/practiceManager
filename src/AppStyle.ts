import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { DEFAULT_THEME, Theme, ThemeColors } from "./theme";

const DefaultColors = ThemeColors[DEFAULT_THEME];

const FONT_SIZE = 16;

const BorderRadius = 5;

export const AppSidePadding = 17,
    TotalHeaderHeight = 86;

export const Primary = '#6895ff',
    Dark = '#2d60d8';

export const AppPaddingStyle = {
    paddingLeft: AppSidePadding,
    paddingRight: AppSidePadding
};

export const AppHeaderStyle = (colors: ThemeColors, transparent: boolean = false): ViewStyle => ({
    borderBottomWidth: transparent ? 0 : 0,
    borderBottomColor: colors.border,
    backgroundColor: colors.appBg,
    shadowOpacity: 0,
    elevation: 0,
});

export const HeaderIconWrap = (colors: ThemeColors): ViewStyle => ({
    width: 35,
    height: 35,
    backgroundColor: colors.appBgFaded,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
});

const ItemHeight = 71,
    ItemBorderRadius = BorderRadius,
    ImageWidth = 170;

export const PieceListStyle = (colors: ThemeColors, theme: Theme = DEFAULT_THEME) => StyleSheet.create({
    author: {
        fontSize: 13,
        color: colors.colorFaded,
    },
    image: {
        width: ImageWidth,
        height: ItemHeight,
        marginLeft: 'auto',
        opacity: theme === Theme.Dark ? 0.7 : 1,
    },
    imageTop: {
        width: 200,
        height: ItemHeight,
        position: 'absolute',
        top: 0,
        right: -200 + ImageWidth,
    },
    itemWrap: {
        padding: 8,
    },
});

export const ListItemTitleStyle = (colors: ThemeColors = DefaultColors) => ({
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 3,
    color: colors.color,
    marginTop: 0,
});

export const ListItemStyle = (colors: ThemeColors): ViewStyle => ({
    borderColor: colors.borderFaded,
    backgroundColor: colors.appBg,
});

export const PieceItemStyle = (colors: ThemeColors): ViewStyle => ({
    ...ListItemStyle(colors),
    borderBottomWidth: 1,
    paddingLeft: AppSidePadding,
    flexDirection: 'row',
    minHeight: ItemHeight,
    alignItems: 'center',
});

const PlanItemMargin = 10;
const PlanItemWidth = (Dimensions.get('window').width - AppSidePadding * 2 - PlanItemMargin) / 2 - 1;

export const PlanItemStyle = (colors: ThemeColors = DefaultColors) => (StyleSheet.create({
    item: {
        ...ListItemStyle(colors),
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 12,
        paddingLeft: 15,
        width: PlanItemWidth,
        borderRadius: ItemBorderRadius,
        borderWidth: 1,
        marginBottom: 10,
    },
    title: {
        ...ListItemTitleStyle(colors),
        marginBottom: 14,
    },
}));

export const ActivityTimingStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    timing: {
        flexDirection: 'row',
        marginBottom: 11,
        alignItems: 'flex-end',
        width: '100%',
    },
    duration: {
        color: colors.color,
        marginRight: 6,
        fontSize: 15,
    },
    activity: {
        color: colors.colorFaded,
    }
});

export const ButtonStyle: ViewStyle = {
    minWidth: 200,
    flexGrow: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: 'lightgrey',
};

const PrimaryBtnHeight = 46;

export const BigButtonStyle: ViewStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 37,
    paddingRight: 37,
};

export const MinorButtonStyle: TextStyle = {
    fontSize: 17,
    color: 'grey',
    padding: 6,
};

export const DirectionButtonStyle = (colors: ThemeColors = DefaultColors, isDisabled: boolean = false): ViewStyle => ({
    width: PrimaryBtnHeight,
    height: PrimaryBtnHeight,
    backgroundColor: colors.appBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.borderFaded,
    opacity: isDisabled ? 0.4 : 1,
});

export const FeaturesStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    label: { fontSize: 13, color: colors.colorFaded, },
    val: { fontSize: 15, marginBottom: 4, color: colors.color },
    wrap: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10,
        borderColor: colors.border,
    }
});

export const NoteText = (colors: ThemeColors) => ({
    fontSize: FONT_SIZE,
    color: colors.colorFaded,
});

// ---

export const SectionRowStyle = (colors: ThemeColors) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        borderColor: colors.borderFaded,
        paddingBottom: 12,
        paddingTop: 12,
        paddingRight: 5,
    },
    label: {
        fontSize: FONT_SIZE,
        color: colors.color,
    },
    inputWrap: {
        flexDirection: 'row',
    }
});

// ---

export const DrawerStyle = (colors: ThemeColors = DefaultColors): ViewStyle => ({
    backgroundColor: colors.appBg,
    justifyContent: 'center',
});

export const DrawerContentStyle = {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 0,
    paddingLeft: 20,
};

export const ActionBtnStyle = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        height: 50,
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        backgroundColor: Dark,
        elevation: 2,
        borderRadius: BorderRadius,
    },
    text: {
        color: 'white',
        fontSize: 17,
        fontWeight: '400',
        letterSpacing: 0.1,
    },
    save: {
        position: 'absolute',
        right: AppSidePadding,
        top: Dimensions.get('window').height - 40,
    },
    check: {
        width: 19,
        height: 19,
        marginRight: 5,
    },
    add: {
        position: 'absolute',
        right: AppSidePadding,
        top: Dimensions.get('window').height - 130,
    },
    plus: {
        color: 'white',
        fontSize: 21,
        lineHeight: 28,
        marginRight: 8,
    },
});

export const ImagePickerStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    picker: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: BorderRadius,
        borderColor: colors.borderFaded,
        paddingRight: 14,
    },
    pic: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: BorderRadius,
        borderTopLeftRadius: BorderRadius,
        opacity: 0.8,
    },
    imageWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 55,
        width: 60,
        borderTopLeftRadius: BorderRadius,
        borderBottomLeftRadius: BorderRadius,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginRight: 'auto',
        fontSize: 15,
        color: colors.color,
    }
});

export const ItemBtnsStyle = (colors: ThemeColors): ViewStyle => ({
    position: 'absolute',
    top: Dimensions.get('window').height - 50,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appBg,
    padding: AppSidePadding,
    paddingTop: 15,
    paddingBottom: 0,
});

export const ModalStyle: ViewStyle = {
    padding: 25,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 'auto',
    minWidth: Dimensions.get('screen').width * 0.8,
};

export const SmallModalTitleStyle = (colors: ThemeColors = DefaultColors): TextStyle => ({
    marginBottom: 10,
    textAlign: 'center',
    color: colors.color,
    fontSize: 14,
});

export const ModalTitleStyle = (colors: ThemeColors = DefaultColors): TextStyle => ({
    marginBottom: 50,
    textAlign: 'center',
    color: colors.color,
    fontSize: 23,
});

export const PickerWrapperStyle = (colors: ThemeColors = DefaultColors) => ({
    borderWidth: 1,
    width: '100%',
    flexShrink: 1,
    borderColor: colors.borderFaded,
    marginBottom: 20,
});

export const PickerStyle = (colors: ThemeColors = DefaultColors) => ({
    width: '100%',
    flexShrink: 1,
    backgroundColor: colors.appBg,
});

export const TextInputStyle = (colors: ThemeColors) => ({
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderFaded,
    borderRadius: BorderRadius,
    padding: 7,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 15,
    fontSize: 18,
    color: colors.color,
});

export const LabelStyle = (colors: ThemeColors = DefaultColors) => ({
    marginBottom: 5,
    color: colors.colorFaded,
});

// --

const TagFonsize = 14;

export const TagInputStyle = { fontSize: TagFonsize, marginBottom: 8, };

export const TagInputTagStyle = (_: ThemeColors = DefaultColors) => StyleSheet.create({
    wrap: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginRight: 10,
        marginBottom: 10,
        paddingLeft: 8,
        paddingBottom: 5,
        paddingTop: 2,
        paddingRight: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Dark,
    },
    text: {
        fontSize: TagFonsize,
        color: Dark,
        lineHeight: TagFonsize,
    },
    close: {
        fontSize: 16,
        marginLeft: 5,
        color: Dark,
    }
});

// --

export const CheckboxWrapperStyle: ViewStyle = {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
};

export const CheckboxStyle = {
    width: 20,
    height: 20,
    marginRight: 15,
    marginTop: 0,
};

const NumInputHeight = 25;

export const NumberInputStyle = (colors: ThemeColors) => StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
    },
    inputWrap: {
        height: NumInputHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 2,
        paddingRight: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.borderFaded,
    },
    numberBtn: {
        height: NumInputHeight,
        backgroundColor: colors.appBg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1,
        borderColor: Dark,
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
        color: Dark,
    },
    input: {
        width: 'auto',
        textAlign: 'center',
        paddingLeft: 3,
        paddingRight: 3,
        marginRight: 2,
        marginLeft: 0,
        fontSize: 17,
        color: colors.color,
    },
    text: {
        color: colors.color,
    }
});

// ---

export const FullScreenModalStyle: ViewStyle = {
    ...AppPaddingStyle,
    paddingTop: 220,
    paddingBottom: 0,
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: Dimensions.get('window').height,
};

export const SessionScreenStyle: ViewStyle = {
    height: '100%',
    paddingBottom: 20,
    alignItems: 'center'
};

export const TimeTrackerTextStyle: TextStyle = {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
};

export const ErrorAlertStyle: ViewStyle = {
    padding: 8,
};

export const ErrorAlertTextStyle: TextStyle = {
    fontSize: 16,
    color: 'red',
};

export const TagStyle: ViewStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 15,
};

export const TagTextStyle: TextStyle = {
    fontSize: 15,
    color: 'grey',
};

export const ItemMenuStyle = (colors: ThemeColors = DefaultColors): ViewStyle => ({
    position: 'absolute',
    right: AppSidePadding,
    top: 40,
    width: 150,
    padding: 0,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: colors.borderFaded,
    backgroundColor: colors.appBg,
});

export const SmallModalStyle = (colors: ThemeColors = DefaultColors): ViewStyle => ({
    position: 'absolute',
    top: '30%',
    width: Dimensions.get('window').width * 0.8,
    marginLeft: Dimensions.get('window').width * 0.1,
    borderWidth: 1,
    borderColor: colors.borderFaded,
    padding: 18,
    paddingTop: 25,
    backgroundColor: colors.appBg,
    alignItems: 'center',
});

export const PlanBuilderStyle = StyleSheet.create({
    add: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: 'darkgrey',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plus: {
        fontSize: 23,
        marginRight: 10,
        color: Dark,
        lineHeight: 27,
    },
    text: {
        fontSize: 16,
        color: Dark,
        fontWeight: 'bold'
    }
});

export const ActivityBlockHeight = 52;

export const ActivityBlockStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    wrap: {
        minHeight: ActivityBlockHeight,
        borderWidth: 1,
        borderColor: colors.borderFaded,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 0,
        marginBottom: -1,
    },
    textWrap: {
        paddingTop: 14,
        paddingBottom: 14,
    },
    rightWrap: {
        flexDirection: 'row',
        backgroundColor: colors.appBg,
        marginLeft: 'auto',
        alignItems: 'center',
        paddingLeft: 8,
    },
    duration: {
        color: 'grey',
        marginLeft: 'auto',
        marginRight: 12,
    },
    name: {
        fontSize: 17,
        color: colors.color,
        overflow: 'hidden',
        flexWrap: 'nowrap',
    },
    dots: {
        width: 23,
        height: 23,
        opacity: 0.6,
        marginLeft: 15,
    },
    iconStyle: {
        width: 25,
        height: 25,
        borderColor: colors.borderFaded,
        marginRight: -1
    },
    arrowsWrap: {
        borderLeftWidth: 1,
        borderColor: colors.borderFaded
    },
    dotsWrap: { width: 30, },
});

export const PlanFormStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    scroll: {
        paddingBottom: 180,
        paddingTop: 15,
        minHeight: '100%',
    },
    save: {
        top: Dimensions.get('window').height - 140,
    },
    blocksWrap: {
        borderRadius: 1,
        borderWidth: 2,
        borderStyle: "dashed",
        padding: 7,
        paddingBottom: 8,
        borderColor: colors.borderFaded,
        marginBottom: 15,
        marginTop: 5,
    },
    emptyText: {
        marginTop: 10,
        color: colors.borderFaded,
        fontSize: 21,
        lineHeight: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export const ActivityForm = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    modalWrap: {
        ...AppPaddingStyle,
        paddingTop: 12,
        paddingBottom: 17,
        width: '100%',
        backgroundColor: colors.appBg,
        marginTop: 'auto',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: colors.borderFaded,
    },
    add: {
        flexDirection: 'row',
        padding: 7,
        borderWidth: 1,
        borderColor: colors.borderFaded,
        borderRadius: 3,
        paddingLeft: 15,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    plus: {
        fontSize: 23,
        marginRight: 10,
        color: Dark,
        lineHeight: 27,
    },
    text: {
        fontSize: 17,
        color: Dark,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    choosePrompt: {
        fontSize: 15,
        color: 'darkgrey',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    breakWrap: {
        height: 92,
        justifyContent: 'center'
    },
    breakText: {
        color: colors.color,
        fontSize: 17,
        marginTop: 10,
        marginBottom: 10,
    },
    bottomWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    fieldsPadding: {
        paddingTop: 20,
        paddingBottom: 20
    },
});

export const ActivityChoiceStyle = (colors: ThemeColors = ThemeColors[DEFAULT_THEME]) => StyleSheet.create({
    iconWrap: {
        height: 24,
        alignItems: 'center',
    },
    btnWrap: {
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        borderColor: colors.borderFaded,
    },
    activityBtn: {
        padding: 8,
        paddingTop: 12,
        paddingBottom: 10,
        flexBasis: 79,
        flexShrink: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        flexGrow: 0,
        maxWidth: 80,
    },
    activityBtnText: {
        letterSpacing: 0.1,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginTop: 6,
        color: colors.colorFaded,
    },
});

export const AddActivityBtnStyle = (colors: ThemeColors, theme: Theme) => StyleSheet.create({
    activityBtn: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: theme !== Theme.Dark ? colors.appBg : colors.appBgLight,
        borderWidth: theme !== Theme.Dark ? 1 : 2,
        borderColor: theme !== Theme.Dark ? colors.border : Dark,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    activityBtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Dark,
        paddingLeft: 2,
    },
    plus: {
        fontSize: 15,
        color: Dark,
        lineHeight: 22,
        marginRight: 5,
    },
});

export const SessionStartStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    wrap: {
        marginBottom: 30,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    pickerWrap: {
        borderWidth: 0,
        marginBottom: 0,
    },
    icon: {
        marginRight: 1,
        width: 19,
        height: 19,
    },
    noPlanOption: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row'
    },
    noPlanText: {
        fontSize: 15,
        paddingLeft: 8,
        color: colors.color,
    },
});

export const SessionOptionStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.borderFaded,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Dark
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 17,
        marginBottom: 12,
        borderWidth: 2,
    },
});

export const ThemeOptionStyle = (colors: ThemeColors, isActive: boolean) => StyleSheet.create({
    option: {
        backgroundColor: colors.appBg,
        padding: 20,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: colors.border,
        flexGrow: 1,
        alignItems: 'center',
        width: 100,
        marginRight: 20,
    },
    name: { color: colors.color },
    radio: {
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: isActive ? Primary : 'lightgrey',
        marginTop: 15,
    }
});

export const TimerTitleStyle = (color: string) => StyleSheet.create({
    wrap: {
        marginBottom: 30,
        marginTop: 150,
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainTitle: {
        fontSize: 35,
        textAlign: 'center',
        color,
    },
    smallTitle: {
        width: '100%',
        marginBottom: 7,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 12,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color,
    }
});

export const TimerButtonStyle = (colors: ThemeColors) => StyleSheet.create({
    wrap: {
        padding: 10,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: -2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    label: {
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.color,
        marginTop: 13,
    }
});

export const DurationInputStyle = (colors: ThemeColors) => StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 16,
        color: colors.color,
        marginLeft: 5,
        marginRight: 12,
    },
});

export const PiecePickerStyles = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    wrap: {
        width: '100%',
        marginBottom: 8,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: colors.borderFaded,
        backgroundColor: colors.appBg,
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12,
    },
    tip: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
    },
    text: {
        color: colors.color,
        fontSize: 16,
    },
    input: {
        ...TextInputStyle(colors),
        width: '100%',
        flexGrow: 1,
        flexShrink: 0,
        marginBottom: 0,
    }
});
