import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { DEFAULT_THEME, Theme, ThemeColors } from "./theme";

const DefaultColors = ThemeColors[DEFAULT_THEME];

const FONT_SIZE = 16;

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

const ItemHeight = 70,
    ItemBorderRadius = 0,
    ImagePadding = 0,
    ImageHeight = ItemHeight - 2 - ImagePadding * 2,
    ImageWidth = 170 - ImagePadding;

export const PieceListStyle = (colors: ThemeColors, theme: Theme = DEFAULT_THEME) => StyleSheet.create({
    author: {
        fontSize: 13,
        color: colors.colorFaded,
    },
    pieceName: {
        fontSize: 17,
        marginBottom: 3,
        color: colors.color,
    },
    image: {
        width: ImageWidth,
        height: ImageHeight,
        marginLeft: 'auto',
        marginRight: ImagePadding,
        opacity: theme === Theme.Dark ? 0.7 : 1,
        borderTopRightRadius: ItemBorderRadius,
        borderBottomRightRadius: ItemBorderRadius,
    },
    imageTop: {
        width: 200,
        height: ImageHeight,
        position: 'absolute',
        right: -200 + ImageWidth
    },
    itemWrap: { padding: 10, paddingLeft: 12 },
});

export const ListItemTitleStyle = {
    fontSize: 17,
    marginBottom: 3,
};

export const ListItemStyle = (colors: ThemeColors): ViewStyle => ({
    borderWidth: 1,
    borderColor: colors.borderFaded,
    backgroundColor: colors.appBg,
    marginBottom: 10,
    flexDirection: 'row',
    height: ItemHeight,
    alignItems: 'center',
    borderRadius: ItemBorderRadius,
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

export const PrimaryButtonStyle: ViewStyle = {
    height: PrimaryBtnHeight,
    alignItems: 'center',
    borderColor: Dark,
    borderWidth: 0,
    backgroundColor: Primary,
};

export const PrimaryButtonTextStyle: TextStyle = {
    color: 'darkblue',
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1
};

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
        marginTop: 14,
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
        borderBottomWidth: 1,
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

export const DrawerStyle = (colors: ThemeColors): ViewStyle => ({
    backgroundColor: colors.appBg,
    justifyContent: 'center',
});

export const DrawerContentStyle = {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 0,
    paddingLeft: 20,
};

export const ActivityViewStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 14,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 17,
};

export const SubActivityViewStyle: ViewStyle = {
    paddingTop: 4,
    paddingBottom: 4,
};

export const BreakViewStyle: ViewStyle = {
    borderWidth: 0,
};

export const ActionBtnStyle = (theme: Theme = DEFAULT_THEME) =>
    StyleSheet.create({
        wrap: {
            flexDirection: 'row',
            height: 50,
            alignSelf: 'flex-start',
            paddingLeft: 19,
            paddingRight: 25,
            alignItems: 'center',
            borderColor: theme !== Theme.Dark ? Primary : Dark,
            borderWidth: 2,
            backgroundColor: ThemeColors[theme].appBgLight,
            elevation: 2,
        },
        text: { color: Dark, fontSize: 17, fontWeight: '700' },
        save: {
            position: 'absolute',
            right: AppSidePadding,
            top: Dimensions.get('window').height - 40,
        },
        check: { width: 19, height: 19, marginRight: 5 },
        add: {
            position: 'absolute',
            right: AppSidePadding,
            top: Dimensions.get('window').height - 130,
        },
        plus: { color: Dark, fontSize: 25, lineHeight: 32, marginRight: 8 },
    });

const SIZE = 240;

export const ImagePickerStyle = (colors: ThemeColors = DefaultColors) => StyleSheet.create({
    picker: {
        width: '100%',
        height: SIZE + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: colors.borderFaded,
    },
    pic: { width: '100%', height: SIZE },
    btnPic: {
        position: 'absolute',
        bottom: (SIZE - TotalHeaderHeight) / 2
    },
    trash: { width: 21, height: 21 },
    trashWrap: {
        ...HeaderIconWrap,
        position: 'absolute',
        bottom: 10,
        right: AppSidePadding,
    },
    layer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.appBgFaded,
    }
});

export const ItemBtnsStyle = (colors: ThemeColors): ViewStyle => ({
    position: 'absolute',
    top: Dimensions.get('window').height - 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
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

export const ModalTitleStyle: TextStyle = {
    marginBottom: 50,
    textAlign: 'center',
    color: 'black',
    fontSize: 23,
};

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
    borderColor: colors.border,
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 15,
    fontSize: 18,
    color: colors.color,
});

export const TagInputTagStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderWidth: 1,
    borderColor: Primary,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    paddingBottom: 3,
    paddingTop: 4,
    paddingRight: 3,
};

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

export const DaysInputStyle = (colors: ThemeColors): ViewStyle & TextStyle => ({
    width: 'auto',
    color: colors.color,
    borderColor: colors.borderFaded,
    textAlign: 'center',
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 17
});

// ---

export const FullScreenModalStyle: ViewStyle = {
    ...AppPaddingStyle,
    paddingTop: 220,
    paddingBottom: 30,
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '100%',
};

export const SessionScreenStyle: ViewStyle = {
    height: '100%',
    paddingBottom: 40,
    ...AppPaddingStyle,
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

export const ActivityBlockStyle = StyleSheet.create({
    wrap: {
        height: ActivityBlockHeight,
        borderWidth: 1,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 7,
        marginBottom: -1,
    },
    duration: {
        color: 'grey',
        marginLeft: 'auto',
    },
    name: {
        fontSize: 17,
    },
    dots: {
        width: 23,
        height: 23,
        opacity: 0.6,
        marginLeft: 15,
    }
});

export const ActivityForm = StyleSheet.create({
    wrap: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#f3f3f3',
    },
    formWrap: {
        alignItems: 'center',
        padding: 8,
    },
    add: {
        width: '100%',
        padding: 12,
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
        fontSize: 17,
        color: Dark,
        fontWeight: 'bold'
    },
    activityBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        width: '50%',
        marginRight: -1,
        marginBottom: -1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityBtnText: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 'bold',
        color: Dark
    },
    btnWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        marginBottom: 15,
    },
    choosePrompt: { fontSize: 15, color: 'darkgrey', fontWeight: 'bold' },
});

export const SessionStartStyle = StyleSheet.create({
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
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 17,
        marginBottom: 12,
        borderWidth: 2,
    },
    noPlanOption: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row'
    },
    noPlanText: {
        fontSize: 15,
        paddingLeft: 8,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'lightgrey',
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
