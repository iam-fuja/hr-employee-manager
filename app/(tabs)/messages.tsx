import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const conversations = [
  {
    id: "1",
    name: "HR team",
    message: "Alright, got it, we look into this shortly",
    time: "10:24 AM",
    avatar: "https://i.pravatar.cc/150?img=47",
    unread: true,
  },
  {
    id: "2",
    name: "Tunde James",
    message: "Thanks for the update!",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=12",
    unread: false,
  },
  {
    id: "3",
    name: "David John",
    message: "Can I get update on my leave",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=13",
    unread: false,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    message: "Perfect thanks",
    time: "Sep 10",
    avatar: "https://i.pravatar.cc/150?img=44",
    unread: false,
  },
  {
    id: "5",
    name: "Bolu Adebayo",
    message: "Seen, thanks again.",
    time: "Sep 9",
    avatar: "https://i.pravatar.cc/150?img=45",
    unread: false,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const openConversation = (name: string) => {
    router.push({
      pathname: "/(tabs)/chat",
      params: { name },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Messages</Text>
          <Text style={styles.subtitle}>
            Your conversations
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="chatbubbles-outline"
            size={25}
            color="#407BFF"
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {conversations.map((conversation) => (
          <Pressable
            key={conversation.id}
            style={({ pressed }) => [
              styles.messageCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => openConversation(conversation.name)}
          >
            <Image
              source={{ uri: conversation.avatar }}
              style={styles.avatar}
            />

            <View style={styles.messageContent}>
              <Text style={styles.name} numberOfLines={1}>
                {conversation.name}
              </Text>

              <Text style={styles.preview} numberOfLines={1}>
                {conversation.message}
              </Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {conversation.time}
              </Text>

              {conversation.unread && (
                <View style={styles.unreadDot} />
              )}

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#A0AEC0"
                style={styles.chevron}
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 22,
  },

  titleContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B3A4B",
  },

  subtitle: {
    fontSize: 13,
    color: "#718096",
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#E8F0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flex: 1,
  },

  list: {
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 30,
  },

  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8EDF3",
    paddingHorizontal: 14,
    paddingVertical: 19,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  cardPressed: {
    opacity: 0.75,
    backgroundColor: "#F0F5FF",
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E2E8F0",
    marginRight: 13,
  },

  messageContent: {
    flex: 1,
    marginRight: 7,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A202C",
    marginBottom: 7,
  },

  preview: {
    fontSize: 12,
    color: "#718096",
  },

  timeContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: 85,
  },

  time: {
    fontSize: 10,
    color: "#718096",
    textAlign: "right",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#407BFF",
    marginTop: 8,
  },

  chevron: {
    marginTop: 7,
  },
});