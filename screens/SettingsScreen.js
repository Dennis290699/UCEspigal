import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

export default function SettingsScreen() {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [isNightMode, setIsNightMode] = React.useState(false);
    const [isHighContrast, setIsHighContrast] = React.useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleHomePress}>
                    <ArrowLeftIcon style={styles.homeIcon} size={27} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <Text style={styles.sectionTitle}>Theme</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Auto Night Mode</Text>
                <Switch
                    trackColor={{ false: themeColors.surface, true: themeColors.primary }}
                    thumbColor={isNightMode ? themeColors.onPrimary : themeColors.onSurface}
                    ios_backgroundColor={themeColors.surface}
                    onValueChange={setIsNightMode}
                    value={isNightMode}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>High Contrast Text</Text>
                <Switch
                    trackColor={{ false: themeColors.surface, true: themeColors.primary }}
                    thumbColor={isHighContrast ? themeColors.onPrimary : themeColors.onSurface}
                    ios_backgroundColor={themeColors.surface}
                    onValueChange={setIsHighContrast}
                    value={isHighContrast}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Reset to Default</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

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
    sectionTitle: {
        color: themeColors.text,
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: themeColors.bgLight,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    settingText: {
        color: themeColors.text,
        fontSize: 16,
        flex: 1,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    button: {
        backgroundColor: themeColors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: themeColors.onPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});