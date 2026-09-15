import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import { Magnetometer } from "expo-sensors";

const { width } = Dimensions.get("window");

const COMPASS_SIZE = Math.min(width - 50, 360);

export default function DigitalCompass() {

  const [heading, setHeading] = useState(0);
  const [direccion, setDireccion] = useState("N");

  const rotacion = useRef(
    new Animated.Value(0)
  ).current;

  const ultimoAngulo = useRef(0);


  // =====================================
  // MAGNETÓMETRO
  // =====================================

  useEffect(() => {

    Magnetometer.setUpdateInterval(100);

    const subscription = Magnetometer.addListener(
      ({ x, y }) => {

        let angle =
          Math.atan2(y, x) * (180 / Math.PI);

        angle = angle + 90;

        if (angle < 0) {
          angle += 360;
        }

        if (angle >= 360) {
          angle -= 360;
        }

        const grados = Math.round(angle);

        setHeading(grados);

        actualizarDireccion(grados);

        // Suavizamos un poco la rotación
        ultimoAngulo.current = grados;

        Animated.timing(rotacion, {
          toValue: -grados,
          duration: 150,
          useNativeDriver: true,
        }).start();

      }
    );

    return () => {
      subscription.remove();
    };

  }, []);


  // =====================================
  // DIRECCIÓN CARDINAL
  // =====================================

  const actualizarDireccion = (grados) => {

    if (grados >= 337.5 || grados < 22.5) {
      setDireccion("N");
    }

    else if (grados >= 22.5 && grados < 67.5) {
      setDireccion("NE");
    }

    else if (grados >= 67.5 && grados < 112.5) {
      setDireccion("E");
    }

    else if (grados >= 112.5 && grados < 157.5) {
      setDireccion("SE");
    }

    else if (grados >= 157.5 && grados < 202.5) {
      setDireccion("S");
    }

    else if (grados >= 202.5 && grados < 247.5) {
      setDireccion("SO");
    }

    else if (grados >= 247.5 && grados < 292.5) {
      setDireccion("O");
    }

    else {
      setDireccion("NO");
    }

  };


  // =====================================
  // INTERPOLACIÓN DE ROTACIÓN
  // =====================================

  const rotateCompass = rotacion.interpolate({
    inputRange: [-360, 360],

    outputRange: [
      "-360deg",
      "360deg",
    ],
  });


  // =====================================
  // MARCAS DE LA BRÚJULA
  // =====================================

  const renderMarks = () => {

    const marks = [];

    for (let i = 0; i < 360; i += 10) {

      const major = i % 30 === 0;

      marks.push(

        <View
          key={i}
          style={[
            styles.markContainer,
            {
              transform: [
                { rotate: `${i}deg` }
              ],
            },
          ]}
        >

          <View
            style={[
              styles.mark,

              major &&
                styles.majorMark,
            ]}
          />

        </View>

      );
    }

    return marks;
  };


  return (

    <View style={styles.container}>


      {/* HEADER */}

      <View style={styles.header}>

        <View>

          <Text style={styles.smallTitle}>
            NAVIGATION SYSTEM
          </Text>

          <Text style={styles.title}>
            COMPASS
          </Text>

        </View>


        <View style={styles.statusContainer}>

          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            LIVE
          </Text>

        </View>

      </View>



      {/* INFORMACIÓN PRINCIPAL */}

      <View style={styles.headingContainer}>

        <Text style={styles.direction}>
          {direccion}
        </Text>

        <View style={styles.degreeRow}>

          <Text style={styles.degree}>
            {String(heading).padStart(3, "0")}
          </Text>

          <Text style={styles.degreeSymbol}>
            °
          </Text>

        </View>

        <Text style={styles.headingLabel}>
          MAGNETIC HEADING
        </Text>

      </View>



      {/* INDICADOR SUPERIOR FIJO */}

      <View style={styles.topIndicator}>

        <View style={styles.indicatorTriangle} />

        <View style={styles.indicatorLine} />

      </View>



      {/* BRÚJULA */}

      <View style={styles.compassWrapper}>

        <View style={styles.outerGlow} />


        <Animated.View
          style={[
            styles.compass,

            {
              transform: [
                { rotate: rotateCompass }
              ],
            },
          ]}
        >

          {/* MARCAS */}

          {renderMarks()}


          {/* NORTE */}

          <View style={styles.northContainer}>

            <Text style={styles.north}>
              N
            </Text>

            <View style={styles.northDot} />

          </View>


          {/* ESTE */}

          <View style={styles.eastContainer}>

            <Text style={styles.cardinal}>
              E
            </Text>

          </View>


          {/* SUR */}

          <View style={styles.southContainer}>

            <Text style={styles.cardinal}>
              S
            </Text>

          </View>


          {/* OESTE */}

          <View style={styles.westContainer}>

            <Text style={styles.cardinal}>
              O
            </Text>

          </View>



          {/* AGUJA */}

          <View style={styles.needleContainer}>

            <View style={styles.northNeedle} />

            <View style={styles.southNeedle} />

            <View style={styles.centerCircle}>

              <View style={styles.centerDot} />

            </View>

          </View>


        </Animated.View>

      </View>



      {/* INFORMACIÓN INFERIOR */}

      <View style={styles.bottomPanel}>

        <View style={styles.infoItem}>

          <Text style={styles.infoLabel}>
            SENSOR
          </Text>

          <Text style={styles.infoValue}>
            MAGNETOMETER
          </Text>

        </View>


        <View style={styles.separator} />


        <View style={styles.infoItem}>

          <Text style={styles.infoLabel}>
            NORTH
          </Text>

          <Text style={styles.infoValue}>
            MAGNETIC
          </Text>

        </View>

      </View>


      <Text style={styles.instructions}>
        GIRA EL DISPOSITIVO PARA ORIENTARTE
      </Text>


    </View>

  );

}



