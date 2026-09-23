# Developer & AI Agent Setup Guide - Meal Grocery Planner

Welcome! This document serves as the complete technical blueprint for setting up the development environment for **Meal Grocery Planner** (`com.weekmeals.app`) on a new machine or when working with an AI assistant.

---

## 🚀 1. Prerequisites & Environment

Ensure the following tools are installed on the new machine:
- **Android Studio** (Koala / Jellyfish / Ladybug or newer)
- **JDK 21** (Temurin or OpenJDK)
- **Android SDK** (Compile SDK 36, Target SDK 36, Min SDK 24)
- **Git**
- **Node.js & npm** (for Capacitor and web frontend dependencies)

---

## 🛠️ 2. Project Architecture & Tech Stack

This project uses a **Hybrid Capacitor Architecture** backed by a robust **Native Android (Kotlin)** infrastructure:
- **Frontend**: React + TypeScript + Tailwind CSS (compiled into `dist/`, served via Capacitor WebView `BridgeActivity`).
- **Dependency Injection**: Dagger Hilt (`2.51.1`).
- **Local Database**: Room (`2.6.1`) with Write-Ahead Logging (WAL) and table indices.
- **Networking**: Retrofit (`2.11.0`) + OkHttp (`4.12.0` with 10MB Cache & Exponential Backoff Retry Interceptor) + Moshi (`1.15.1`).
- **Background Sync**: WorkManager (`2.10.0`) for Offline-First synchronization.
- **Security**: Jetpack Security (`EncryptedSharedPreferences`) + ProGuard/R8.
- **Monitoring**: Firebase BoM (Analytics, Crashlytics, Performance, Auth, Firestore).
- **Annotation Processing**: KSP (Kotlin Symbol Processing).

---

## 📦 3. Quickstart & Build Instructions

When opening the project on a new PC:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Projets
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Build the web frontend**:
   ```bash
   npm run build
   ```

4. **Set up Android SDK local.properties**:
   Ensure `android/local.properties` exists at the root or inside `android/` with your SDK path:
   ```properties
   sdk.dir=C\:\\Users\\<YourUsername>\\AppData\\Local\\Android\\Sdk
   ```

5. **Build & Test Android App via Gradle**:
   ```bash
   cd android
   ./gradlew clean assembleDebug
   ```

---

## 🤖 4. Instructions for AI Agents on New PCs

If an AI assistant is assisting on the new machine, instruct it with:
> *"Read `dev_setup.md` to understand the architecture of Meal Grocery Planner. This is a Capacitor hybrid app with a robust native Kotlin backend (Hilt, Room, Retrofit, WorkManager, Firebase). Always use built-in IDE tools (read_file, replace_file_content, run_shell_command) and follow Android best practices."*
