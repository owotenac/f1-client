import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
    const [text, onChangeText] = React.useState('2025');
    const router = useRouter();

  const drivers = () => {
            router.push({
            pathname: '/drivers'
        })
  }
  const races = () => {
            router.push({
            pathname: '/races',
            params: { season: text }

        })
  }
  const driversStanding = () => {
            router.push({
            pathname: '/drivers-standing'
        })
  }
  const constructorsStanding = () => {
            router.push({
            pathname: '/constructors-standing'
        })
  }

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button 
                title='Drivers'
                onPress={drivers}/>
        <TextInput
                  style={styles.input}
          onChangeText={onChangeText}
          value={text} />
        <Button 
                title='Races'
                onPress={races}/>
        <Button 
                title='Drivers Standing'
                onPress={driversStanding}/>
        <Button 
                title='Constructors Standing'
                onPress={constructorsStanding}/>


      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#15151D",
    gap: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
})