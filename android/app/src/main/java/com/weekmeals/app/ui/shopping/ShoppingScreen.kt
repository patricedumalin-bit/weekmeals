package com.weekmeals.app.ui.shopping

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.weekmeals.app.data.model.ShoppingItemEntity

fun getCategoryDisplayName(categoryId: String): Pair<String, String> {
    return when (categoryId.lowercase()) {
        "produce", "fruits", "vegetables", "fruits-legumes" -> "🍎" to "Fruits & Légumes"
        "meat", "fish", "boucherie" -> "🥩" to "Boucherie & Poissonnerie"
        "dairy", "frais", "laitiers" -> "🥛" to "Produits Frais & Laitiers"
        "grocery", "epicerie" -> "🥫" to "Épicerie & Sec"
        "beverage", "boissons" -> "🥤" to "Boissons"
        "frozen", "surgeles" -> "🧊" to "Surgelés"
        else -> "🛒" to "Autres / Divers"
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ShoppingScreen(viewModel: ShoppingViewModel) {
    val items by viewModel.items.collectAsStateWithLifecycle()
    var newItemName by remember { mutableStateOf("") }
    var showPurchasedSection by remember { mutableStateOf(true) }

    val checkedCount by remember(items) {
        derivedStateOf { items.count { it.checked } }
    }
    val totalCount = items.size

    val uncheckedItems = remember(items) { items.filter { !it.checked } }
    val checkedItems = remember(items) { items.filter { it.checked } }

    val groupedUnchecked = remember(uncheckedItems) {
        uncheckedItems.groupBy { it.categoryId }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Column {
                        Text("Liste de Courses")
                        if (totalCount > 0) {
                            Text(
                                text = "$checkedCount sur $totalCount articles achetés",
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                },
                actions = {
                    if (checkedCount > 0) {
                        IconButton(onClick = { viewModel.clearChecked() }) {
                            Icon(Icons.Default.Delete, contentDescription = "Effacer les achetés")
                        }
                    }
                }
            )
        },
        bottomBar = {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                tonalElevation = 8.dp,
                shadowElevation = 8.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    OutlinedTextField(
                        value = newItemName,
                        onValueChange = { newItemName = it },
                        placeholder = { Text("Ajouter un article rapidement...") },
                        modifier = Modifier.weight(1f),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            if (newItemName.isNotBlank()) {
                                viewModel.addItem(newItemName)
                                newItemName = ""
                            }
                        }
                    ) {
                        Icon(Icons.Default.Add, contentDescription = "Ajouter")
                    }
                }
            }
        }
    ) { innerPadding ->
        if (items.isEmpty()) {
            Box(
                modifier = Modifier
                    .padding(innerPadding)
                    .fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        Icons.Default.ShoppingCart,
                        contentDescription = null,
                        modifier = Modifier.size(64.dp),
                        tint = MaterialTheme.colorScheme.primary.copy(alpha = 0.5f)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Votre liste de courses est vide",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        } else {
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier
                    .padding(innerPadding)
                    .fillMaxSize()
            ) {
                groupedUnchecked.forEach { (categoryId, catItems) ->
                    val (icon, title) = getCategoryDisplayName(categoryId)
                    item(key = "header_$categoryId") {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = icon, style = MaterialTheme.typography.titleMedium)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = title,
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.primary
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Badge {
                                Text("${catItems.size}")
                            }
                        }
                    }

                    items(catItems, key = { it.id }) { item ->
                        ShoppingItemCard(item = item, onToggle = { viewModel.toggleChecked(item.id, item.checked) })
                    }
                }

                if (checkedItems.isNotEmpty()) {
                    item(key = "purchased_header") {
                        Spacer(modifier = Modifier.height(8.dp))
                        Surface(
                            onClick = { showPurchasedSection = !showPurchasedSection },
                            modifier = Modifier.fillMaxWidth(),
                            color = MaterialTheme.colorScheme.surfaceVariant,
                            shape = MaterialTheme.shapes.medium
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "🛒 Articles dans le caddie (${checkedItems.size})",
                                    style = MaterialTheme.typography.titleSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Icon(
                                    imageVector = if (showPurchasedSection) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                                    contentDescription = null
                                )
                            }
                        }
                    }

                    if (showPurchasedSection) {
                        items(checkedItems, key = { "checked_${it.id}" }) { item ->
                            ShoppingItemCard(item = item, onToggle = { viewModel.toggleChecked(item.id, item.checked) })
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ShoppingItemCard(item: ShoppingItemEntity, onToggle: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (item.checked) 
                MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f) 
            else 
                MaterialTheme.colorScheme.surface
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = item.checked,
                onCheckedChange = { onToggle() }
            )
            Spacer(modifier = Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.name,
                    style = MaterialTheme.typography.bodyMedium,
                    textDecoration = if (item.checked) TextDecoration.LineThrough else TextDecoration.None,
                    color = if (item.checked) 
                        MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f) 
                    else 
                        MaterialTheme.colorScheme.onSurface
                )
                if (item.quantity > 0 && item.unit != "unit") {
                    Text(
                        text = "${item.quantity} ${item.unit}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary.copy(alpha = if (item.checked) 0.5f else 1f)
                    )
                }
            }
        }
    }
}
