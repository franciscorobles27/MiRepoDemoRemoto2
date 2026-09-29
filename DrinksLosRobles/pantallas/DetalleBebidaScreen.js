import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';

import bebidas from '../datos/bebidas';


export default function DetalleBebidaScreen({ navigation, route }) {

    const claveBebida = route.params?.bebida || 'carajillo';

    const bebida = bebidas[claveBebida];


    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contenido}
            >

                {/* REGRESAR */}
                <TouchableOpacity
                    style={styles.botonRegresar}
                    onPress={() => navigation.goBack()}
                >

                    <Text style={styles.flechaRegresar}>
                        ←
                    </Text>

                    <Text style={styles.textoRegresar}>
                        Volver
                    </Text>

                </TouchableOpacity>


                {/* IMAGEN */}
                <Image
                    source={bebida.imagen}
                    style={styles.imagen}
                />


                {/* INFORMACIÓN */}
                <Text style={styles.categoria}>
                    {bebida.categoria}
                </Text>

                <Text style={styles.titulo}>
                    {bebida.nombre}
                </Text>

                <Text style={styles.descripcion}>
                    {bebida.descripcion}
                </Text>


                {/* DATOS */}
                <View style={styles.datosContainer}>

                    <View style={styles.dato}>

                        <Text style={styles.iconoDato}>
                            ◷
                        </Text>

                        <Text style={styles.valorDato}>
                            {bebida.tiempo}
                        </Text>

                        <Text style={styles.nombreDato}>
                            Tiempo
                        </Text>

                    </View>


                    <View style={styles.separador} />


                    <View style={styles.dato}>

                        <Text style={styles.iconoDato}>
                            ◆
                        </Text>

                        <Text style={styles.valorDato}>
                            {bebida.dificultad}
                        </Text>

                        <Text style={styles.nombreDato}>
                            Dificultad
                        </Text>

                    </View>


                    <View style={styles.separador} />


                    <View style={styles.dato}>

                        <Text style={styles.iconoDato}>
                            1
                        </Text>

                        <Text style={styles.valorDato}>
                            {bebida.porcion}
                        </Text>

                        <Text style={styles.nombreDato}>
                            Cantidad
                        </Text>

                    </View>

                </View>


                {/* INGREDIENTES */}
                <Text style={styles.tituloSeccion}>
                    Ingredientes
                </Text>

                <Text style={styles.subtituloSeccion}>
                    Todo lo que necesitas para preparar esta bebida.
                </Text>


                <View style={styles.ingredientesContainer}>

                    {bebida.ingredientes.map(
                        (ingrediente, index) => (

                            <View key={index}>

                                <View style={styles.ingrediente}>

                                    <View style={styles.numeroIngrediente}>

                                        <Text style={styles.numeroTexto}>
                                            {String(index + 1).padStart(2, '0')}
                                        </Text>

                                    </View>


                                    <View style={styles.infoIngrediente}>

                                        <Text style={styles.nombreIngrediente}>
                                            {ingrediente.nombre}
                                        </Text>

                                        <Text style={styles.cantidadIngrediente}>
                                            {ingrediente.cantidad}
                                        </Text>

                                    </View>

                                </View>


                                {index <
                                    bebida.ingredientes.length - 1 && (

                                    <View
                                        style={styles.lineaIngrediente}
                                    />

                                )}

                            </View>

                        )
                    )}

                </View>


                {/* PREPARACIÓN */}
                <Text style={styles.tituloSeccion}>
                    Preparación
                </Text>

                <Text style={styles.subtituloSeccion}>
                    Sigue estos pasos para obtener el mejor resultado.
                </Text>


                {bebida.pasos.map((paso, index) => (

                    <View
                        style={styles.paso}
                        key={index}
                    >

                        <Text style={styles.numeroPaso}>
                            {String(index + 1).padStart(2, '0')}
                        </Text>


                        <View style={styles.informacionPaso}>

                            <Text style={styles.tituloPaso}>
                                {paso.titulo}
                            </Text>

                            <Text style={styles.descripcionPaso}>
                                {paso.descripcion}
                            </Text>

                        </View>

                    </View>

                ))}


                {/* COMENZAR */}
                <TouchableOpacity
                    style={styles.botonPreparar}
                    onPress={() =>
                        navigation.navigate(
                            'Preparacion',
                            {
                                bebida: claveBebida
                            }
                        )
                    }
                >

                    <Text style={styles.textoBotonPreparar}>
                        COMENZAR PREPARACIÓN
                    </Text>

                    <Text style={styles.flechaBoton}>
                        →
                    </Text>

                </TouchableOpacity>


                <Text style={styles.marcaInferior}>
                    LOS ROBLES • COCKTAIL EXPERIENCE
                </Text>

            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0B0B0B'
    },

    contenido: {
        padding: 22,
        paddingTop: 50,
        paddingBottom: 50
    },

    botonRegresar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22
    },

    flechaRegresar: {
        color: '#C9A55C',
        fontSize: 25,
        marginRight: 10
    },

    textoRegresar: {
        color: '#FFFFFF',
        fontSize: 14
    },

    imagen: {
        width: '100%',
        height: 360,
        borderRadius: 24,
        marginBottom: 28
    },

    categoria: {
        color: '#C9A55C',
        fontSize: 10,
        letterSpacing: 3,
        marginBottom: 8
    },

    titulo: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 12
    },

    descripcion: {
        color: '#999999',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 25
    },

    datosContainer: {
        backgroundColor: '#151515',
        borderRadius: 18,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#242424',
        marginBottom: 35
    },

    dato: {
        alignItems: 'center',
        flex: 1
    },

    iconoDato: {
        color: '#C9A55C',
        fontSize: 17,
        marginBottom: 6
    },

    valorDato: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    nombreDato: {
        color: '#666666',
        fontSize: 10,
        marginTop: 3
    },

    separador: {
        height: 38,
        width: 1,
        backgroundColor: '#303030'
    },

    tituloSeccion: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10
    },

    subtituloSeccion: {
        color: '#777777',
        fontSize: 12,
        marginTop: 6,
        marginBottom: 20
    },

    ingredientesContainer: {
        backgroundColor: '#151515',
        borderRadius: 18,
        padding: 20,
        marginBottom: 35,
        borderWidth: 1,
        borderColor: '#242424'
    },

    ingrediente: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },

    numeroIngrediente: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: '#C9A55C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },

    numeroTexto: {
        color: '#C9A55C',
        fontSize: 11,
        fontWeight: 'bold'
    },

    infoIngrediente: {
        flex: 1
    },

    nombreIngrediente: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    },

    cantidadIngrediente: {
        color: '#777777',
        fontSize: 12,
        marginTop: 3
    },

    lineaIngrediente: {
        height: 1,
        backgroundColor: '#242424',
        marginVertical: 10
    },

    paso: {
        flexDirection: 'row',
        marginBottom: 25
    },

    numeroPaso: {
        color: '#C9A55C',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 20
    },

    informacionPaso: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#202020',
        paddingBottom: 20
    },

    tituloPaso: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },

    descripcionPaso: {
        color: '#777777',
        fontSize: 13,
        lineHeight: 20
    },

    botonPreparar: {
        backgroundColor: '#C9A55C',
        borderRadius: 15,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoBotonPreparar: {
        color: '#0B0B0B',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2
    },

    flechaBoton: {
        color: '#0B0B0B',
        fontSize: 20,
        marginLeft: 12
    },

    marcaInferior: {
        color: '#454545',
        textAlign: 'center',
        fontSize: 9,
        letterSpacing: 2,
        marginTop: 35
    }

});