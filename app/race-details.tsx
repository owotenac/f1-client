import SessionCard from '@/components/session-card';
import SessionCardSqueleton from '@/components/squeleton/session-card-squeleton';
import { BG_THEME } from '@/constants/theme';
import { useAppStore } from '@/model/filter';
import { SessionProps } from '@/shared/f1/models/session-model';
import { OpenF1API } from '@/shared/f1/services/openf1api';
import { Hash, Ruler, RulerDimensionLine, Spline, Timer } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RaceDetails() {
  const [loading, setLoading] = useState(true);
  const { currentRace } = useAppStore();
  const [sessions, setSessions] = useState<SessionProps[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const result = await OpenF1API.getSessions(currentRace);
        setSessions(result);
      } catch (error) {
        console.error('Error fetching races:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sessions.length === 0) fetchSessions();
  }, []);

  const sessionPairs = sessions.reduce<SessionProps[][]>((acc, _, i) => {
    if (i % 2 === 0) acc.push(sessions.slice(i, i + 2));
    return acc;
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.border}>
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 5, gap: 10, alignItems: 'center' }}>
            <Image style={styles.flag} source={{ uri: currentRace.country_flag }} />
            <Text style={styles.main_text_race} >{currentRace.meeting_name}</Text>
          </View>
          {/* <Text style={styles.meeting_official_name}>{currentRace.meeting_official_name}</Text> */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.grid}>
              {[...Array(3)].map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {[...Array(2)].map((_, i) => (
                    <View key={i} style={styles.cell}>
                      <SessionCardSqueleton />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.grid}>
              {sessionPairs.map((pair, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {pair.map((session, i) => (
                    <View key={i} style={styles.cell}>
                      <SessionCard {...session} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* <View style={styles.circuit_info_box}>
            <Text style={styles.main_text_country}>Fastest Lap:</Text>
            <Text style={styles.main_text_country}>{currentRace.fastest_lap.driver}</Text>
            <Text style={styles.main_text_country}>{currentRace.fastest_lap.time}</Text>
            <Text style={styles.main_text_country}>{currentRace.fastest_lap.year}</Text>
          </View> */}
          <View style={styles.circuitContainer}>
            <Image
              style={styles.image}
              source={{ uri: currentRace.pictureURL }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.circuitInfoContainer}>
            <View style={styles.statsRow}>
              <View style={styles.circuit_info_box}>
                <Ruler strokeWidth={1} color="white" />
                <View >
                  <Text style={styles.text_info}>{currentRace.circuit_length_km}</Text>
                  <Text style={styles.main_text_circuit_info}>Circuit Length (km)</Text>
                </View>
              </View>
              <View style={styles.circuit_info_box}>
                <Hash strokeWidth={1} color="white" />
                <View>
                  <Text style={styles.text_info}>{currentRace.number_of_laps}</Text>
                  <Text style={styles.main_text_circuit_info}>Number of Laps</Text>
                </View>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.circuit_info_box}>
                <RulerDimensionLine strokeWidth={1} color="white" />
                <View>
                  <Text style={styles.text_info}>{currentRace.race_distance_km}</Text>
                  <Text style={styles.main_text_circuit_info}>Race Distance (km)</Text>
                </View>
              </View>
              <View style={styles.circuit_info_box}>
                <Spline strokeWidth={1} color="white" />
                <View>
                  <Text style={styles.text_info}>{currentRace.number_of_corners}</Text>
                  <Text style={styles.main_text_circuit_info}>Number of Corners</Text>
                </View>
              </View>
            </View>

            {currentRace.fastest_lap?.time && (
              <View style={styles.circuit_info_box}>
                <Timer strokeWidth={1} color="white" />
                <View>
                  <Text style={styles.fastest_lap_label}>Fastest Lap</Text>
                  <Text style={styles.fastest_lap_time}>{currentRace.fastest_lap.time}</Text>
                  <Text style={styles.fastest_lap_driver}>
                    {currentRace.fastest_lap.driver} · {currentRace.fastest_lap.year}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_THEME,
    padding: 5,
  },
  border: {
    backgroundColor: BG_THEME,
    padding: 5,
    gap: 10,
    marginBottom: 10,
    width: '100%'
  },
  scrollContent: {
    paddingVertical: 20,
    gap: 20,
  },
  grid: {
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  cell: {
    flex: 1,
  },
  main_text_race: {
    flex: 1,
    color: '#fff',
    fontSize: 25,
    fontFamily: 'f1-regular',
  },
  meeting_official_name: {
    color: '#b9b9b9ff',
    fontSize: 12,
    fontFamily: 'f1-regular',
    textAlign: 'center',
  },
  text_info: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'f1-regular',
    //textAlign: 'center',
  },
  circuitContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#645e5cff',
    backgroundColor: '#222222ff',
    width: '100%',
    aspectRatio: 2 / 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  circuitInfoContainer: {
    gap: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  circuit_info_box: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#5c170bff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
    //height: 60,
    //justifyContent: 'space-between',
  },
  fastest_lap_label: {
    color: '#dfdfdfff',
    fontSize: 12,
    fontFamily: 'f1-regular',
    //textAlign: 'center',
  },
  fastest_lap_time: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'f1-regular',
    //textAlign: 'center',
  },
  fastest_lap_driver: {
    color: '#dfdfdfff',
    fontSize: 12,
    //fontFamily: 'f1-regular',
    //textAlign: 'center',
  },
  main_text_circuit_info: {
    color: '#dfdfdfff',
    fontSize: 12,
    //fontFamily: 'f1-regular',
    //textAlign: 'center',
  },
  flag: {
    width: 50,
    height: 30
  }
});