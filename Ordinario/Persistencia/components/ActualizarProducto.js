
import React, { useEffect, useState } from 'react';
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

export default function ActualizarProducto() {
  const [productos, setProductos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    consultarProductos();
  }, []);

  async function consultarProductos() {
    setCargando(true);

    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      setProductos(data || []);
    } catch (error) {
      Alert.alert('Error al consultar', error.message);
    } finally {
      setCargando(false);
    }
  }

  function seleccionarProducto(item) {
    setSeleccionado(item.id);
    setProducto(item.producto);
    setDescripcion(item.descripcion);
    setPrecio(String(item.precio));
  }

  function cancelarEdicion() {
    setSeleccionado(null);
    setProducto('');
    setDescripcion('');
    setPrecio('');
  }

  async function actualizarProducto() {
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

    if (seleccionado === null) return;

    setGuardando(true);

    try {
      const { data, error } = await supabase
        .from('productos')
        .update({
          producto: nombre,
          descripcion: detalle,
          precio: costo,
        })
        .eq('id', seleccionado)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('No se pudo actualizar el producto.');
      }

      cancelarEdicion();
      await consultarProductos();

      Alert.alert(
        'Operación exitosa',
        'El producto se actualizó correctamente.'
      );
    } catch (error) {
      Alert.alert('Error al actualizar', error.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.codigo}>UPDATE / 03</Text>
      <Text style={styles.titulo}>Actualizar producto</Text>
      <Text style={styles.subtitulo}>
        Selecciona un producto para modificar su información.
      </Text>

      {seleccionado === null ? (
        <>
          <TouchableOpacity
            style={styles.actualizarLista}
            onPress={consultarProductos}
            disabled={cargando}
          >
            <Text style={styles.actualizarTexto}>
              ↻ Actualizar lista
            </Text>
          </TouchableOpacity>

          {cargando ? (
            <ActivityIndicator
              color="#EF4444"
              size="large"
              style={{ marginTop: 30 }}
            />
          ) : productos.length === 0 ? (
            <View style={styles.vacio}>
              <Text style={styles.vacioTexto}>
                No hay productos registrados.
              </Text>
            </View>
          ) : (
            productos.map((item) => (
              <TouchableOpacity
                key={String(item.id)}
                style={styles.tarjeta}
                onPress={() => seleccionarProducto(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.nombre}>
                  {item.producto}
                </Text>

                <Text style={styles.detalle}>
                  {item.descripcion}
                </Text>

                <Text style={styles.precio}>
                  ${Number(item.precio).toFixed(2)}
                </Text>

                <View style={styles.filaAccion}>
                  <Text style={styles.accionTexto}>
                    Editar producto
                  </Text>
                  <Text style={styles.accionFlecha}>→</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </>
      ) : (
        <View style={styles.formulario}>
          <Text style={styles.formTitulo}>
            Modificar información
          </Text>

          <Text style={styles.label}>
            NOMBRE DEL PRODUCTO
          </Text>
          <TextInput
            style={styles.input}
            value={producto}
            onChangeText={setProducto}
          />

          <Text style={styles.label}>
            DESCRIPCIÓN
          </Text>
          <TextInput
            style={[styles.input, styles.inputGrande]}
            multiline
            textAlignVertical="top"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <Text style={styles.label}>
            PRECIO (MXN)
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={precio}
            onChangeText={setPrecio}
          />

          <TouchableOpacity
            style={[
              styles.botonGuardar,
              guardando && styles.deshabilitado,
            ]}
            onPress={actualizarProducto}
            disabled={guardando}
          >
            {guardando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botonTexto}>
                Guardar cambios
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelar}
            onPress={cancelarEdicion}
            disabled={guardando}
          >
            <Text style={styles.cancelarTexto}>
              Cancelar edición
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
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
    marginBottom: 22,
  },
  actualizarLista: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  actualizarTexto: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '800',
  },
  tarjeta: {
    backgroundColor: '#1C1C24',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#34343E',
  },
  nombre: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  detalle: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 7,
    lineHeight: 19,
  },
  precio: {
    color: '#F87171',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 12,
  },
  filaAccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#34343E',
    marginTop: 16,
    paddingTop: 13,
  },
  accionTexto: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '800',
  },
  accionFlecha: {
    color: '#EF4444',
    fontSize: 16,
  },
  formulario: {
    backgroundColor: '#1C1C24',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#34343E',
  },
  formTitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 23,
  },
  label: {
    color: '#E4E4E7',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 9,
  },
  input: {
    backgroundColor: '#111114',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#45454F',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    marginBottom: 20,
  },
  inputGrande: {
    minHeight: 85,
  },
  botonGuardar: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 17,
    alignItems: 'center',
  },
  deshabilitado: {
    opacity: 0.5,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  cancelar: {
    padding: 16,
    alignItems: 'center',
  },
  cancelarTexto: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '700',
  },
  vacio: {
    alignItems: 'center',
    padding: 30,
  },
  vacioTexto: {
    color: '#A1A1AA',
    fontSize: 13,
  },
});
