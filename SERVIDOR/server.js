const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

let client;
let db;

// LOGIN DE MONGODB
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Ingresa usuario y contraseña",
    });
  }

  const usuarioSeguro = encodeURIComponent(username);
  const passwordSeguro = encodeURIComponent(password);

  const uri =
    `mongodb://${usuarioSeguro}:${passwordSeguro}` +
    `@ac-p1uswwu-shard-00-00.orgcka0.mongodb.net:27017,` +
    `ac-p1uswwu-shard-00-01.orgcka0.mongodb.net:27017,` +
    `ac-p1uswwu-shard-00-02.orgcka0.mongodb.net:27017/` +
    `sample_mflix?ssl=true&replicaSet=atlas-5phq30-shard-0&authSource=admin&appName=Cluster0`;

  try {
    // Si ya existía una conexión, la cerramos
    if (client) {
      await client.close();
    }

    client = new MongoClient(uri);

    await client.connect();

    db = client.db("sample_mflix");

    // Comprobamos que realmente responda MongoDB
    await db.command({ ping: 1 });

    console.log("Conectado correctamente a MongoDB");

    res.json({
      success: true,
      message: "Conexión correcta",
    });
  } catch (error) {
    console.error("Error de login:", error.message);

    db = null;

    res.status(401).json({
      success: false,
      message: "Usuario o contraseña incorrectos",
    });
  }
});

// OBTENER LISTA DE PELÍCULAS
app.get("/movies", async (req, res) => {
  if (!db) {
    return res.status(401).json({
      error: "Primero debes iniciar sesión",
    });
  }

  try {
    const movies = await db
      .collection("movies")
      .find(
        {},
        {
          projection: {
            poster: 1,
            title: 1,
            fullplot: 1,
            year: 1,
          },
        }
      )
      .limit(50)
      .toArray();

    res.json(movies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener la colección",
    });
  }
});

// OBTENER INFORMACIÓN COMPLETA DE UNA PELÍCULA
app.get("/movies/:id", async (req, res) => {
  if (!db) {
    return res.status(401).json({
      error: "Primero debes iniciar sesión",
    });
  }

  try {
    const pelicula = await db.collection("movies").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!pelicula) {
      return res.status(404).json({
        error: "Película no encontrada",
      });
    }

    res.json(pelicula);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener la película",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});