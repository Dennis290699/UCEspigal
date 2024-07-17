import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatosTarjetaScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#1C160C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Credit or Debit Card</Text>
          <View style={styles.inputWrapper}>
            <Icon name="credit-card" size={20} color="#A18249" style={styles.icon} />
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
              <Icon name="calendar" size={20} color="#A18249" style={styles.icon} />
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
              <Icon name="lock" size={20} color="#A18249" style={styles.icon} />
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
            <Icon name="user" size={20} color="#A18249" style={styles.icon} />
            <TextInput
              placeholder="Name on card"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add payment method</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C160C',
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
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
    backgroundColor: '#019863',
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
