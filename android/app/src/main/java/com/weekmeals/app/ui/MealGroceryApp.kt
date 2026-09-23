package com.weekmeals.app.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Kitchen
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.weekmeals.app.data.local.AppDatabase
import com.weekmeals.app.data.repository.PlannerRepository
import com.weekmeals.app.data.repository.RecipeRepository
import com.weekmeals.app.data.repository.ShoppingRepository
import com.weekmeals.app.ui.pantry.PantryScreen
import com.weekmeals.app.ui.planner.PlannerScreen
import com.weekmeals.app.ui.planner.PlannerViewModel
import com.weekmeals.app.ui.recipes.RecipeListScreen
import com.weekmeals.app.ui.recipes.RecipeViewModel
import com.weekmeals.app.ui.shopping.ShoppingScreen
import com.weekmeals.app.ui.shopping.ShoppingViewModel

sealed class Screen(val route: String, val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    object Planner : Screen("planner", "Planning", Icons.Default.DateRange)
    object Recipes : Screen("recipes", "Recettes", Icons.Default.Restaurant)
    object Shopping : Screen("shopping", "Courses", Icons.AutoMirrored.Filled.List)
    object Pantry : Screen("pantry", "Placard", Icons.Default.Kitchen)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MealGroceryApp(database: AppDatabase) {
    val navController = rememberNavController()
    val items = listOf(
        Screen.Planner,
        Screen.Recipes,
        Screen.Shopping,
        Screen.Pantry
    )

    val plannerViewModel = remember { PlannerViewModel(PlannerRepository(database.weeklyPlanDao())) }
    val recipeViewModel = remember { RecipeViewModel(RecipeRepository(database.recipeDao())) }
    val shoppingViewModel = remember { ShoppingViewModel(ShoppingRepository(database.shoppingDao())) }

    Scaffold(
        bottomBar = {
            NavigationBar {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                items.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title) },
                        selected = currentRoute == screen.route,
                        onClick = {
                            if (currentRoute != screen.route) {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Planner.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Planner.route) { PlannerScreen(plannerViewModel) }
            composable(Screen.Recipes.route) { RecipeListScreen(recipeViewModel) }
            composable(Screen.Shopping.route) { ShoppingScreen(shoppingViewModel) }
            composable(Screen.Pantry.route) { PantryScreen() }
        }
    }
}
