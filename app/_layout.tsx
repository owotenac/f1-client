import { TabBarTheme } from '@/constants/theme';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {

  const [loaded] = useFonts({
    'f1-bold': require("@/assets/fonts/Formula1-Bold_web_0.ttf"),
    'f1-regular': require("@/assets/fonts/Formula1-Regular_web_0.ttf"),
    'f1-wide': require("@/assets/fonts/Formula1-Wide_web_0.ttf")
  }
  )

  return (
    <Stack
      screenOptions={TabBarTheme}>
      <Stack.Screen name="index" options={{ 
        headerShown: true ,
        title: 'F1 App',
        
        }} />
      <Stack.Screen name="races" options={{ 
        headerShown: true ,
        title: 'Season Schedule',
        }} />
      <Stack.Screen name="race-details" options={{ 
        headerShown: true ,
        title: 'Race Schedule',
        }} />
      <Stack.Screen name="race-results" options={{ 
        headerShown: true ,
        title: 'Session Results',
        }} />
      <Stack.Screen name="drivers-standing" options={{ 
        headerShown: true ,
        title: 'Drivers Standing',
        }} />
      <Stack.Screen name="constructors-standing" options={{ 
        headerShown: true ,
        title: 'Constructors Standing',
        }} />

    </Stack>
  )
  
}
