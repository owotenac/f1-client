import Header from '@/components/header';
import { useAppStore } from '@/model/filter';
import RaceCard from '@/shared/f1/components/race-card';
import { CURRENT_SEASON } from '@/shared/f1/constants/config';
import { BG_THEME } from '@/shared/f1/constants/theme';
import { RaceProps } from '@/shared/f1/models/race-model';
import { OpenF1API } from '@/shared/f1/services/openf1api';
import { showToast } from '@/shared/components/toaster';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Races() {

  const { setCurrentRace } = useAppStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState<RaceProps[]>([])

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const result = await OpenF1API.getRaces(CURRENT_SEASON);
        setRaces(result);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching races:", error);
        showToast('Failed to load races. Please try again later.', 'error');
        setLoading(false);
      }
    };

    if (races.length === 0) {
      fetchRaces();
    }
  }, []);


  const select = (p: RaceProps) => {
    setCurrentRace(p)
    router.push({
      pathname: '/race-details'
    })
  }
  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="Races Schedule" />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 5, padding: 15 }}>
          {loading &&
            <ActivityIndicator size="large" />
          }
          {races.map((d, index) => (
            <TouchableOpacity key={index} onPress={() => select(d)}>
              <RaceCard {...d} />
            </TouchableOpacity>
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