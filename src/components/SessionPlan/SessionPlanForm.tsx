import React from 'react';
import { View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";

export const SessionPlanForm = () => {
  return (
      <ScreenWrapper title='Add plan'>
          <View style={{
              ...AppPaddingStyle,
          }}>
          </View>
      </ScreenWrapper>
  );
};
