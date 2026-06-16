import { CARD_THEME, RED_THEME } from '@/constants/theme';
import { useAppStore } from '@/model/filter';
import { RaceProps } from '@/shared/f1/models/race-model';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NextRace = (race: RaceProps) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const { setCurrentRace } = useAppStore();

    const router = useRouter();

    useEffect(() => {
        if (!race) return;

        const computeTimeLeft = () => {
            const target = new Date(race.date_start).getTime();
            const now = new Date().getTime();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft("C'est parti 🏁");
                return;
            }

            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);

            setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
        };

        computeTimeLeft();
        const intervalId = setInterval(computeTimeLeft, 1000);

        return () => clearInterval(intervalId);
    }, [race]);

    const raceDetails = () => {
        setCurrentRace(race);
        router.push({
            pathname: '/race-details'
        })
    }
    return (
        <View style={styles.main_container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ borderLeftWidth: 5, borderLeftColor: RED_THEME, paddingLeft: 10 }}>
                    <Text style={styles.mainText}>Next Race</Text>
                </View>
                <TouchableOpacity onPress={() => { raceDetails() }}>
                    <Text style={styles.text_schedule}>Race Schedule</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                    <Image
                        style={styles.flag}
                        source={{ uri: race?.country_flag }}
                    />
                    <Text style={styles.text_country}>{race?.country_name}</Text>
                    <Text style={styles.text_date}>{race?.display_date}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <Text style={styles.text_circuit}>{race?.meeting_name}</Text>
                    {timeLeft ? <Text style={styles.text_time}>{timeLeft}</Text> : null}
                </View>
            </View>
        </View>
    )
}

export default NextRace

const styles = StyleSheet.create({
    main_container: {
        padding: 10,
        margin: 5,
        gap: 10
    },
    container: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: RED_THEME,
        backgroundColor: CARD_THEME,
        padding: 15,
        alignItems: "flex-start",
        gap: 15
    },
    text_circuit: {
        fontFamily: "f1-regular",
        fontSize: 22,
        color: "#fff",
        textTransform: "uppercase",
        textAlign: "center"
    },
    text_country: {
        fontFamily: "f1-bold",
        fontSize: 14,
        color: "#fff",
    },
    text_date: {
        fontFamily: "f1-regular",
        fontSize: 14,
        color: "#fff",
    },
    text_time: {
        fontFamily: "f1-regular",
        fontSize: 16,
        color: "#fff",
        textAlign: "center"

    },
    flag: {
        width: 30,
        //height: 30,
    },
    text_schedule: {
        fontFamily: "f1-regular",
        fontSize: 11,
        color: "#f00",
    },
    mainText: {
        fontFamily: "f1-regular",
        fontSize: 13,
        color: "#fff",
        textTransform: "uppercase"
    },
})