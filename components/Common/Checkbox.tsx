// Checkbox.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CheckboxProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, selected, onToggle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <Text style={[styles.checkbox, selected && styles.selected]}>
        {selected ? "✓" : " "}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#cce5ff",
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
