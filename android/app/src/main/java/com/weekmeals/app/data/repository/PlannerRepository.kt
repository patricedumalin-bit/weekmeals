package com.weekmeals.app.data.repository

import com.weekmeals.app.data.local.WeeklyPlanDao
import com.weekmeals.app.data.model.WeeklyPlanEntity
import kotlinx.coroutines.flow.Flow

class PlannerRepository(private val weeklyPlanDao: WeeklyPlanDao) {
    val currentPlan: Flow<WeeklyPlanEntity?> = weeklyPlanDao.getPlanById("current_plan")

    suspend fun savePlan(plan: WeeklyPlanEntity) {
        weeklyPlanDao.savePlan(plan)
    }
}
