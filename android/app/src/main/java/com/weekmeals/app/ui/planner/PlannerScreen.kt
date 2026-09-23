package com.weekmeals.app.ui.planner

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.LockOpen
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlannerScreen(viewModel: PlannerViewModel) {
    val weeklyPlan by viewModel.weeklyPlan.collectAsStateWithLifecycle()
    val dayNames = listOf("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Planning des Repas") },
                actions = {
                    IconButton(onClick = { viewModel.toggleLock() }) {
                        Icon(
                            imageVector = if (weeklyPlan?.isLocked == true) Icons.Default.Lock else Icons.Default.LockOpen,
                            contentDescription = "Verrouiller le planning"
                        )
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { /* TODO: Auto-plan generation */ },
                containerColor = MaterialTheme.colorScheme.primary
            ) {
                Icon(Icons.Default.AutoAwesome, contentDescription = "Générer automatiquement")
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Semaine de la famille",
                            style = MaterialTheme.typography.titleMedium
                        )
                        Badge(
                            containerColor = if (weeklyPlan?.isLocked == true) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.primary
                        ) {
                            Text(
                                text = if (weeklyPlan?.isLocked == true) "Verrouillé" else "Modifiable",
                                modifier = Modifier.padding(4.dp)
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Portions par défaut : ${weeklyPlan?.defaultServings ?: 4} personnes")
                }
            }

            Text(
                text = "Repas de la semaine",
                style = MaterialTheme.typography.titleSmall,
                modifier = Modifier.padding(vertical = 8.dp)
            )

            val numberOfMeals = weeklyPlan?.numberOfMeals ?: 7
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items((1..numberOfMeals).toList()) { mealIndex ->
                    val dayLabel = dayNames.getOrElse(mealIndex - 1) { "Jour $mealIndex" }
                    Card(
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = dayLabel,
                                    style = MaterialTheme.typography.titleMedium,
                                    color = MaterialTheme.colorScheme.primary
                                )
                                TextButton(
                                    onClick = { /* TODO: Ouvrir sélecteur de recette */ },
                                    enabled = weeklyPlan?.isLocked != true
                                ) {
                                    Text("+ Choisir une recette")
                                }
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Aucune recette assignée",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }
        }
    }
}
