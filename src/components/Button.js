import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

export default function Button({ mode,loading, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      dark
      contentStyle={{ height: "100%" }}
      loading={loading}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
  },
  text: {
    fontSize: 13,
    color: theme.colors.white,
    textTransform:'none'
  },
});
