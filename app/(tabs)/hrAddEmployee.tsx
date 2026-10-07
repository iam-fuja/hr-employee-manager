import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myStyles } from "@/styles/main";

const PRIMARY = "#407BFF";

// Placeholder option lists until we agree on the real ones
const ROLES = [
  "Software engineer",
  "HR officer",
  "Accountant",
  "Operations lead",
  "Sales representative",
];
const DEPARTMENTS = ["Engineering", "HR", "Finance", "Operations", "Sales"];
const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Intern"];

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  employeeId: string;
  role: string;
  department: string;
  startDate: string;
  employmentType: string;
};

const emptyForm: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  employeeId: "",
  role: "",
  department: "",
  startDate: "",
  employmentType: "",
};

function Label({ text }: { text: string }) {
  return (
    <Text style={myStyles.labelHrAddEmployee}>
      {text} <Text style={myStyles.required}>*</Text>
    </Text>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "phone-pad" | "email-address";
  autoCapitalize?: "none" | "words" | "sentences";
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
};

function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
  rightIcon,
}: TextFieldProps) {
  return (
    <View style={myStyles.fieldHrAddEmployee}>
      <Label text={label} />
      <View style={myStyles.inputWrap}>
        <TextInput
          style={[
            myStyles.inputHrAddEmployee,
            rightIcon ? myStyles.inputWithIcon : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9a9a9a"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {rightIcon ? (
          <Ionicons
            name={rightIcon}
            size={18}
            color="#111"
            style={myStyles.rightIcon}
          />
        ) : null}
      </View>
    </View>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onSelect: (value: string) => void;
};

function SelectField({
  label,
  value,
  placeholder,
  options,
  onSelect,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={myStyles.fieldHrAddEmployee}>
      <Label text={label} />
      <Pressable
        style={myStyles.select}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Text
          style={[myStyles.selectText, !value && myStyles.selectPlaceholder]}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#111" />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={myStyles.backdrop} onPress={() => setOpen(false)}>
          <View style={myStyles.sheet}>
            <Text style={myStyles.sheetTitle}>{label}</Text>
            {options.map((option) => (
              <Pressable
                key={option}
                style={myStyles.option}
                onPress={() => {
                  onSelect(option);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    myStyles.optionText,
                    option === value && myStyles.optionSelected,
                  ]}
                >
                  {option}
                </Text>
                {option === value ? (
                  <Ionicons name="checkmark" size={18} color={PRIMARY} />
                ) : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function AddEmployee() {
  const router = useRouter();
  const [form, setForm] = useState<FormValues>(emptyForm);

  const setField = (key: keyof FormValues) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // TODO: validate required fields, create the employee record,
    // show a success confirmation, then go back to the directory
  };

  return (
    <SafeAreaView style={myStyles.safe} edges={["top", "bottom"]}>
      <View style={myStyles.headerAddEmployee}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#111" />
        </Pressable>
        <Text style={myStyles.headerTitleHrAddEmployee}>Add Employee</Text>
      </View>

      <KeyboardAvoidingView
        style={myStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={myStyles.scrollHrAddEmployee}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={myStyles.sectionTitle}>Personal information</Text>

          <TextField
            label="Full name"
            value={form.fullName}
            onChangeText={setField("fullName")}
            placeholder="e.g John addo"
            autoCapitalize="words"
          />
          <TextField
            label="Phone number"
            value={form.phone}
            onChangeText={setField("phone")}
            placeholder="e.g 0547646764"
            keyboardType="phone-pad"
          />
          <TextField
            label="Email address"
            value={form.email}
            onChangeText={setField("email")}
            placeholder="e.g Johnaddo@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextField
            label="Employee ID"
            value={form.employeeId}
            onChangeText={setField("employeeId")}
            placeholder="e.g Em545643"
            autoCapitalize="none"
          />
          <SelectField
            label="Job title/role"
            value={form.role}
            placeholder="Select role"
            options={ROLES}
            onSelect={setField("role")}
          />
          <SelectField
            label="Department"
            value={form.department}
            placeholder="Select department"
            options={DEPARTMENTS}
            onSelect={setField("department")}
          />

          <View style={myStyles.row}>
            <View style={myStyles.half}>
              <TextField
                label="Employment start date"
                value={form.startDate}
                onChangeText={setField("startDate")}
                placeholder="dd/mm/yyyy"
                rightIcon="calendar-outline"
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            <View style={myStyles.half}>
              <SelectField
                label="Employment type"
                value={form.employmentType}
                placeholder="Select type"
                options={EMPLOYMENT_TYPES}
                onSelect={setField("employmentType")}
              />
            </View>
          </View>

          <Pressable
            style={myStyles.saveButton}
            onPress={handleSave}
            accessibilityRole="button"
          >
            <Text style={myStyles.saveText}>Save employee</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
    marginTop: 8,
    marginBottom: 14,
  },
  field: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: "500", color: "#111", marginBottom: 8 },
  required: { color: "#d93025" },
  inputWrap: { justifyContent: "center" },
  input: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    fontSize: 13,
    color: "#111",
  },
  inputWithIcon: { paddingRight: 44 },
  rightIcon: { position: "absolute", right: 16 },
  select: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  selectText: { flex: 1, fontSize: 13, color: "#111" },
  selectPlaceholder: { color: "#9a9a9a" },
  row: { flexDirection: "row", gap: 12 },
  half: { flex: 1 },
  saveButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  saveText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e6e6e6",
  },
  optionText: { fontSize: 14, color: "#111" },
  optionSelected: { color: PRIMARY, fontWeight: "600" },
});
