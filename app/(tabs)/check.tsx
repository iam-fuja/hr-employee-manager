import { myStyles } from "@/styles/main";
import { ActivityIndicator, Text, View } from "react-native";
import { getMethod } from "@/lib/api-client";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";

export default function Check() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      const result = await getMethod("users");
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <View>
        {data?.users?.map((user: any, index: number) => (
          <View key={index} style={myStyles.card}>
            <Text>
              Name:{user.firstname} {user.lastName}
            </Text>
            <Text>Email:{user.email}</Text>
            <Text>Age:{user.age}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
