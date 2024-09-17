// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Timeout de 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navega para a tela Home após o timeout
    }, 2000);

    // Limpa o timeout se o componente for desmontado
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/iconHome.png')} // Caminho para sua imagem
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
