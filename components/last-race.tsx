import { CARD_THEME } from '@/constants/theme';
import { useAppStore } from '@/model/filter';
import { RaceProps } from '@/model/race-model';
import { SessionProps } from '@/model/session-model';
import { SessionResultProps } from '@/model/session-result-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ borderLeftWidth: 5, borderLeftColor: "rgba(255, 0, 0, 1)", paddingLeft: 10 }}>
                    <Text style={styles.mainText}>Last Race</Text>
                </View>
                <TouchableOpacity onPress={() => { raceResults() }}>
                    <Text style={styles.result_text}>Full Results</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.text_circuit}>{race?.meeting_name}</Text>
                <View style={{ flex: 1, flexDirection: 'row', gap: 15, justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                    {// we display only the first 3 drivers for the last session}
                        session_result?.slice(0, 3).map((result) => (
                            <View key={result.driver_number} style={{ flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                                <Text style={styles.text}>P{result.position}</Text>
                                <Image source={{ uri: result.driver_info.headshot_url }} style={styles.head} />
                                {/* <View style={[styles.rank_view, { backgroundColor: '#' + result.driver_info.team_colour }]}>
                                    <Text style={styles.pilot_text}>{result.driver_info.name_acronym}</Text>
                                </View> */}
                                <Text style={styles.team_name}>{result.driver_info.team_name}</Text>
                            </View>
                        ))
                    }
                </View>


            </View>

        </View>
    )
}

export default LastRace

const styles = StyleSheet.create({
    main_container: {
        padding: 10,
        margin: 5,
        gap: 10
    },
    container: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#790000ff",
        backgroundColor: CARD_THEME,
        padding: 15,
        //alignItems: "flex-start",
        gap: 15,
    },
    mainText: {
        fontFamily: "f1-regular",
        fontSize: 13,
        color: "#fff",
        textTransform: "uppercase"
    },
    text_circuit: {
        fontFamily: "f1-regular",
        fontSize: 18,
        color: "#fff",
        textTransform: "uppercase",
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
        borderWidth: 0,
    },
    result_text: {
        fontFamily: "f1-regular",
        fontSize: 11,
        color: "#f00",
    },
    team_name: {
        fontFamily: "f1-regular",
        fontSize: 11,
        color: "#d8d8d8ff",
    },
    head: {
        width: 80,
        height: 80,
        marginHorizontal: 10,
    },
})