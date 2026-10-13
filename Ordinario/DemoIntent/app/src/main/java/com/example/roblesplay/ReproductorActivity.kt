
package com.example.roblesplay

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class ReproductorActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Recibir el nombre de la canción mediante Extras
        val cancionRecibida = intent.getStringExtra("cancion")
            ?: "Ninguna canción seleccionada"

        setContent {
            PantallaReproductor(
                cancion = cancionRecibida,
                regresar = { finish() }
            )
        }
    }
}

@Composable
fun PantallaReproductor(
    cancion: String,
    regresar: () -> Unit
) {

    val fondo = Color(0xFF121212)
    val rojo = Color(0xFFD71929)

    var reproduciendo by remember {
        mutableStateOf(false)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(fondo)
            .padding(20.dp)
    ) {

        // Flecha para regresar
        Text(
            text = "←",
            fontSize = 35.sp,
            color = Color.White,
            modifier = Modifier
                .clickable { regresar() }
                .padding(8.dp)
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {

            Text(
                text = "🎧 ROBLES PLAY",
                fontSize = 30.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(35.dp))

            Text(
                text = "🎵",
                fontSize = 85.sp
            )

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "REPRODUCIENDO AHORA",
                fontSize = 14.sp,
                color = Color(0xFFFF737B)
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Mostrar la canción recibida
            Text(
                text = cancion,
                fontSize = 26.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = if (reproduciendo)
                    "▶ Reproduciendo (simulación)"
                else
                    "⏸ En pausa",
                fontSize = 16.sp,
                color = Color.LightGray
            )

            Spacer(modifier = Modifier.height(40.dp))

            Button(
                onClick = {
                    reproduciendo = !reproduciendo
                },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(15.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = rojo
                )
            ) {
                Text(
                    text = if (reproduciendo)
                        "⏸ Pausar"
                    else
                        "▶ Reproducir",
                    fontSize = 18.sp
                )
            }
        }
    }
}
