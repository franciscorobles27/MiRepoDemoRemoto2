
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function EliminarProducto() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(null);

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

  function confirmarEliminacion(item) {
    Alert.alert(
      'Eliminar producto',
      `¿Estás seguro de eliminar "${item.producto}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarProducto(item.id),
        },
      ]
    );
  }

  async function eliminarProducto(id) {
    setEliminando(id);

    try {
      const { data, error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('No se pudo eliminar el producto.');
      }

      setProductos((actuales) =>
        actuales.filter((item) => item.id !== id)
      );

      Alert.alert(
        'Operación exitosa',
        'El producto se eliminó correctamente.'
      );
    } catch (error) {
      Alert.alert('Error al eliminar', error.message);
    } finally {
      setEliminando(null);
    }
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.codigo}>DELETE / 04</Text>
      <Text style={styles.titulo}>Eliminar producto</Text>
      <Text style={styles.subtitulo}>
        Selecciona un producto para eliminarlo del inventario.
      </Text>

      <View style={styles.aviso}>
        <Text style={styles.avisoTexto}>
          Los productos eliminados también se borrarán de Supabase.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actualizarLista}
        onPress={consultarProductos}
        disabled={cargando || eliminando !== null}
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
            No hay productos para eliminar.
          </Text>
        </View>
      ) : (
        productos.map((item) => (
          <View
            key={String(item.id)}
            style={styles.tarjeta}
          >
            <Text style={styles.nombre}>
              {item.producto}
            </Text>

            <Text style={styles.detalle}>
              {item.descripcion}
            </Text>

            <View style={styles.tarjetaInferior}>
              <Text style={styles.precio}>
                ${Number(item.precio).toFixed(2)}
              </Text>

              <TouchableOpacity
                style={[
                  styles.botonEliminar,
                  eliminando !== null && styles.deshabilitado,
                ]}
                onPress={() => confirmarEliminacion(item)}
                disabled={eliminando !== null}
              >
                <Text style={styles.botonTexto}>
                  {eliminando === item.id
                    ? 'Eliminando...'
                    : 'Eliminar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
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
    marginBottom: 20,
  },
  aviso: {
    backgroundColor: '#451A1A',
    borderWidth: 1,
    borderColor: '#7F1D1D',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  avisoTexto: {
    color: '#FECACA',
    fontSize: 12,
    lineHeight: 19,
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
  tarjetaInferior: {
    borderTopWidth: 1,
    borderTopColor: '#34343E',
    paddingTop: 14,
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  precio: {
    color: '#F87171',
    fontSize: 19,
    fontWeight: '800',
  },
  botonEliminar: {
    backgroundColor: '#991B1B',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  deshabilitado: {
    opacity: 0.5,
  },
  vacio: {
    alignItems: 'center',
    padding: 35,
  },
  vacioTexto: {
    color: '#A1A1AA',
    fontSize: 13,
  },
});
