import Header from '@/components/header';
import RaceCard from '@/components/race-card';
import { BG_THEME } from '@/constants/theme';
import { RaceProps } from '@/model/race-model';
import { OpenF1API } from '@/services/openf1api';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Races() {

  const local = useLocalSearchParams();
  const season = local.season as string;

  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState<RaceProps[]>([])

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const result = await OpenF1API.getRaces('2026');
        setRaces(result);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching races:", error);
        setLoading(false); // Don't forget to stop loading on error!
      }
    };

    if (races.length === 0) {
      fetchRaces();
    }
  }, []);


  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="Races Schedule" />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 5, padding: 15 }}>
          {loading &&
            <ActivityIndicator size="large" />
          }
          {races.map((d, index) => (
            <RaceCard key={index} {...d} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: BG_THEME

  }
})