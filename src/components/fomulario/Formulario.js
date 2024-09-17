import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';

export default function Formulario({ username, password, setUsername, setPassword }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleInput}>Nome de usuário</Text>
      <TextInput
        placeholder='Insira seu nome de usuário'
        style={styles.inputs}
        value={username} // O valor inicial vem do AsyncStorage, se houver
        onChangeText={setUsername} // Atualiza o estado no componente pai (Login.js)
      />
      <Text style={styles.titleInput}>Senha</Text>
      <TextInput
        style={styles.inputs}
        placeholder='Insira sua senha'
        value={password} // O valor inicial vem do AsyncStorage, se houver
        onChangeText={setPassword} // Atualiza o estado no componente pai (Login.js)
        secureTextEntry={true} // Para esconder a senha
      />
    </View>
  );
}
