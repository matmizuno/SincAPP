import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Formulario from '../../components/fomulario/Formulario'; 
import Cabecalho from '../../components/CabecalhoLogin/Cabecalho'; 
import ButtonAcess from '../../components/ButtonAcess/acess'; 
import ButtonAcount from '../../components/ButtonAcount/creact'; 


import styles from './styles'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para carregar os dados salvos no AsyncStorage ao iniciar o app
  const loadData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');

      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
      }
    } catch (error) {
      console.error('Erro ao carregar os dados');
    } finally {
      setLoading(false); 
    }
  };

  // Função para salvar os dados no AsyncStorage
  const saveData = async () => {
    try {
      // Verifique se os campos não estão vazios antes de salvar
      if (username && password) {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
      } else {
        console.warn('Preencha ambos os campos');
      }
    } catch (error) {
      console.error('Erro ao salvar dados');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Cabecalho />
      <View style={styles.titleLogin}>
        <Text style={styles.txtTitle}>Faça login em sua conta</Text>
      </View>
      <Formulario
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <View style={styles.containerBtns}>
        <ButtonAcess onPress={saveData} />
        <ButtonAcount />
        
      </View>
    </View>
  );
}
