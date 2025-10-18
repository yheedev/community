import { auth } from "@/firebaseConfig";
import { useAuthStore } from "@/stores/auth";
import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
      <Text>안녕하세요, {user?.email}</Text>
      <Button title='로그아웃' onPress={() => signOut(auth)} />
    </View>
  );
}
