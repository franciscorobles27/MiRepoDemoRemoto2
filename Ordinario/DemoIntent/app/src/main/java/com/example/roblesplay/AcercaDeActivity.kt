
package com.example.roblesplay

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class AcercaDeActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            PantallaAcercaDe(
                regresar = { finish() }
            )
        }
    }
}

@Composable
fun PantallaAcercaDe(regresar: () -> Unit) {

    val fondo = Color(0xFF121212)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(fondo)
            .padding(20.dp)
    ) {

        // Flecha de regreso arriba a la izquierda
        Text(
            text = "←",
            fontSize = 35.sp,
            color = Color.White,
            modifier = Modifier
                .clickable { regresar() }
                .padding(8.dp)
        )

        // Información de la aplicación
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {

            Text(
                text = "🎧",
                fontSize = 75.sp
            )

            Spacer(modifier = Modifier.height(15.dp))

            Text(
                text = "ROBLES PLAY",
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Tu música, tu ritmo.",
                fontSize = 17.sp,
                color = Color(0xFFFF737B)
            )

            Spacer(modifier = Modifier.height(35.dp))

            Text(
                text = "Versión 1.0",
                fontSize = 18.sp,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "Aplicación musical desarrollada como " +
                        "práctica de Android Studio para demostrar " +
                        "el uso de Intents y Extras.",
                fontSize = 16.sp,
                color = Color.LightGray,
                lineHeight = 24.sp
            )

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "Desarrollado por Robles 🎵",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }
    }
}
