import RaceCard from '@/components/race-card';
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
        const result = await OpenF1API.getRaces(season);
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
        <ScrollView>
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
    padding: 20,
    backgroundColor: "#222222ff"

  }
})