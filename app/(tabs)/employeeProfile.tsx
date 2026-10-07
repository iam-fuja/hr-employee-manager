import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myStyles } from "@/styles/main";

const PRIMARY = "#407BFF";

// Mock data until the profile API is connected
const profile = {
  fullName: "Tunde James",
  email: "you@email.com",
  phone: "0906474784",
  employeeId: "25374",
  role: "Software engineer - IT",
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

  const initials = profile.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    // TODO: clear the session in the auth store, then router.replace("/login")
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
          <Text style={myStyles.name}>{profile.fullName}</Text>
          <Text style={myStyles.role}>{profile.role}</Text>
        </View>

        <ReadOnlyField label="Full name" value={profile.fullName} />
        <ReadOnlyField label="Email address" value={profile.email} />
        <ReadOnlyField label="Phone number" value={profile.phone} />
        <ReadOnlyField label="Employee ID" value={profile.employeeId} />

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

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   headerSide: { width: 40 },
//   headerRight: { alignItems: "flex-end" },
//   headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
//   scroll: { paddingHorizontal: 16, paddingBottom: 32 },
//   identity: { alignItems: "center", marginTop: 8, marginBottom: 24 },
//   avatar: {
//     width: 68,
//     height: 68,
//     borderRadius: 34,
//     backgroundColor: PRIMARY,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   avatarText: { color: "#fff", fontSize: 22, fontWeight: "700" },
//   name: { fontSize: 14, fontWeight: "700", color: "#111" },
//   role: { fontSize: 11, color: "#333", marginTop: 2 },
//   field: { marginBottom: 16 },
//   label: {
//     fontSize: 13,
//     fontWeight: "500",
//     color: "#111",
//     marginBottom: 8,
//   },
//   valueBox: {
//     height: 48,
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: "#ececec",
//     backgroundColor: "#fff",
//     paddingHorizontal: 18,
//     justifyContent: "center",
//   },
//   valueText: { fontSize: 14, color: "#8a8a8a" },
//   logout: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginTop: 16,
//   },
//   logoutText: { fontSize: 14, fontWeight: "500", color: PRIMARY },
// });
