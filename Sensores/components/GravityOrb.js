import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import { Accelerometer } from "expo-sensors";

const { width, height } = Dimensions.get("window");

// Límites donde se puede mover la esfera
const LIMITE_X = width / 2 - 55;
const LIMITE_Y = height / 2 - 150;

export default function GravityOrb() {

  const posicion = useRef(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;

  const posicionActual = useRef({
    x: 0,
    y: 0,
  });

  const [energia, setEnergia] = useState(0);

  useEffect(() => {

    Accelerometer.setUpdateInterval(30);

    const subscriber = Accelerometer.addListener(
      ({ x, y }) => {

        // Sensibilidad del movimiento
        const velocidad = 12;

        let nuevoX =
          posicionActual.current.x - x * velocidad;

        let nuevoY =
          posicionActual.current.y + y * velocidad;

        // Evita que la esfera salga de la pantalla
        nuevoX = Math.max(
          -LIMITE_X,
          Math.min(LIMITE_X, nuevoX)
        );

        nuevoY = Math.max(
          -LIMITE_Y,
          Math.min(LIMITE_Y, nuevoY)
        );

        posicionActual.current = {
          x: nuevoX,
          y: nuevoY,
        };

        posicion.setValue({
          x: nuevoX,
          y: nuevoY,
        });

        // Calculamos qué tanto se está moviendo
        const intensidad =
          Math.abs(x) + Math.abs(y);

        setEnergia(
          Math.min(100, Math.round(intensidad * 70))
        );
      }
    );

    return () => {
      subscriber.remove();
    };

  }, []);

  return (
    <View style={styles.container}>

      {/* ENCABEZADO */}

      <View style={styles.header}>
        <Text style={styles.logo}>GRAVITY</Text>

        <Text style={styles.subtitle}>
          ORB LAB
        </Text>
      </View>


      {/* ÁREA DE JUEGO */}

      <View style={styles.arena}>

        {/* Líneas decorativas */}

        <View style={styles.lineaVertical} />

        <View style={styles.lineaHorizontal} />

        <View style={styles.centro}>
          <View style={styles.centroInterior} />
        </View>


        {/* ESFERA */}

        <Animated.View
          style={[
            styles.orbContainer,
            {
              transform: posicion.getTranslateTransform(),
            },
          ]}
        >

          <View style={styles.glow} />

          <View style={styles.orb}>
            <View style={styles.brillo} />
          </View>

        </Animated.View>

      </View>


      {/* PANEL INFERIOR */}

      <View style={styles.panel}>

        <Text style={styles.panelTitle}>
          GRAVITY CORE
        </Text>

        <View style={styles.energyRow}>

          <Text style={styles.energyLabel}>
            ENERGÍA
          </Text>

          <Text style={styles.energyValue}>
            {energia}%
          </Text>

        </View>

        <View style={styles.energyBackground}>

          <View
            style={[
              styles.energyBar,
              {
                width: `${energia}%`,
              },
            ]}
          />

        </View>

        <Text style={styles.instructions}>
          Inclina tu teléfono para controlar la esfera
        </Text>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#05070D",
  },


  // HEADER

  header: {
    paddingTop: 65,
    paddingHorizontal: 25,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 6,
  },

  subtitle: {
    color: "#00E5FF",
    fontSize: 12,
    letterSpacing: 5,
    marginTop: 4,
  },


  // ARENA

  arena: {
    flex: 1,
    margin: 20,
    borderWidth: 1,
    borderColor: "#172033",
    borderRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",

    backgroundColor: "#080C14",
  },

  lineaVertical: {
    position: "absolute",

    height: "100%",
    width: 1,

    backgroundColor: "#101A2A",
  },

  lineaHorizontal: {
    position: "absolute",

    width: "100%",
    height: 1,

    backgroundColor: "#101A2A",
  },


  // CENTRO DE LA ARENA

  centro: {
    position: "absolute",

    width: 80,
    height: 80,

    borderRadius: 40,

    borderWidth: 1,
    borderColor: "#18273A",

    alignItems: "center",
    justifyContent: "center",
  },

  centroInterior: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#00E5FF",
  },


  // ORB

  orbContainer: {
    position: "absolute",

    width: 75,
    height: 75,

    alignItems: "center",
    justifyContent: "center",
  },

  glow: {
    position: "absolute",

    width: 75,
    height: 75,

    borderRadius: 40,

    backgroundColor: "#00E5FF",

    opacity: 0.2,

    transform: [
      { scale: 1.5 }
    ],
  },

  orb: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#00C8FF",

    borderWidth: 3,
    borderColor: "#8FF4FF",

    shadowColor: "#00E5FF",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  brillo: {
    width: 15,
    height: 15,

    borderRadius: 10,

    backgroundColor: "#FFFFFF",

    opacity: 0.8,

    marginTop: 9,
    marginLeft: 10,
  },


  // PANEL

  panel: {
    marginHorizontal: 20,
    marginBottom: 35,

    padding: 20,

    backgroundColor: "#0B101B",

    borderRadius: 20,

    borderWidth: 1,
    borderColor: "#172033",
  },

  panelTitle: {
    color: "#FFFFFF",

    fontSize: 11,
    fontWeight: "700",

    letterSpacing: 3,

    marginBottom: 15,
  },

  energyRow: {
    flexDirection: "row",

    justifyContent: "space-between",
  },

  energyLabel: {
    color: "#73829B",

    fontSize: 11,

    letterSpacing: 2,
  },

  energyValue: {
    color: "#00E5FF",

    fontSize: 12,

    fontWeight: "bold",
  },

  energyBackground: {
    height: 5,

    backgroundColor: "#18202E",

    borderRadius: 5,

    marginTop: 10,

    overflow: "hidden",
  },

  energyBar: {
    height: "100%",

    backgroundColor: "#00E5FF",

    borderRadius: 5,
  },

  instructions: {
    color: "#536176",

    textAlign: "center",

    fontSize: 11,

    marginTop: 15,
  },

});