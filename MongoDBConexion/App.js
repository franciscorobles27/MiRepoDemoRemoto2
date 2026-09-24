import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API = "http://localhost:4000";

  // INICIAR SESIÓN
  const login = async () => {
    if (!username || !password) {
      Alert.alert(
        "Datos incompletos",
        "Ingresa tu usuario y contraseña de MongoDB."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoggedIn(true);

        await obtenerPeliculas();
      } else {
        Alert.alert(
          "Error",
          data.message || "Usuario o contraseña incorrectos"
        );
      }
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error de conexión",
        "No fue posible conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  // OBTENER PELÍCULAS
  const obtenerPeliculas = async () => {
    try {
      const response = await fetch(`${API}/movies`);

      const data = await response.json();

      if (response.ok) {
        setMovies(data);
      } else {
        Alert.alert("Error", "No fue posible obtener las películas.");
      }
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error",
        "No se pudieron cargar las películas."
      );
    }
  };

  // ABRIR INFORMACIÓN COMPLETA DE UNA PELÍCULA
  const abrirPelicula = async (id) => {
    try {
      const response = await fetch(`${API}/movies/${id}`);

      const data = await response.json();

      if (response.ok) {
        setSelectedMovie(data);
        setModalVisible(true);
      } else {
        Alert.alert(
          "Error",
          "No se pudo obtener la información de la película."
        );
      }
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error",
        "No se pudo consultar la película."
      );
    }
  };

  // PANTALLA DE LOGIN
  if (!loggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.logo}>MongoDB</Text>

        <Text style={styles.loginTitle}>
          Iniciar sesión
        </Text>

        <Text style={styles.loginSubtitle}>
          Ingresa tus credenciales para acceder a las películas
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario de MongoDB"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={login}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>
              Conectarse
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  // TARJETA DE CADA PELÍCULA
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => abrirPelicula(item._id)}
      activeOpacity={0.8}
    >
      {item.poster ? (
        <Image
          source={{ uri: item.poster }}
          style={styles.poster}
        />
      ) : (
        <View style={styles.noPoster}>
          <Text>Sin imagen</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        {item.year && (
          <Text style={styles.year}>
            {item.year}
          </Text>
        )}

        <Text
          style={styles.plot}
          numberOfLines={4}
        >
          {item.fullplot || "Sin descripción"}
        </Text>

        <Text style={styles.verMas}>
          Ver información completa
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Películas
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {selectedMovie && (
                <>
                  {selectedMovie.poster ? (
                    <Image
                      source={{
                        uri: selectedMovie.poster,
                      }}
                      style={styles.modalPoster}
                    />
                  ) : null}

                  <Text style={styles.modalTitle}>
                    {selectedMovie.title}
                  </Text>

                  <Text style={styles.modalYear}>
                    {selectedMovie.year || "Año no disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Descripción
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.fullplot ||
                      selectedMovie.plot ||
                      "Sin descripción"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Géneros
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.genres
                      ? selectedMovie.genres.join(", ")
                      : "No disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Directores
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.directors
                      ? selectedMovie.directors.join(", ")
                      : "No disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Reparto
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.cast
                      ? selectedMovie.cast.join(", ")
                      : "No disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Duración
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.runtime
                      ? `${selectedMovie.runtime} minutos`
                      : "No disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Clasificación
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.rated ||
                      "No disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    País
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.countries
                      ? selectedMovie.countries.join(", ")
                      : "No disponible"}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    Idiomas
                  </Text>

                  <Text style={styles.modalText}>
                    {selectedMovie.languages
                      ? selectedMovie.languages.join(", ")
                      : "No disponible"}
                  </Text>

                  {selectedMovie.imdb && (
                    <>
                      <Text style={styles.sectionTitle}>
                        IMDb
                      </Text>

                      <Text style={styles.modalText}>
                        ⭐{" "}
                        {selectedMovie.imdb.rating ||
                          "Sin calificación"}
                      </Text>
                    </>
                  )}

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() =>
                      setModalVisible(false)
                    }
                  >
                    <Text style={styles.closeButtonText}>
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f4",
    paddingTop: 50,
  },

  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f1f5f4",
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#00A35C",
    textAlign: "center",
    marginBottom: 10,
  },

  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  loginSubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#00A35C",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
    color: "#1a1a1a",
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
  },

  poster: {
    width: 90,
    height: 135,
    borderRadius: 10,
  },

  noPoster: {
    width: 90,
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },

  year: {
    fontSize: 13,
    color: "#00A35C",
    fontWeight: "bold",
    marginBottom: 5,
  },

  plot: {
    fontSize: 12,
    color: "#666",
    lineHeight: 17,
  },

  verMas: {
    color: "#00A35C",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 8,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },

  modalPoster: {
    width: 170,
    height: 250,
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  modalYear: {
    fontSize: 16,
    color: "#00A35C",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 13,
    marginBottom: 4,
  },

  modalText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  closeButton: {
    backgroundColor: "#00A35C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


  