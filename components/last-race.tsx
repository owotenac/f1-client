import { RaceProps } from '@/model/race-model';
import { SessionResultProps } from '@/model/session-result-model';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LastRace = ({ race, session_result }: { race: RaceProps, session_result: SessionResultProps[] }) => {

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
            <View style={{ flexDirection: 'row', gap: 10, backgroundColor: "#222222ff", padding: 15, justifyContent: 'space-between' }}>
                <Text style={styles.result_text}>Full Results</Text>
                <Text style={styles.result_text}>›</Text>
            </View>
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
        backgroundColor: "#141414ff",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignContent: 'center',
        paddingVertical: 25,
        gap: 10
    },
    mainText: {
        fontFamily: "f1-regular",
        fontSize: 16,
        color: "#969494ff",
    },
    text: {
        fontFamily: "f1-regular",
        fontSize: 14,
        color: "#dbe091ff",
    },
    pilot_text: {
        fontFamily: "f1-wide",
        fontSize: 11,
        color: "#ffffffff",
    },
    rank_view: {
        //backgroundColor: "#811d0b80",
        padding: 5,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        //borderColor: "#fd2600ff",
    },
    result_text: {
        fontFamily: "f1-regular",
        fontSize: 12,
        color: "#ffffffff",
    }
})