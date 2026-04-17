import DriversStandingsSimplified from '@/components/driversstandingssimplified';
import LastRace from '@/components/last-race';
import NextRace from '@/components/next-race';
import { DriversStandingsSimplifiedSkeleton } from '@/components/squeleton/driversstandingssimplified-squeleton';
import { LastRaceSkeleton } from '@/components/squeleton/last-race-squeleton';
import { NextRaceSkeleton } from '@/components/squeleton/next-race-squeleton';
import { DriversStandingProps } from '@/model/drivers-standing-model';
import { RaceProps } from '@/model/race-model';
import { SessionResultProps } from '@/model/session-result-model';
import { OpenF1API } from '@/services/openf1api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const logo = require('../../assets/images/F1.png')

type LastRaceProps = {
  race: RaceProps;
  session_result: SessionResultProps[];
}
type LandingDataProps = {
  lastRace: LastRaceProps;
  nextRace: RaceProps;
  standings: DriversStandingProps[];
}

export default function index() {
  const router = useRouter();

  const [landingData, setLandingData] = useState<LandingDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [lastRace, nextRace, standings] = await Promise.all([
          OpenF1API.getLastRace(),
          OpenF1API.getNextRace(),
          OpenF1API.getDriversStanding(),
        ]);
        setLandingData({ lastRace, nextRace, standings });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const races = () => {
    router.push({
      pathname: '/races',
      params: { season: 2026 }

    })
  }
  const driversStanding = () => {
    router.push({
      pathname: '/drivers-standing'
    })
  }
  const constructorsStanding = () => {
    router.push({
      pathname: '/constructors-standing'
    })
  }

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
          }}

        >

          <Text style={styles.mainText}>Next Race</Text>
          {!landingData ? <NextRaceSkeleton /> :
            <NextRace
              {...landingData.nextRace} />}

          <Text style={styles.mainText}>Last Race</Text>
          {!landingData ? <LastRaceSkeleton /> : <LastRace
            {...landingData.lastRace} />}

          <Text style={styles.mainText}>Drivers Standings</Text>
          {!landingData ? <DriversStandingsSimplifiedSkeleton /> : <DriversStandingsSimplified
            standings={landingData.standings} />}
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#15151D",
    gap: 10,
    alignContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  card: {
    backgroundColor: "#000",
    margin: 5,
    padding: 25,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: 'center',
    paddingVertical: 25,
    borderTopWidth: 5,
    borderTopColor: "#C12D14"

  },
  text: {
    fontFamily: "f1-regular",
    fontSize: 20,
    color: "#fff",
  },
  image: {
    width: 200,
    height: 50,

  },
  mainText: {
    fontFamily: "f1-regular",
    fontSize: 13,
    color: "#fc2020ff",
    textTransform: "uppercase"
  },
  scroll: {
    gap: 10,
  }
})