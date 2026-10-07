import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myStyles } from "@/styles/main";

const PRIMARY = "#407BFF";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

// Mock data until the dashboard API is connected
const adminName = "Ada";
const stats = {
  totalEmployees: 24,
  pendingLeave: 3,
  monthPayroll: 48000000,
};

const recentActivity: {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  time: string;
}[] = [
  {
    id: "1",
    icon: "person-add-outline",
    title: "New employee added",
    subtitle: "Tunde James",
    time: "2h Ago",
  },
  {
    id: "2",
    icon: "exit-outline",
    title: "Leave request submitted",
    subtitle: "Tunde James",
    time: "3h Ago",
  },
  {
    id: "3",
    icon: "card-outline",
    title: "Payroll processed",
    subtitle: "July payroll",
    time: "1day Ago",
  },
];

const quickActions: { id: string; icon: IconName; label: string }[] = [
  { id: "add-employee", icon: "people-outline", label: "Add employee" },
  { id: "process-payroll", icon: "card-outline", label: "Process payroll" },
  {
    id: "leave-requests",
    icon: "calendar-outline",
    label: "View leave request",
  },
  { id: "announcement", icon: "megaphone-outline", label: "Send announcement" },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatNaira(amount: number): string {
  return `\u20A6${amount.toLocaleString("en-US")}`;
}

export default function AdminHome() {
  const handleNotifications = () => {
    // TODO: open notifications
  };

  const handleViewAll = () => {
    // TODO: open the full activity list
  };

  const handleQuickAction = (id: string) => {
    // TODO: route each action
    // add-employee -> employee form, process-payroll -> payroll,
    // leave-requests -> leave list, announcement -> announcement form
  };

  return (
    <SafeAreaView style={myStyles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={myStyles.scrol}
        showsVerticalScrollIndicator={false}
      >
        <View style={myStyles.headerHrAdmin}>
          <View style={myStyles.headerText}>
            <Text style={myStyles.greeting}>
              {getGreeting()}, {adminName}
            </Text>
            <Text style={myStyles.greetingSub}>
              Here's what's happening today.
            </Text>
          </View>
          <Pressable
            onPress={handleNotifications}
            style={myStyles.bell}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color={PRIMARY} />
          </Pressable>
        </View>

        <View style={myStyles.statRow}>
          <View style={[myStyles.statCard, myStyles.statHalf]}>
            <Text style={myStyles.statLabel}>Total employees</Text>
            <Text style={myStyles.statValue}>{stats.totalEmployees}</Text>
          </View>
          <View style={[myStyles.statCard, myStyles.statHalf]}>
            <Text style={myStyles.statLabel}>Pending leave</Text>
            <Text style={myStyles.statValue}>{stats.pendingLeave}</Text>
          </View>
        </View>
        <View style={[myStyles.statCard, myStyles.statWide]}>
          <Text style={myStyles.statLabel}>This month payroll</Text>
          <Text style={myStyles.statValue}>
            {formatNaira(stats.monthPayroll)}
          </Text>
        </View>

        <View style={myStyles.sectionHeader}>
          <Text style={myStyles.sectionTitle}>Recent activity</Text>
          <Pressable onPress={handleViewAll} hitSlop={8}>
            <Text style={myStyles.viewAll}>View all</Text>
          </Pressable>
        </View>

        <View style={myStyles.activityCard}>
          {recentActivity.map((item) => (
            <View key={item.id} style={myStyles.activityRow}>
              <View style={myStyles.activityIcon}>
                <Ionicons name={item.icon} size={20} color={PRIMARY} />
              </View>
              <View style={myStyles.activityText}>
                <Text style={myStyles.activityTitle}>{item.title}</Text>
                <Text style={myStyles.activitySub}>{item.subtitle}</Text>
              </View>
              <Text style={myStyles.activityTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        <Text style={[myStyles.sectionTitle, myStyles.quickTitle]}>
          Quick actions
        </Text>
        {quickActions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => handleQuickAction(action.id)}
            style={myStyles.actionRow}
            accessibilityRole="button"
          >
            <Ionicons name={action.icon} size={20} color={PRIMARY} />
            <Text style={myStyles.actionLabel}>{action.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#111" />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
