
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { supabase } from './lib/supabase';

import CrearProducto from './components/CrearProducto';
import ConsultarProductos from './components/ConsultarProductos';
import ActualizarProducto from './components/ActualizarProducto';
import EliminarProducto from './components/EliminarProducto';

const opciones = [
  {
    id: 'crear',
    codigo: 'CREATE',
    titulo: 'Agregar producto',
    simbolo: '+',
    numero: '01',
  },
  {
    id: 'consultar',
    codigo: 'READ',
    titulo: 'Consultar productos',
    simbolo: '≡',
    numero: '02',
  },
  {
    id: 'actualizar',
    codigo: 'UPDATE',
    titulo: 'Editar producto',
    simbolo: '✎',
    numero: '03',
  },
  {
    id: 'eliminar',
    codigo: 'DELETE',
    titulo: 'Eliminar producto',
    simbolo: '×',
    numero: '04',
  },
];

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [conectado, setConectado] = useState(false);
  const [iniciando, setIniciando] = useState(true);

  useEffect(() => {
    iniciarSesion();
  }, []);

  async function iniciarSesion() {
    setIniciando(true);

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (!data.session) {
        const { error: errorSesion } =
          await supabase.auth.signInAnonymously();

        if (errorSesion) throw errorSesion;
      }

      setConectado(true);
    } catch (error) {
      setConectado(false);
      Alert.alert('Error de conexión', error.message);
    } finally {
      setIniciando(false);
    }
  }

  function mostrarComponente() {
    switch (pantalla) {
      case 'crear':
        return <CrearProducto />;

      case 'consultar':
        return <ConsultarProductos />;

      case 'actualizar':
        return <ActualizarProducto />;

      case 'eliminar':
        return <EliminarProducto />;

      default:
        return null;
    }
  }

  return (
    <View style={styles.contenedor}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C0A0A"
      />

      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.encabezado}>
          <Text style={styles.marca}>
            ROBLES LAB / DATABASE
          </Text>

          <Text style={styles.titulo}>
            Persistencia
            <Text style={styles.punto}>.</Text>
          </Text>

          <Text style={styles.subtitulo}>
            Administración de productos con Supabase
          </Text>

          <View style={styles.estado}>
            <View
              style={[
                styles.estadoPunto,
                {
                  backgroundColor: conectado
                    ? '#22C55E'
                    : '#F59E0B',
                },
              ]}
            />

            <Text style={styles.estadoTexto}>
              {conectado
                ? 'Conectado a Supabase'
                : 'Sin conexión'}
            </Text>
          </View>
        </View>

        {iniciando ? (
          <ActivityIndicator
            size="large"
            color="#EF4444"
            style={styles.cargando}
          />
        ) : !conectado ? (
          <TouchableOpacity
            style={styles.botonReintentar}
            onPress={iniciarSesion}
          >
            <Text style={styles.reintentarTexto}>
              Reintentar conexión
            </Text>
          </TouchableOpacity>
        ) : pantalla === 'inicio' ? (
          <>
            <Text style={styles.seccionTitulo}>
              Menú principal
            </Text>

            <Text style={styles.seccionSubtitulo}>
              Selecciona la operación que deseas realizar.
            </Text>

            <View style={styles.cuadricula}>
              {opciones.map((opcion) => (
                <TouchableOpacity
                  key={opcion.id}
                  style={styles.tarjetaMenu}
                  activeOpacity={0.8}
                  onPress={() => setPantalla(opcion.id)}
                >
                  <View style={styles.tarjetaSuperior}>
                    <View style={styles.icono}>
                      <Text style={styles.iconoTexto}>
                        {opcion.simbolo}
                      </Text>
                    </View>

                    <Text style={styles.numero}>
                      {opcion.numero}
                    </Text>
                  </View>

                  <Text style={styles.codigo}>
                    {opcion.codigo}
                  </Text>

                  <Text style={styles.opcionTitulo}>
                    {opcion.titulo}
                  </Text>

                  <Text style={styles.flecha}>
                    →
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.informacion}>
              <Text style={styles.informacionTitulo}>
                Inventario conectado
              </Text>

              <Text style={styles.informacionTexto}>
                Los cambios realizados se guardan directamente
                en la tabla productos de Supabase.
              </Text>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.volver}
              onPress={() => setPantalla('inicio')}
            >
              <Text style={styles.volverTexto}>
                ← Volver al menú
              </Text>
            </TouchableOpacity>

            {mostrarComponente()}
          </>
        )}

        <Text style={styles.pie}>
          ROBLES LAB · REACT NATIVE + SUPABASE
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#0C0A0A',
  },
  contenido: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 55,
  },
  encabezado: {
    marginBottom: 32,
  },
  marca: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: '800',
    marginTop: 12,
  },
  punto: {
    color: '#EF4444',
  },
  subtitulo: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 9,
    lineHeight: 20,
  },
  estado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  estadoPunto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  estadoTexto: {
    color: '#A1A1AA',
    fontSize: 12,
  },
  seccionTitulo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
  },
  seccionSubtitulo: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 25,
  },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tarjetaMenu: {
    width: '48%',
    minHeight: 185,
    backgroundColor: '#1C1C24',
    borderWidth: 1,
    borderColor: '#34343E',
    borderRadius: 19,
    padding: 17,
    marginBottom: 15,
  },
  tarjetaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icono: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#451A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoTexto: {
    color: '#EF4444',
    fontSize: 27,
    fontWeight: '800',
  },
  numero: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '800',
  },
  codigo: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  opcionTitulo: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  flecha: {
    color: '#A1A1AA',
    fontSize: 19,
    marginTop: 12,
  },
  informacion: {
    backgroundColor: '#1C1C24',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#34343E',
    marginTop: 12,
  },
  informacionTitulo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  informacionTexto: {
    color: '#A1A1AA',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  volver: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginBottom: 23,
  },
  volverTexto: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '800',
  },
  cargando: {
    marginTop: 45,
  },
  botonReintentar: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  reintentarTexto: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  pie: {
    color: '#71717A',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 45,
  },
});
