// Header.js

import React from "react";
import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
const banner = require('@/assets/images/back.png')

export default function Header({ title }: { title: string }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ImageBackground
                source={banner}
                style={styles.background}
                imageStyle={styles.backgroundImage}
                resizeMode='cover'
            >
                {/* Overlay */}
                <View style={styles.overlay} />

                {/* Top bar */}
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.logo}>Sector F1</Text>
                        <Text style={styles.season}>2026 SEASON</Text>
                        <Text style={styles.hero}>{title}</Text>
                    </View>

                </View>

                {/* Countdown card
                <BlurView intensity={30} tint="dark" style={styles.countdownCard}>
                    <View style={styles.countdownHeader}>
                        <Ionicons
                            name="calendar-outline"
                            size={18}
                            color="#A0A0B0"
                        />

                        <Text style={styles.countdownLabel}>NEXT RACE IN</Text>
                    </View>

                    <View style={styles.timerContainer}>
                        <TimeBlock value="6" label="DAYS" />
                        <TimeBlock value="22" label="HRS" />
                        <TimeBlock value="41" label="MINS" />
                        <TimeBlock value="32" label="SECS" />
                    </View>
                </BlurView> */}
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 200,
        //backgroundColor: "#0B0B0F",
    },

    background: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 60,
        paddingHorizontal: 24,
        //paddingBottom: 10,
    },

    backgroundImage: {
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#1b1b1b10",
    },

    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logo: {
        color: "white",
        fontSize: 32,
        fontWeight: "800",
        letterSpacing: -1,
    },

    season: {
        color: "#E10600",
        fontSize: 13,
        fontWeight: "600",
        marginTop: 4,
        letterSpacing: 1,
    },
    hero: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "600",
        marginTop: 16,
        letterSpacing: 1,
    }


});