import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../theme';

const WelcomeScreen = ({ navigation }) => {
  const spinValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);

  useEffect(() => {
    // Animación de rotación del logo
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 5500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Animación de aparición del texto
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Navegar automáticamente a HomeScreen después de cierto tiempo
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer); // Limpiar temporizador al desmontar el componente
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View className="bg-white/20 rounded-full p-10">
        <View className="bg-white/20 rounded-full p-8">
          <Animated.Image source={require('../assets/images/profile/Logo.png')} style={[styles.logo, { transform: [{ rotate: spin }] }]} />
        </View>
      </View>

      <View className="flex items-center space-y-2">
        <Animated.Text className="font-bold text-white tracking-widest text-6xl" style={{ marginTop: 20, opacity: fadeValue }}>
          UCEspigal
        </Animated.Text>
        <Animated.Text className="font-medium text-white tracking-widest text-lg" style={{ marginBottom: 20, opacity: fadeValue }}>
        Cada mordida, una sonrisa
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.bgLight,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
