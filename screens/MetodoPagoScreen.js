import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { themeColors } from '../theme'; // Importa los colores de tu tema
import { useNavigation } from '@react-navigation/native';

const MetodoPagoScreen = () => {
  const navigation = useNavigation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePagoEfectivoPress = () => {
    setSelectedPaymentMethod('efectivo');
  };

  const handlePagoTarjetaPress = () => {
    setSelectedPaymentMethod('tarjeta');
  };

  const handleBackPress = () => {
    navigation.navigate('Cart');
  };

  const handleNextPress = () => {
    if (selectedPaymentMethod === 'efectivo') {
      navigation.navigate('DatosCliente');
    } else if (selectedPaymentMethod === 'tarjeta') {
      navigation.navigate('DatosTarjeta');
    } else {
      // Manejar el caso en el que no se ha seleccionado ningún método
      alert('Por favor, seleccione un método de pago.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
            <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Método de Pago</Text>
        <Text style={styles.description}>
          Elija su método de pago favorito puede cambiarlo sin problema
        </Text>

        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={handlePagoEfectivoPress}
          >
            <View style={styles.radioOuter}>
              {selectedPaymentMethod === 'efectivo' && <View style={styles.radioInnerChecked} />}
            </View>
            <Text style={styles.radioLabel}>Pago en Efectivo (En caja)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={handlePagoTarjetaPress}
          >
            <View style={styles.radioOuter}>
              {selectedPaymentMethod === 'tarjeta' && <View style={styles.radioInnerChecked} />}
            </View>
            <Text style={styles.radioLabel}>Pago con tarjeta (Debito / Credito)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleNextPress}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.text,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColors.primary,
    textAlign: 'center',
    paddingVertical: 15,
  },
  description: {
    fontSize: 16,
    color: themeColors.text,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  radioGroup: {
    paddingHorizontal: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeColors.accent,
    marginBottom: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioInnerChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: themeColors.primary,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: themeColors.text,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  button: {
    height: 48,
    borderRadius: 10,
    backgroundColor: themeColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: themeColors.onPrimary,
    fontWeight: 'bold',
  },
});

export default MetodoPagoScreen;
