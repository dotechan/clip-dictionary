import React from "react";
import { Text, TextProps } from "react-native";

type Props = TextProps & {
  isMasked: boolean;
};

export const MaskedText = (props: Props) => {
  const isMasked = props.isMasked;

  return <Text>{isMasked ? "********" : props.children}</Text>;
};
