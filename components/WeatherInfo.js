import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default (WeatherInfo = ({ content }) => {
  return <Text style={styles.weatherInfo}>{content}</Text>;
});

const styles = StyleSheet.create({
  weatherInfo: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    color: '#0691DD',
    textAlign: 'center'
  }
});
