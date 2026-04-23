import { useAppStore } from '@/model/filter';
import { RaceProps } from '@/model/race-model';
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

            setTimeLeft(`${d}j ${h}h ${m}m ${s}s`);
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
            <View style={styles.container}>
                <Text style={styles.text_circuit}>{race?.meeting_name}</Text>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                    <Image
                        style={styles.flag}
                        source={{ uri: race?.country_flag }}
                    />
                    <Text style={styles.text_country}>{race?.country_name}</Text>
                    <Text style={styles.text_date}>{race?.display_date}</Text>
                </View>
                {timeLeft ? <Text style={styles.text_time}>{timeLeft}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => { raceDetails() }} style={{ flexDirection: 'row', gap: 10, backgroundColor: "#7c7b7bff", padding: 15, justifyContent: 'space-between' }}>
                <Text style={styles.text_schedule}>Race Schedule</Text>
                <Text style={styles.text_schedule}>›</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NextRace

const styles = StyleSheet.create({
    main_container: {
        margin: 5,
    },
    container: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomColor: "#242424ff",
        borderWidth: 0.5,
        borderColor: "#242424ff",
        backgroundColor: "#242424ff",
        padding: 25,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignContent: 'center',
        paddingVertical: 25,
        gap: 10
    },
    mainText: {
        fontFamily: "f1-regular",
        fontSize: 13,
        color: "#fc2020ff",
        textTransform: "uppercase"
    },
    text_circuit: {
        fontFamily: "f1-bold",
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
        fontSize: 14,
        color: "#fff",
        textAlign: "center"
    },
    flag: {
        width: 30,
        //height: 30,
    },
    text_schedule: {
        fontFamily: "f1-regular",
        fontSize: 12,
        color: "#ffffffff",
    }
})