import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      fetch("http://localhost:4000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(
        (error) =>console.error(error)
      );
    }, []
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#060696" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
  <View style={styles.card}>
    {item.poster ? (
      <Image source={{ uri: item.poster }} style={styles.poster} />
    ) : (
      <View style={styles.noPoster}>
        <Text>No Imagen</Text>
      </View>
    )}

    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.plot}>{item.fullplot || "Sin descripción"}</Text>
    </View>
  </View>
);

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  noPoster: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd"
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  plot: {
    fontSize: 12,
    color: "gray"
  },
});






  