// SERVICE — Armazenamento local e seguro

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const CHAVE_TOKEN = 'interchapeco_token';
const CHAVE_USUARIO = 'interchapeco_usuario';

// TOKEN — dado sensível: SecureStore

export async function salvarToken(token) {
  await SecureStore.setItemAsync(CHAVE_TOKEN, token);
}

export async function obterToken() {
  return SecureStore.getItemAsync(CHAVE_TOKEN);
}

export async function removerToken() {
  await SecureStore.deleteItemAsync(CHAVE_TOKEN);
}

// USUÁRIO — dado local não secreto: AsyncStorage

export async function salvarUsuario(usuario) {
  await AsyncStorage.setItem(
    CHAVE_USUARIO,
    JSON.stringify(usuario)
  );
}

export async function obterUsuario() {
  const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

  if (!usuarioSalvo) {
    return null;
  }

  return JSON.parse(usuarioSalvo);
}

export async function removerUsuario() {
  await AsyncStorage.removeItem(CHAVE_USUARIO);
}

// LIMPEZA DA SESSÃO

export async function limparSessao() {
  await removerToken();
  await removerUsuario();
}