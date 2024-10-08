// InputField.tsx
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const InputField: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address";
}> = ({ value, onChangeText, placeholder, keyboardType }) => {
  const { currentTheme } = useTheme();

  return (
    <TextInput
      style={[styles.input, { borderColor: currentTheme.colors.border }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
});

export default InputField;
