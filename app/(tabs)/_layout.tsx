import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'dark',
        headerShown: true
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color="black" />,
          headerShown: false,
          tabBarShowLabel: false,
          title: '',
        }}
      />
      <Tabs.Screen
        name="races"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color="black" />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
