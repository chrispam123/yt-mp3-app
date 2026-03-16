import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { useDownload } from '../hooks/useDownload';

export const HomeScreen = () => {
  const [url, setUrl] = useState('');
  const { startDownload, isStarting, status, downloadUrl, error } =
    useDownload();

  const handleDownload = () => {
    if (url.trim()) {
      startDownload(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YT to MP3</Text>

      <TextInput
        style={styles.input}
        placeholder="Pega el link de YouTube aquí"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
      />

      <TouchableOpacity
        style={[styles.button, isStarting && styles.buttonDisabled]}
        onPress={handleDownload}
        disabled={isStarting || status === 'PROCESSING'}
      >
        {isStarting || status === 'PROCESSING' ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Descargar MP3</Text>
        )}
      </TouchableOpacity>

      <View style={styles.statusContainer}>
        <Text>
          Estado: <Text style={styles.statusText}>{status}</Text>
        </Text>
        {error && (
          <Text style={styles.errorText}>Error al conectar con AWS</Text>
        )}
        {status === 'COMPLETED' && downloadUrl && (
          <Text style={styles.successText}>
            ¡Listo! El archivo se ha generado.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  statusContainer: { marginTop: 30, alignItems: 'center' },
  statusText: { fontWeight: 'bold', color: '#555' },
  errorText: { color: 'red', marginTop: 10 },
  successText: { color: 'green', marginTop: 10, fontWeight: 'bold' },
});
