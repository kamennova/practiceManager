import React from 'react';
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";

export const Dashboard = () => {
  return (
      <ScreenWrapper title='Dashboard'>
          <View style={{
              ...AppPaddingStyle,
              paddingTop: 15,
          }}>
              <Text>
                  Some amazing stats...
              </Text>
          </View>
      </ScreenWrapper>
  );
};
