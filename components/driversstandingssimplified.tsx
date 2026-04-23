import { DriversStandingProps } from '@/model/drivers-standing-model';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DriversStandingsSimplified = ({ standings }: { standings: DriversStandingProps[] }) => {


    return (
        <View style={styles.main_container}>
            <View style={styles.container}>
                {standings?.slice(0, 3).map((result) => (
                    <View style={styles.row} key={result.Driver.driver_number}>
                        <Text style={[styles.cell, styles.position]}>{result.position}</Text>
                        <Image source={{ uri: result.Driver.headshot_url }} style={styles.head} />
                        <Text style={[styles.cell, styles.driver]}> {result.Driver.name_acronym}</Text>
                        <Text style={[styles.cell, styles.points]}>{result.points}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => { router.push('/(tabs)/standings') }} style={{ flexDirection: 'row', gap: 10, backgroundColor: "#7c7b7bff", padding: 15, justifyContent: 'space-between' }}>
                <Text style={styles.result_text}>Full Standings</Text>
                <Text style={styles.result_text}>›</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DriversStandingsSimplified;

const styles = StyleSheet.create({
    main_container: {
        margin: 5,
    },
    container: {
        backgroundColor: "#242424ff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 0.5,
        borderColor: "#242424ff",
        padding: 10,
        borderBottomColor: "#242424ff",
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
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    driver: {
        flex: 1,
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    points: {
        width: 40,
        fontWeight: 'bold',
    },
    result_text: {
        fontFamily: "f1-regular",
        fontSize: 12,
        color: "#ffffffff",
    }
});