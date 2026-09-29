import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';

import { Accelerometer } from 'expo-sensors';

import bebidas from '../datos/bebidas';


export default function PreparacionScreen({ navigation, route }) {

    const claveBebida = route.params?.bebida || 'carajillo';

    const bebida = bebidas[claveBebida];

    const [pasoActual, setPasoActual] = useState(0);

    const [agitaciones, setAgitaciones] = useState(0);

    const [mezclaCompleta, setMezclaCompleta] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);


    const paso = bebida.pasos[pasoActual];

    const totalPasos = bebida.pasos.length;


    /*
        TIPS DEL BARTENDER
    */
    const tips = {

        carajillo:
            'Utiliza bastante hielo al agitar. Esto ayuda a enfriar rápidamente la bebida y conseguir una ligera capa de espuma.',

        michelada:
            'Sirve la cerveza lentamente para evitar demasiada espuma y conservar mejor la mezcla de limón y salsas.',

        pinaColada:
            'Licúa únicamente hasta conseguir una textura cremosa. Si licúas demasiado, el hielo puede volver la bebida muy líquida.',

        margarita:
            'Enfría la copa antes de servir. Una copa fría ayuda a mantener la Margarita refrescante durante más tiempo.',

        paloma:
            'Agrega el refresco de toronja al final y mezcla suavemente para conservar la mayor cantidad posible de gas.',

        mojito:
            'No tritures demasiado la hierbabuena. Presiónala suavemente para liberar su aroma sin darle un sabor amargo.',

        clericot:
            'Deja reposar unos minutos la fruta con el vino antes de servir para que los sabores se integren mejor.',

        parisDeNoche:
            'Agita bien la mezcla con hielo para conseguir una textura fría y cremosa antes de terminar con un toque de canela.'

    };


    const tipActual = tips[claveBebida];


    /*
        Revisamos si el paso necesita
        utilizar el acelerómetro.
    */
    const textoPaso =
        (paso.titulo + ' ' + paso.descripcion).toLowerCase();


    const necesitaAgitar =
        textoPaso.includes('agita') ||
        textoPaso.includes('agitar');


    /*
        ACELERÓMETRO
    */
    useEffect(() => {

        let subscriber;

        setAgitaciones(0);
        setMezclaCompleta(false);


        if (necesitaAgitar) {

            Accelerometer.setUpdateInterval(150);

            subscriber = Accelerometer.addListener(
                datos => {

                    const movimiento =
                        Math.abs(datos.x) +
                        Math.abs(datos.y) +
                        Math.abs(datos.z);


                    if (movimiento > 2.8) {

                        setAgitaciones(valor => {

                            const nuevoValor = valor + 1;


                            if (nuevoValor >= 8) {

                                setMezclaCompleta(true);

                                return 8;
                            }


                            return nuevoValor;
                        });
                    }
                }
            );
        }


        return () => {

            if (subscriber) {
                subscriber.remove();
            }

        };

    }, [pasoActual]);


    /*
        SIGUIENTE PASO
    */
    function siguientePaso() {

        if (pasoActual < totalPasos - 1) {

            setPasoActual(pasoActual + 1);

        } else {

            navigation.navigate('Home');

        }
    }


    /*
        PASO ANTERIOR
    */
    function pasoAnterior() {

        if (pasoActual > 0) {

            setPasoActual(pasoActual - 1);

        }
    }


    /*
        PORCENTAJE DEL SHAKER
    */
    const porcentajeAgitado =
        (agitaciones / 8) * 100;


    return (

        <View style={styles.container}>


            {/* ENCABEZADO */}

            <View style={styles.encabezado}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >

                    <Text style={styles.cerrar}>
                        ×
                    </Text>

                </TouchableOpacity>


                <Text style={styles.marca}>
                    LOS ROBLES
                </Text>


                <TouchableOpacity
                    style={styles.botonTipSuperior}
                    onPress={() => setModalVisible(true)}
                >

                    <Text style={styles.iconoTip}>
                        ?
                    </Text>

                </TouchableOpacity>

            </View>



            {/* INFORMACIÓN */}

            <View style={styles.informacion}>

                <Text style={styles.preparando}>
                    PREPARANDO
                </Text>


                <Text style={styles.nombreBebida}>
                    {bebida.nombre}
                </Text>



                {/* PROGRESO */}

                <View style={styles.progresoContainer}>

                    <Text style={styles.numeroProgreso}>

                        PASO {pasoActual + 1} DE {totalPasos}

                    </Text>


                    <View style={styles.barraFondo}>

                        <View
                            style={[
                                styles.barraProgreso,
                                {
                                    width:
                                        `${((pasoActual + 1) /
                                            totalPasos) * 100}%`
                                }
                            ]}
                        />

                    </View>

                </View>



                {/* PASO */}

                <View style={styles.pasoContainer}>

                    <Text style={styles.numeroPaso}>

                        {String(pasoActual + 1).padStart(2, '0')}

                    </Text>


                    <Text style={styles.tituloPaso}>
                        {paso.titulo}
                    </Text>


                    <Text style={styles.descripcionPaso}>
                        {paso.descripcion}
                    </Text>



                    {/* SENSOR */}

                    {necesitaAgitar && (

                        <View style={styles.sensorContainer}>

                            <View style={styles.lineaSensor} />


                            {!mezclaCompleta ? (

                                <>

                                    <Text style={styles.iconoTelefono}>
                                        📱
                                    </Text>


                                    <Text style={styles.tituloSensor}>
                                        AGITA PARA MEZCLAR
                                    </Text>


                                    <Text style={styles.descripcionSensor}>
                                        Agita tu teléfono como si fuera
                                        un shaker.
                                    </Text>


                                    <View style={styles.barraSensorFondo}>

                                        <View
                                            style={[
                                                styles.barraSensor,
                                                {
                                                    width:
                                                        `${porcentajeAgitado}%`
                                                }
                                            ]}
                                        />

                                    </View>


                                    <Text style={styles.contadorSensor}>

                                        {agitaciones} / 8 movimientos

                                    </Text>

                                </>

                            ) : (

                                <View style={styles.completadoContainer}>

                                    <Text style={styles.check}>
                                        ✓
                                    </Text>


                                    <View style={styles.textoCompletado}>

                                        <Text style={styles.completadoTitulo}>
                                            MEZCLA COMPLETADA
                                        </Text>

                                        <Text style={styles.completadoTexto}>
                                            Perfecto, puedes continuar.
                                        </Text>

                                    </View>

                                </View>

                            )}

                        </View>

                    )}

                </View>



                {/* BOTÓN DEL TIP */}

                <TouchableOpacity
                    style={styles.botonTip}
                    onPress={() => setModalVisible(true)}
                >

                    <Text style={styles.simboloTip}>
                        ✦
                    </Text>


                    <View style={styles.infoTip}>

                        <Text style={styles.textoTipPequeno}>
                            CONSEJO ESPECIAL
                        </Text>

                        <Text style={styles.textoTip}>
                            Tip del bartender
                        </Text>

                    </View>


                    <Text style={styles.flechaTip}>
                        →
                    </Text>

                </TouchableOpacity>

            </View>



            {/* BOTONES */}

            <View style={styles.botonesContainer}>


                {pasoActual > 0 && (

                    <TouchableOpacity
                        style={styles.botonAnterior}
                        onPress={pasoAnterior}
                    >

                        <Text style={styles.textoAnterior}>
                            ← ANTERIOR
                        </Text>

                    </TouchableOpacity>

                )}



                <TouchableOpacity
                    style={[
                        styles.botonSiguiente,

                        necesitaAgitar &&
                        !mezclaCompleta &&
                        styles.botonBloqueado
                    ]}

                    disabled={
                        necesitaAgitar &&
                        !mezclaCompleta
                    }

                    onPress={siguientePaso}
                >

                    <Text
                        style={[
                            styles.textoSiguiente,

                            necesitaAgitar &&
                            !mezclaCompleta &&
                            styles.textoBloqueado
                        ]}
                    >

                        {
                            necesitaAgitar &&
                            !mezclaCompleta

                                ? 'AGITA PRIMERO'

                                : pasoActual === totalPasos - 1

                                    ? 'FINALIZAR'

                                    : 'SIGUIENTE'
                        }

                    </Text>


                    {
                        (!necesitaAgitar ||
                            mezclaCompleta) && (

                            <Text style={styles.flecha}>
                                →
                            </Text>

                        )
                    }

                </TouchableOpacity>

            </View>



            <Text style={styles.textoInferior}>
                MIX • SHAKE • ENJOY
            </Text>



            {/* MODAL */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >

                <View style={styles.fondoModal}>

                    <View style={styles.modalContainer}>


                        <View style={styles.iconoModal}>

                            <Text style={styles.estrellaModal}>
                                ✦
                            </Text>

                        </View>


                        <Text style={styles.modalCategoria}>
                            LOS ROBLES
                        </Text>


                        <Text style={styles.modalTitulo}>
                            Tip del Bartender
                        </Text>


                        <View style={styles.lineaModal} />


                        <Text style={styles.modalBebida}>
                            {bebida.nombre}
                        </Text>


                        <Text style={styles.modalTexto}>
                            {tipActual}
                        </Text>


                        <TouchableOpacity
                            style={styles.botonEntendido}
                            onPress={() => setModalVisible(false)}
                        >

                            <Text style={styles.textoEntendido}>
                                ENTENDIDO
                            </Text>

                        </TouchableOpacity>


                    </View>

                </View>

            </Modal>


        </View>
    );
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0B0B0B',
        padding: 25,
        paddingTop: 55
    },


    encabezado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },


    cerrar: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '200'
    },


    marca: {
        color: '#C9A55C',
        fontSize: 11,
        letterSpacing: 4,
        fontWeight: 'bold'
    },


    botonTipSuperior: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#C9A55C',
        justifyContent: 'center',
        alignItems: 'center'
    },


    iconoTip: {
        color: '#C9A55C',
        fontSize: 13,
        fontWeight: 'bold'
    },


    informacion: {
        flex: 1,
        justifyContent: 'center'
    },


    preparando: {
        color: '#C9A55C',
        fontSize: 10,
        letterSpacing: 4,
        marginBottom: 8
    },


    nombreBebida: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 25
    },


    progresoContainer: {
        marginBottom: 28
    },


    numeroProgreso: {
        color: '#777777',
        fontSize: 10,
        letterSpacing: 2,
        marginBottom: 12
    },


    barraFondo: {
        height: 3,
        backgroundColor: '#252525',
        borderRadius: 5,
        overflow: 'hidden'
    },


    barraProgreso: {
        height: 3,
        backgroundColor: '#C9A55C',
        borderRadius: 5
    },


    pasoContainer: {
        backgroundColor: '#151515',
        borderRadius: 25,
        padding: 25,
        borderWidth: 1,
        borderColor: '#252525'
    },


    numeroPaso: {
        color: '#C9A55C',
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 15
    },


    tituloPaso: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10
    },


    descripcionPaso: {
        color: '#999999',
        fontSize: 14,
        lineHeight: 21
    },


    sensorContainer: {
        marginTop: 20,
        alignItems: 'center'
    },


    lineaSensor: {
        width: '100%',
        height: 1,
        backgroundColor: '#303030',
        marginBottom: 17
    },


    iconoTelefono: {
        fontSize: 32,
        marginBottom: 8
    },


    tituloSensor: {
        color: '#C9A55C',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 6
    },


    descripcionSensor: {
        color: '#777777',
        fontSize: 11,
        textAlign: 'center',
        marginBottom: 15
    },


    barraSensorFondo: {
        width: '100%',
        height: 7,
        backgroundColor: '#292929',
        borderRadius: 10,
        overflow: 'hidden'
    },


    barraSensor: {
        height: 7,
        backgroundColor: '#C9A55C',
        borderRadius: 10
    },


    contadorSensor: {
        color: '#666666',
        fontSize: 10,
        marginTop: 7
    },


    completadoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        borderRadius: 15,
        padding: 14
    },


    check: {
        color: '#C9A55C',
        fontSize: 28,
        marginRight: 15
    },


    textoCompletado: {
        flex: 1
    },


    completadoTitulo: {
        color: '#C9A55C',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1
    },


    completadoTexto: {
        color: '#777777',
        fontSize: 10,
        marginTop: 3
    },


    botonTip: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#2C2C2C',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },


    simboloTip: {
        color: '#C9A55C',
        fontSize: 21,
        marginRight: 13
    },


    infoTip: {
        flex: 1
    },


    textoTipPequeno: {
        color: '#666666',
        fontSize: 8,
        letterSpacing: 2
    },


    textoTip: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 3
    },


    flechaTip: {
        color: '#C9A55C',
        fontSize: 19
    },


    botonesContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },


    botonAnterior: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 15,
        paddingVertical: 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },


    textoAnterior: {
        color: '#999999',
        fontSize: 10,
        letterSpacing: 1
    },


    botonSiguiente: {
        flex: 1.4,
        backgroundColor: '#C9A55C',
        borderRadius: 15,
        paddingVertical: 17,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },


    botonBloqueado: {
        backgroundColor: '#292929'
    },


    textoSiguiente: {
        color: '#0B0B0B',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2
    },


    textoBloqueado: {
        color: '#666666'
    },


    flecha: {
        color: '#0B0B0B',
        fontSize: 20,
        marginLeft: 10
    },


    textoInferior: {
        color: '#444444',
        textAlign: 'center',
        fontSize: 9,
        letterSpacing: 3,
        marginBottom: 10
    },


    /*
        ESTILOS DEL MODAL
    */

    fondoModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },


    modalContainer: {
        width: '100%',
        backgroundColor: '#151515',
        borderRadius: 25,
        padding: 28,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3A3325'
    },


    iconoModal: {
        width: 55,
        height: 55,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#C9A55C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },


    estrellaModal: {
        color: '#C9A55C',
        fontSize: 25
    },


    modalCategoria: {
        color: '#C9A55C',
        fontSize: 9,
        letterSpacing: 4,
        marginBottom: 8
    },


    modalTitulo: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold'
    },


    lineaModal: {
        width: 45,
        height: 1,
        backgroundColor: '#C9A55C',
        marginVertical: 18
    },


    modalBebida: {
        color: '#C9A55C',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 12
    },


    modalTexto: {
        color: '#A0A0A0',
        fontSize: 14,
        lineHeight: 23,
        textAlign: 'center'
    },


    botonEntendido: {
        width: '100%',
        backgroundColor: '#C9A55C',
        borderRadius: 14,
        paddingVertical: 17,
        alignItems: 'center',
        marginTop: 28
    },


    textoEntendido: {
        color: '#0B0B0B',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2
    }

});