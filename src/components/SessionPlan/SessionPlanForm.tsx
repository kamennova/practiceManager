import React from 'react';
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";

export const SessionPlanForm = () => {
  return (
      <ScreenWrapper>
          <View style={{
              ...AppPaddingStyle,
          }}>
              <Text>
                  Add your form
              </Text>
          </View>
      </ScreenWrapper>
  );
};
