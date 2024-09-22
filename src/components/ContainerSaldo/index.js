// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from './style'

import CabecalhoHome from '../../components/CabecalhoHome/index';


export default function ContainerSaldo(){
  return(
    <View style={style.container}>
      <View style={style.retan}>
        <Text>Olá, Matheus</Text>
        <View>
        <Text>Saldo Total</Text>
        <Text>R$ 99999</Text>
        <View>
            <Text>Outras Moedas:</Text>
            <Text>EUE</Text>
            <Text>$</Text>
            <Text>JPY</Text>
        </View>

        </View>

      </View>
     

    </View>
  )
}