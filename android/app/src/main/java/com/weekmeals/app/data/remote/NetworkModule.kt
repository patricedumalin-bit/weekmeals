package com.weekmeals.app.data.remote

import android.content.Context
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.Cache
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.io.File
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideMoshi(): Moshi {
        return Moshi.Builder()
            .add(KotlinJsonAdapterFactory())
            .build()
    }

    @Provides
    @Singleton
    fun provideCache(@ApplicationContext context: Context): Cache {
        val cacheSize = 10 * 1024 * 1024L // 10 MB cache
        val cacheDir = File(context.cacheDir, "http_cache")
        return Cache(cacheDir, cacheSize)
    }

    @Provides
    @Singleton
    fun provideRetryInterceptor(): Interceptor {
        return Interceptor { chain ->
            var request = chain.request()
            var response: okhttp3.Response? = null
            var success = false
            var attempt = 0
            val maxAttempts = 3
            var delay = 1000L // 1 second initial backoff

            while (!success && attempt < maxAttempts) {
                try {
                    response?.close()
                    response = chain.proceed(request)
                    success = response.isSuccessful
                } catch (e: Exception) {
                    if (attempt == maxAttempts - 1) throw e
                }
                if (!success) {
                    attempt++
                    if (attempt < maxAttempts) {
                        try {
                            Thread.sleep(delay)
                        } catch (ie: InterruptedException) {
                            Thread.currentThread().interrupt()
                        }
                        delay *= 2 // Exponential backoff
                    }
                }
            }
            response ?: chain.proceed(request)
        }
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(cache: Cache, retryInterceptor: Interceptor): OkHttpClient {
        val loggingInterceptor = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }

        return OkHttpClient.Builder()
            .cache(cache)
            .addInterceptor(retryInterceptor)
            .addInterceptor(loggingInterceptor)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }

    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient, moshi: Moshi): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.weekmeals.com/")
            .client(okHttpClient)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()
    }
}
