import { useAppStore } from '@/model/filter';
import { SessionResultProps } from '@/model/session-result-model';
import { OpenF1API } from '@/services/openf1api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RaceResult() {

    const [loading, setLoading] = useState(true);
    const { currentSession, currentRace } = useAppStore();
    const [sessionResults, setSessionsResults] = useState<SessionResultProps[]>([]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const milliseconds = Math.floor((seconds % 1) * 1000);

        if (hours > 0)
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;

        if (minutes > 0)
            return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
        
        return `+${secs.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;

    }

    const getTimeDisplay = (item: SessionResultProps) => {
        if (item.dnf) return 'DNF';
        if (item.dsq) return 'Disqualified';
        if (item.dns) return 'Did not start';
        if (Array.isArray(item.duration)) {
            if (item.duration[2])
                return formatTime(item.duration[2]);
            else if (item.duration[1])
                return formatTime(item.duration[1]);
            else if (item.duration[0])
                return formatTime(item.duration[0]);
        }

        if (typeof item.duration === 'number')
            return formatTime(item.duration);

        return '-'
    }

    const getDeltaDisplay = (item: SessionResultProps) => {
        if (item.gap_to_leader === null || item.gap_to_leader === undefined) return '';

        if (item.dnf) return '-';
        if (item.dsq) return '-';
        if (item.dns) return '-';
        if (Array.isArray(item.gap_to_leader)) {
            if (item.gap_to_leader[2])
                return formatTime(item.gap_to_leader[2]);
            else if (item.gap_to_leader[1])
                return formatTime(item.gap_to_leader[1]);
            else if (item.gap_to_leader[0])
                return formatTime(item.gap_to_leader[0]);
        }

        if (typeof item.gap_to_leader === 'number')
            if (item.gap_to_leader > 0)
                return formatTime(item.gap_to_leader);

        return ''
    }


    useEffect(() => {
        const fetchSessions = async () => {
            try {
                //get the results for the current session
                const result = await OpenF1API.getSessionResult(currentSession);
                setSessionsResults(result)

                setLoading(false);

            } catch (error) {
                console.error("Error fetching races:", error);
                setLoading(false); // Don't forget to stop loading on error!
            }
        };

        if (sessionResults.length === 0) {
            fetchSessions();
        }
    }, []);


    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.border}>
                    <Text style={styles.main_text_race}>{currentRace.meeting_official_name}</Text>
                    <Text style={styles.main_text_country}>{currentSession.session_name}</Text>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) :
                    (
                        <View style={styles.content}>
                            <FlatList style={styles.list}
                                data={sessionResults}
                                numColumns={1}
                                renderItem={
                                    ({ item }) => (
                                        <View style={[styles.standing, {borderColor: `#${item.driver_info.team_colour}`}]}>

                                            <Text style={[styles.cell, styles.position]}>{item.position}</Text>
                                            <Text style={[styles.cell, styles.driver]}> {item.driver_info.last_name} </Text>
                                            <Text style={[styles.cell, styles.time]}>{getTimeDisplay(item)}</Text>
                                            <Text style={[styles.cell, styles.delta]}>{getDeltaDisplay(item)}</Text>
                                        </View>
                                    )
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                    )
                }
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#222222ff"
    },
    content: {
        flex: 1,
        marginTop: 30,

    },
    main_text_race: {
        color: "#fff",
        fontSize: 25,
        fontFamily: "f1-regular",
        textAlign: 'center'
    },
    main_text_country: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "f1-regular",
        textAlign: 'center'
    },
    border: {
        borderTopWidth: 5,
        borderTopColor: "#C12D14",
        backgroundColor: "#222222ff",
        padding: 5
    },
    list: {
        flex: 1,
        gap: 10
    },
    standing: {
        flexDirection: 'row',
        margin: 5,
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    position: {
        width: 50,
    },
    time: {
        textAlign: "right",
        justifyContent: "flex-end",
        alignContent: "flex-end",
    },
    cell: {
        color: "#fff",
        fontFamily: "f1-regular",
    },
    driver: {
        fontSize: 16,
        width: 200,
    },
    delta: {
        textAlign: "right",
        justifyContent: "flex-end",
        alignContent: "flex-end",
        width: 100,
        fontSize:10
    }

})