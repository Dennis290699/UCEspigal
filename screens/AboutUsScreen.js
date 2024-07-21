import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CalendarDaysIcon, MapPinIcon, UserGroupIcon, GlobeAltIcon } from 'react-native-heroicons/outline';
import { themeColors } from '../theme';
const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image
            source={require('../assets/images/profile/logo_HD.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>UCEspigal</Text>
            <Text style={styles.profileCategory}>Panadería Artesanal</Text>
            <Text style={styles.profileFollowers}>5,000 seguidores</Text>
            <View style={styles.followButtonContainer}>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Contáctanos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
        <Text style={styles.sectionText}>
          UCEspigal es una panadería artesanal dedicada a ofrecer los más deliciosos y frescos productos horneados.
          Desde nuestros comienzos, nos hemos esforzado por mantener la tradición y calidad en cada una de nuestras recetas.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestra Misión</Text>
        <Text style={styles.sectionText}>
          Brindar a nuestras familias y comunidad una experiencia inigualable con productos horneados de la más alta calidad, hechos con amor y dedicación.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destacados</Text>
        <View style={styles.highlightContainer}>
          <View style={styles.highlightItem}>
            <CalendarDaysIcon name="calendar" size={24} color={themeColors.text} />
            <Text style={styles.highlightTitle}> Fundada</Text>
            <Text style={styles.highlightText}>2024</Text>
          </View>
          <View style={styles.highlightItem}>
            <MapPinIcon name="map-marker" size={24} color={themeColors.text} />
            <Text style={styles.highlightTitle}> Ubicación</Text>
            <Text style={styles.highlightText}>Quito-Ecuador</Text>
          </View>
          <View style={styles.highlightItem}>
            <UserGroupIcon name="users" size={24} color={themeColors.text} />
            <Text style={styles.highlightTitle}> Empleados</Text>
            <Text style={styles.highlightText}>50+</Text>
          </View>
          <View style={styles.highlightItem}>
            <GlobeAltIcon name="globe" size={24} color={themeColors.text} />
            <Text style={styles.highlightTitle}> Página Web</Text>
            <Text style={styles.highlightText}>ucespigal.com</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Equipo</Text>
      <View style={styles.profileImagesContainer}>
        <View style={styles.profile}>
          <Image source={require('../assets/images/profile/bob.jpg')} style={styles.profileImageSmall} />
          <Text style={styles.profileNameSmall}>Freddy Tappia</Text>
        </View>
        <View style={styles.profile}>
          <Image source={require('../assets/images/profile/profile_HD.png')} style={styles.profileImageSmall} />
          <Text style={styles.profileNameSmall}>B4LB3R1TH</Text>
        </View>
        <View style={styles.profile}>
          <Image source={require('../assets/images/profile/avatar.png')} style={styles.profileImageSmall} />
          <Text style={styles.profileNameSmall}>Rensso Parra</Text>
        </View>
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
  homeIcon: {
    // Se puede agregar cualquier estilo adicional si es necesario
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.text,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: themeColors.text,
  },
  profileCategory: {
    fontSize: 20,
    color: themeColors.bgDark,
  },
  profileFollowers: {
    fontSize: 20,
    color: themeColors.bgDark,
  },
  followButtonContainer: {
    marginTop: 10,
  },
  followButton: {
    backgroundColor: themeColors.surface,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  followButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.text,
    textAlign: 'center',
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 18,
    color: themeColors.text,
  },
  highlightContainer: {
    flexDirection: 'column',
  },
  highlightItem: {
    flexBasis: '50%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.text,
    marginLeft: 10,
  },
  highlightText: {
    fontSize: 18,
    color: themeColors.bgDark,
    marginLeft: 10,
  },
  profileImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profile: {
    alignItems: 'center',
  },
  profileImageSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileNameSmall: {
    marginTop: 8,
    fontSize: 16,
    color: themeColors.text,
  },
});

export default AboutUsScreen;
