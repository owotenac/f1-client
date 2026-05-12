import { BG_THEME } from '@/constants/theme';
import { ConstructorsStandingProps } from '@/model/constructors-standing-model';
import { OpenF1API } from '@/services/openf1api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function ConstructorsStanding() {

    const [standing, setStanding] = useState<ConstructorsStandingProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const result = await OpenF1API.getConstructorsStanding();
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
                            showsVerticalScrollIndicator={false}
                            data={standing}
                            numColumns={1}
                            renderItem={
                                ({ item }) => (
                                    <View style={[styles.standing, { borderColor: `#${item.Constructor.color}` }]}>

                                        <Text style={[styles.cell, styles.position]}>{item.position}</Text>
                                        <View style={[styles.logoContainer, { backgroundColor: `#${item.Constructor.color}` }]}>
                                            <Image source={{ uri: item.Constructor.logo_url }} style={styles.head} resizeMode='contain' />
                                        </View>
                                        <Text style={[styles.cell, styles.driver]}> {item.Constructor.name} </Text>
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
        width: '100%',
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        paddingBottom: 15,
        alignContent: "center",
        alignItems: "center"
    },
    position: {
        width: 20,
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

    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    head: {
        width: 30,
        height: 30,
    }
}
)