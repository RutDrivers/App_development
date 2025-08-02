import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Viaje en curso</Text>
      <Text style={styles.subtitle}>Aquí se mostrará el mapa y la información del conductor.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 40,
  },
});
