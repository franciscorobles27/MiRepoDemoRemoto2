import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet, Keyboard } from "react-native";

export default function IMC() {

    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [resultado, setResultado] = useState("");
    const [frase, setFrase] = useState("");
    const [modal, setModal] = useState(false);

    const calcular = () => {

        const imc = peso / (altura * altura);

        setResultado(imc.toFixed(1));

        if (imc < 18.5) {
            setFrase("¡Sigue cuidándote, cada paso cuenta!");
        } else if (imc < 25) {
            setFrase("¡Excelente! Sigue manteniendo tus buenos hábitos.");
        } else if (imc < 30) {
            setFrase("¡Tú puedes! Pequeños cambios hacen una gran diferencia.");
        } else {
            setFrase("¡No te rindas! Cada día es una nueva oportunidad.");
        }

        Keyboard.dismiss();
        setModal(true);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Calculadora IMC
            </Text>

            <Text>Peso (Kg)</Text>

            <TextInput
                style={styles.input}
                placeholder="70"
                keyboardType="numeric"
                onChangeText={setPeso}
            />

            <Text>Altura (m)</Text>

            <TextInput
                style={styles.input}
                placeholder="1.75"
                keyboardType="numeric"
                onChangeText={setAltura}
            />

            <Button
                title="Calcular IMC"
                onPress={calcular}
            />

            <Modal
                visible={modal}
                transparent={true}
            >

                <View style={styles.fondoModal}>

                    <View style={styles.modal}>

                        <Text>Tu IMC es:</Text>

                        <Text style={styles.resultado}>
                            {resultado}
                        </Text>

                        <Text style={styles.frase}>
                            {frase}
                        </Text>

                        <Button
                            title="Aceptar"
                            onPress={() => setModal(false)}
                        />

                    </View>

                </View>

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f5f7",
        padding: 30,
        paddingTop: 100,
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1d3557",
        marginBottom: 40,
    },

    input: {
        height: 50,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
    },

    fondoModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modal: {
        width: "80%",
        backgroundColor: "white",
        padding: 30,
        borderRadius: 15,
        alignItems: "center",
    },

    resultado: {
        fontSize: 45,
        fontWeight: "bold",
        color: "#1d3557",
        margin: 20,
    },

    frase: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },

});