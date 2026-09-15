import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Pedometer } from "expo-sensors";

export default function PedometerSensor() {
  const [pasos, setDatos] = useState(0);
  const [disponible, setDisponible] = useState(false);
    
  

  useEffect(
    () => {
        let subscribir;

        const iniciar = async () => {
            const disponible = await Pedometer.isAvailableAsync();

            setDisponible(disponible);

            if (disponible) {
                subscribir = Pedometer.watchStepCount(
                    result => {setPasos(result.steps)}
                );
            }
        };

        iniciar();

        return () => {
            if (subscribir) {
                subscribir.remove(); 
            }
        };
    },[]
);

return (
    <View style={styles.container}>
        <Text style={styles.title}>
    Podómetro
</Text>

<View style={styles.card}>
    <Text style={styles.axis}>Disponible</Text>
    <Text style={styles.value}>{disponible ? 'SI' : 'NO'}</Text>
</View>

<View style={styles.card}>
    <Text style={styles.axis}>Pasos</Text>
    <Text style={styles.value}>{pasos}</Text>
</View>

<View style={styles.card}>
    <Text style={styles.axis}>Pasos Detectados</Text>
    
</View>
</View>
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#ecf0f1',
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        marginBottom: 35,
        color: '#34495e',
    },
    
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    axis: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },

});