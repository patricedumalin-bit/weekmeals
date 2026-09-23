package com.weekmeals.app.data.repository

import com.weekmeals.app.data.local.ShoppingDao
import com.weekmeals.app.data.model.ShoppingItemEntity
import kotlinx.coroutines.flow.Flow

class ShoppingRepository(private val shoppingDao: ShoppingDao) {
    val shoppingItems: Flow<List<ShoppingItemEntity>> = shoppingDao.getAllShoppingItems()

    suspend fun addItem(item: ShoppingItemEntity) {
        shoppingDao.insertItem(item)
    }

    suspend fun toggleChecked(id: String, checked: Boolean) {
        shoppingDao.updateCheckedStatus(id, checked)
    }

    suspend fun clearChecked() {
        shoppingDao.clearCheckedItems()
    }

    suspend fun clearAll() {
        shoppingDao.clearAll()
    }
}
