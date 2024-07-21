import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from '../context/CartContext';
import { ConsumerProvider } from '../context/ConsumerContext';
import { ConsumerCardProvider } from '../context/ConsumerCardContext';
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
import FacturaConsumerFinalScreen from '../screens/FacturaConsumerFinalScreen';
import FacturaTarjetaScreen from '../screens/FacturaTarjetaScreen';

import { Platform, View } from 'react-native';
import { themeColors } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline, UserGroupIcon as UserGroup } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid } from 'react-native-heroicons/solid';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS === 'ios';

export default function AppNavigation() {
  return (
    <CartProvider>
      <ConsumerProvider>
        <ConsumerCardProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Home" component={HomeTabs} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Pago" component={MetodoPagoScreen} />
              <Stack.Screen name="DatosCliente" component={DatosClScreen} />
              <Stack.Screen name="DatosTarjeta" component={DatosTarjetaScreen} />
              <Stack.Screen name="FacturaConsumerData" component={FacturaScreen} />
              <Stack.Screen name="FacturaConsumerFinal" component={FacturaConsumerFinalScreen} />
              <Stack.Screen name="Facturatarjeta" component={FacturaTarjetaScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ConsumerCardProvider>
      </ConsumerProvider>
    </CartProvider>
  );
}

function HomeTabs() {
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
      <Tab.Screen name="Cart" component={CartScreen} />
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
