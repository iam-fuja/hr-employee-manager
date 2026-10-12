// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import React from "react";
// import {} from "@/app/(tabs)/employeeProfile";
// import APIClient from "@/lib/api-client";

// const PRIMARY = "#407BFF";

// type IconName = React.ComponentProps<typeof Ionicons>["name"];

// // Mock data until the employee APIs are connected
// const employee = { name: "Tunde James" };

// type Shortcut = {
//   id: string;
//   icon: IconName;
//   title: string;
//   subtitle: string;
// };

// const shortcuts: Shortcut[] = [
//   {
//     id: "profile",
//     icon: "person-outline",
//     title: "My profile",
//     subtitle: "View your details",
//   },
//   {
//     id: "payslip",
//     icon: "briefcase-outline",
//     title: "Payslip",
//     subtitle: "View & download",
//   },
//   {
//     id: "leave",
//     icon: "exit-outline",
//     title: "Leave",
//     subtitle: "Check balance & request leave",
//   },
//   {
//     id: "messages",
//     icon: "chatbubble-ellipses-outline",
//     title: "Messages",
//     subtitle: "Chat with HR",
//   },
// ];

// const recentActivity: {
//   id: string;
//   icon: IconName;
//   title: string;
//   subtitle: string;
//   time: string;
// }[] = [
//   {
//     id: "1",
//     icon: "people-outline",
//     title: "Payslip available",
//     subtitle: "Your payslip of Aug 2026 is ready",
//     time: "2 days ago",
//   },
//   {
//     id: "2",
//     icon: "exit-outline",
//     title: "Leave request approved",
//     subtitle: "Your leave request has been approved",
//     time: "4 days ago",
//   },
//   {
//     id: "3",
//     icon: "megaphone-outline",
//     title: "New announcement",
//     subtitle: "Company event this Friday.",
//     time: "5 days ago",
//   },
// ];

// function getGreeting(): string {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning";
//   if (hour < 17) return "Good afternoon";
//   return "Good evening";
// }

// function getInitials(name: string): string {
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// function ShortcutCard({
//   item,
//   onPress,
// }: {
//   item: Shortcut;
//   onPress: () => void;
// }) {
//   return (
//     <Pressable
//       style={styles.card}
//       onPress={onPress}
//       accessibilityRole="button"
//       accessibilityLabel={item.title}
//     >
//       <Ionicons name={item.icon} size={22} color="#fff" />
//       <View>
//         <Text style={styles.cardTitle}>{item.title}</Text>
//         <Text style={styles.cardSub}>{item.subtitle}</Text>
//       </View>
//     </Pressable>
//   );
// }

// export default function EmployeeHome() {
//   const router = useRouter();

//   const handleNotifications = () => {
//     // TODO: open notifications
//   };

//   const handleViewAll = () => {
//     // TODO: open the full activity list
//   };

//   //PAY ATTENTION: This function is used to navigate to the employee profile screen when the "My profile" shortcut is pressed. It uses the router from expo-router to navigate to the employeeProfile screen. The fetchEmployeeProfile function is commented out because it is not needed for navigation, but it can be uncommented if you want to fetch the employee profile data when navigating to the profile screen.
//   const handleShortcut = (id: string) => {
//     if (id === "profile") {
//       router.push("/(tabs)/employeeProfile");
//       return;
//     }

//     // TODO: payslip -> payslip list, leave -> leave screen, messages -> chat with HR
//   };

//   return (
//     <SafeAreaView style={styles.safe} edges={["top"]}>
//       <ScrollView
//         contentContainerStyle={styles.scroll}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.header}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{getInitials(employee.name)}</Text>
//           </View>
//           <View style={styles.headerText}>
//             <Text style={styles.greeting}>{getGreeting()},</Text>
//             <Text style={styles.name} numberOfLines={1}>
//               {employee.name}
//             </Text>
//           </View>
//           <Pressable
//             onPress={handleNotifications}
//             style={styles.bell}
//             accessibilityRole="button"
//             accessibilityLabel="Notifications"
//           >
//             <Ionicons name="notifications-outline" size={20} color={PRIMARY} />
//           </Pressable>
//         </View>

//         <View style={styles.grid}>
//           {shortcuts.map((item) => (
//             <ShortcutCard
//               key={item.id}
//               item={item}
//               onPress={() => handleShortcut(item.id)}
//             />
//           ))}
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent activity</Text>
//           <Pressable onPress={handleViewAll} hitSlop={8}>
//             <Text style={styles.viewAll}>View all</Text>
//           </Pressable>
//         </View>

