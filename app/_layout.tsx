import { TabBarTheme } from '@/constants/theme';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'f1-bold': require("@/assets/fonts/Formula1-Bold_web_0.ttf"),
    'f1-regular': require("@/assets/fonts/Formula1-Regular_web_0.ttf"),
    'f1-wide': require("@/assets/fonts/Formula1-Wide_web_0.ttf")
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Stack
        screenOptions={TabBarTheme}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home', headerBackTitle: "Back" }} />

        <Stack.Screen name="race-details" options={{
          headerShown: true,
          title: 'Race Schedule',
          headerBackTitle: "Back"
        }} />
        <Stack.Screen name="race-results" options={{
          headerShown: true,
          title: 'Session Results',
          headerBackTitle: "Back"
        }} />

      </Stack>
    </>
  );
}
