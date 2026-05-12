import { CARD_THEME, RED_THEME } from '@/constants/theme';
import { useAppStore } from '@/model/filter';
import { RaceProps } from '@/model/race-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RaceCard = (props: RaceProps) => {

    const { setCurrentRace } = useAppStore();
    const router = useRouter();

    const date = new Date(props.date_start)
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
    const month = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
    const today = new Date()
    const isPassed = date < today

    const select = (p: RaceProps) => {
        setCurrentRace(p)
        router.push({
            pathname: '/race-details'
        })
    }


    return (
        <TouchableOpacity onPress={() => select(props)}>
            <View style={[styles.card, { borderLeftColor: isPassed ? "#519653ff" : RED_THEME }]}>
                <View style={{ width: 60, alignItems: "center" }}>
                    <Text style={styles.text_date}>{day}</Text>
                    <Text style={styles.text_date}>{month}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, gap: 10, alignItems: 'center' }}>
                    <Image style={styles.image} source={{ uri: props.country_flag }} />
                    <View style={{ gap: 5, justifyContent: 'center' }}>
                        <Text style={styles.text_country_name}>{props.meeting_name}</Text>
                        <Text style={styles.text_meeting_name}>{props.country_name} - {props.circuit_short_name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RaceCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: CARD_THEME,
        margin: 1,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        borderLeftWidth: 5,
        borderLeftColor: RED_THEME,
        gap: 10

    },

    text_meeting_name: {
        color: "#b1b1b1ff",
        fontSize: 10,
        fontFamily: "f1-regular"
    },
    text_country_name: {
        fontFamily: "f1-bold",
        fontSize: 17,
        color: "#fff",
    },
    text_date: {
        fontSize: 18,
        color: "#fff",
    },
    image: {
        width: 50,
        height: 30
    }

})