import { DriverProps } from '@/model/driver-model'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DriverCard = (props: DriverProps) => {
  return (
    <View style={[styles.card, {borderColor: `#${props.team_colour}`}]}>
        <View style= { styles.nameBox}>
            <Text style={styles.text_first_name}>{props.first_name}</Text>
            <Text style={[styles.text_last_name, {color: `#${props.team_colour}`}]}>{props.last_name}</Text>
            <Text style={styles.text_team}>{props.team_name}</Text>
        </View>
            <Text style={styles.number}>{props.driver_number}</Text>
    </View>
  )
}

export default DriverCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#000",
        margin: 5,
        padding: 5,
        borderBottomWidth: 3,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: 'center',
        paddingVertical: 5
    },
    nameBox : {
        flexDirection: 'column',
        gap: 2

    },
    text_first_name: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "f1-regular"
    },
    text_last_name: {
        fontFamily: "f1-bold",
        fontSize: 20,
        color: "#fff",
    },
    text_team : {
        fontFamily: "f1-wide",
        fontSize: 12,
        color: "#fff",
    },
    number: {
        fontFamily: "f1-regular",
        fontSize:40,
        color: 'white',
    }

})