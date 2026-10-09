import { myStyles } from "@/styles/main";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Text,
  View
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/leaves");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={myStyles.splash}>
      <Text style={myStyles.splashText}>StaffFlow</Text>
    </View>
  );
}
