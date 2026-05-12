import { BG_THEME, CARD_THEME } from '@/constants/theme';
import { useAppStore } from '@/model/filter';
import { SessionResultProps } from '@/model/session-result-model';
import { OpenF1API } from '@/services/openf1api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RaceResult() {

    const [loading, setLoading] = useState(true);
    const { currentSession, currentRace, currentSessionResults } = useAppStore();
    const [sessionResults, setSessionsResults] = useState<SessionResultProps[]>(currentSessionResults);

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
        else {
            setLoading(false);
        }
    }, []);


    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.border}>
                    <View style={{ flexDirection: 'row', marginTop: 5, gap: 10, alignItems: 'center' }}>
                        <Image style={styles.flag} source={{ uri: currentRace.country_flag }} />
                        <Text style={styles.main_text_race}>{currentRace.meeting_name}</Text>
                    </View>
                    <Text style={styles.meeting_official_name}>{currentRace.meeting_official_name}</Text>
                    <View style={{ alignSelf: 'center', padding: 5 }}>
                        <Text style={styles.session_text}>{currentSession.session_name}</Text>
                    </View>

                </View>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) :
                    (
                        <View style={styles.content}>
                            <FlatList style={styles.list}
                                showsVerticalScrollIndicator={false}
                                data={sessionResults}
                                numColumns={1}
                                renderItem={
                                    ({ item }) => (
                                        <View style={[styles.standing]}>
                                            <Text style={styles.position}>{item.position}</Text>
                                            <View style={[styles.driver_info, { borderColor: `#${item.driver_info.team_colour}` }]}>
                                                <Text style={styles.driver}> {item.driver_info.last_name} </Text>
                                                <Text style={styles.team_text}> {item.driver_info.team_name} </Text>
                                            </View>
                                            <View style={styles.time_view}>
                                                <Text style={styles.time}>{getTimeDisplay(item)}</Text>
                                                <Text style={styles.delta}>{getDeltaDisplay(item)}</Text>
                                            </View>
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
        padding: 5,
        backgroundColor: BG_THEME
    },
    content: {
        flex: 1,
        marginTop: 10,
        margin: 10,
        backgroundColor: CARD_THEME,
        borderRadius: 10
        //alignItems: 'center',
    },
    main_text_race: {
        color: "#fff",
        fontSize: 25,
        fontFamily: "f1-regular",
        //textAlign: 'center'
    },
    session_text: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "f1-regular",
        textAlign: 'center'
    },
    border: {
        backgroundColor: BG_THEME,
        padding: 5,
        gap: 10,
        alignItems: "flex-start",
        marginBottom: 10

    },
    list: {
        flex: 1,
        gap: 10
    },
    standing: {
        flexDirection: 'row',
        margin: 5,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#868686ff'
    },
    position: {
        width: 50,
        fontSize: 20,
        color: 'white'

    },
    time: {
        textAlign: "right",
        color: 'white'
    },
    driver: {
        fontSize: 17,
        //width: 150,
        fontFamily: 'f1-regular',
        color: 'white'
    },
    delta: {
        textAlign: "right",
        //width: 100,
        fontSize: 10,
        fontFamily: 'f1-regular',
        color: "#838383ff"
    },
    driver_info: {
        flex: 1,
        borderLeftWidth: 3,
        paddingLeft: 5
    },
    team_text: {
        fontSize: 12,
        color: "#8b8b8bff"
    },
    time_view: {
        alignItems: 'flex-end',
        marginRight: 10

    },
    flag: {
        width: 50,
        height: 30
    },
    meeting_official_name: {
        color: '#b9b9b9ff',
        fontSize: 12,
        fontFamily: 'f1-regular',
        textAlign: 'center',
    },

})