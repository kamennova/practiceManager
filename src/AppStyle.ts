import { Dimensions, TextStyle, ViewStyle } from "react-native";

export const AppSidePadding = 17,
    TotalHeaderHeight = 86;

export const Primary = '#6895ff',
    Secondary = 'orange',
    Dark = '#2d60d8',
    AppBg = '#f1f1f3',
    AppBgOpacity = 'rgba(241, 241, 243, 0.5)';

export const AppHeaderStyle = (transparent: boolean = false): ViewStyle => ({
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 40,
    paddingLeft: AppSidePadding,
    paddingRight: AppSidePadding,
    alignItems: 'center',
    borderBottomWidth: transparent ? 0 : 1,
    borderBottomColor: 'lightgrey',
    position: 'absolute',
    width: '100%',
});

export const HeaderIconWrap: ViewStyle = {
    width: 35,
    height: 35,
    backgroundColor: AppBgOpacity,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
};

export const ListItemTitleStyle = {
    fontSize: 18,
    marginBottom: 3,
};

export const ListItemStyle: ViewStyle = {
    borderWidth: 0.5,
    borderColor: 'darkgrey',
    marginBottom: 12,
    flexDirection: 'row',
    height: 71,
    alignItems: 'center'
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

export const AppPaddingStyle = {
    paddingLeft: AppSidePadding,
    paddingRight: AppSidePadding
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

export const AddButtonStyle: ViewStyle = {
    width: 60,
    height: 60,
    borderColor: Dark,
    backgroundColor: Primary,
    position: 'absolute',
    top: Dimensions.get('window').height - 50,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center'
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
    top: 45,
    width: 150,
    padding: 16,
    paddingTop: 14,
    paddingBottom: 0,
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
