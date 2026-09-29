import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity
} from 'react-native';

export default function SplashScreen({ navigation }) {

    const opacidad = useRef(new Animated.Value(0)).current;
    const escala = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {

        Animated.parallel([

            Animated.timing(opacidad, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }),

            Animated.spring(escala, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })

        ]).start();

    }, []);


    return (
        <View style={styles.container}>

            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: opacidad,
                        transform: [{ scale: escala }]
                    }
                ]}
            >

                <Text style={styles.simbolo}>
                    ♜
                </Text>

                <Text style={styles.titulo}>
                    LOS ROBLES
                </Text>

                <View style={styles.linea} />

                <Text style={styles.subtitulo}>
                    COCKTAIL EXPERIENCE
                </Text>


                <TouchableOpacity
                    style={styles.botonEntrar}
                    onPress={() => navigation.replace('Home')}
                >
                    <Text style={styles.textoBoton}>
                        ENTRAR
                    </Text>

                    <Text style={styles.flecha}>
                        →
                    </Text>
                </TouchableOpacity>

            </Animated.View>


            <Text style={styles.textoInferior}>
                MIX • SHAKE • ENJOY
            </Text>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0B0B0B',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },

    logoContainer: {
        alignItems: 'center'
    },

    simbolo: {
        fontSize: 48,
        color: '#C9A55C',
        marginBottom: 15
    },

    titulo: {
        color: '#F5F1E8',
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 5
    },

    linea: {
        width: 65,
        height: 2,
        backgroundColor: '#C9A55C',
        marginVertical: 15
    },

    subtitulo: {
        color: '#C9A55C',
        fontSize: 12,
        letterSpacing: 4
    },

    botonEntrar: {
        marginTop: 55,
        width: 210,
        height: 55,
        borderWidth: 1,
        borderColor: '#C9A55C',
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoBoton: {
        color: '#F5F1E8',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 4
    },

    flecha: {
        color: '#C9A55C',
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 2
    },

    textoInferior: {
        position: 'absolute',
        bottom: 55,
        color: '#777777',
        fontSize: 10,
        letterSpacing: 3
    }

});