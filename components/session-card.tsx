import { useAppStore } from '@/model/filter';
import { SessionProps } from '@/model/session-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SessionCard = (session: SessionProps) => {
  
  const {setCurrentSession} = useAppStore();

  const router = useRouter();

  const select = (p: SessionProps) => {
      setCurrentSession(p)
      router.push({
            pathname: '/race-results'
        })
  }


  return (
    <TouchableOpacity onPress={() => select(session)}>
    <View style={styles.card}>
            <Text style={styles.text_session_name}>{session.session_name}</Text>
            <Text style={styles.text_date}>{session.display_date}</Text>
            <Text style={styles.text_date}>{session.local_start_time}</Text>
    </View>
  </TouchableOpacity>    
  )
}

export default SessionCard

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
        borderTopColor: "#C12D14",
        minWidth: 200,

    },

    text_session_name: {
        color: "#fff",
        fontSize: 15,
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