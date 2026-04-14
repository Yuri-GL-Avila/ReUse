import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';


export default function App() {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
    // Pedir permissão
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
        Alert.alert('Permissão necessária para usar a câmera!');
        return;
    }

    // Abrir câmera
    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
        saveImage(uri);
    }
};

    const saveImage = async (uri) => {
    try {
        const data = await AsyncStorage.getItem('trades');
        const list = data ? JSON.parse(data) : [];

        list.push(uri);

        await AsyncStorage.setItem('trades', JSON.stringify(list));
        console.log('Imagem salva!');
    } catch (e) {
        console.log(e);
    }
};

<View style={styles.header}><Text style={styles.logoText}>RE.USE</Text>

          <View style={styles.rightIcons}>
            <TouchableOpacity 
              onPress={() => setFontSize(prev => prev + 2)}
              style={styles.iconButton}
            >
              <Ionicons name="add-circle-outline" size={26} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setFontSize(prev => Math.max(14, prev - 2))}
              style={styles.iconButton}
            >
              <Ionicons name="remove-circle-outline" size={26} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Nova Troca')} // A navegação acontece aqui
            >
              <Ionicons name="swap-horizontal" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          </View></View>
    return ( 
        <View style={styles.container}>
        <Text style={styles.title}>Nova troca</Text>

        <Button style={styles.butao} title="Tirar foto do objeto" onPress={takePhoto} />

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Text style={styles.text}>
        A imagem será salva no histórico de trocas.
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FDFBF7,'
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
},
logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryDark,
},
rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
},
iconButton: {
    marginLeft: 16,
},
title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
},
image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
},
text: {
    marginTop: 20,
    color: 'gray',
},
butao: {
    color: '#9F7AEA',
}
});