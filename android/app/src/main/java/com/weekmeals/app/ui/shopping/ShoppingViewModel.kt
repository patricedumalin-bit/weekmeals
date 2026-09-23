package com.weekmeals.app.ui.shopping

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.weekmeals.app.data.model.ShoppingItemEntity
import com.weekmeals.app.data.repository.ShoppingRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.util.UUID

class ShoppingViewModel(private val shoppingRepository: ShoppingRepository) : ViewModel() {
    val items: StateFlow<List<ShoppingItemEntity>> = shoppingRepository.shoppingItems
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun addItem(name: String, quantity: Double = 1.0, unit: String = "unit") {
        if (name.isBlank()) return
        viewModelScope.launch {
            val item = ShoppingItemEntity(
                id = UUID.randomUUID().toString(),
                name = name.trim(),
                quantity = quantity,
                unit = unit,
                isCustom = true
            )
            shoppingRepository.addItem(item)
        }
    }

    fun toggleChecked(id: String, currentChecked: Boolean) {
        viewModelScope.launch {
            shoppingRepository.toggleChecked(id, !currentChecked)
        }
    }

    fun clearChecked() {
        viewModelScope.launch {
            shoppingRepository.clearChecked()
        }
    }
}
