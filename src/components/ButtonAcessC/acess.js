import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from './styleAcess.js';
import { useNavigation } from '@react-navigation/native';

export default function Acess({ onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Executa a função passada via props
    }
    navigation.navigate('Home'); // Faz a navegação
  };

  return (
    <View>
      <TouchableOpacity style={style.container} onPress={handlePress}>
        <Text style={style.colotxt}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}
