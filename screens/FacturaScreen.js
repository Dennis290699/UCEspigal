import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { ConsumerContext } from '../context/ConsumerContext';
import { ConsumerCardContext } from '../context/ConsumerCardContext';
import { empleados } from '../constants/empleados';
import { themeColors } from '../theme';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const FacturaScreen = () => {
  const navigation = useNavigation();
  const { cart, resetCart } = useContext(CartContext);
  const { clientData, resetClientData } = useContext(ConsumerContext);
  const { resetCardData } = useContext(ConsumerCardContext);
  const [randomEmployee, setRandomEmployee] = useState({ name: '' });
  const [comprobanteId, setComprobanteId] = useState('');
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  useEffect(() => {
    setRandomEmployee(getRandomEmployee());
    setComprobanteId(generateUniqueId());
  }, []);

  const getRandomEmployee = () => {
    const randomIndex = Math.floor(Math.random() * empleados.length);
    return empleados[randomIndex];
  };

  const generateUniqueId = () => {
    const date = new Date();
    const timestamp = date.getTime(); // Obtiene el número de milisegundos desde el 1 de enero de 1970
    const randomNum = Math.floor(Math.random() * 10000); // Genera un número aleatorio de 4 dígitos
    return `C${timestamp}${randomNum}`; // Combina la fecha y el número aleatorio
  };

  const handleExitPress = async () => {
    setIsGeneratingInvoice(true); // Muestra el modal de carga
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un retraso (opcional, para mostrar el modal de carga)
    resetCart();
    resetClientData();
    resetCardData();
    setIsGeneratingInvoice(false); // Oculta el modal de carga después de limpiar el carrito
    navigation.navigate('Home');
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const renderCartItems = () => {
    return cart.map((item, index) => (
      <View style={styles.productRow} key={index}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productQuantity}>{item.count}</Text>
        </View>
        <Text style={styles.productPrice}>${(item.price * item.count).toFixed(2)}</Text>
      </View>
    ));
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
            {/* <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" /> */}
          </TouchableOpacity>
          <Text style={styles.headerText}>Comprobante</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/profile/Logo.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>UCEspigal</Text>
          <Text style={styles.profileEmail}>Cada mordida, una sonrisa</Text>
        </View>

        <Text style={styles.detailsTitle}>Datos Establecimiento</Text>
        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID Comprobante: </Text>
            <Text style={styles.detailValue}>{comprobanteId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fecha: </Text>
            <Text style={styles.detailValue}>{currentDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Direccion: </Text>
            <Text style={styles.detailValue}>UCE, Quito-Ecuador</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Atendido por: </Text>
            <Text style={styles.detailValue}>{randomEmployee.name}</Text>
          </View>
        </View>

        <Text style={styles.detailsTitle}>Datos Cliente</Text>
        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Número de Cédula: </Text>
            <Text style={styles.detailValue}>{clientData.cedula}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nombre y Apellido: </Text>
            <Text style={styles.detailValue}>{clientData.nombre} {clientData.apellido}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Correo: </Text>
            <Text style={styles.detailValue}>{clientData.correo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Domicilio: </Text>
            <Text style={styles.detailValue}>{clientData.domicilio}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Número de Teléfono: </Text>
            <Text style={styles.detailValue}>{clientData.telefono}</Text>
          </View>
        </View>

        <Text style={styles.detailsTitle}>Detalle de Compra</Text>
        <View style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Producto</Text>
            <Text style={styles.productQuantity}>Cantidad</Text>
          </View>
          <Text style={styles.productPrice}>Precio</Text>
        </View>
        {renderCartItems()}

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>$0</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Imprimir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton} onPress={handleExitPress}>
            <Text style={styles.viewButtonText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isGeneratingInvoice}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={themeColors.primary} />
            <Text style={styles.loadingText}>Gracias por su compra</Text>
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
    backgroundColor: themeColors.primary,
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
    backgroundColor: themeColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  viewButtonText: {
    fontSize: 16,
    color: '#0e141b',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
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

export default FacturaScreen;
