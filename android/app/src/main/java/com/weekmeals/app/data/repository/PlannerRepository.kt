package com.weekmeals.app.data.repository

import com.weekmeals.app.data.local.WeeklyPlanDao
import com.weekmeals.app.data.model.WeeklyPlanEntity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

class PlannerRepository(private val weeklyPlanDao: WeeklyPlanDao) {
    val currentPlan: Flow<WeeklyPlanEntity?> = weeklyPlanDao.getPlanById("current_plan")

    suspend fun savePlan(plan: WeeklyPlanEntity) = withContext(Dispatchers.IO) {
        weeklyPlanDao.savePlan(plan)
    }
}
