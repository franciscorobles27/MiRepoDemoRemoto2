import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import PedometerSensor from './components/PedometerSensor';

export default function App() {
  return (
    <View style={styles.container}>
      <PedometerSensor />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05080D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});