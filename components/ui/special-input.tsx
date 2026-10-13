import { Text, TextInput, View } from "react-native";
import { myStyles } from "@/styles/main";

type SpecialInputProps = {
  placeholder?: string;
  placeholderTextColor?: string;
  label?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export const SpecialInput = ({
  placeholder = "Enter text here again...",
  placeholderTextColor = "green",
  label = "",
  secureTextEntry = false,
  value,
  onChangeText,
}: SpecialInputProps) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={myStyles.label}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        style={myStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
