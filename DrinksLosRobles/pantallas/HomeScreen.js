import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    TextInput
} from 'react-native';


export default function HomeScreen({ navigation }) {

    const [busqueda, setBusqueda] = useState('');


    /*
        LISTA DE BEBIDAS
        La utilizamos para realizar la búsqueda.
    */
    const bebidas = [
        {
            clave: 'michelada',
            nombre: 'Michelada',
            tipo: 'REFRESCANTE',
            descripcion: 'Cerveza, limón y el toque perfecto'
        },
        {
            clave: 'pinaColada',
            nombre: 'Piña Colada',
            tipo: 'TROPICAL',
            descripcion: 'Cremosa, dulce y tropical'
        },
        {
            clave: 'margarita',
            nombre: 'Margarita',
            tipo: 'CLÁSICO',
            descripcion: 'Tequila, cítricos y sal'
        },
        {
            clave: 'paloma',
            nombre: 'Paloma',
            tipo: 'MEXICANO',
            descripcion: 'Tequila y toronja'
        },
        {
            clave: 'mojito',
            nombre: 'Mojito',
            tipo: 'FRESCO',
            descripcion: 'Hierbabuena, limón y frescura'
        },
        {
            clave: 'clericot',
            nombre: 'Clericot',
            tipo: 'FRUTAL',
            descripcion: 'Vino y frutas frescas'
        },
        {
            clave: 'parisDeNoche',
            nombre: 'París de Noche',
            tipo: 'LOS ROBLES',
            descripcion: 'Preparado con Torres 10'
        }
    ];


    /*
        Quitamos acentos y convertimos el texto
        a minúsculas para facilitar la búsqueda.
    */
    function limpiarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

    }


    /*
        FILTRAMOS LAS BEBIDAS
    */
    const bebidasFiltradas = bebidas.filter(bebida => {

        const nombre = limpiarTexto(bebida.nombre);

        const textoBusqueda = limpiarTexto(busqueda);

        return nombre.includes(textoBusqueda);

    });


    /*
        ABRIR UNA RECETA
    */
    function abrirReceta(claveBebida) {

        navigation.navigate(
            'DetalleBebida',
            {
                bebida: claveBebida
            }
        );

    }


    return (

        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contenido}
                keyboardShouldPersistTaps="handled"
            >


                {/* ENCABEZADO */}

                <View style={styles.encabezado}>

                    <View>

                        <Text style={styles.marca}>
                            LOS ROBLES
                        </Text>

                        <Text style={styles.bienvenida}>
                            Aprende a preparar
                        </Text>

                        <Text style={styles.bienvenida}>
                            algo increíble.
                        </Text>

                    </View>


                    <View style={styles.logoPequeno}>

                        <Text style={styles.logoTexto}>
                            R
                        </Text>

                    </View>

                </View>



                {/* BUSCADOR */}

                <View style={styles.buscadorSeccion}>

                    <Text style={styles.tituloBuscador}>
                        ¿Qué vamos a preparar?
                    </Text>

                    <Text style={styles.subtituloBuscador}>
                        Encuentra tu bebida favorita
                    </Text>


                    <View style={styles.buscador}>

                        <Text style={styles.iconoBuscar}>
                            ⌕
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Buscar una bebida..."
                            placeholderTextColor="#666666"
                            value={busqueda}
                            onChangeText={setBusqueda}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />


                        {busqueda.length > 0 && (

                            <TouchableOpacity
                                style={styles.botonLimpiar}
                                onPress={() => setBusqueda('')}
                            >

                                <Text style={styles.textoLimpiar}>
                                    ×
                                </Text>

                            </TouchableOpacity>

                        )}

                    </View>

                </View>



                {/* CUANDO NO ESTAMOS BUSCANDO */}

                {busqueda.length === 0 && (

                    <>

                        {/* RECETA DESTACADA */}

                        <ImageBackground
                            source={require('../assets/bebidas/carajillo.png')}
                            style={styles.destacado}
                            imageStyle={styles.imagenDestacada}
                        >

                            <View style={styles.capaOscura}>

                                <Text style={styles.etiqueta}>
                                    RECETA DESTACADA
                                </Text>


                                <View style={styles.espacioImagen} />


                                <Text style={styles.nombreDrink}>
                                    Carajillo
                                </Text>


                                <Text style={styles.descripcion}>
                                    Café intenso, notas dulces y un carácter
                                    inconfundible.
                                </Text>


                                <View style={styles.datosDrink}>

                                    <Text style={styles.dato}>
                                        ◷ 5 min
                                    </Text>

                                    <Text style={styles.dato}>
                                        ◆ Fácil
                                    </Text>

                                </View>


                                <TouchableOpacity
                                    style={styles.botonPrincipal}
                                    onPress={() =>
                                        abrirReceta('carajillo')
                                    }
                                >

                                    <Text style={styles.textoBotonPrincipal}>
                                        VER RECETA  →
                                    </Text>

                                </TouchableOpacity>

                            </View>

                        </ImageBackground>


                        {/* TÍTULO DE RECETAS */}

                        <View style={styles.tituloRecetas}>

                            <Text style={styles.titulo}>
                                Aprende a preparar
                            </Text>

                            <Text style={styles.subtituloRecetas}>
                                Recetas seleccionadas por Los Robles
                            </Text>

                        </View>

                    </>

                )}



                {/* CUANDO ESTAMOS BUSCANDO */}

                {busqueda.length > 0 && (

                    <View style={styles.resultadosEncabezado}>

                        <Text style={styles.titulo}>
                            Resultados
                        </Text>

                        <Text style={styles.numeroResultados}>

                            {bebidasFiltradas.length}
                            {bebidasFiltradas.length === 1
                                ? ' bebida encontrada'
                                : ' bebidas encontradas'}

                        </Text>

                    </View>

                )}



                {/* RESULTADOS */}

                {bebidasFiltradas.map(bebida => (

                    <TouchableOpacity
                        key={bebida.clave}
                        style={styles.tarjeta}
                        onPress={() =>
                            abrirReceta(bebida.clave)
                        }
                    >

                        <View style={styles.informacionTarjeta}>

                            <Text style={styles.tipo}>
                                {bebida.tipo}
                            </Text>

                            <Text style={styles.nombreTarjeta}>
                                {bebida.nombre}
                            </Text>

                            <Text style={styles.descripcionTarjeta}>
                                {bebida.descripcion}
                            </Text>

                        </View>


                        <Text style={styles.flecha}>
                            ›
                        </Text>

                    </TouchableOpacity>

                ))}



                {/* SIN RESULTADOS */}

                {busqueda.length > 0 &&
                    bebidasFiltradas.length === 0 && (

                    <View style={styles.sinResultados}>

                        <View style={styles.iconoSinResultados}>

                            <Text style={styles.lupaGrande}>
                                ⌕
                            </Text>

                        </View>


                        <Text style={styles.tituloSinResultados}>
                            No encontramos esa bebida
                        </Text>


                        <Text style={styles.textoSinResultados}>
                            Intenta buscar otro nombre de nuestro recetario.
                        </Text>


                        <TouchableOpacity
                            style={styles.botonVerTodas}
                            onPress={() => setBusqueda('')}
                        >

                            <Text style={styles.textoVerTodas}>
                                VER TODAS LAS BEBIDAS
                            </Text>

                        </TouchableOpacity>

                    </View>

                )}


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
        paddingTop: 55,
        paddingBottom: 50
    },


    encabezado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },


    marca: {
        color: '#C9A55C',
        fontSize: 11,
        letterSpacing: 4,
        marginBottom: 8
    },


    bienvenida: {
        color: '#F5F1E8',
        fontSize: 26,
        fontWeight: 'bold'
    },


    logoPequeno: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: '#C9A55C',
        justifyContent: 'center',
        alignItems: 'center'
    },


    logoTexto: {
        color: '#C9A55C',
        fontSize: 18,
        fontWeight: 'bold'
    },


    /*
        BUSCADOR
    */

    buscadorSeccion: {
        marginBottom: 28
    },


    tituloBuscador: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: 'bold'
    },


    subtituloBuscador: {
        color: '#777777',
        fontSize: 11,
        marginTop: 5,
        marginBottom: 15
    },


    buscador: {
        height: 56,
        backgroundColor: '#151515',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#292929',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 17
    },


    iconoBuscar: {
        color: '#C9A55C',
        fontSize: 25,
        marginRight: 12,
        marginBottom: 4
    },


    input: {
        flex: 1,
        height: '100%',
        color: '#FFFFFF',
        fontSize: 14
    },


    botonLimpiar: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },


    textoLimpiar: {
        color: '#777777',
        fontSize: 25
    },


    /*
        DESTACADO
    */

    destacado: {
        height: 470,
        marginBottom: 35,
        justifyContent: 'flex-end'
    },


    imagenDestacada: {
        borderRadius: 25
    },


    capaOscura: {
        flex: 1,
        borderRadius: 25,
        padding: 24,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.32)'
    },


    espacioImagen: {
        flex: 1
    },


    etiqueta: {
        position: 'absolute',
        top: 24,
        left: 24,
        color: '#E2BD70',
        fontSize: 10,
        letterSpacing: 3,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20
    },


    nombreDrink: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 7
    },


    descripcion: {
        color: '#E0E0E0',
        fontSize: 13,
        lineHeight: 20,
        maxWidth: 300,
        marginBottom: 15
    },


    datosDrink: {
        flexDirection: 'row',
        marginBottom: 20
    },


    dato: {
        color: '#FFFFFF',
        fontSize: 12,
        marginRight: 20
    },


    botonPrincipal: {
        backgroundColor: '#C9A55C',
        paddingVertical: 16,
        borderRadius: 13,
        alignItems: 'center'
    },


    textoBotonPrincipal: {
        color: '#0B0B0B',
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 11
    },


    /*
        RECETAS
    */

    tituloRecetas: {
        marginBottom: 20
    },


    titulo: {
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: 'bold'
    },


    subtituloRecetas: {
        color: '#777777',
        fontSize: 12,
        marginTop: 6
    },


    resultadosEncabezado: {
        marginBottom: 20
    },


    numeroResultados: {
        color: '#777777',
        fontSize: 11,
        marginTop: 6
    },


    tarjeta: {
        backgroundColor: '#151515',
        padding: 20,
        borderRadius: 17,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#222222'
    },


    informacionTarjeta: {
        flex: 1,
        paddingRight: 15
    },


    tipo: {
        color: '#C9A55C',
        fontSize: 9,
        letterSpacing: 2,
        marginBottom: 6
    },


    nombreTarjeta: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },


    descripcionTarjeta: {
        color: '#777777',
        marginTop: 4,
        fontSize: 12
    },


    flecha: {
        color: '#C9A55C',
        fontSize: 35,
        fontWeight: '200'
    },


    /*
        SIN RESULTADOS
    */

    sinResultados: {
        backgroundColor: '#151515',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#252525',
        padding: 28,
        alignItems: 'center',
        marginTop: 5
    },


    iconoSinResultados: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#C9A55C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },


    lupaGrande: {
        color: '#C9A55C',
        fontSize: 30,
        marginBottom: 5
    },


    tituloSinResultados: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },


    textoSinResultados: {
        color: '#777777',
        fontSize: 12,
        lineHeight: 19,
        textAlign: 'center',
        marginTop: 8
    },


    botonVerTodas: {
        borderWidth: 1,
        borderColor: '#C9A55C',
        borderRadius: 13,
        paddingVertical: 13,
        paddingHorizontal: 20,
        marginTop: 22
    },


    textoVerTodas: {
        color: '#C9A55C',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 2
    },


    marcaInferior: {
        color: '#454545',
        textAlign: 'center',
        fontSize: 9,
        letterSpacing: 2,
        marginTop: 35
    }

});