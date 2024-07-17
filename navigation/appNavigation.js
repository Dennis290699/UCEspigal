import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MetodoPagoScreen from '../screens/MetodoPagoScreen';
import DatosClScreen from '../screens/DatosClScreen';
import DatosTarjetaScreen from '../screens/DatosTarjetaScreen';
import FacturaScreen from '../screens/FacturaScreen';
import { Dimensions, LogBox, Platform, Text, View } from 'react-native';
import { themeColors } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline, UserGroupIcon as UserGroup } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid } from 'react-native-heroicons/solid';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home">
          {(props) => <HomeTabs {...props} cartItems={cartItems} />}
        </Stack.Screen>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Product">
          {(props) => <ProductScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        </Stack.Screen>
        <Stack.Screen name="Pago" component={MetodoPagoScreen} />
        <Stack.Screen name="DatosCliente" component={DatosClScreen} />
        <Stack.Screen name="DatosTarjeta" component={DatosTarjetaScreen} />
        <Stack.Screen name="Factura" component={FacturaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs({ cartItems }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          alignItems: 'center',
          borderRadius: 100,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,
        },
        tabBarItemStyle: {
          marginTop: ios ? 30 : 0,
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="AboutUs" component={AboutUsScreen} />
      <Tab.Screen name="Cart">
        {(props) => <CartScreen {...props} cartItems={cartItems} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === 'home') {
    icon = focused ? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />;
  } else if (route.name === 'AboutUs') {
    icon = focused ? <UserGroup size="30" color={themeColors.bgLight} /> : <UserGroup size="30" strokeWidth={2} color="white" />;
  } else if (route.name === 'Cart') {
    icon = focused ? <BagSolid size="30" color={themeColors.bgLight} /> : <BagOutline size="30" strokeWidth={2} color="white" />;
  }

  let buttonClass = focused ? 'bg-white' : '';
  return (
    <View className={'flex items-center rounded-full p-3 shadow ' + buttonClass}>
      {icon}
    </View>
  );
};