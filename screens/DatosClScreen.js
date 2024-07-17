import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { themeColors } from '../theme'; // Importa los colores de tu tema
import { useNavigation } from '@react-navigation/native';

const DatosClScreen = () => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Pago');
  };

  const [selectedOption, setSelectedOption] = useState('Invoice');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
          <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Datos cliente</Text>
      </View>

      <Text style={styles.title}>Pay with</Text>

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, selectedOption === 'Invoice' && styles.radioOptionSelected]}
          onPress={() => setSelectedOption('Invoice')}
        >
          <Text style={styles.radioText}>Invoice</Text>
          <View style={styles.radioCircle}>
            {selectedOption === 'Invoice' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioOption, selectedOption === 'Final Consumer' && styles.radioOptionSelected]}
          onPress={() => setSelectedOption('Final Consumer')}
        >
          <Text style={styles.radioText}>Final Consumer</Text>
          <View style={styles.radioCircle}>
            {selectedOption === 'Final Consumer' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>
      </View>

      {selectedOption === 'Invoice' && (
        <>
          <TextInput style={styles.input} placeholder="ID number" />
          <TextInput style={styles.input} placeholder="Names" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Address" />
          <TextInput style={styles.input} placeholder="Phone number" />
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>Generate Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonTextPrimary}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  title: {
    color: themeColors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dce0e5',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  radioOptionSelected: {
    borderColor: '#111418',
  },
  radioText: {
    color: themeColors.text,
    fontSize: 16,
    flex: 1,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dce0e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111418',
  },
  input: {
    height: 50,
    backgroundColor: '#f0f2f4',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonPrimary: {
    backgroundColor: '#1980e6',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#f0f2f4',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#111418',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DatosClScreen;