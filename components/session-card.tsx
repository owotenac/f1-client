import { CARD_THEME, RED_THEME } from '@/constants/theme';
import { useAppStore } from '@/model/filter';
import { SessionProps } from '@/shared/f1/models/session-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SessionCard = (session: SessionProps) => {
  const { setCurrentSession } = useAppStore();
  const router = useRouter();

  const select = (p: SessionProps) => {
    setCurrentSession(p);
    router.push({ pathname: '/race-results' });
  };

  return (
    <TouchableOpacity
      style={[styles.card, session.session_results_available && styles.card_active]}
      onPress={() => select(session)}
      disabled={!session.session_results_available}
    >
      <Text style={[styles.text_session_name, session.session_results_available && styles.text_session_name_active]}>
        {session.session_name}
      </Text>
      <Text style={styles.text_date}>{session.display_date}</Text>
      <Text style={styles.text_date}>{session.local_start_time}</Text>
      {session.session_results_available && (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: CARD_THEME,  // toujours le même fond
    margin: 2,
    paddingVertical: 8,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#555",  // gris par défaut
    borderRadius: 5
  },
  card_active: {
    borderLeftColor: RED_THEME,  // seul changement visuel
  },
  text_session_name: {
    color: "#bbbbbb",  // gris par défaut
    fontSize: 20,
    //fontFamily: "f1-regular",
  },
  text_session_name_active: {
    color: "#fff" //RED_THEME,  
  },
  text_date: {
    paddingTop: 10,
    //fontFamily: "f1-regular",
    fontSize: 12,
    color: "#bbbbbb",
  },
  chevron: {
    position: 'absolute',
    right: 12,
    bottom: 10,
    color: RED_THEME,
    fontSize: 22,
  },
});

export default SessionCard