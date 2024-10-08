import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { ArrowLeftIcon, CreditCardIcon, CalendarDaysIcon, LockClosedIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { ConsumerCardContext } from '../context/ConsumerCardContext';

const DatosTarjetaScreen = () => {
  const navigation = useNavigation();
  const { cardData, setCardData } = useContext(ConsumerCardContext);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  useEffect(() => {
    // Verifica si todos los campos están llenos
    const { cardNumber, expirationDate, cvc, cardHolderName } = cardData;
    const isFilled = cardNumber && expirationDate && cvc && cardHolderName;
    setIsButtonEnabled(isFilled);
  }, [cardData]);

  const handleBackPress = () => {
    navigation.navigate('Pago');
  };

  const handleFacturaTarjetaPress = () => {
    setIsGeneratingInvoice(true);
    setTimeout(() => {
      setIsGeneratingInvoice(false);
      navigation.navigate('Facturatarjeta');
    }, 3000);
  };

  // Función para formatear el texto en el campo MM/YY
  const formatExpirationDate = (text) => {
    // Elimina caracteres no numéricos
    const cleaned = text.replace(/\D/g, '');

    // Agrega el formato MM/YY
    if (cleaned.length <= 2) {
      return cleaned;
    }
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
            <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Datos tarjeta</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tarjeta de Crédito o Débito</Text>
          <View style={styles.inputWrapper}>
            <CreditCardIcon name="credit-card" size={20} color="#A18249" style={styles.icon} />
            <TextInput
              placeholder="Número de tarjeta"
              style={styles.input}
              keyboardType="numeric"
              maxLength={16}
              value={cardData.cardNumber}
              onChangeText={(text) => setCardData({ ...cardData, cardNumber: text })}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>MM/YY</Text>
            <View style={styles.inputWrapper}>
              <CalendarDaysIcon name="calendar" size={20} color="#A18249" style={styles.icon} />
              <TextInput
                placeholder="MM/YY"
                style={styles.input}
                keyboardType="numeric"
                maxLength={5}
                value={formatExpirationDate(cardData.expirationDate)}
                onChangeText={(text) => setCardData({ ...cardData, expirationDate: text })}
              />
            </View>
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>CVC</Text>
            <View style={styles.inputWrapper}>
              <LockClosedIcon name="lock" size={20} color="#A18249" style={styles.icon} />
              <TextInput
                placeholder="CVC"
                style={styles.input}
                keyboardType="numeric"
                maxLength={4}
                value={cardData.cvc}
                onChangeText={(text) => setCardData({ ...cardData, cvc: text })}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre en la tarjeta</Text>
          <View style={styles.inputWrapper}>
            <UserCircleIcon name="user" size={20} color="#A18249" style={styles.icon} />
            <TextInput
              placeholder="Nombre en la tarjeta"
              style={styles.input}
              value={cardData.cardHolderName}
              onChangeText={(text) => setCardData({ ...cardData, cardHolderName: text })}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: isButtonEnabled ? themeColors.primary : '#d3d3d3' }]} // Cambia el color del botón según si está habilitado
            onPress={handleFacturaTarjetaPress}
            disabled={!isButtonEnabled} // Desactiva el botón si no está habilitado
          >
            <Text style={styles.addButtonText}>Confirmar Pago</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isGeneratingInvoice}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={themeColors.primary} />
            <Text style={styles.loadingText}>Generando Comprobante...</Text>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 20,
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
  inputContainer: {
    maxWidth: 480,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainerHalf: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C160C',
    paddingBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E9DFCE',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 15,
    color: '#1C160C',
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 15,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButton: {
    width: '100%',
    maxWidth: 480,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default DatosTarjetaScreen;
