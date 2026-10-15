import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type MessagePreview = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
};

const conversations: MessagePreview[] = [
  {
    id: "1",
    name: "HR Team",
    message: "Alright, got it, we look into this shortly",
    time: "10:24 AM",
    avatar:
      "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "2",
    name: "Tunde James",
    message: "Thanks for the update!",
    time: "Yesterday",
    avatar:
      "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "David John",
    message: "Can I get update on my leave",
    time: "Yesterday",
    avatar:
      "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    message: "Perfect thanks",
    time: "Sep 10",
    avatar:
      "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "5",
    name: "Bolu Adebayo",
    message: "Seen, thanks again.",
    time: "Sep 9",
    avatar:
      "https://i.pravatar.cc/150?img=45",
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const openChat = (conversation: MessagePreview) => {
    router.push({
      pathname: "/(tabs)/chat",
      params: {
        id: conversation.id,
        name: conversation.name,
      },
    });
  };

  const renderMessage = ({
    item,
  }: {
    item: MessagePreview;
  }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.messageCard,
          pressed && styles.messageCardPressed,
        ]}
        onPress={() => openChat(item)}
      >
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />

        <View style={styles.messageContent}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text
            style={styles.lastMessage}
            numberOfLines={1}
          >
            {item.message}
          </Text>
        </View>

        <Text style={styles.time}>
          {item.time}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#172033"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Messages
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#172033",
    marginLeft: 10,
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 30,
  },

  messageCard: {
    minHeight: 105,
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 24,
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingVertical: 17,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    elevation: 2,
  },

  messageCardPressed: {
    opacity: 0.75,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#E8EDF3",
  },

  messageContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 5,
  },

  lastMessage: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 21,
  },

  time: {
    fontSize: 14,
    color: "#4B5563",
    alignSelf: "flex-start",
    marginTop: 4,
  },
});