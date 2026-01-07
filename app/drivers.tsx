import DriverCard from '@/components/driver-card';
import { DriverProps } from '@/model/driver-model';
import { OpenF1API } from '@/services/openf1api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Drivers() {

  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState<DriverProps[]>([])

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const result = await OpenF1API.getDrivers();
        setDrivers(result);

        setLoading(false);

      } catch (error) {
        console.error("Error fetching team:", error);
      }

    };

    if (drivers.length == 0)
      fetchDrivers();
  }, []);


  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {loading &&
            <ActivityIndicator size="large" />
          }
          {drivers.map((d, index) => (
            <DriverCard key={index} {...d} />
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
    backgroundColor: "#15151D"

  }
})