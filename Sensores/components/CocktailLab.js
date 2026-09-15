import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";

import { Accelerometer } from "expo-sensors";

export default function CocktailLab() {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [drink, setDrink] = useState(null);
  const [intensity, setIntensity] = useState(0);

  // Valores que no necesitan provocar renderizado
  const progressRef = useRef(0);
  const totalIntensity = useRef(0);
  const shakes = useRef(0);
  const canDetectShake = useRef(true);

  // Animaciones
  const shakerX = useRef(new Animated.Value(0)).current;
  const resultScale = useRef(new Animated.Value(0)).current;

  const drinks = {
    soft: {
      emoji: "🍋",
      name: "Citrus Chill",
      description: "Una mezcla fresca y ligera",
      ingredients: "Limón • Menta • Agua mineral",
    },

    medium: {
      emoji: "🍹",
      name: "Tropical Sunset",
      description: "Una mezcla tropical equilibrada",
      ingredients: "Naranja • Piña • Coco",
    },

    strong: {
      emoji: "🔥",
      name: "Dragon Punch",
      description: "Una mezcla intensa y explosiva",
      ingredients: "Mango • Limón • Frutos rojos",
    },
  };

  const animateShaker = () => {
    Animated.sequence([
      Animated.timing(shakerX, {
        toValue: -18,
        duration: 50,
        useNativeDriver: true,
      }),

      Animated.timing(shakerX, {
        toValue: 18,
        duration: 50,
        useNativeDriver: true,
      }),

      Animated.timing(shakerX, {
        toValue: -12,
        duration: 50,
        useNativeDriver: true,
      }),

      Animated.timing(shakerX, {
        toValue: 12,
        duration: 50,
        useNativeDriver: true,
      }),

      Animated.timing(shakerX, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const finishDrink = (averageIntensity) => {
    let selectedDrink;

    if (averageIntensity < 2.8) {
      selectedDrink = drinks.soft;
    } else if (averageIntensity < 3.8) {
      selectedDrink = drinks.medium;
    } else {
      selectedDrink = drinks.strong;
    }

    setIntensity(averageIntensity);
    setDrink(selectedDrink);
    setFinished(true);

    resultScale.setValue(0);

    Animated.spring(resultScale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  const detectShake = (x, y, z) => {
    if (finished || !canDetectShake.current) {
      return;
    }

    // Magnitud total de aceleración
    const acceleration = Math.sqrt(
      x * x +
      y * y +
      z * z
    );

    // Detectamos una sacudida
    if (acceleration > 1.8) {
      canDetectShake.current = false;

      animateShaker();

      shakes.current += 1;
      totalIntensity.current += acceleration;

      // Mientras más fuerte sea la sacudida,
      // más rápido aumenta el progreso
      const increase = Math.min(
        Math.round(acceleration * 4),
        15
      );

      const newProgress = Math.min(
        progressRef.current + increase,
        100
      );

      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress >= 100) {
        const average =
          totalIntensity.current / shakes.current;

        finishDrink(average);
      }

      // Evita registrar muchas veces la misma sacudida
      setTimeout(() => {
        canDetectShake.current = true;
      }, 250);
    }
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscriber = Accelerometer.addListener(
      ({ x, y, z }) => {
        detectShake(x, y, z);
      }
    );

    return () => {
      subscriber.remove();
    };
  }, [finished]);

  const resetDrink = () => {
    progressRef.current = 0;
    totalIntensity.current = 0;
    shakes.current = 0;

    setProgress(0);
    setFinished(false);
    setDrink(null);
    setIntensity(0);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.brand}>
          MIX LAB
        </Text>

        <Text style={styles.title}>
          Cocktail Lab
        </Text>

        <Text style={styles.subtitle}>
          Shake. Mix. Discover.
        </Text>
      </View>

      {!finished ? (
        <>
          <View style={styles.shakerArea}>

            <Animated.Text
              style={[
                styles.shaker,
                {
                  transform: [
                    { translateX: shakerX }
                  ],
                },
              ]}
            >
              🥤
            </Animated.Text>

            <Text style={styles.shakeTitle}>
              ¡Agita tu teléfono!
            </Text>

            <Text style={styles.instructions}>
              Sacude el dispositivo para mezclar
              los ingredientes
            </Text>

          </View>

          <View style={styles.progressSection}>

            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                MEZCLANDO
              </Text>

              <Text style={styles.percentage}>
                {progress}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progress}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.tip}>
              Entre más fuerte sacudas, más intensa
              será tu bebida.
            </Text>

          </View>
        </>
      ) : (
        <Animated.View
          style={[
            styles.resultContainer,
            {
              transform: [
                { scale: resultScale }
              ],
            },
          ]}
        >

          <Text style={styles.completed}>
            ✦ MEZCLA COMPLETADA ✦
          </Text>

          <Text style={styles.drinkEmoji}>
            {drink?.emoji}
          </Text>

          <Text style={styles.drinkName}>
            {drink?.name}
          </Text>

          <Text style={styles.drinkDescription}>
            {drink?.description}
          </Text>

          <View style={styles.ingredientCard}>

            <Text style={styles.ingredientTitle}>
              INGREDIENTES
            </Text>

            <Text style={styles.ingredients}>
              {drink?.ingredients}
            </Text>

          </View>

          <View style={styles.intensityCard}>

            <Text style={styles.intensityLabel}>
              INTENSIDAD DE MEZCLA
            </Text>

            <Text style={styles.intensityValue}>
              {intensity.toFixed(1)}
            </Text>

          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={resetDrink}
          >
            <Text style={styles.buttonText}>
              PREPARAR OTRA
            </Text>
          </Pressable>

        </Animated.View>
      )}

      <Text style={styles.footer}>
        Powered by Accelerometer
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1117",
    paddingHorizontal: 25,
    paddingTop: 65,
    paddingBottom: 30,
  },

  header: {
    alignItems: "center",
  },

  brand: {
    color: "#8B98A8",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 7,
  },

  subtitle: {
    color: "#6E7988",
    fontSize: 14,
    marginTop: 5,
    letterSpacing: 1,
  },

  shakerArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  shaker: {
    fontSize: 125,
    marginBottom: 20,
  },

  shakeTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  instructions: {
    color: "#7C8795",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  progressSection: {
    backgroundColor: "#151C24",
    padding: 20,
    borderRadius: 22,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  progressLabel: {
    color: "#7D8998",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  percentage: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#29313B",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  tip: {
    color: "#697482",
    fontSize: 11,
    textAlign: "center",
    marginTop: 13,
  },

  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  completed: {
    color: "#8793A2",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  drinkEmoji: {
    fontSize: 100,
    marginVertical: 15,
  },

  drinkName: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "900",
  },

  drinkDescription: {
    color: "#7E8997",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 25,
  },

  ingredientCard: {
    backgroundColor: "#151C24",
    width: "100%",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 12,
  },

  ingredientTitle: {
    color: "#697482",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  ingredients: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 7,
  },

  intensityCard: {
    backgroundColor: "#151C24",
    width: "100%",
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  intensityLabel: {
    color: "#798594",
    fontSize: 11,
    fontWeight: "bold",
  },

  intensityValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  button: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 17,
    borderRadius: 17,
    alignItems: "center",
    marginTop: 18,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    color: "#0C1117",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },

  footer: {
    color: "#414B57",
    textAlign: "center",
    fontSize: 10,
    marginTop: 20,
    letterSpacing: 1,
  },
});