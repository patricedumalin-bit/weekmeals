package com.weekmeals.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "weekly_plans")
data class WeeklyPlanEntity(
    @PrimaryKey val id: String = "current_plan",
    val numberOfMeals: Int = 7,
    val defaultServings: Int = 4,
    val mealsJson: String = "[]", // List<MealSlot> as JSON
    val isLocked: Boolean = false,
    val lastUpdated: String = ""
)
