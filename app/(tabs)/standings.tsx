import ConstructorsStandings from '@/components/constructors-standing'
import DriversStandings from '@/components/drivers-standing'
import { BG_THEME } from '@/constants/theme'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const TABS = [
    { key: 'drivers', label: 'Drivers' },
    { key: 'constructors', label: 'Constructors' },
];

const Standings = () => {
    const [activeTab, setActiveTab] = useState('drivers');
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.tabBar}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={styles.tab}
                                onPress={() => setActiveTab(tab.key)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                    {tab.label}
                                </Text>
                                {isActive && <View style={styles.indicator} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.content}>
                    {activeTab === 'drivers' ? (
                        <DriversStandings />
                    ) : (
                        <ConstructorsStandings />
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Standings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_THEME

    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#333',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#888',
    },
    tabLabelActive: {
        color: '#fff',
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        left: '15%',
        right: '15%',
        height: 2,
        backgroundColor: '#E10600',
        borderRadius: 1,
    },
    content: {
        flex: 1,
    },
})