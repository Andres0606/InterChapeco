/**
 * SERVICE — nativos
 * Câmera, galeria, geolocalização e permissões.
 * As telas não importam expo-* diretamente.
 */

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

function recusarSeWeb() {
  if (Platform.OS === 'web') {
    throw new Error('Recurso nativo indisponível no navegador.');
  }
}

// CÂMERA

export async function capturarFoto() {
  recusarSeWeb();

  const { status } =
    await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão da câmera negada.');
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    quality: 0.6,
    allowsEditing: true,
    aspect: [1, 1],
  });

  if (result.canceled) {
    return null;
  }

  return {
    uri: result.assets[0].uri,
  };
}

// GALERIA

export async function escolherImagem() {
  recusarSeWeb();

  const { status } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão da galeria negada.');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.6,
    allowsEditing: true,
    aspect: [1, 1],
  });

  if (result.canceled) {
    return null;
  }

  return {
    uri: result.assets[0].uri,
  };
}

// GEOLOCALIZAÇÃO

export async function obterPosicao() {
  recusarSeWeb();

  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão de localização negada.');
  }

  const posicao = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: posicao.coords.latitude,
    longitude: posicao.coords.longitude,
    precisao: posicao.coords.accuracy,
  };
}

// STATUS DAS PERMISSÕES

export async function statusPermissoes() {
  if (Platform.OS === 'web') {
    return {
      camera: 'indisponivel',
      galeria: 'indisponivel',
      localizacao: 'indisponivel',
    };
  }

  const [camera, galeria, localizacao] =
    await Promise.all([
      ImagePicker.getCameraPermissionsAsync(),
      ImagePicker.getMediaLibraryPermissionsAsync(),
      Location.getForegroundPermissionsAsync(),
    ]);

  return {
    camera: camera.status,
    galeria: galeria.status,
    localizacao: localizacao.status,
  };
}