import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, TrashIcon  } from 'react-native-heroicons/outline';
import { CartContext } from '../context/CartContext'; // Importar el contexto

const CartScreen = () => {
  const { cart, removeFromCart, updateItemQuantity } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);
    setTotal(total);
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const handleIncrement = (index) => {
    updateItemQuantity(index, cart[index].count + 1);
  };

  const handleDecrement = (index) => {
    if (cart[index].count > 1) {
      updateItemQuantity(index, cart[index].count - 1);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item, index }) => (
    <CartItem 
      item={item} 
      handleIncrement={() => handleIncrement(index)}
      handleDecrement={() => handleDecrement(index)}
      handleRemoveItem={() => handleRemoveItem(index)} 
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
          <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Carrito</Text>
      </View>

      <FlatList
        data={cart}
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
        <TrashIcon style={styles.deleteButton} color={themeColors.text} size={16}/>

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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: themeColors.surface,
    borderRadius: 10,
    marginBottom: 12,
    position: 'relative',
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
    width: '80%',
    paddingVertical: 15,
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
});

export default CartScreen;
