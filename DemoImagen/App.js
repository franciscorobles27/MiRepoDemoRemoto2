import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DemoImagen from './componentes/DemoImagen';

export default function App() {
  return (
    <View style={styles.container}>
     <DemoImagen/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#700000',

  },
  panel1:{
    flex: 1,
    backgroundColor: '#030e01'
  },
  panel2:{
    flex: 1,
    backgroundColor: '#9a0000'
  },
  panel3:{
    flex: 1,
    backgroundColor: '#ffea00'
  },
});



