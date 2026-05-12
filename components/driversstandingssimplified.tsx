import { CARD_THEME } from '@/constants/theme';
import { DriversStandingProps } from '@/model/drivers-standing-model';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DriversStandingsSimplified = ({ standings }: { standings: DriversStandingProps[] }) => {


    return (
        <View style={styles.main_container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ borderLeftWidth: 5, borderLeftColor: "rgba(255, 0, 0, 1)", paddingLeft: 10 }}>
                    <Text style={styles.mainText}>Drivers Standings</Text>
                </View>
                <TouchableOpacity onPress={() => { router.push('/(tabs)/standings') }}>
                    <Text style={styles.text_schedule}>Full Standings</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {standings?.slice(0, 3).map((result) => (
                    <View style={styles.row} key={result.Driver.driver_number}>
                        <Text style={[styles.cell, styles.position]}>{result.position}</Text>
                        <Image source={{ uri: result.Driver.headshot_url }} style={styles.head} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.cell, styles.driver]}> {result.Driver.name_acronym}</Text>
                            <Text style={[styles.cell, styles.driver_team]}> {result.Driver.team_name}</Text>
                        </View>

                        <Text style={[styles.cell, styles.points]}>{result.points}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default DriversStandingsSimplified;

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
        gap: 15
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingBottom: 5,
        marginBottom: 5,
    },
    headerText: {
        fontFamily: "f1-bold",
        fontSize: 12,
        color: "#fff",
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#333',
    },
    cell: {
        fontFamily: "f1-regular",
        fontSize: 14,
        color: "#fff",
        textAlign: 'center',
    },
    position: {
        width: 40,
        fontWeight: 'bold',
    },
    head: {
        width: 40,
        height: 40,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    driver: {
        flex: 1,
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    driver_team: {
        flex: 1,
        textAlign: 'left',
        paddingHorizontal: 10,
        color: "#9b9b9bff",
        fontSize: 10,
    },
    points: {
        width: 40,
        fontWeight: 'bold',
    },
    result_text: {
        fontFamily: "f1-regular",
        fontSize: 12,
        color: "#ffffffff",
    },
    mainText: {
        fontFamily: "f1-regular",
        fontSize: 13,
        color: "#fff",
        textTransform: "uppercase"
    },
    text_schedule: {
        fontFamily: "f1-regular",
        fontSize: 11,
        color: "#f00",
    },
});