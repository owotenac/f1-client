import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {

  const [loaded] = useFonts({
    'f1-bold': require("@/assets/fonts/Formula1-Bold_web_0.ttf"),
    'f1-regular': require("@/assets/fonts/Formula1-Regular_web_0.ttf"),
    'f1-wide': require("@/assets/fonts/Formula1-Wide_web_0.ttf")
  }
  )

  return <Stack />;
}
