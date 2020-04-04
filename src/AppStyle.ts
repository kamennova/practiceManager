import { Dimensions, TextStyle, ViewStyle, StyleSheet } from "react-native";

const FONT_SIZE = 16;

export const AppSidePadding = 17,
    TotalHeaderHeight = 86;

export const Primary = '#6895ff',
    Secondary = 'orange',
    Dark = '#2d60d8',
    AppBg = '#f1f1f3',
    AppBgOpacity = 'rgba(241, 241, 243, 0.5)';

export const AppPaddingStyle = {
    paddingLeft: AppSidePadding,
    paddingRight: AppSidePadding
};

export const AppHeaderStyle = (transparent: boolean = false): ViewStyle => ({
    borderBottomWidth: transparent ? 0 : 1,
    borderBottomColor: 'lightgrey',
    backgroundColor: AppBg,
    shadowOpacity: 0,
    elevation: 0
});

export const HeaderIconWrap: ViewStyle = {
    width: 35,
    height: 35,
    backgroundColor: AppBgOpacity,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
};

const ItemHeight = 66,
    ImagePadding = 0,
    ImageSize = ItemHeight - 2 - ImagePadding * 2;

export const PieceListStyle = StyleSheet.create({
    author: {
        fontSize: 13,
        color: 'grey',
    },
    pieceName: {
        fontSize: 17,
        marginBottom: 3,
    },
    image: {
        width: ImageSize,
        height: ImageSize,
        marginLeft: 'auto',
        marginRight: ImagePadding,
    },
    imageTop: {
        width: ImageSize,
        height: ImageSize,
        position: 'absolute',
        right: 2 + ImagePadding
    },
    itemWrap: { padding: 10, paddingLeft: 12 },
});

export const ListItemTitleStyle = {
    fontSize: 17,
    marginBottom: 3,
};

export const ListItemStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: AppBg,
    marginBottom: 10,
    flexDirection: 'row',
    height: ItemHeight,
    alignItems: 'center',
};

export const ButtonStyle: ViewStyle = {
    minWidth: 200,
    // width: '100%',
    flexGrow: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    // backgroundColor: 'lightgrey',
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

export const DirectionButtonStyle = (isDisabled: boolean = false): ViewStyle => ({
    width: PrimaryBtnHeight,
    height: PrimaryBtnHeight,
    backgroundColor: AppBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    opacity: isDisabled ? 0.4 : 1,
});

export const FeaturesStyle = StyleSheet.create({
    label: { fontSize: 13, color: 'darkgrey', },
    val: { fontSize: 15, marginBottom: 4 },
    wrap: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 14,
        borderColor: 'lightgrey',
    }
});

export const NoteText = {
    fontSize: FONT_SIZE,
    color: 'rgba(0, 0, 0, 0.8)',
};

// ---

export const NotifStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        paddingBottom: 12,
        paddingTop: 12,
        paddingRight: 5,
    },
    label: { fontSize: FONT_SIZE },
    inputWrap: { flexDirection: 'row' }
});


// ---

export const DrawerStyle: ViewStyle = {
    backgroundColor: 'lightgrey',
    justifyContent: 'center'
};

export const DrawerContentStyle = {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 0,
    paddingLeft: 20,
};

export const ActivityViewStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: 'black',
    // borderRadius: 5,
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

export const ActionBtnStyle = StyleSheet.create({
    wrap: {
        position: 'absolute',
        right: AppSidePadding,
        flexDirection: 'row',
        height: 50,
        paddingLeft: 19,
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Primary,
        borderWidth: 2,
        backgroundColor: AppBg,
        elevation: 2,
    },
    text: { color: Dark, fontSize: 17, fontWeight: '700' },
    save: { top: Dimensions.get('window').height - 40 },
    check: { width: 19, height: 19, marginRight: 5 },
    add: { top: Dimensions.get('window').height - 130, },
    plus: { color: Dark, fontSize: 25, lineHeight: 32, marginRight: 8 },
});

const SIZE = 240;

export const ImagePickerStyle = StyleSheet.create({
    picker: {
        width: '100%',
        height: SIZE + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    pic: { width: '100%', height: SIZE },
    btnPic: {
        width: 30,
        height: 30,
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
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    }
});

export const ItemBtnsStyle: ViewStyle = {
    position: 'absolute',
    top: Dimensions.get('window').height - 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: AppBg,
    padding: AppSidePadding,
    paddingTop: 15,
    paddingBottom: 0,
};

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
    // marginTop: 270,
    minWidth: Dimensions.get('screen').width * 0.8,
};

export const ModalTitleStyle: TextStyle = {
    marginBottom: 40,
    textAlign: 'center',
    color: 'black',
    fontSize: 23,
};

export const PlanOptionStyle = (isSelected: boolean): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    borderWidth: isSelected ? 0.4 : 0,
    borderColor: 'lightgrey'
});

export const PickerWrapperStyle = {
    borderWidth: 1,
    width: '100%',
    flexShrink: 1,
    borderColor: 'lightgrey',
    marginBottom: 20,
};

export const PickerStyle = {
    width: '100%',
    flexShrink: 1,
};

export const TextInputStyle = {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 15,
    fontSize: 18,
};

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

export const DaysInputStyle: ViewStyle & TextStyle = {
    width: 'auto',
    borderColor: 'lightgrey',
    textAlign: 'center',
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 17
};

// ---

export const FullScreenModalStyle: ViewStyle = {
    ...AppPaddingStyle,
    alignContent: 'center',
    paddingTop: 220,
    height: '100%',
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

export const ItemMenuStyle: ViewStyle = {
    position: 'absolute',
    right: AppSidePadding,
    top: 40,
    width: 150,
    padding: 0,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: AppBg,
};

export const SmallModalStyle: ViewStyle = {
    position: 'absolute',
    top: '30%',
    width: Dimensions.get('window').width * 0.8,
    marginLeft: Dimensions.get('window').width * 0.1,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 18,
    paddingTop: 25,
    backgroundColor: AppBg,
    alignItems: 'center',
};

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
        // flexDirection: 'row',
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
