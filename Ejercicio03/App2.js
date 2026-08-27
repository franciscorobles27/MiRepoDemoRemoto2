import { StyleSheet, Text, View, Modal } from 'react-native';
import { useState } from 'react';
import {Button} from 'react-native-web';

export default function App() {

  const [modal, setModal] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <View style={styles.center}>
          <Text>Esto es un modal</Text>
          <Button
            title="Close Modal"
            onPress={() => setModal(!modal)}
          />
        </View>
      
      </Modal>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      <Text>Este texto esta fuera del modal</Text>
      
      <Button
        title="Mostrar Modal"
        onPress={() => setModal(!modal)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff2f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(241, 0, 0, 0.5)',
  },
  contenido:{
    flex: 1,
    backgroundColor: 'rgb(1, 132, 23)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 400,
    marginHorizontal: 20,
  },
});