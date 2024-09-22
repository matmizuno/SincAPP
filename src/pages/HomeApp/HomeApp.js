// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import CabecalhoHome from '../../components/CabecalhoHome/index';

const { height } = Dimensions.get('window');

export default function HomeApp() {
  const [username, setUsername] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [saldoUSD, setSaldoUSD] = useState(0);
  const [saldoEUR, setSaldoEUR] = useState(0);
  const [saldoBTC, setSaldoBTC] = useState(0);
  const [moedas, setMoedas] = useState([]);

  const loadUsername = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    } catch (error) {
      console.error('Erro ao carregar o nome de usuário');
    }
  };

  const initializeSaldos = async () => {
    const initialSaldos = {
      saldo: 10,
      saldoUSD: 10,
      saldoEUR: 10,
      saldoBTC: 0,
    };

    try {
      await AsyncStorage.setItem('saldo', initialSaldos.saldo.toString());
      await AsyncStorage.setItem('saldoUSD', initialSaldos.saldoUSD.toString());
      await AsyncStorage.setItem('saldoEUR', initialSaldos.saldoEUR.toString());
      await AsyncStorage.setItem('saldoBTC', initialSaldos.saldoBTC.toString());
    } catch (error) {
      console.error('Erro ao inicializar os saldos', error);
    }
  };

  const loadSaldos = async () => {
    try {
      const savedSaldo = await AsyncStorage.getItem('saldo');
      const savedSaldoUSD = await AsyncStorage.getItem('saldoUSD');
      const savedSaldoEUR = await AsyncStorage.getItem('saldoEUR');
      const savedSaldoBTC = await AsyncStorage.getItem('saldoBTC');

      setSaldo(savedSaldo ? parseFloat(savedSaldo) : 0);
      setSaldoUSD(savedSaldoUSD ? parseFloat(savedSaldoUSD) : 0);
      setSaldoEUR(savedSaldoEUR ? parseFloat(savedSaldoEUR) : 0);
      setSaldoBTC(savedSaldoBTC ? parseFloat(savedSaldoBTC) : 0);
    } catch (error) {
      console.error('Erro ao carregar os saldos', error);
    }
  };

  const fetchMoedas = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
      const data = await response.json();
      setMoedas([
        { nome: 'Dólar', valor: parseFloat(data.USDBRL.bid), tipo: 'USD' },
        { nome: 'Euro', valor: parseFloat(data.EURBRL.bid), tipo: 'EUR' },
        { nome: 'Bitcoin', valor: parseFloat(data.BTCBRL.bid), tipo: 'BTC' },
      ]);
    } catch (error) {
      console.error('Erro ao carregar os valores das moedas', error);
    }
  };

  const atualizarSaldos = async (tipoMoeda, operacao) => {
    let novoSaldo;
    
    switch (tipoMoeda) {
      case 'USD':
        novoSaldo = operacao === 'compra' ? saldoUSD + 1 : saldoUSD - 1;
        setSaldoUSD(novoSaldo);
        await AsyncStorage.setItem('saldoUSD', novoSaldo.toString());
        break;
      case 'EUR':
        novoSaldo = operacao === 'compra' ? saldoEUR + 1 : saldoEUR - 1;
        setSaldoEUR(novoSaldo);
        await AsyncStorage.setItem('saldoEUR', novoSaldo.toString());
        break;
      case 'BTC':
        novoSaldo = operacao === 'compra' ? saldoBTC + 1 : saldoBTC - 1;
        setSaldoBTC(novoSaldo);
        await AsyncStorage.setItem('saldoBTC', novoSaldo.toString());
        break;
      default:
        break;
    }
  };

  const comprarMoeda = async (tipoMoeda, valorMoeda) => {
    if (saldo >= valorMoeda) {
      await atualizarSaldos(tipoMoeda, 'compra');
      const novoSaldo = saldo - valorMoeda;
      setSaldo(novoSaldo);
      await AsyncStorage.setItem('saldo', novoSaldo.toString());
      Alert.alert('Compra realizada', `Você comprou 1 unidade de ${tipoMoeda}.`);
    } else {
      Alert.alert('Saldo insuficiente', `Você não tem saldo suficiente para comprar ${tipoMoeda}.`);
    }
  };

  const venderMoeda = async (tipoMoeda, valorMoeda) => {
    const saldos = { USD: saldoUSD, EUR: saldoEUR, BTC: saldoBTC };
    if (saldos[tipoMoeda] > 0) {
      await atualizarSaldos(tipoMoeda, 'venda');
      const novoSaldo = saldo + valorMoeda;
      setSaldo(novoSaldo);
      await AsyncStorage.setItem('saldo', novoSaldo.toString());
      Alert.alert('Venda realizada', `Você vendeu 1 unidade de ${tipoMoeda}.`);
    } else {
      Alert.alert('Saldo insuficiente', `Você não tem ${tipoMoeda} suficiente para vender.`);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      await loadUsername();
      await loadSaldos();

      // Verifica se os saldos estão zerados e inicializa se necessário
      const savedSaldo = await AsyncStorage.getItem('saldo');
      if (!savedSaldo) {
        await initializeSaldos(); // Inicializa saldos se não estiverem definidos
        await loadSaldos(); // Recarrega os saldos após a inicialização
      }
    };

    initializeApp();
    fetchMoedas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.nomeMoeda}>{item.nome}</Text>
      <Text style={styles.valorMoeda}>R$ {item.valor}</Text>
      <TouchableOpacity
        style={styles.botaoCompra}
        onPress={() => comprarMoeda(item.tipo, item.valor)}
      >
        <Text style={styles.textoBotao}>Comprar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoVenda}
        onPress={() => venderMoeda(item.tipo, item.valor)}
      >
        <Text style={styles.textoBotao}>Vender</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={style.tudo}>
      <CabecalhoHome />
      <View style={style.container}>
        <Text style={style.title}>Olá, {username}</Text>
        <View style={style.retan}>
          <View style={style.saldo}>
            <Text style={style.txtSaldo}>Saldo Total:</Text>
            <Text style={style.txtSaldo}>R$ {saldo.toFixed(2)}</Text>
          </View>
          <View style={styles.moedasSContainer}>
            <Text style={style.txtSaldo}>Outras Moedas:</Text>
            <Text style={style.txtSaldo}>USD: {saldoUSD.toFixed(2)}</Text>
            <Text style={style.txtSaldo}>EUR: {saldoEUR.toFixed(2)}</Text>
            <Text style={style.txtSaldo}>BTC: {saldoBTC.toFixed(5)}</Text>
          </View>
        </View>
      </View>
      <View name="API" style={styles.apiContainer}>
        <FlatList
          data={moedas}
          renderItem={renderItem}
          keyExtractor={(item) => item.nome}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          pagingEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  apiContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  carouselItem: {
    backgroundColor: '#E3E3E3',
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    width: 200,
    elevation: 5,
  },
  nomeMoeda: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#242424"
  },
  valorMoeda: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  botaoCompra: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 5,
  },
  botaoVenda: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  moedasSContainer: {
    padding: 10,
  },
});
