package com.weekmeals.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "shopping_items")
data class ShoppingItemEntity(
    @PrimaryKey val id: String,
    val ingredientId: String? = null,
    val name: String,
    val categoryId: String = "other",
    val quantity: Double = 1.0,
    val unit: String = "unit",
    val checked: Boolean = false,
    val isCustom: Boolean = false
)
