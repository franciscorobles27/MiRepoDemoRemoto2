import React, { useRef, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import {
    CameraView,
    useCameraPermissions
} from 'expo-camera';

import {
    Asset,
    usePermissions
} from 'expo-media-library';


export default function App() {

    /*
        PERMISOS
    */
    const [permisoCamara, solicitarPermisoCamara] =
        useCameraPermissions();

    const [permisoGaleria, solicitarPermisoGaleria] =
        usePermissions({
            writeOnly: true,
            granularPermissions: ['photo']
        });


    /*
        ESTADOS
    */
    const [foto, setFoto] = useState(null);

    const [tipoCamara, setTipoCamara] =
        useState('front');


    /*
        REFERENCIA DE LA CÁMARA
    */
    const camara = useRef(null);


    /*
        SOLICITAR PERMISOS
    */
    async function solicitarPermisos() {

        await solicitarPermisoCamara();

        await solicitarPermisoGaleria();

    }


    /*
        VOLTEAR CÁMARA
    */
    function voltearCamara() {

        if (tipoCamara === 'front') {

            setTipoCamara('back');

        } else {

            setTipoCamara('front');

        }

    }


    /*
        TOMAR FOTOGRAFÍA
    */
    async function tomarFoto() {

        if (camara.current) {

            try {

                const nuevaFoto =
                    await camara.current.takePictureAsync({
                        quality: 1
                    });

                setFoto(nuevaFoto.uri);

            } catch (error) {

                console.log(error);

                Alert.alert(
                    'Error',
                    'No se pudo tomar la fotografía.'
                );

            }

        }

    }


    /*
        GUARDAR FOTO EN GALERÍA
    */
    async function guardarFoto() {

        if (!foto) {
            return;
        }

        try {

            await Asset.create(foto);

            Alert.alert(
                'Foto guardada',
                'La fotografía se guardó correctamente en tu galería.'
            );

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Error',
                'No se pudo guardar la fotografía.'
            );

        }

    }


    /*
        TOMAR OTRA FOTO
    */
    function tomarOtraFoto() {

        setFoto(null);

    }


    /*
        CARGANDO PERMISOS
    */
    if (!permisoCamara || !permisoGaleria) {

        return (

            <View style={styles.containerPermisos}>

                <Text style={styles.titulo}>
                    Face Recognition
                </Text>

                <Text style={styles.texto}>
                    Revisando permisos...
                </Text>

            </View>

        );

    }


    /*
        SI NO TENEMOS PERMISOS
    */
    if (
        !permisoCamara.granted ||
        !permisoGaleria.granted
    ) {

        return (

            <View style={styles.containerPermisos}>

                <Text style={styles.icono}>
                    📷
                </Text>

                <Text style={styles.titulo}>
                    Face Recognition
                </Text>

                <Text style={styles.texto}>
                    La aplicación necesita permiso
                    para utilizar la cámara y guardar
                    fotografías en tu celular.
                </Text>


                <TouchableOpacity
                    style={styles.botonPermiso}
                    onPress={solicitarPermisos}
                >

                    <Text style={styles.textoBotonPermiso}>
                        PERMITIR ACCESO
                    </Text>

                </TouchableOpacity>

            </View>

        );

    }


    /*
        MOSTRAR FOTOGRAFÍA TOMADA
    */
    if (foto) {

        return (

            <View style={styles.containerFoto}>

                <View>

                    <Text style={styles.tituloFoto}>
                        Fotografía tomada
                    </Text>

                    <Text style={styles.subtituloFoto}>
                        Guarda la fotografía o vuelve a intentarlo
                    </Text>

                </View>


                <Image
                    source={{ uri: foto }}
                    style={styles.foto}
                    resizeMode="cover"
                />


                <TouchableOpacity
                    style={styles.botonGuardar}
                    onPress={guardarFoto}
                >

                    <Text style={styles.textoGuardar}>
                        GUARDAR EN GALERÍA
                    </Text>

                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.botonOtra}
                    onPress={tomarOtraFoto}
                >

                    <Text style={styles.textoOtra}>
                        TOMAR OTRA FOTO
                    </Text>

                </TouchableOpacity>

            </View>

        );

    }


    /*
        CÁMARA
    */
    return (

        <View style={styles.container}>


            {/* ENCABEZADO */}

            <View style={styles.encabezado}>

                <Text style={styles.marca}>
                    FACE RECOGNITION
                </Text>

                <Text style={styles.indicacion}>
                    Coloca tu rostro frente a la cámara
                </Text>

            </View>


            {/* VISTA DE LA CÁMARA */}

            <CameraView
                ref={camara}
                style={styles.camara}
                facing={tipoCamara}
            />


            {/* CONTROLES */}

            <View style={styles.controles}>


                {/* ESPACIO IZQUIERDO */}

                <View style={styles.opcionLateral} />


                {/* BOTÓN DE FOTO AL CENTRO */}

                <View style={styles.opcionCentral}>

                    <TouchableOpacity
                        style={styles.botonCaptura}
                        onPress={tomarFoto}
                    >

                        <View style={styles.circuloCaptura} />

                    </TouchableOpacity>

                    <Text style={styles.textoOpcion}>
                        FOTO
                    </Text>

                </View>


                {/* BOTÓN VOLTEAR A LA DERECHA */}

                <View style={styles.opcionLateral}>

                    <TouchableOpacity
                        style={styles.botonVoltear}
                        onPress={voltearCamara}
                    >

                        <Text style={styles.iconoVoltear}>
                            ↻
                        </Text>

                    </TouchableOpacity>

                    <Text style={styles.textoOpcion}>
                        VOLTEAR
                    </Text>

                </View>


            </View>


        </View>

    );

}



