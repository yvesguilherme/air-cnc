import React, { useState } from 'react';
import { Text, AsyncStorage, Alert, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import GlobalStyles from '../globalStyles';

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } });

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  function handleLogout() {
    AsyncStorage.clear();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, styles.container]}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate} />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  label: {
    color: '#444',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderColor: '#ddd',
    borderRadius: 2,
    borderWidth: 1,
    color: '#444',
    fontSize: 16,
    height: 44,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#f05a5b',
    borderRadius: 2,
    height: 42,
    justifyContent: 'center',
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});