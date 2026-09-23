package com.weekmeals.app.data.repository

import com.weekmeals.app.data.local.RecipeDao
import com.weekmeals.app.data.model.RecipeEntity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

class RecipeRepository(private val recipeDao: RecipeDao) {
    val allRecipes: Flow<List<RecipeEntity>> = recipeDao.getAllRecipes()

    suspend fun getRecipeById(id: String): RecipeEntity? = withContext(Dispatchers.IO) {
        recipeDao.getRecipeById(id)
    }

    suspend fun saveRecipe(recipe: RecipeEntity) = withContext(Dispatchers.IO) {
        recipeDao.insertRecipe(recipe)
    }

    suspend fun deleteRecipe(recipe: RecipeEntity) = withContext(Dispatchers.IO) {
        recipeDao.deleteRecipe(recipe)
    }
}
