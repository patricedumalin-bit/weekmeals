package com.weekmeals.app.data.model

enum class UnitType(val label: String) {
    GRAM("g"),
    KILOGRAM("kg"),
    MILLILITER("ml"),
    CENTILITER("cl"),
    LITER("l"),
    TABLESPOON("tbsp"),
    TEASPOON("tsp"),
    UNIT("unit"),
    CLOVE("clove"),
    PINCH("pinch"),
    CAN("can"),
    PACK("pack"),
    BUNCH("bunch"),
    SLICE("slice");

    companion object {
        fun fromString(value: String): UnitType {
            return entries.firstOrNull { it.label.equals(value, ignoreCase = true) || it.name.equals(value, ignoreCase = true) }
                ?: UNIT
        }
    }
}
