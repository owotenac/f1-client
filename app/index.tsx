import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function index() {

    const router = useRouter();

  const drivers = () => {
            router.push({
            pathname: '/drivers'
        })
  }
  const races = () => {
            router.push({
            pathname: '/races'
        })
  }


  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button 
                title='Drivers'
                onPress={drivers}/>
        <Button 
                title='Races'
                onPress={races}/>


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

  }
})