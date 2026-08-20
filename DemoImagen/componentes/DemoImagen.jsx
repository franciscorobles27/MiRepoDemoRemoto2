import { Dimensions, StyleSheet, View, ImageBackground, Image, Text } from "react-native";

const DemoImagen = () => {
    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.fondo}
                source={require('../assets/fondospiderman.jpg')}
            >
                <View style={styles.container}>
                <Image
                   style={styles.foto}
                   source={{ uri: 'https://http.cat/307' }}
                />

                <Text style={styles.titulo}>Gatos App</Text>
                </View>



            </ImageBackground>

        </View>
    )

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0,0.0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  foto:{
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 10,
    borderColor: '#f1eeec',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowradius: 10,
    elevation: 8,
  },
  titulo: {
    color: '#e2e1e2',
    fontSize: 80,
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
},
});
export default DemoImagen;
