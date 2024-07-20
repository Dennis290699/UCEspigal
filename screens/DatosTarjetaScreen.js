import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme'; // Importa los colores de tu tema
import { ArrowLeftIcon, CreditCardIcon, CalendarDaysIcon, LockClosedIcon, UserCircleIcon } from 'react-native-heroicons/outline';

const DatosTarjetaScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Pago');
  };

  const handleFacturaTarjetaPress = () => {
    navigation.navigate('Facturatarjeta');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
          <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Datos cliente</Text>
      </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Credit or Debit Card</Text>
          <View style={styles.inputWrapper}>
            <CreditCardIcon name="credit-card" size={20} color="#A18249" style={styles.icon} />
            <TextInput
              placeholder="Card number"
              style={styles.input}
              keyboardType="numeric"
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
              />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name on card</Text>
          <View style={styles.inputWrapper}>
            <UserCircleIcon name="user" size={20} color="#A18249" style={styles.icon} />
            <TextInput
              placeholder="Name on card"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleFacturaTarjetaPress}>
            <Text style={styles.addButtonText}>Confirmar Pago</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
});

export default DatosTarjetaScreen;
