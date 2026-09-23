package com.weekmeals.app.data.model

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import androidx.compose.runtime.Immutable

@Immutable
@Entity(
    tableName = "ingredients",
    indices = [Index("categoryId"), Index("name"), Index("barcode")]
)
data class IngredientEntity(
    @PrimaryKey val id: String,
    val name: String,
    val categoryId: String,
    val defaultUnit: String = "unit",
    val notes: String? = null,
    val pricePer100g: Double? = null,
    val caloriesPer100g: Double? = null,
    val proteinPer100g: Double? = null,
    val carbsPer100g: Double? = null,
    val fatPer100g: Double? = null,
    val brand: String? = null,
    val barcode: String? = null
)
