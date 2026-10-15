import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myStyles } from "@/styles/main";
import APIClient from "@/lib/api-client";
import { useState, useEffect } from "react";

import { removeToken } from "@/lib/token-storage";

const PRIMARY = "#407BFF";

type Employee = {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  jobTitle: string;
};

type FieldProps = { label: string; value: string };

function ReadOnlyField({ label, value }: FieldProps) {
  return (
    <View style={myStyles.field}>
      <Text style={myStyles.label}>{label}</Text>
      <View style={myStyles.valueBox}>
        <Text style={myStyles.valueText} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await APIClient().getMethod("/api/users/me");
        setEmployee(result.data); // the employee is inside "data"
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!employee) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const initials = employee.name
    .split(" ")
    .filter((part) => /^[A-Za-z]/.test(part)) // skips parts like "(Mobile"
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await removeToken();

    router.replace("/login");
  };

  const handleNotifications = () => {
    // TODO: open notifications
  };

  return (
    <SafeAreaView style={myStyles.safe} edges={["top"]}>
      <View style={myStyles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={myStyles.headerSide}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#111" />
        </Pressable>
        <Text style={myStyles.headerTitle}>My Profile</Text>
        <Pressable
          onPress={handleNotifications}
          hitSlop={10}
          style={[myStyles.headerSide, myStyles.headerRight]}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Ionicons name="notifications-outline" size={22} color="#111" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={myStyles.scrolll}
        showsVerticalScrollIndicator={false}
      >
        <View style={myStyles.identity}>
          <View style={myStyles.avatar}>
            <Text style={myStyles.avatarText}>{initials}</Text>
          </View>
          <Text style={myStyles.name}>{employee.name}</Text>
          <Text style={myStyles.role}>{employee.jobTitle}</Text>
        </View>

        <ReadOnlyField label="Full name" value={employee.name} />
        <ReadOnlyField label="Email address" value={employee.email} />
        <ReadOnlyField label="Phone number" value={employee.phone} />
        <ReadOnlyField label="Employee ID" value={employee.employeeId} />

        <Pressable
          onPress={handleLogout}
          style={myStyles.logout}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Ionicons name="log-out-outline" size={20} color={PRIMARY} />
          <Text style={myStyles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
