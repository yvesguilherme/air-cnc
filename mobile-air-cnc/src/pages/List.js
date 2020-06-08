import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, Alert, Platform, StatusBar } from 'react-native';

// Estilos CSS globais da aplicação
import GlobalStyles from '../globalStyles';

// Componentes
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.12:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} na data ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, styles.container]}>
      <Image source={logo} style={styles.logo} />

      <ScrollView>
        {/* For para criar um componente SpotList para cada tecnologia */}
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },

  logo: {
    alignSelf: 'center',
    height: 32,
    marginTop: 10,
    resizeMode: 'contain'
  },
});