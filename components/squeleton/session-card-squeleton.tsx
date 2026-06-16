import { CARD_THEME } from '@/shared/f1/constants/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const SessionCardSkeleton = () => {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmer, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.card}>
            {/* session_name */}
            <Animated.View style={[styles.bar, styles.bar_name, { opacity }]} />
            {/* display_date */}
            <Animated.View style={[styles.bar, styles.bar_date, { opacity }]} />
            {/* local_start_time */}
            <Animated.View style={[styles.bar, styles.bar_time, { opacity }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: CARD_THEME,
        margin: 2,
        paddingVertical: 20,
        paddingBottom: 12,
        paddingHorizontal: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#555',
        borderRadius: 5,
    },
    bar: {
        backgroundColor: '#555',
        borderRadius: 3,
    },
    bar_name: {
        height: 22,
        width: '65%',
        marginBottom: 10,
    },
    bar_date: {
        height: 11,
        width: '45%',
        marginBottom: 6,
    },
    bar_time: {
        height: 11,
        width: '35%',
    },
});

export default SessionCardSkeleton;