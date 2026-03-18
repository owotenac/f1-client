import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const logo = require('../assets/images/F1.png')


export default function index() {
  const router = useRouter();

  const races = () => {
    router.push({
      pathname: '/races',
      params: { season: 2026 }

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

        <Image source={logo} style={styles.image} />

        <TouchableOpacity onPress={races}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
              <FontAwesome name="calendar" size={24} color="white" />
              <Text style={styles.text}>Race Schedule</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={driversStanding}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
              <MaterialCommunityIcons name="podium" size={24} color="white" />
              <Text style={styles.text}>Drivers Standing</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={constructorsStanding}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', marginTop: 5, gap: 10 }}>
              <MaterialCommunityIcons name="podium" size={24} color="white" />
              <Text style={styles.text}>Constructors Standing</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#15151D",
    gap: 10,
          alignContent:'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  card: {
    backgroundColor: "#000",
    margin: 5,
    padding: 25,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: 'center',
    paddingVertical: 25,
    borderTopWidth: 5,
    borderTopColor: "#C12D14"

  },
    text: {
        fontFamily: "f1-regular",
        fontSize: 20,
        color: "#fff",
    },  
    image: {
      width: 200,
      height: 50,

    }
})