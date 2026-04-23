import { useAppStore } from '@/model/filter';
import { RaceProps } from '@/model/race-model';
import { SessionProps } from '@/model/session-model';
import { SessionResultProps } from '@/model/session-result-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LastRace = ({ race, session, session_result }: { race: RaceProps, session: SessionProps, session_result: SessionResultProps[] }) => {

    const { setCurrentRace, setCurrentSession, setCurrentSessionResults } = useAppStore();
    const router = useRouter();

    const raceResults = () => {
        setCurrentRace(race)
        setCurrentSession(session)
        setCurrentSessionResults(session_result)
        router.push('/race-results')
    }

    return (
        <View style={styles.main_container}>
            <View style={styles.container}>
                <Text style={styles.mainText}>{race?.meeting_name}</Text>
                <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between', paddingHorizontal: 25 }}>
                    {// we display only the first 3 drivers for the last session}
                        session_result?.slice(0, 3).map((result) => (
                            <View key={result.driver_number} style={{ flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                                <Text style={styles.text}>P{result.position}</Text>
                                <View style={[styles.rank_view, { backgroundColor: '#' + result.driver_info.team_colour }]}>
                                    <Text style={styles.pilot_text}>{result.driver_info.name_acronym}</Text>
                                </View>
                                <Text style={styles.result_text}>{result.driver_info.team_name}</Text>
                            </View>
                        ))
                    }
                </View>


            </View>
            <TouchableOpacity onPress={() => { raceResults() }} style={{ flexDirection: 'row', gap: 10, backgroundColor: "#7c7b7bff", padding: 15, justifyContent: 'space-between' }}>
                <Text style={styles.result_text}>Full Results</Text>
                <Text style={styles.result_text}>›</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LastRace

const styles = StyleSheet.create({
    main_container: {
        margin: 5,

    },
    container: {
        padding: 25,
        borderRadius: 5,
        borderTopWidth: 5,
        borderTopColor: "#C12D14",
        backgroundColor: "#242424ff",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignContent: 'center',
        paddingVertical: 25,
        gap: 10
    },
    mainText: {
        fontFamily: "f1-regular",
        fontSize: 16,
        color: "#d1d0d0ff",
    },
    text: {
        fontFamily: "f1-regular",
        fontSize: 14,
        color: "#dbe091ff",
    },
    pilot_text: {
        fontFamily: "f1-wide",
        fontSize: 10,
        color: "#ffffffff",
    },
    rank_view: {
        padding: 5,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    result_text: {
        fontFamily: "f1-regular",
        fontSize: 12,
        color: "#ffffffff",
    }
})