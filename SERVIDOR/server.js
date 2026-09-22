const express= require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const uri = "mongodb://Robles:Robles102734@ac-p1uswwu-shard-00-00.orgcka0.mongodb.net:27017,ac-p1uswwu-shard-00-01.orgcka0.mongodb.net:27017,ac-p1uswwu-shard-00-02.orgcka0.mongodb.net:27017/sample_mflix?ssl=true&replicaSet=atlas-5phq30-shard-0&authSource=admin&appName=Cluster0"

const client = new MongoClient(uri);

async function conectarMongoDB() {
    try{
        await client.connect();
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error en la conexión a MongoDB:", error);
        process.exit(1);
    }
}

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

let db;

conectarMongoDB().then(() => {
    db = client.db("sample_mflix");
    console.log("Base de datos lista.....");
}
);

app.get("/movies", async (req, res) => {
    try {
        const movies = await db.collection("movies").find(
            {},{projection:{poster:1, title:1, fullplot:1}}
        ).limit(50).toArray();
        res.json(movies);

    } catch (error) {
        res.status(500).json({ error: "Error al obtener la colección" });
    }
});

app.listen(port, () => {
    console.log("Servidor en http://localhost:4000");
});
