
import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Formulario from '../fomulario/Formulario'
import styles from './styles';

export default function Cabecalho(){
  return(
   <View style={styles.container}>
     <Image
        source={require('../../assets/image/iconLogin.png')} 
        style={styles.image}
        resizeMode="contain"
      />
   </View>
  )
}