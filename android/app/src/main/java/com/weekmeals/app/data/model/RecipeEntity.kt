package com.weekmeals.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

data class RecipeIngredientItem(
    val ingredientId: String,
    val quantity: Double,
    val unit: String,
    val notes: String? = null
)

@Entity(tableName = "recipes")
data class RecipeEntity(
    @PrimaryKey val id: String,
    val title: String,
    val categoryId: String,
    val servings: Int = 4,
    val prepTimeMinutes: Int = 15,
    val cookTimeMinutes: Int = 20,
    val difficulty: String = "easy", // easy, medium, hard
    val description: String = "",
    val instructionsJson: String = "[]", // List<String> as JSON
    val ingredientsJson: String = "[]", // List<RecipeIngredientItem> as JSON
    val tagsJson: String = "[]", // List<String> as JSON
    val isCustom: Boolean = false,
    val cookingMode: String? = null,
    val rating: Double? = null,
    val imageUrl: String? = null
)
