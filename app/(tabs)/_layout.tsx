import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'dark',
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#141414ff"
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color="white" />,
          headerShown: false,
          tabBarShowLabel: false,
          title: '',
        }}
      />
      <Tabs.Screen
        name="races"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="schedule" size={24} color="white" />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="trophy" size={24} color="white" />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />

    </Tabs>
  );
}
