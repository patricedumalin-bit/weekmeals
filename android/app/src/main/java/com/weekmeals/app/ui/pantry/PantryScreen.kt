package com.weekmeals.app.ui.pantry

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantryScreen() {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Mon Placard / Stock") })
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Text("Gérez les ingrédients disponibles dans votre placard pour déduction automatique de la liste de courses.",
                style = MaterialTheme.typography.bodyMedium)
        }
    }
}
