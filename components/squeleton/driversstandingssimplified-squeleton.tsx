import { BG_THEME, RED_THEME } from '@/constants/theme';
import { Skeleton } from 'moti/skeleton';
import { StyleSheet, View } from 'react-native';

export const DriversStandingsSimplifiedSkeleton = () => {
    return (
        <View style={styles.main_container}>
            <View style={styles.container}>
                {[1, 2, 3].map((item) => (
                    <View style={styles.row} key={item}>
                        <View style={styles.position}>
                            <Skeleton colorMode="dark" width={20} height={16} radius={4} />
                        </View>
                        <View style={styles.head}>
                            <Skeleton colorMode="dark" width={30} height={30} radius="round" />
                        </View>
                        <View style={styles.driver}>
                            <Skeleton colorMode="dark" width={80} height={16} radius={4} />
                        </View>
                        <View style={styles.points}>
                            <Skeleton colorMode="dark" width={30} height={16} radius={4} />
                        </View>
                    </View>
                ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 10, backgroundColor: BG_THEME, padding: 10, justifyContent: 'space-between' }}>
                <Skeleton colorMode="dark" width={80} height={14} radius={4} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main_container: {
        margin: 5,
    },
    container: {
        backgroundColor: BG_THEME,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 0.5,
        borderColor: RED_THEME,
        padding: 10,
        borderBottomColor: BG_THEME,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#333',
    },
    position: {
        width: 40,
        alignItems: 'center',
    },
    head: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    driver: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    points: {
        width: 40,
        alignItems: 'center',
    },
});
