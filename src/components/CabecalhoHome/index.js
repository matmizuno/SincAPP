// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


export default function CabecalhoHome(){
  const navigation = useNavigation();
  
  return(
    
    <View style={styles.container}>
      <View></View>
      <TouchableOpacity onPress={() => navigation.navigate('UserApp')}>
      <Icon name="user" size={30} color="#000" style={styles.userIcon} />
      </TouchableOpacity>
     

    </View>
  )
}