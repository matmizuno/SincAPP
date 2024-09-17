// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Formulario from '../../components/fomulario/Formulario'
import Cabecalho from '../../components/CabecalhoLogin/Cabecalho'
import ButtonAcess from '../../components/ButtonAcess/acess'
import ButtonAcount from '../../components/ButtonAcount/creact'
import styles from './style';

export default function ACount(){
  return(
    <View style={styles.container}>
      <Cabecalho/>
      <View style={styles.titleLogin}>
      <Text style={styles.txtTitle}>Olá, Seja Bem vindo</Text>
      </View>
      <Formulario/>
      <View style={styles.containerBtns}>
      <ButtonAcess/>
      <ButtonAcount/>
      </View>
  
     
     
    </View>
  )
}