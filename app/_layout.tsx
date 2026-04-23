import { TabBarTheme } from '@/constants/theme';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { StatusBar } from 'react-native';

export default function RootLayout() {

  const [loaded] = useFonts({
    'f1-bold': require("@/assets/fonts/Formula1-Bold_web_0.ttf"),
    'f1-regular': require("@/assets/fonts/Formula1-Regular_web_0.ttf"),
    'f1-wide': require("@/assets/fonts/Formula1-Wide_web_0.ttf")
  }
  )

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Stack
        screenOptions={TabBarTheme}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="race-details" options={{
          headerShown: true,
          title: 'Race Schedule',
        }} />
        <Stack.Screen name="race-results" options={{
          headerShown: true,
          title: 'Session Results',
        }} />

      </Stack>
    </>
  )

}
