import { StyleSheet, View } from 'react-native';
import Banner from './componentes/Banner';
import RepText from './componentes/ReplicaTexto';

export default function App() {
  return (
    <View style={styles.container}>
      <Banner titulo="Ejercicio 02">
        <RepText />
      </Banner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});