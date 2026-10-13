// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import {
//   ActivityIndicator,
//   FlatList,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { myStyles } from "@/styles/main";
// import APIClient from "@/lib/api-client";
// import { useState, useEffect } from "react";
// import * as SecureStore from "expo-secure-store";

// const PRIMARY = "#407BFF";

// // Mock data until the profile API is connected
// const profile = {
//   fullName: "Tunde James",
//   email: "you@email.com",
//   phone: "0906474784",
//   employeeId: "25374",
//   role: "Software engineer - IT",
// };

// type FieldProps = { label: string; value: string };

// function ReadOnlyField({ label, value }: FieldProps) {
//   return (
//     <View style={myStyles.field}>
//       <Text style={myStyles.label}>{label}</Text>
//       <View style={myStyles.valueBox}>
//         <Text style={myStyles.valueText} numberOfLines={1}>
//           {value}
//         </Text>
//       </View>
//     </View>
//   );
// }

// export default function Profile() {
//   const router = useRouter();

//   const [data, setData] = useState<{ users: FieldProps[] } | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await APIClient().getMethod("/api/users/me");
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   if (!data) {
//     return <ActivityIndicator />;
//   }

//   const initials = profile.fullName
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   // TODO: clear the session in the auth store, then router.replace("/login")
//   const handleLogout = async () => {
//     await SecureStore.deleteItemAsync("authToken");
//     router.replace("/login");
//   };

//   const handleNotifications = () => {
//     // TODO: open notifications
//   };

//   return (
//     <SafeAreaView style={myStyles.safe} edges={["top"]}>
//       <View style={myStyles.header}>
//         <Pressable
//           onPress={() => router.back()}
//           hitSlop={10}
//           style={myStyles.headerSide}
//           accessibilityRole="button"
//           accessibilityLabel="Go back"
//         >
//           <Ionicons name="arrow-back" size={24} color="#111" />
//         </Pressable>
//         <Text style={myStyles.headerTitle}>My Profile</Text>
//         <Pressable
//           onPress={handleNotifications}
//           hitSlop={10}
//           style={[myStyles.headerSide, myStyles.headerRight]}
//           accessibilityRole="button"
//           accessibilityLabel="Notifications"
//         >
//           <Ionicons name="notifications-outline" size={22} color="#111" />
//         </Pressable>
//       </View>

//       <ScrollView
//         contentContainerStyle={myStyles.scrolll}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={myStyles.identity}>
//           <View style={myStyles.avatar}>
//             <Text style={myStyles.avatarText}>{initials}</Text>
//           </View>
//           <Text style={myStyles.name}>{profile.fullName}</Text>
//           <Text style={myStyles.role}>{profile.role}</Text>
//         </View>

//         {/* NEW IMPLEMENTATION OF FETCHING EMPLOYEE PROFILE DATA FROM API-CLIENT FILE
//         <View>
//           <FlatList
//             data={data?.users ? [data] : []}
//             keyExtractor={(user) => user.}
//             renderItem={({ item: user }) => (
//               <View key={user.email} style={myStyles.card}>
//                 <Text>First Name: {user.firstName}</Text>
//                 <Text>Last Name: {user.lastName}</Text>
//                 <Text>Email: {user.email}</Text>

//                 <Text>Phone: {user.phone}</Text>
//               </View>
//             )}
//           />
//         </View> */}
//         <ReadOnlyField label="Full name" value={profile.fullName} />
//         <ReadOnlyField label="Email address" value={profile.email} />
//         <ReadOnlyField label="Phone number" value={profile.phone} />
//         <ReadOnlyField label="Employee ID" value={profile.employeeId} />
//         <Pressable
//           onPress={handleLogout}
//           style={myStyles.logout}
//           hitSlop={8}
//           accessibilityRole="button"
//         >
//           <Ionicons name="log-out-outline" size={20} color={PRIMARY} />
//           <Text style={myStyles.logoutText}>Log out</Text>
//         </Pressable>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

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
import * as SecureStore from "expo-secure-store";
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
    await SecureStore.deleteItemAsync("authToken");
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
