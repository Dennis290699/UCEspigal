import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FacturaScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.iconText}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invoice</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/profile/Logo.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>UCEspigal</Text>
          <Text style={styles.profileEmail}>Cada mordida, una sonrisa</Text>
        </View>

        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order number</Text>
            <Text style={styles.detailValue}>8DIU0K</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Date</Text>
            <Text style={styles.detailValue}>22/07/22</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Address</Text>
            <Text style={styles.detailValue}>600 Montgomery St, San Francisco</Text>
          </View>
        </View>

        <Text style={styles.detailsTitle}>Details</Text>

        <View style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Product</Text>
            <Text style={styles.productQuantity}>Quantity</Text>
          </View>
          <Text style={styles.productPrice}>Price</Text>
        </View>
        <View style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>The Row Marnie Dress</Text>
            <Text style={styles.productQuantity}>1</Text>
          </View>
          <Text style={styles.productPrice}>$928.02</Text>
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>$928.02</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>$0</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$928.02</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View in Browser</Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 24,
    color: '#0e141b',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0e141b',
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0e141b',
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 16,
    color: '#4e7397',
    textAlign: 'center',
  },
  detailSection: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#0e141b',
  },
  detailValue: {
    fontSize: 16,
    color: '#0e141b',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0e141b',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0e141b',
  },
  productQuantity: {
    fontSize: 14,
    color: '#4e7397',
  },
  productPrice: {
    fontSize: 16,
    color: '#0e141b',
  },
  totalSection: {
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#0e141b',
  },
  totalValue: {
    fontSize: 16,
    color: '#0e141b',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  payButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1980e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  payButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  viewButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e7edf3',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  viewButtonText: {
    fontSize: 16,
    color: '#0e141b',
    fontWeight: 'bold',
  },
});

export default FacturaScreen;
