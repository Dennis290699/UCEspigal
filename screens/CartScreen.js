import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener instalada esta biblioteca
import { themeColors } from '../theme'; // Importa los colores de tu tema
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ cartItems, setCartItems }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
    setTotal(total);
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].count += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].count > 1) {
      updatedCartItems[index].count -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const renderItem = ({ item, index }) => (
    <CartItem 
      item={item} 
      index={index}
      handleIncrement={() => handleIncrement(index)}
      handleDecrement={() => handleDecrement(index)}
      handleRemoveItem={() => handleRemoveItem(index)} 
    />
  );

  const handleHomePress = () => {
    navigation.navigate('Home');
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <CartTotal total={total} />
    </View>
  );
};

const CartItem = ({ item, handleIncrement, handleDecrement, handleRemoveItem }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityInput}>
          <Text style={styles.quantityText}>{item.count}</Text>
        </View>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveItem}>
        <Icon name="trash" size={24} color={themeColors.text} />
      </TouchableOpacity>
    </View>
  );
};

const CartTotal = ({ total }) => {

  const navigation = useNavigation();
    const handlePagoPress = () => {
        navigation.navigate('Pago');
    };

  return (
    <View style={styles.checkoutButtonContainer}>
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Total a pagar</Text>
        <Text style={styles.subtotalAmount}>${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handlePagoPress}>
        <Text style={styles.checkoutButtonText}>Realizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    justifyContent: 'center',
    height: 60,
  },
  headerText: {
    color: themeColors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: themeColors.surface,
    borderRadius: 10,
    marginBottom: 12,
    position: 'relative', // Añadido para la posición absoluta del botón de eliminar
  },
  itemImage: {
    width: 70,
    height: 93,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    paddingLeft: 12,
  },
  itemName: {
    color: themeColors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    color: themeColors.text,
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.primary,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.onPrimary,
  },
  quantityInput: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    backgroundColor: themeColors.surface,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  quantityText: {
    fontSize: 16,
    color: themeColors.text,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  subtotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 12,
  },
  subtotalText: {
    flex: 1,
    color: themeColors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  subtotalAmount: {
    color: themeColors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  checkoutButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    width: '80%', // Ajusta el ancho del botón
    paddingVertical: 15, // Ajusta la altura del botón
    backgroundColor: themeColors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  checkoutButtonText: {
    color: themeColors.onPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default CartScreen;