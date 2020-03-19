import React from 'react';
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

export const Dashboard = () => {
  return (
      <ScreenWrapper>
          <View style={{
              ...AppPaddingStyle
          }}>
              <ScreenTitle>
                  Dashboard
              </ScreenTitle>
              <Text>
                  Some amazing stats...
              </Text>
          </View>
      </ScreenWrapper>
  );
};