// =====================================
// ESTILOS
// =====================================

const styles = StyleSheet.create({

  container: {

    flex: 1,

    width: "100%",

    backgroundColor: "#05080D",

    paddingTop: 60,

  },


  // HEADER

  header: {

    paddingHorizontal: 24,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  smallTitle: {

    color: "#526273",

    fontSize: 9,

    letterSpacing: 3,

    fontWeight: "600",

  },

  title: {

    color: "#FFFFFF",

    fontSize: 26,

    letterSpacing: 5,

    fontWeight: "900",

    marginTop: 3,

  },


  // STATUS

  statusContainer: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#0A1315",

    borderWidth: 1,

    borderColor: "#16352F",

    borderRadius: 20,

    paddingHorizontal: 12,

    paddingVertical: 7,

  },

  statusDot: {

    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: "#3DFFB5",

    marginRight: 7,

  },

  statusText: {

    color: "#3DFFB5",

    fontSize: 9,

    letterSpacing: 2,

    fontWeight: "700",

  },


  // HEADING

  headingContainer: {

    alignItems: "center",

    marginTop: 35,

  },

  direction: {

    color: "#FF4D5A",

    fontSize: 15,

    letterSpacing: 5,

    fontWeight: "800",

  },

  degreeRow: {

    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 2,

  },

  degree: {

    color: "#FFFFFF",

    fontSize: 56,

    fontWeight: "200",

    letterSpacing: 2,

  },

  degreeSymbol: {

    color: "#FFFFFF",

    fontSize: 25,

    fontWeight: "200",

    marginTop: 7,

  },

  headingLabel: {

    color: "#465666",

    fontSize: 8,

    letterSpacing: 3,

    marginTop: -2,

  },


  // INDICADOR SUPERIOR

  topIndicator: {

    alignItems: "center",

    marginTop: 20,

    zIndex: 10,

  },

  indicatorTriangle: {

    width: 0,

    height: 0,

    borderLeftWidth: 6,

    borderRightWidth: 6,

    borderBottomWidth: 10,

    borderLeftColor: "transparent",

    borderRightColor: "transparent",

    borderBottomColor: "#FFFFFF",

    transform: [
      { rotate: "180deg" }
    ],

  },

  indicatorLine: {

    width: 1,

    height: 15,

    backgroundColor: "#FFFFFF",

  },


  // COMPASS

  compassWrapper: {

    width: COMPASS_SIZE,

    height: COMPASS_SIZE,

    alignSelf: "center",

    alignItems: "center",

    justifyContent: "center",

  },

  outerGlow: {

    position: "absolute",

    width: COMPASS_SIZE - 5,

    height: COMPASS_SIZE - 5,

    borderRadius: COMPASS_SIZE / 2,

    borderWidth: 1,

    borderColor: "#1B2935",

  },

  compass: {

    width: COMPASS_SIZE - 30,

    height: COMPASS_SIZE - 30,

    borderRadius: COMPASS_SIZE / 2,

    borderWidth: 1,

    borderColor: "#273745",

    alignItems: "center",

    justifyContent: "center",

  },


  // MARCAS

  markContainer: {

    position: "absolute",

    width: "100%",

    height: "100%",

    alignItems: "center",

  },

  mark: {

    width: 1,

    height: 6,

    backgroundColor: "#40505F",

    marginTop: 8,

  },

  majorMark: {

    height: 11,

    width: 2,

    backgroundColor: "#82909C",

  },


  // CARDINALES

  northContainer: {

    position: "absolute",

    top: 28,

    alignItems: "center",

  },

  north: {

    color: "#FF4D5A",

    fontSize: 24,

    fontWeight: "900",

  },

  northDot: {

    width: 4,

    height: 4,

    borderRadius: 2,

    backgroundColor: "#FF4D5A",

    marginTop: 2,

  },

  southContainer: {

    position: "absolute",

    bottom: 30,

  },

  eastContainer: {

    position: "absolute",

    right: 31,

  },

  westContainer: {

    position: "absolute",

    left: 31,

  },

  cardinal: {

    color: "#B1BBC4",

    fontSize: 20,

    fontWeight: "700",

  },


  // AGUJA

  needleContainer: {

    width: 40,

    height: 190,

    alignItems: "center",

    justifyContent: "center",

  },

  northNeedle: {

    position: "absolute",

    top: 0,

    width: 0,

    height: 0,

    borderLeftWidth: 8,

    borderRightWidth: 8,

    borderBottomWidth: 90,

    borderLeftColor: "transparent",

    borderRightColor: "transparent",

    borderBottomColor: "#FF4351",

  },

  southNeedle: {

    position: "absolute",

    bottom: 0,

    width: 0,

    height: 0,

    borderLeftWidth: 8,

    borderRightWidth: 8,

    borderTopWidth: 90,

    borderLeftColor: "transparent",

    borderRightColor: "transparent",

    borderTopColor: "#53606B",

  },

  centerCircle: {

    position: "absolute",

    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor: "#0B1118",

    borderWidth: 2,

    borderColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",

  },

  centerDot: {

    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor: "#FFFFFF",

  },


  // PANEL

  bottomPanel: {

    marginHorizontal: 25,

    marginTop: 15,

    paddingVertical: 15,

    borderTopWidth: 1,

    borderBottomWidth: 1,

    borderColor: "#151F29",

    flexDirection: "row",

    justifyContent: "space-around",

  },

  infoItem: {

    alignItems: "center",

    flex: 1,

  },

  infoLabel: {

    color: "#40505E",

    fontSize: 8,

    letterSpacing: 2,

  },

  infoValue: {

    color: "#B6C1CA",

    fontSize: 10,

    letterSpacing: 2,

    fontWeight: "700",

    marginTop: 5,

  },

  separator: {

    width: 1,

    height: 30,

    backgroundColor: "#1B2731",

  },

  instructions: {

    color: "#394957",

    fontSize: 8,

    letterSpacing: 2,

    textAlign: "center",

    marginTop: 16,

  },

});