import { TextStyle, ViewStyle } from "react-native";

export const AppBg = '#efe7e2';

export const AppSidePadding = 17;

export const ListItemTitleStyle = {
    fontSize: 18,
    marginBottom: 3,
};

export const ListItemStyle = {
    borderWidth: 0.5,
    borderColor: 'darkgrey',
    // borderRadius: 7,
    padding: 10,
    marginBottom: 12,
};

export const ButtonStyle: ViewStyle = {
    borderWidth: 1,
    flexGrow: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
};

export const BigButtonStyle: ViewStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 37,
    paddingRight: 37,
};

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
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: 'black'
};

export const ModalStyle: ViewStyle = {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 300,
};

export const ModalTitleStyle: TextStyle = {
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 20
};

export const PlanOptionStyle = (isSelected: boolean): ViewStyle => ({
    padding: 10,
    borderWidth: isSelected ? 1 : 0,
    borderColor: 'black',
});

export const PickerStyle = {
    height: 50,
    width: 200,
    backgroundColor: 'white',
};
