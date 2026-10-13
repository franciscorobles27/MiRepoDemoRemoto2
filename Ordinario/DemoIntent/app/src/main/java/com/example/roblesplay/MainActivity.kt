
package com.example.roblesplay

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            PantallaPrincipal(
                abrirCanciones = {
                    val intent = Intent(
                        this,
                        CancionesActivity::class.java
                    )
                    startActivity(intent)
                },

                abrirReproductor = {

                    // Recuperamos la última canción guardada
                    val preferencias = getSharedPreferences(
                        "RoblesPlay",
                        MODE_PRIVATE
                    )

                    val ultimaCancion = preferencias.getString(
                        "ultimaCancion",
                        "Ninguna canción seleccionada"
                    )

                    // Abrimos el reproductor
                    val intent = Intent(
                        this,
                        ReproductorActivity::class.java
                    )

                    // Enviamos la canción mediante Extras
                    intent.putExtra("cancion", ultimaCancion)

                    startActivity(intent)
                },

                abrirAcercaDe = {
                    val intent = Intent(
                        this,
                        AcercaDeActivity::class.java
                    )
                    startActivity(intent)
                }
            )
        }
    }
}

@Composable
fun PantallaPrincipal(
    abrirCanciones: () -> Unit,
    abrirReproductor: () -> Unit,
    abrirAcercaDe: () -> Unit
) {

    val fondo = Color(0xFF121212)
    val rojo = Color(0xFFD71929)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(fondo)
            .padding(25.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        Text(
            text = "🎧 ROBLES PLAY",
            fontSize = 30.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            text = "Tu música, tu ritmo.",
            fontSize = 16.sp,
            color = Color(0xFFFF737B)
        )

        Spacer(modifier = Modifier.height(45.dp))

        Button(
            onClick = abrirCanciones,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(15.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = rojo
            )
        ) {
            Text("🎵 Mis canciones", fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(15.dp))

        Button(
            onClick = abrirReproductor,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(15.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = rojo
            )
        ) {
            Text("▶ Reproductor", fontSize = 18.sp)
        }

        Spacer(modifier = Modifier.height(15.dp))

        Button(
            onClick = abrirAcercaDe,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(15.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = rojo
            )
        ) {
            Text("ℹ Acerca de", fontSize = 18.sp)
        }
    }
}