//         {recentActivity.map((item) => (
//           <View key={item.id} style={styles.activityRow}>
//             <Ionicons name={item.icon} size={22} color={PRIMARY} />
//             <View style={styles.activityText}>
//               <Text style={styles.activityTitle}>{item.title}</Text>
//               <Text style={styles.activitySub} numberOfLines={1}>
//                 {item.subtitle}
//               </Text>
//             </View>
//             <Text style={styles.activityTime}>{item.time}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#fff" },
//   // extra bottom padding so content clears the floating tab bar
//   scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 110 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: PRIMARY,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarText: { color: "#fff", fontSize: 15, fontWeight: "700" },
//   headerText: { flex: 1 },
//   greeting: { fontSize: 13, color: "#222" },
//   name: { fontSize: 22, fontWeight: "700", color: "#111" },
//   bell: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#f1f1f1",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
//   card: {
//     width: "48%",
//     flexGrow: 1,
//     minHeight: 104,
//     backgroundColor: PRIMARY,
//     borderRadius: 22,
//     padding: 16,
//     justifyContent: "space-between",
//   },
//   cardTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
//   cardSub: { color: "#fff", fontSize: 11, marginTop: 2 },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 28,
//     marginBottom: 12,
//   },
//   sectionTitle: { fontSize: 14, fontWeight: "600", color: "#111" },
//   viewAll: { fontSize: 13, fontWeight: "500", color: "#111" },
//   activityRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     borderWidth: 1,
//     borderColor: "#e6e6e6",
//     borderRadius: 24,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },
//   activityText: { flex: 1 },
//   activityTitle: { fontSize: 14, fontWeight: "600", color: "#111" },
//   activitySub: { fontSize: 10, color: "#444", marginTop: 3 },
//   activityTime: { fontSize: 10, color: "#333" },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useEmployee } from "@/hooks/useEmployee";

const PRIMARY = "#407BFF";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Shortcut = {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
};

const shortcuts: Shortcut[] = [
  {
    id: "profile",
    icon: "person-outline",
    title: "My profile",
    subtitle: "View your details",
  },
  {
    id: "payslip",
    icon: "briefcase-outline",
    title: "Payslip",
    subtitle: "View & download",
  },
  {
    id: "leave",
    icon: "exit-outline",
    title: "Leave",
    subtitle: "Check balance & request leave",
  },
  {
    id: "messages",
    icon: "chatbubble-ellipses-outline",
    title: "Messages",
    subtitle: "Chat with HR",
  },
];

// Still static: needs its own endpoint (see note below)
const recentActivity: {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  time: string;
}[] = [
  {
    id: "1",
    icon: "people-outline",
    title: "Payslip available",
    subtitle: "Your payslip of Aug 2026 is ready",
    time: "2 days ago",
  },
  {
    id: "2",
    icon: "exit-outline",
    title: "Leave request approved",
    subtitle: "Your leave request has been approved",
    time: "4 days ago",
  },
  {
    id: "3",
    icon: "megaphone-outline",
    title: "New announcement",
    subtitle: "Company event this Friday.",
    time: "5 days ago",
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => /^[A-Za-z]/.test(part)) // skips parts like "(Mobile"
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ShortcutCard({
  item,
  onPress,
}: {
  item: Shortcut;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <Ionicons name={item.icon} size={22} color="#fff" />
      <View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSub}>{item.subtitle}</Text>
      </View>
    </Pressable>
  );
}

export default function EmployeeHome() {
  const router = useRouter();
  const { employee, loading } = useEmployee();

  if (loading || !employee) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // Use the real leave balance in the Leave card
  const cards = shortcuts.map((s) =>
    s.id === "leave" && employee.leaveBalance
      ? { ...s, subtitle: `${employee.leaveBalance.annual} annual days left` }
      : s,
  );

  const handleNotifications = () => {
    // TODO: open notifications
  };

  const handleViewAll = () => {
    // TODO: open the full activity list
  };

  const handleShortcut = (id: string) => {
    if (id === "profile") {
      router.push("/(tabs)/employeeProfile");
      return;
    }

    // TODO: payslip -> payslip list, leave -> leave screen, messages -> chat with HR
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(employee.name)}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.name} numberOfLines={1}>
              {employee.name}
            </Text>
          </View>
          <Pressable
            onPress={handleNotifications}
            style={styles.bell}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color={PRIMARY} />
          </Pressable>
        </View>

        <View style={styles.grid}>
          {cards.map((item) => (
            <ShortcutCard
              key={item.id}
              item={item}
              onPress={() => handleShortcut(item.id)}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <Pressable onPress={handleViewAll} hitSlop={8}>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>

        {recentActivity.map((item) => (
          <View key={item.id} style={styles.activityRow}>
            <Ionicons name={item.icon} size={22} color={PRIMARY} />
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySub} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </View>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  // extra bottom padding so content clears the floating tab bar
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 110 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  headerText: { flex: 1 },
  greeting: { fontSize: 13, color: "#222" },
  name: { fontSize: 22, fontWeight: "700", color: "#111" },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    flexGrow: 1,
    minHeight: 104,
    backgroundColor: PRIMARY,
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
  },
  cardTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  cardSub: { color: "#fff", fontSize: 11, marginTop: 2 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#111" },
  viewAll: { fontSize: 13, fontWeight: "500", color: "#111" },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  activityText: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: "600", color: "#111" },
  activitySub: { fontSize: 10, color: "#444", marginTop: 3 },
  activityTime: { fontSize: 10, color: "#333" },
});
