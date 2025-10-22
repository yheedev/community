import { useColorScheme } from '@/components/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';

if (Platform.OS !== 'web') SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (Platform.OS !== 'web') SplashScreen.hideAsync().catch(() => {});
  }, []);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}

// // import "react-native-reanimated";

// // import "nativewind";
// // import { GluestackUIProvider } from "@gluestack-ui/themed";

// import { useColorScheme } from '@/components/useColorScheme';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Slot } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import { Platform } from 'react-native';

// // import { auth } from "@/firebaseConfig";
// // import { useAuthStore } from "@/stores/auth";
// // import { onAuthStateChanged } from "firebase/auth";

// //export { ErrorBoundary } from "expo-router";

// if (Platform.OS !== 'web') SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   useEffect(() => {
//     if (Platform.OS !== 'web') SplashScreen.hideAsync().catch(() => {});
//     // 라우트 가드/replace 로직은 잠시 비활성화하여 간섭 제거
//   }, []);

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Slot />
//     </ThemeProvider>
//   );
// }

// // export const unstable_settings = {
// //   initialRouteName: "(tabs)",
// // };

// // // SplashScreen.preventAutoHideAsync();

// // export default function RootLayout() {
// //   const colorScheme = useColorScheme();
// //   const segments = useSegments();
// //   const router = useRouter();

// //   // firebase auth
// //   useEffect(() => {
// //     const unsub = onAuthStateChanged(auth, (u) => {
// //       useAuthStore.getState().setUser(u);
// //       useAuthStore.getState().setUserPublicFromUser(u);
// //       useAuthStore.getState().setInitializing(false);
// //     });
// //     return unsub;
// //   }, []);

// //   // route protection
// //   useEffect(() => {
// //     const { initializing, user } = useAuthStore.getState();
// //     if (initializing) return;

// //     const inAuth = segments[0] === "(auth)";
// //     const inApp = segments[0] === "(app)";

// //     if (!user && inApp) router.replace("/(auth)/login");
// //     if (user && inAuth) router.replace("/");

// //     requestAnimationFrame(() => {
// //       //   SplashScreen.hideAsync().catch(() => {});
// //     });
// //   }, [segments, router]);

// //   return (
// //     // <GluestackUIProvider config={config}>
// //     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
// //       <Slot />
// //     </ThemeProvider>
// //     // </GluestackUIProvider>
// //   );
// // }

// // // function RootLayoutNav() {
// // //   const colorScheme = useColorScheme();

// // //   return (
// // //     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
// // //       <Stack>
// // //         <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
// // //         <Stack.Screen name='modal' options={{ presentation: "modal" }} />
// // //       </Stack>
// // //     </ThemeProvider>
// // //   );
// // // }
