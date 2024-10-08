import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { ArrowLeftIcon, DocumentIcon, DocumentTextIcon, IdentificationIcon, UserIcon, EnvelopeIcon, HomeIcon, DevicePhoneMobileIcon } from 'react-native-heroicons/outline';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { ConsumerContext } from '../context/ConsumerContext';

const VALID_PROVINCE_CODES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

const DatosClScreen = () => {
  const navigation = useNavigation();
  const { clientData, setClientData } = useContext(ConsumerContext);
  const [selectedOption, setSelectedOption] = useState('Invoice');
  const [modalVisible, setModalVisible] = useState(false);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [cedulaError, setCedulaError] = useState('');

  useEffect(() => {
    checkFormCompletion();
  }, [clientData, termsAccepted, selectedOption]);

  const handleBackPress = () => {
    navigation.navigate('Pago');
  };

  const checkFormCompletion = () => {
    if (selectedOption === 'Final Consumer') {
      // No se requiere validación de formulario para "Consumidor Final"
      setIsFormComplete(termsAccepted);
    } else {
      // Validación estricta para "Invoice"
      const { cedula, nombre, correo, domicilio, telefono } = clientData;
      const allFieldsFilled = cedula && nombre && correo && domicilio && telefono;
      const isCedulaValid = cedulaError === '';
      setIsFormComplete(allFieldsFilled && isCedulaValid && termsAccepted);
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setModalVisible(false);
  };

  const handleGenerateComprobantePress = () => {
    setIsGeneratingInvoice(true);
    setTimeout(() => {
      setIsGeneratingInvoice(false);
      if (selectedOption === 'Invoice') {
        navigation.navigate('FacturaConsumerData');
      } else if (selectedOption === 'Final Consumer') {
        navigation.navigate('FacturaConsumerFinal');
      }
    }, 3000); // Simulate a 3-second delay for invoice generation
  };

  const validateCedula = (text) => {
    // Limit input length to 10 characters
    if (text.length <= 10) {
      setClientData({ ...clientData, cedula: text });
      // Validate length and prefix
      if (text.length > 10) {
        setCedulaError('El número de cédula no debe tener más de 10 dígitos.');
      } else if (text.length > 0 && !VALID_PROVINCE_CODES.includes(text.substring(0, 2))) {
        setCedulaError('El número de cédula debe comenzar con un código de provincia válido.');
      } else {
        setCedulaError('');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
          <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Datos cliente</Text>
      </View>

      <Text style={styles.title}>Detalles de compra</Text>

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, selectedOption === 'Invoice' && styles.radioOptionSelected]}
          onPress={() => setSelectedOption('Invoice')}
        >
          <DocumentTextIcon name="file-text" size={20} color={themeColors.text} style={styles.icon} />
          <Text style={styles.radioText}>Factura con datos</Text>
          <View style={styles.radioCircle}>
            {selectedOption === 'Invoice' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioOption, selectedOption === 'Final Consumer' && styles.radioOptionSelected]}
          onPress={() => setSelectedOption('Final Consumer')}
        >
          <DocumentIcon name="user" size={20} color={themeColors.text} style={styles.icon} />
          <Text style={styles.radioText}>Consumidor Final</Text>
          <View style={styles.radioCircle}>
            {selectedOption === 'Final Consumer' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>
      </View>

      {selectedOption === 'Invoice' && (
        <>
          <View style={styles.inputContainer}>
            <IdentificationIcon name="id-card" size={20} color={themeColors.text} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Numero de cedula"
              keyboardType="numeric"
              maxLength={10}
              value={clientData.cedula}
              onChangeText={validateCedula}
            />
          </View>
          {cedulaError ? <Text style={styles.errorText}>{cedulaError}</Text> : null}
          <View style={styles.inputContainer}>
            <UserIcon name="user" size={20} color={themeColors.text} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre y apellido"
              value={clientData.nombre}
              onChangeText={(text) => setClientData({ ...clientData, nombre: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <EnvelopeIcon name="envelope" size={20} color={themeColors.text} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={clientData.correo}
              onChangeText={(text) => setClientData({ ...clientData, correo: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <HomeIcon name="home" size={20} color={themeColors.text} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Domicilio"
              value={clientData.domicilio}
              onChangeText={(text) => setClientData({ ...clientData, domicilio: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <DevicePhoneMobileIcon name="phone" size={20} color={themeColors.text} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Numero Telefonico"
              keyboardType="numeric"
              value={clientData.telefono}
              onChangeText={(text) => setClientData({ ...clientData, telefono: text })}
            />
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonTextSecondary}>Aceptar términos y condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonPrimary, { opacity: termsAccepted && isFormComplete ? 1 : 0.5 }]}
          disabled={!termsAccepted || !isFormComplete}
          onPress={handleGenerateComprobantePress}
        >
          <Text style={styles.buttonTextPrimary}>Generar Comprobante</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Términos y Condiciones</Text>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>
                <Text style={styles.modalSubtitle}>1. Recopilación de Datos Personales</Text>
                {'\n'}Al completar nuestro formulario, recopilaremos los siguientes datos personales:{'\n'}
                - Número de cédula{'\n'}
                ePresbre y apellido{'\n'}
                - Correo electrónico{'\n'}
                - Domicilio{'\n'}
                - Número telefónico{'\n'}
                {'\n'}
                <Text style={styles.modalSubtitle}>2. Uso de los Datos Personales</Text>
                {'\n'}Los datos personales que recopilamos se utilizarán exclusivamente para los siguientes fines:{'\n'}
                - Procesar y gestionar tu pedido.{'\n'}
                - Enviarte confirmaciones y actualizaciones relacionadas con tu compra.{'\n'}
                - Mejorar nuestros servicios y ofrecerte una mejor experiencia.{'\n'}
                {'\n'}
                <Text style={styles.modalSubtitle}>3. Protección de los Datos Personales</Text>
                {'\n'}Nos comprometemos a proteger la información personal que nos proporcionas. Utilizamos medidas de seguridad adecuadas para proteger tus datos contra el acceso no autorizado, la divulgación, la alteración o la destrucción.{'\n'}
                {'\n'}
                <Text style={styles.modalSubtitle}>4. Compartición de Datos</Text>
                {'\n'}No compartiremos tus datos personales con terceros, excepto cuando sea necesario para procesar tu pedido o cumplir con la ley.{'\n'}
                {'\n'}
                <Text style={styles.modalSubtitle}>5. Derechos del Usuario</Text>
                {'\n'}Tienes el derecho de acceder, corregir o eliminar tus datos personales en cualquier momento. Si deseas ejercer estos derechos, por favor contáctanos a través de la información proporcionada en nuestro sitio web.{'\n'}
                {'\n'}
                <Text style={styles.modalSubtitle}>6. Cambios en los Términos</Text>
                {'\n'}Podemos actualizar estos términos y condiciones de vez en cuando. Te notificaremos sobre cualquier cambio importante a través de nuestro sitio web o por correo electrónico.{'\n'}
                {'\n'}Al aceptar estos términos y condiciones, consientes el uso de tus datos personales de acuerdo con lo descrito anteriormente.{'\n'}
              </Text>
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAcceptTerms}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: themeColors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dce0e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f0f2f4',
    marginBottom: 20,
  },
  input: {
    height: 50,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonPrimary: {
    backgroundColor: themeColors.accent,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonTextPrimary: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: themeColors.surface,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#111418',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: themeColors.accent,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default DatosClScreen;
