package com.weekmeals.app.data.local

import androidx.room.*
import com.weekmeals.app.data.model.PantryItemEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface PantryDao {
    @Query("SELECT * FROM pantry_items")
    fun getAllPantryItems(): Flow<List<PantryItemEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPantryItem(item: PantryItemEntity)

    @Delete
    suspend fun deletePantryItem(item: PantryItemEntity)
}
