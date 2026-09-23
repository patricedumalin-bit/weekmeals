package com.weekmeals.app.ui.recipes

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.weekmeals.app.data.model.RecipeEntity
import com.weekmeals.app.data.repository.RecipeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class RecipeViewModel(private val recipeRepository: RecipeRepository) : ViewModel() {
    val searchQuery = MutableStateFlow("")

    val recipes: StateFlow<List<RecipeEntity>> = combine(
        recipeRepository.allRecipes,
        searchQuery
    ) { all, query ->
        if (query.isBlank()) {
            all
        } else {
            all.filter { it.title.contains(query, ignoreCase = true) || it.description.contains(query, ignoreCase = true) }
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = emptyList()
    )

    fun onSearchQueryChanged(query: String) {
        searchQuery.value = query
    }

    fun saveRecipe(recipe: RecipeEntity) {
        viewModelScope.launch {
            recipeRepository.saveRecipe(recipe)
        }
    }

    fun deleteRecipe(recipe: RecipeEntity) {
        viewModelScope.launch {
            recipeRepository.deleteRecipe(recipe)
        }
    }
}
