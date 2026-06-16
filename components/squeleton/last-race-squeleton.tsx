import { BG_THEME, RED_THEME } from '@/shared/f1/constants/theme';
import { Skeleton } from 'moti/skeleton';
import { StyleSheet, View } from 'react-native';

export const LastRaceSkeleton = () => (
    <View style={styles.main_container}>
        <View style={styles.container}>
            {/* meeting_name */}
            <Skeleton colorMode="dark" width={150} height={18} radius={4} />

            {/* 3 Premiers pilotes */}
            <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between', paddingHorizontal: 25 }}>
                {[1, 2, 3].map((item) => (
                    <View key={item} style={{ flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                        <Skeleton colorMode="dark" width={22} height={16} radius={4} />
                        <Skeleton colorMode="dark" width={60} height={60} radius="round" />
                        <Skeleton colorMode="dark" width={60} height={14} radius={4} />
                    </View>
                ))}
            </View>
        </View>

        {/* Barre Full Results */}
        <View style={styles.full_results_bar}>
            <Skeleton colorMode="dark" width={80} height={14} radius={4} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    main_container: {
        margin: 5,
    },
    container: {
        padding: 25,
        borderRadius: 5,
        borderTopWidth: 5,
        borderTopColor: RED_THEME,
        backgroundColor: "#000",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignContent: 'center',
        paddingVertical: 25,
        gap: 10
    },
    full_results_bar: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: BG_THEME,
        padding: 10,
        justifyContent: 'space-between'
    }
});
