import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
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
import { myStyles } from "@/styles/main";
import { postMethod } from "@/lib/api-client";
import { useLogin } from "@/store/loginStore";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const { email, password, isLoading, updateEmail, updatePassword } = useLogin(
    (state) => state,
  );
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit =
    email.trim().length > 0 && password.length > 0 && !isLoading;

  const handleLogin = async () => {
    if (!canSubmit) return;
    // TODO: call the auth logic from loginStore (login API, store token, route by role)
    //IMPLEMENTING LOGIN CALL FROM API-CLIENT FILE CONTD.
    const response = await postMethod("/auth/login", {
      username: email,
      password: password,
    });

    router.replace("/(tabs)/employeeProfile");
  };

  const handleForgotPassword = () => {
    // TODO: navigate to the forgot-password flow
  };

  const handleContactHR = () => {
    // TODO: open mailto: or a contact screen
  };

  return (
    <SafeAreaView style={myStyles.safe}>
      <KeyboardAvoidingView
        style={myStyles.flex}
        // behavior={Platform.OS === "android" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={myStyles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={myStyles.title}>Welcome back</Text>
            <Text style={myStyles.subtitle}>Sign in to continue</Text>

            <View style={myStyles.field}>
              <Text style={myStyles.label}>Email address</Text>
              <TextInput
                style={myStyles.input}
                value={email}
                onChangeText={updateEmail}
                placeholder="you@email.com"
                placeholderTextColor="#9a9a9a"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            <View style={myStyles.field}>
              <Text style={myStyles.label}>Password</Text>
              <View style={myStyles.passwordWrap}>
                <TextInput
                  style={[myStyles.input, myStyles.passwordInput]}
                  value={password}
                  onChangeText={updatePassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9a9a9a"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                />
                <Pressable
                  style={myStyles.eye}
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#111"
                  />
                </Pressable>
              </View>
            </View>

            <Pressable
              style={[myStyles.button, !canSubmit && myStyles.buttonDisabled]}
              onPress={handleLogin}
              disabled={!canSubmit}
              accessibilityRole="button"
              accessibilityState={{ disabled: !canSubmit }}
            >
              <Text
                style={[
                  myStyles.buttonText,
                  !canSubmit && myStyles.buttonTextDisabled,
                ]}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleForgotPassword}
              style={myStyles.forgot}
              hitSlop={8}
            >
              <Text style={myStyles.forgotText}>Forget password?</Text>
            </Pressable>
          </View>

          <View style={myStyles.footer}>
            <Text style={myStyles.footerText}>Don't have an account? </Text>
            <Pressable onPress={handleContactHR} hitSlop={8}>
              <Text style={[myStyles.footerLink]}>contact HR</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
