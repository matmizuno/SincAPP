import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Brasil'); // Default value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPhone = await AsyncStorage.getItem('phone');
        const savedCountry = await AsyncStorage.getItem('country');

        if (savedUsername) {
          setUsername(savedUsername);
        }
        if (savedEmail) {
          setEmail(savedEmail);
        }
        if (savedPhone) {
          setPhone(savedPhone);
        }
        if (savedCountry) {
          setCountry(savedCountry);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados');
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('country', country);
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.username}>Nome de Usuário: {username}</Text>
      
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Digite seu email"
      />
      
      <Text style={styles.label}>Telefone:</Text>
      <TextInput 
        style={styles.input} 
        value={phone} 
        onChangeText={setPhone} 
        placeholder="Digite seu telefone"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>País de Origem:</Text>
      <Picker
        selectedValue={country}
        onValueChange={(itemValue) => setCountry(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Brasil" value="Brasil" />
        <Picker.Item label="Portugal" value="Portugal" />
        <Picker.Item label="Estados Unidos" value="EUA" />
        <Picker.Item label="Argentina" value="Argentina" />
        <Picker.Item label="França" value="França" />
        {/* Adicione mais países conforme necessário */}
      </Picker>

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
});

export default UserProfile;
