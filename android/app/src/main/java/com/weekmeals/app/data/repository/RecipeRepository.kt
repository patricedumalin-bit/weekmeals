package com.weekmeals.app.data.repository

import com.weekmeals.app.data.local.RecipeDao
import com.weekmeals.app.data.model.RecipeEntity
import kotlinx.coroutines.flow.Flow

class RecipeRepository(private val recipeDao: RecipeDao) {
    val allRecipes: Flow<List<RecipeEntity>> = recipeDao.getAllRecipes()

    suspend fun getRecipeById(id: String): RecipeEntity? {
        return recipeDao.getRecipeById(id)
    }

    suspend fun saveRecipe(recipe: RecipeEntity) {
        recipeDao.insertRecipe(recipe)
    }

    suspend fun deleteRecipe(recipe: RecipeEntity) {
        recipeDao.deleteRecipe(recipe)
    }
}
