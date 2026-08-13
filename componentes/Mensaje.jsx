import { View, Text } from "react-native";

export default function Mensaje(props) {

  const variableMensaje = "Esto es mi mensaje";
  const num = 1000;

  const double = n => n * 2;

  return (
    <View>
      <Text>
        {props.msg}
      </Text>

      <Text>
        {props.num}
      </Text>
    </View>
  );
}