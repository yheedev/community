import "react-native-reanimated";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { useAuthStore } from "@/stores/auth";

import { useColorScheme } from "@/components/useColorScheme";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      useAuthStore.setState({ user: u, initializing: false });
    });
    return unsub;
  }, []);

  useEffect(() => {
    const inAuth = segments[0] === "(auth)";
    const inApp = segments[0] === "(app)";

    const { initializing, user } = useAuthStore.getState();
    if (initializing) return;

    if (!user && inApp) router.replace("/(auth)/login");
    if (user && inAuth) router.replace("/");
  }, [segments]);

  // const [loaded, error] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   ...FontAwesome.font,
  // });

  // // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return <Stack screenOptions={{ headerShown: false }} />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='modal' options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
