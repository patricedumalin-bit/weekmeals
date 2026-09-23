package com.weekmeals.app.ui.recipes

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.weekmeals.app.data.model.RecipeEntity

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RecipeDetailScreen(
    recipe: RecipeEntity,
    onBackClick: () -> Unit
) {
    var currentServings by remember { mutableStateOf(recipe.servings) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(recipe.title) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Retour")
                    }
                }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(recipe.description, style = MaterialTheme.typography.bodyLarge)
                        Spacer(modifier = Modifier.height(12.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text("⏱️ Préparation : ${recipe.prepTimeMinutes} min")
                            Text("🍳 Cuisson : ${recipe.cookTimeMinutes} min")
                            Text("🔥 Difficulté : ${recipe.difficulty}")
                        }
                    }
                }
            }

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                ) {
                    Text("Portions : $currentServings", style = MaterialTheme.typography.titleMedium)
                    Row {
                        Button(onClick = { if (currentServings > 1) currentServings-- }) {
                            Text("-")
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Button(onClick = { currentServings++ }) {
                            Text("+")
                        }
                    }
                }
            }

            item {
                Text("Ingrédients", style = MaterialTheme.typography.titleLarge)
            }

            item {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("• Ingrédients de la recette (recette de base pour ${recipe.servings} portions)", style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }

            item {
                Text("Instructions", style = MaterialTheme.typography.titleLarge)
            }

            item {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(recipe.instructionsJson, style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }
    }
}
