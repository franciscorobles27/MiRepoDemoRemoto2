
package com.example.roblesplay

import android.content.Intent
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
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class CancionesActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            PantallaCanciones(
                regresar = { finish() },

                seleccionarCancion = { cancion ->

                    // Guardamos la última canción seleccionada
                    val preferencias = getSharedPreferences(
                        "RoblesPlay",
                        MODE_PRIVATE
                    )

                    preferencias.edit()
                        .putString("ultimaCancion", cancion)
                        .apply()

                    // Creamos el Intent para abrir el reproductor
                    val intent = Intent(
                        this,
                        ReproductorActivity::class.java
                    )

                    // Enviamos el nombre mediante Extras
                    intent.putExtra("cancion", cancion)

                    // Abrimos el reproductor
                    startActivity(intent)
                }
            )
        }
    }
}

@Composable
fun PantallaCanciones(
    regresar: () -> Unit,
    seleccionarCancion: (String) -> Unit
) {

    val fondo = Color(0xFF121212)
    val rojo = Color(0xFFD71929)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(fondo)
            .padding(20.dp)
    ) {

        // Flecha de regreso
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
                text = "🎵 MIS CANCIONES",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Elige tu próxima canción",
                fontSize = 16.sp,
                color = Color(0xFFFF737B)
            )

            Spacer(modifier = Modifier.height(40.dp))

            val canciones = listOf(
                "Canción 1",
                "Canción 2",
                "Canción 3"
            )

            canciones.forEach { cancion ->

                Button(
                    onClick = {
                        seleccionarCancion(cancion)
                    },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(15.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = rojo
                    )
                ) {
                    Text(
                        text = "🎧 $cancion",
                        fontSize = 18.sp
                    )
                }

                Spacer(modifier = Modifier.height(15.dp))
            }
        }
    }
}
