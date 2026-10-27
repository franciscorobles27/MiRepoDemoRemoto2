
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function ConsultarProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

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

  const productosFiltrados = productos.filter((item) => {
    const texto = busqueda.trim().toLowerCase();

    return (
      item.producto.toLowerCase().includes(texto) ||
      item.descripcion.toLowerCase().includes(texto)
    );
  });

  function formatoPrecio(valor) {
    return '$' + Number(valor).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const valorTotal = productos.reduce(
    (total, item) => total + Number(item.precio),
    0
  );

  function renderProducto({ item }) {
    return (
      <View style={styles.tarjeta}>
        <View style={styles.tarjetaSuperior}>
          <View style={styles.icono}>
            <Text style={styles.iconoTexto}>◆</Text>
          </View>

          <View style={styles.informacion}>
            <Text style={styles.nombre}>{item.producto}</Text>
            <Text style={styles.detalle}>{item.descripcion}</Text>
          </View>
        </View>

        <View style={styles.tarjetaInferior}>
          <Text style={styles.precio}>
            {formatoPrecio(item.precio)}
          </Text>
          <Text style={styles.identificador}>
            ID #{item.id}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.codigo}>READ / 02</Text>
      <Text style={styles.titulo}>Consultar productos</Text>
      <Text style={styles.subtitulo}>
        Revisa los productos registrados en Supabase.
      </Text>

      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenLabel}>PRODUCTOS</Text>
          <Text style={styles.resumenValor}>
            {productos.length}
          </Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenLabel}>VALOR TOTAL</Text>
          <Text style={styles.resumenValor}>
            {formatoPrecio(valorTotal)}
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.buscador}
        placeholder="Buscar productos..."
        placeholderTextColor="#888888"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.fila}>
        <Text style={styles.resultados}>
          {productosFiltrados.length} resultados
        </Text>

        <TouchableOpacity
          onPress={consultarProductos}
          disabled={cargando}
        >
          <Text style={styles.actualizar}>
            ↻ Actualizar
          </Text>
        </TouchableOpacity>
      </View>

      {cargando ? (
        <ActivityIndicator
          color="#EF4444"
          size="large"
          style={styles.cargando}
        />
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProducto}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.vacio}>
              <Text style={styles.vacioIcono}>◇</Text>
              <Text style={styles.vacioTitulo}>
                Sin productos
              </Text>
              <Text style={styles.vacioTexto}>
                Todavía no hay productos para mostrar.
              </Text>
            </View>
          }
        />
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
    marginTop: 8,
    marginBottom: 24,
  },
  resumen: {
    flexDirection: 'row',
    backgroundColor: '#1C1C24',
    borderRadius: 17,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#34343E',
  },
  resumenItem: {
    flex: 1,
  },
  resumenLabel: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 9,
  },
  resumenValor: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  divisor: {
    width: 1,
    backgroundColor: '#34343E',
    marginHorizontal: 14,
  },
  buscador: {
    backgroundColor: '#1C1C24',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#34343E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  resultados: {
    color: '#A1A1AA',
    fontSize: 12,
  },
  actualizar: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '800',
  },
  cargando: {
    marginTop: 35,
  },
  tarjeta: {
    backgroundColor: '#1C1C24',
    borderRadius: 16,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#34343E',
  },
  tarjetaSuperior: {
    flexDirection: 'row',
  },
  icono: {
    width: 43,
    height: 43,
    backgroundColor: '#451A1A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconoTexto: {
    color: '#EF4444',
    fontSize: 22,
  },
  informacion: {
    flex: 1,
  },
  nombre: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  detalle: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },
  tarjetaInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#34343E',
    marginTop: 17,
    paddingTop: 14,
  },
  precio: {
    color: '#F87171',
    fontSize: 19,
    fontWeight: '800',
  },
  identificador: {
    color: '#71717A',
    fontSize: 11,
  },
  vacio: {
    alignItems: 'center',
    padding: 35,
  },
  vacioIcono: {
    color: '#EF4444',
    fontSize: 35,
  },
  vacioTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 10,
  },
  vacioTexto: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
