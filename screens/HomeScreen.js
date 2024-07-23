import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories } from '../constants/data';
import { coffeeItems } from '../constants/coffeeItems';
import { empanadaItems } from '../constants/empanadaItems';
import { panDulceItems } from '../constants/panDulceItems';
import { panTradicionalItems } from '../constants/panTradicionalItems';
import { pastelItems } from '../constants/pastelItems';
import { sandwichItems } from '../constants/sandwichItems';
import { productosVariosItems } from '../constants/productosVarios';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import { QuestionMarkCircleIcon, MapPinIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    loadItems(activeCategory);
  }, [activeCategory]);

  const loadItems = (category) => {
    setLoading(true);
    setTimeout(() => {
      let items;
      switch (category) {
        case 1:
          items = empanadaItems;
          break;
        case 2:
          items = panDulceItems;
          break;
        case 3:
          items = panTradicionalItems;
          break;
        case 4:
          items = pastelItems;
          break;
        case 5:
          items = sandwichItems;
          break;
        case 6:
          items = coffeeItems;
          break;
        case 7:
          items = productosVariosItems;
          break;
        default:
          items = empanadaItems;
      }

      if (items && items.length > 0) {
        setDisplayItems(items);
      } else {
        setDisplayItems([]);
      }

      setLoading(false);
    }, 500);
  };

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />
      <Image
        source={require('../assets/images/background/beansBackground1.png')}
        style={{ height: height * 0.2 }}
        className="w-full absolute -top-5 opacity-10" />
      <SafeAreaView className={ios ? '-mb-8' : ''}>
        <View className="mx-4 flex-row justify-between items-center">
          <Image source={require('../assets/images/profile/Logo.png')} className="h-9 w-9 rounded-full" />

          <View className="flex-row items-center space-x-2">
            <MapPinIcon size="25" color={themeColors.bgLight} style={{ marginTop: 50 }} />
            <Text className="font-semibold text-base" style={{ marginTop: 50 }}>
              UCEspigal, Quito-Ecuador
            </Text>
          </View>
          <TouchableOpacity onPress={handleSettingsPress}>
            <Cog6ToothIcon size="27" color="black" />
          </TouchableOpacity>
        </View>

        <View className="px-5 mt-6" style={{ paddingHorizontal: 10, marginTop: 45 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item.id.toString()}
            className="overflow-visible"
            renderItem={({ item }) => {
              const isActive = item.id === activeCategory;
              const activeTextClass = isActive ? 'text-white' : 'text-gray-700';
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{ backgroundColor: isActive ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
                  className="p-4 px-5 mr-2 rounded-full shadow">
                  <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>

      <View className={`overflow-visible flex justify-center flex-1 ${ios ? 'mt-10' : ''}`}>
        {loading ? (
          <ActivityIndicator size="large" color={themeColors.bgLight} />
        ) : (
          <View>
            <Carousel
              containerCustomStyle={{ overflow: 'visible' }}
              data={displayItems}
              renderItem={({ item }) => <CoffeeCard item={item} />}
              firstItem={1}
              loop={true}
              inactiveSlideScale={0.75}
              inactiveSlideOpacity={0.75}
              sliderWidth={width}
              itemWidth={width * 0.63}
              slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