const styles = StyleSheet.create({

    /*
        CONTENEDOR PRINCIPAL
    */

    container: {
        flex: 1,
        backgroundColor: '#0B0B0B'
    },


    /*
        ENCABEZADO
    */

    encabezado: {
        height: 125,
        backgroundColor: '#0B0B0B',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 18
    },

    marca: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 3
    },

    indicacion: {
        color: '#888888',
        fontSize: 12,
        marginTop: 7
    },


    /*
        CÁMARA
    */

    camara: {
        flex: 1
    },


    /*
        CONTROLES
    */

    controles: {
        height: 155,
        backgroundColor: '#0B0B0B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingBottom: 15
    },

    opcionLateral: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },

    opcionCentral: {
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },


    /*
        BOTÓN PARA VOLTEAR CÁMARA
    */

    botonVoltear: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: '#222222',
        borderWidth: 1,
        borderColor: '#444444',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },

    iconoVoltear: {
        color: '#FFFFFF',
        fontSize: 32
    },


    /*
        BOTÓN PARA TOMAR FOTO
    */

    botonCaptura: {
        width: 78,
        height: 78,
        borderRadius: 39,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },

    circuloCaptura: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: '#FFFFFF'
    },

    textoOpcion: {
        color: '#888888',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1.5
    },


    /*
        PERMISOS
    */

    containerPermisos: {
        flex: 1,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35
    },

    icono: {
        fontSize: 60,
        marginBottom: 20
    },

    titulo: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },

    texto: {
        color: '#AAAAAA',
        fontSize: 15,
        lineHeight: 23,
        textAlign: 'center',
        marginBottom: 30
    },

    botonPermiso: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 12
    },

    textoBotonPermiso: {
        color: '#111111',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2
    },


    /*
        PANTALLA DE FOTO TOMADA
    */

    containerFoto: {
        flex: 1,
        backgroundColor: '#111111',
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 30
    },

    tituloFoto: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold'
    },

    subtituloFoto: {
        color: '#777777',
        fontSize: 12,
        marginTop: 6,
        marginBottom: 20
    },

    foto: {
        flex: 1,
        width: '100%',
        borderRadius: 20,
        marginBottom: 20
    },


    /*
        BOTÓN GUARDAR
    */

    botonGuardar: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 17,
        borderRadius: 13,
        alignItems: 'center'
    },

    textoGuardar: {
        color: '#111111',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2
    },


    /*
        BOTÓN TOMAR OTRA FOTO
    */

    botonOtra: {
        paddingVertical: 17,
        alignItems: 'center'
    },

    textoOtra: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2
    }

});