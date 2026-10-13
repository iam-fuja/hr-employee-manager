import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  anchor: "employeeProfile",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="employeeProfile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={24}
              name="person.circle"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="check"
        options={{
          title: "Check",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={24}
              name="paperplane.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={24}
              name="paperplane.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="payslip"
        options={{
          title: "Payslip",
          tabBarLabel: "Payslip",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? "document-text"
                  : "document-text-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? "chatbubbles"
                  : "chatbubbles-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
} 