package com.weekmeals.app.data.local

import androidx.room.*
import com.weekmeals.app.data.model.ShoppingItemEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ShoppingDao {
    @Query("SELECT * FROM shopping_items ORDER BY checked ASC, name ASC")
    fun getAllShoppingItems(): Flow<List<ShoppingItemEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItem(item: ShoppingItemEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<ShoppingItemEntity>)

    @Query("UPDATE shopping_items SET checked = :checked WHERE id = :id")
    suspend fun updateCheckedStatus(id: String, checked: Boolean)

    @Query("DELETE FROM shopping_items WHERE checked = 1")
    suspend fun clearCheckedItems()

    @Query("DELETE FROM shopping_items")
    suspend fun clearAll()
}
