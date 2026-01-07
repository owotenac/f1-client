import { useAppStore } from '@/model/filter';
import { RaceProps } from '@/model/race-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RaceCard = (props: RaceProps) => {
  
  const {setCurrentRace} = useAppStore();
  const router = useRouter();

  const select = (p: RaceProps) => {
      setCurrentRace(p)
      router.push({
            pathname: '/race-details'
        })
  }


  return (
    <TouchableOpacity onPress={() => select(props)}>
    <View style={styles.card}>
            <Text style={styles.text_country_name}>{props.country_name}</Text>
            <Text style={styles.text_meeting_name}>{props.meeting_official_name}</Text>
            <Text style={styles.text_date}>{props.display_date}</Text>
    </View>
  </TouchableOpacity>    
  )
}

export default RaceCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#000",
        margin: 5,
        padding: 25,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignContent: 'center',
        paddingVertical: 5,
        borderTopWidth:5,
        borderTopColor: "#C12D14"

    },

    text_meeting_name: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "f1-regular"
    },
    text_country_name: {
        fontFamily: "f1-bold",
        fontSize: 20,
        color: "#fff",
    },
    text_date: {
        paddingTop: 10,
        fontFamily: "f1-regular",
        fontSize: 12,
        color: "#fff",
    },


})