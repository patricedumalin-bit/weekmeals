package com.weekmeals.app.ui.planner

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.weekmeals.app.data.model.WeeklyPlanEntity
import com.weekmeals.app.data.repository.PlannerRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PlannerViewModel(private val plannerRepository: PlannerRepository) : ViewModel() {
    val weeklyPlan: StateFlow<WeeklyPlanEntity?> = plannerRepository.currentPlan
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = null
        )

    fun updatePlan(numberOfMeals: Int, defaultServings: Int) {
        viewModelScope.launch {
            val current = weeklyPlan.value ?: WeeklyPlanEntity()
            val updated = current.copy(
                numberOfMeals = numberOfMeals,
                defaultServings = defaultServings,
                lastUpdated = System.currentTimeMillis().toString()
            )
            plannerRepository.savePlan(updated)
        }
    }
}
