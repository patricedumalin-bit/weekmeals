package com.weekmeals.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.compose.runtime.Immutable

@Immutable
@Entity(tableName = "pantry_items")
data class PantryItemEntity(
    @PrimaryKey val ingredientId: String,
    val inStock: Boolean = true,
    val quantity: Double? = null,
    val unit: String? = null,
    val updatedAt: String = ""
)
