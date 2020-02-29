import React from 'react';
import { View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

export const PieceForm = () => {
  return (
      <ScreenWrapper>
          <View style={{
              ...AppPaddingStyle
          }}>
              <ScreenTitle>
                  New piece
              </ScreenTitle>
          </View>
      </ScreenWrapper>
  );
};
