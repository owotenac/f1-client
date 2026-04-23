import { BG_THEME } from '@/constants/theme';
import { DriversStandingProps } from '@/model/drivers-standing-model';
import { OpenF1API } from '@/services/openf1api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function DriversStanding() {

    const [standing, setStanding] = useState<DriversStandingProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const result = await OpenF1API.getDriversStanding();
                setStanding(result)
                setLoading(false);

            } catch (error) {
                console.error("Error fetching races:", error);
                setLoading(false); // Don't forget to stop loading on error!
            }
        };

        if (standing.length === 0) {
            fetchSessions();
        }
    }, []);


    return (


        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) :
                (
                    <View style={styles.content}>
                        <FlatList style={styles.list}
                            data={standing}
                            numColumns={1}
                            showsVerticalScrollIndicator={false}
                            renderItem={
                                ({ item }) => (
                                    <View style={[styles.standing, { borderColor: `#${item.Constructors.color}` }]}>

                                        <Text style={[styles.cell, styles.position]}>{item.position}</Text>
                                        <Image source={{ uri: item.Driver.headshot_url }} style={styles.head} />
                                        <Text style={[styles.cell, styles.driver]}> {item.Driver.name_acronym}</Text>
                                        <Text style={[styles.cell, styles.points]}>{item.points}</Text>
                                    </View>
                                )
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                )
            }
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 5,
        backgroundColor: BG_THEME,
        paddingTop: 10
    },
    content: {
        flex: 1,
        margin: 20,
        //alignItems: 'center',
    },
    list: {
        flex: 1,
    },
    standing: {
        flexDirection: 'row',
        margin: 10,
        //borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        paddingBottom: 10,
        overflow: 'hidden'
    },
    position: {
        width: 40,
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
        fontSize: 20,
        width: 200,
    },
    points: {
        fontSize: 16,
        width: 50,
        textAlign: "right",
        alignContent: "flex-end",
        justifyContent: "flex-end",
    },
    head: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 10,
    },
}
)