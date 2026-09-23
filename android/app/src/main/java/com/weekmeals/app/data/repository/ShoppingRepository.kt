package com.weekmeals.app.data.repository

import com.weekmeals.app.data.local.ShoppingDao
import com.weekmeals.app.data.model.ShoppingItemEntity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

class ShoppingRepository(private val shoppingDao: ShoppingDao) {
    val shoppingItems: Flow<List<ShoppingItemEntity>> = shoppingDao.getAllShoppingItems()

    suspend fun addItem(item: ShoppingItemEntity) = withContext(Dispatchers.IO) {
        shoppingDao.insertItem(item)
    }

    suspend fun toggleChecked(id: String, checked: Boolean) = withContext(Dispatchers.IO) {
        shoppingDao.updateCheckedStatus(id, checked)
    }

    suspend fun clearChecked() = withContext(Dispatchers.IO) {
        shoppingDao.clearCheckedItems()
    }

    suspend fun clearAll() = withContext(Dispatchers.IO) {
        shoppingDao.clearAll()
    }
}
