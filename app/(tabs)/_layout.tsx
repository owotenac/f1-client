import { Tabs } from 'expo-router';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  //const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'dark',//Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}>
      <Tabs.Screen
        name="Drivers"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
