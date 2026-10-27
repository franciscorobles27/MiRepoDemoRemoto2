
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function CrearProducto() {
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [guardando, setGuardando] = useState(false);

  async function agregarProducto() {
    const nombre = producto.trim();
    const detalle = descripcion.trim();
    const costo = Number(precio.trim().replace(',', '.'));

    if (!nombre || !detalle || !precio.trim()) {
      Alert.alert('Campos incompletos', 'Completa todos los campos.');
      return;
    }

    if (!Number.isFinite(costo) || costo < 0) {
      Alert.alert('Precio inválido', 'Ingresa un precio válido.');
      return;
    }

    setGuardando(true);

    try {
      const { data, error } = await supabase
        .from('productos')
        .insert({
          producto: nombre,
          descripcion: detalle,
          precio: costo,
        })
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('No se pudo registrar el producto.');
      }

      setProducto('');
      setDescripcion('');
      setPrecio('');

      Alert.alert(
        'Operación exitosa',
        'El producto se agregó correctamente.'
      );
    } catch (error) {
      Alert.alert('Error al agregar', error.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.codigo}>CREATE / 01</Text>
      <Text style={styles.titulo}>Agregar producto</Text>
      <Text style={styles.subtitulo}>
        Registra un nuevo producto en tu inventario.
      </Text>

      <Text style={styles.label}>NOMBRE DEL PRODUCTO</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Teclado mecánico"
        placeholderTextColor="#888888"
        value={producto}
        onChangeText={setProducto}
      />

      <Text style={styles.label}>DESCRIPCIÓN</Text>
      <TextInput
        style={[styles.input, styles.inputGrande]}
        placeholder="Escribe una descripción"
        placeholderTextColor="#888888"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>PRECIO (MXN)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#888888"
        keyboardType="decimal-pad"
        value={precio}
        onChangeText={setPrecio}
      />

      <TouchableOpacity
        style={[
          styles.boton,
          guardando && styles.botonDeshabilitado,
        ]}
        onPress={agregarProducto}
        disabled={guardando}
        activeOpacity={0.8}
      >
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>
            + Guardar producto
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1C1C24',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#34343E',
  },
  codigo: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
  },
  subtitulo: {
    color: '#A1A1AA',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 25,
  },
  label: {
    color: '#E4E4E7',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 9,
  },
  input: {
    backgroundColor: '#111114',
    borderWidth: 1,
    borderColor: '#45454F',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20,
  },
  inputGrande: {
    minHeight: 90,
  },
  boton: {
    backgroundColor: '#DC2626',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
