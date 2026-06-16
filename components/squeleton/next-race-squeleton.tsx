import { BG_THEME, RED_THEME } from '@/shared/f1/constants/theme';
import { Skeleton } from 'moti/skeleton';
import { StyleSheet, View } from 'react-native';

export const NextRaceSkeleton = () => (
    <View style={styles.main_container}>
        {/* Container principal — même border/bg que le vrai */}
        <View style={styles.container}>
            {/* meeting_name */}
            <Skeleton colorMode="dark" width={220} height={22} radius={4} />

            {/* flag + country_name */}
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Skeleton colorMode="dark" width={30} height={20} radius={3} />
                <Skeleton colorMode="dark" width={120} height={22} radius={4} />
            </View>

            {/* display_date */}
            <Skeleton colorMode="dark" width={140} height={16} radius={4} />

            {/* countdown timeLeft */}
            <Skeleton colorMode="dark" width={180} height={16} radius={4} />
        </View>

        {/* Barre Race Schedule */}
        <View style={styles.schedule_bar}>
            <Skeleton colorMode="dark" width={100} height={14} radius={4} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    main_container: {
        margin: 5,
    },
    container: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 0.5,
        borderColor: RED_THEME,
        padding: 25,
        paddingVertical: 25,
        gap: 10,
    },
    schedule_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: BG_THEME,
        padding: 10,
    },
});