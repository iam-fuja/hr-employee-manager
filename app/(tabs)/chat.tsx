import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const conversations: Record<
  string,
  {
    name: string;
    role: string;
    avatar: string;
    messages: {
      id: string;
      text: string;
      sender: "me" | "them";
      time: string;
    }[];
  }
> = {
  "HR team": {
    name: "HR team",
    role: "Human Resources",
    avatar: "https://i.pravatar.cc/150?img=47",
    messages: [
      {
        id: "1",
        text: "Hello, how can we help you today?",
        sender: "them",
        time: "10:15 AM",
      },
      {
        id: "2",
        text: "I wanted to ask about my employee records.",
        sender: "me",
        time: "10:20 AM",
      },
      {
        id: "3",
        text: "Alright, got it, we look into this shortly.",
        sender: "them",
        time: "10:24 AM",
      },
    ],
  },

  "Tunde James": {
    name: "Tunde James",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=12",
    messages: [
      {
        id: "1",
        text: "Have you completed the report?",
        sender: "them",
        time: "9:30 AM",
      },
      {
        id: "2",
        text: "Thanks for the update!",
        sender: "me",
        time: "9:45 AM",
      },
    ],
  },

  "David John": {
    name: "David John",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=13",
    messages: [
      {
        id: "1",
        text: "Can I get an update on my leave?",
        sender: "them",
        time: "Yesterday",
      },
      {
        id: "2",
        text: "I'll check the details and get back to you.",
        sender: "me",
        time: "Yesterday",
      },
    ],
  },

  "Sarah Wilson": {
    name: "Sarah Wilson",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=44",
    messages: [
      {
        id: "1",
        text: "Your request has been received.",
        sender: "them",
        time: "2:10 PM",
      },
      {
        id: "2",
        text: "Perfect, thanks!",
        sender: "me",
        time: "2:15 PM",
      },
    ],
  },

  "Bolu Adebayo": {
    name: "Bolu Adebayo",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=45",
    messages: [
      {
        id: "1",
        text: "Please let me know when you are available.",
        sender: "them",
        time: "Yesterday",
      },
      {
        id: "2",
        text: "Seen, thanks again.",
        sender: "me",
        time: "Yesterday",
      },
    ],
  },
};

export default function ChatScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string }>();

  const personName = Array.isArray(name) ? name[0] : name;
  const person = conversations[personName ?? ""] ?? {
    name: personName || "Conversation",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=12",
    messages: [],
  };

  const [messages, setMessages] = useState(person.messages);
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    const text = messageText.trim();

    if (!text) return;

    const newMessage = {
      id: `${Date.now()}`,
      text,
      sender: "me" as const,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previous) => [...previous, newMessage]);
    setMessageText("");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          {/* Chat header */}
          <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Back to messages"
            >
              <Ionicons name="arrow-back" size={25} color="#171923" />
            </Pressable>

            <Image
              source={{ uri: person.avatar }}
              style={styles.avatar}
            />

            <Pressable
              style={styles.profileInfo}
              onPress={() => {}}
            >
              <Text style={styles.personName}>{person.name}</Text>
              <Text style={styles.personRole}>{person.role}</Text>
            </Pressable>

            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color="#333333"
            />
          </View>

          {/* Conversation */}
          <ScrollView
            style={styles.conversation}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.dateLabel}>Today</Text>

            {messages.map((message) => {
              const isMine = message.sender === "me";

              return (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    isMine ? styles.myMessageRow : styles.theirMessageRow,
                  ]}
                >
                  <View
                    style={[
                      styles.bubble,
                      isMine ? styles.myBubble : styles.theirBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isMine && styles.myMessageText,
                      ]}
                    >
                      {message.text}
                    </Text>

                    <Text
                      style={[
                        styles.messageTime,
                        isMine && styles.myMessageTime,
                      ]}
                    >
                      {message.time}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Message input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={1000}
            />

            <Pressable
              onPress={sendMessage}
              style={[
                styles.sendButton,
                !messageText.trim() && styles.sendButtonDisabled,
              ]}
              disabled={!messageText.trim()}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Ionicons name="send" size={19} color="#FFFFFF" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF0F4",
  },

  backButton: {
    width: 35,
    height: 45,
    justifyContent: "center",
    marginRight: 8,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#E2E8F0",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },

  personName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171923",
  },

  personRole: {
    fontSize: 12,
    color: "#718096",
    marginTop: 3,
  },

  conversation: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  messageList: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 25,
  },

  dateLabel: {
    textAlign: "center",
    color: "#8A94A3",
    fontSize: 12,
    marginBottom: 24,
  },

  messageRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  myMessageRow: {
    justifyContent: "flex-end",
  },

  theirMessageRow: {
    justifyContent: "flex-start",
  },

  bubble: {
    maxWidth: "82%",
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: 18,
  },

  myBubble: {
    backgroundColor: "#407BFF",
    borderBottomRightRadius: 5,
  },

  theirBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#E6EAF0",
  },

  messageText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#252A34",
  },

  myMessageText: {
    color: "#FFFFFF",
  },

  messageTime: {
    fontSize: 10,
    color: "#8A94A3",
    textAlign: "right",
    marginTop: 6,
  },

  myMessageTime: {
    color: "#E6EEFF",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDF0F4",
    backgroundColor: "#FFFFFF",
    gap: 10,
  },

  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 110,
    backgroundColor: "#F3F5F8",
    borderRadius: 23,
    paddingHorizontal: 17,
    paddingVertical: 11,
    fontSize: 14,
    color: "#171923",
  },

  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#407BFF",
  },

  sendButtonDisabled: {
    opacity: 0.45,
  },
});