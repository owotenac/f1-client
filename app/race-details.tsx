import SessionCard from '@/components/session-card';
import { useAppStore } from '@/model/filter';
import { SessionProps } from '@/model/session-model';
import { OpenF1API } from '@/services/openf1api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RaceDetails() {

  const [loading, setLoading] = useState(true);
  const { currentRace } = useAppStore();
  const [sessions, setSessions] = useState<SessionProps[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const result = await OpenF1API.getSessions(currentRace);
        setSessions(result)
        setLoading(false);

      } catch (error) {
        console.error("Error fetching races:", error);
        setLoading(false); // Don't forget to stop loading on error!
      }
    };

    if (sessions.length === 0) {
      fetchSessions();
    }
  }, []);


  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.border}>
          <Text style={styles.main_text_race}>{currentRace.meeting_official_name}</Text>
          <Text style={styles.main_text_country}>{currentRace.country_name}</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ):
        (
          <View style={styles.content}>
          <FlatList style={styles.list}
            data={sessions}
            numColumns={2}
            renderItem={
              ({ item }) => (
                <SessionCard
                  {...item}
                />
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
                    </View>

          )
        }
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#222222ff"
  },
  content: {
    flex: 1, 
    marginTop: 50,
    alignItems: 'center',

  },
  main_text_race: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "f1-regular",
    textAlign: 'center'
  },
  main_text_country: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "f1-regular",
    textAlign: 'center'
  },
  border: {
    borderTopWidth: 5,
    borderTopColor: "#C12D14",
    backgroundColor: "#222222ff",
    padding: 5
  },
  list :{
    flex:1, 
    gap: 10
  }
})