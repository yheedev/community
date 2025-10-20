import "react-native-reanimated";

// import "nativewind/tailwind.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { useColorScheme } from "@/components/useColorScheme";
import { auth } from "@/firebaseConfig";
import { useAuthStore } from "@/stores/auth";
import { onAuthStateChanged } from "firebase/auth";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  // firebase auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      useAuthStore.setState({ user: u, initializing: false });
    });
    return unsub;
  }, []);

  // route protection
  useEffect(() => {
    const { initializing, user } = useAuthStore.getState();
    if (initializing) return;

    const inAuth = segments[0] === "(auth)";
    const inApp = segments[0] === "(app)";

    if (!user && inApp) router.replace("/(auth)/login");
    if (user && inAuth) router.replace("/");

    requestAnimationFrame(() => {
      SplashScreen.hideAsync().catch(() => {});
    });
  }, [segments, router]);

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
//         <Stack.Screen name='modal' options={{ presentation: "modal" }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }
