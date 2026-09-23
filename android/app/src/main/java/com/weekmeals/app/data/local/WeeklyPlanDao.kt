package com.weekmeals.app.data.local

import androidx.room.*
import com.weekmeals.app.data.model.WeeklyPlanEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface WeeklyPlanDao {
    @Query("SELECT * FROM weekly_plans WHERE id = :id")
    fun getPlanById(id: String = "current_plan"): Flow<WeeklyPlanEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun savePlan(plan: WeeklyPlanEntity)
}
