```vue
<template>
    <v-app>
        <v-main class="login-page">
            <v-container fluid class="fill-height pa-0">
                <v-row no-gutters class="fill-height">
                    <!-- LEFT SIDE -->
                    <v-col cols="12" md="6" class="login-brand-section d-none d-md-flex">
                        <div class="brand-content">
                            <v-avatar size="80" color="white" class="mb-6">
                                <v-icon size="48" color="primary">
                                    mdi-laptop-account
                                </v-icon>
                            </v-avatar>

                            <div class="text-h3 font-weight-bold mb-4">
                                ICT Inventory
                            </div>

                            <div class="text-h6 font-weight-regular mb-6">
                                Asset Management System
                            </div>

                            <div class="text-body-1 brand-description">
                                Manage ICT assets, equipment, software,
                                maintenance records, and inventory information
                                in one centralized system.
                            </div>

                            <div class="feature-list mt-8">
                                <div class="feature-item">
                                    <v-icon class="mr-3">
                                        mdi-package-variant-closed-check
                                    </v-icon>
                                    <span>Complete ICT asset tracking</span>
                                </div>

                                <div class="feature-item">
                                    <v-icon class="mr-3">
                                        mdi-qrcode-scan
                                    </v-icon>
                                    <span>QR-based asset identification</span>
                                </div>

                                <div class="feature-item">
                                    <v-icon class="mr-3">
                                        mdi-chart-box-outline
                                    </v-icon>
                                    <span>Inventory reports and analytics</span>
                                </div>

                                <div class="feature-item">
                                    <v-icon class="mr-3">
                                        mdi-tools
                                    </v-icon>
                                    <span>Maintenance monitoring</span>
                                </div>
                            </div>
                        </div>
                    </v-col>

                    <!-- RIGHT SIDE -->
                    <v-col cols="12" md="6" class="login-form-section">
                        <div class="login-form-wrapper">
                            <!-- Mobile Logo -->
                            <div class="d-flex d-md-none justify-center mb-8">
                                <v-avatar size="70" color="primary">
                                    <v-icon size="42" color="white">
                                        mdi-laptop-account
                                    </v-icon>
                                </v-avatar>
                            </div>

                            <div class="mb-8">
                                <div class="text-h4 font-weight-bold">
                                    Welcome back
                                </div>

                                <div class="text-body-2 text-medium-emphasis mt-2">
                                    Sign in to your ICT Inventory account
                                </div>
                            </div>

                            <!-- Login Form -->
                            <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
                                <v-text-field v-model="email" label="Email Address" type="email"
                                    placeholder="Enter your email" prepend-inner-icon="mdi-email-outline"
                                    variant="outlined" density="comfortable" :rules="[rules.required, rules.email]"
                                    class="mb-3" />

                                <v-text-field v-model="password" label="Password" placeholder="Enter your password"
                                    prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPassword
                                        ? 'mdi-eye-off-outline'
                                        : 'mdi-eye-outline'
                                        " :type="showPassword ? 'text' : 'password'" variant="outlined"
                                    density="comfortable" :rules="[rules.required]" class="mb-2" @click:append-inner="
                                        showPassword = !showPassword
                                        " />

                                <div class="d-flex align-center justify-space-between mb-6">
                                    <v-checkbox v-model="rememberMe" label="Remember me" hide-details
                                        density="compact" />

                                    <v-btn variant="text" color="primary" size="small" @click="forgotPassword">
                                        Forgot password?
                                    </v-btn>
                                </div>

                                <v-btn type="submit" color="primary" size="large" block :loading="loading">
                                    <v-icon start>
                                        mdi-login
                                    </v-icon>

                                    Sign In
                                </v-btn>
                            </v-form>

                            <!-- Demo Notice -->
                            <v-alert type="info" variant="tonal" class="mt-6" density="comfortable">
                                <div class="text-body-2">
                                    <strong>Frontend Demo</strong>
                                </div>

                                <div class="text-caption mt-1">
                                    Authentication is currently using dummy
                                    credentials. Laravel API authentication
                                    will be connected later.
                                </div>
                            </v-alert>

                            <!-- Demo Credentials -->
                            <v-card variant="outlined" rounded="lg" class="mt-4">
                                <v-card-text>
                                    <div class="text-caption text-medium-emphasis mb-2">
                                        DEMO CREDENTIALS
                                    </div>

                                    <div class="d-flex justify-space-between mb-1">
                                        <span class="text-body-2">
                                            Email
                                        </span>

                                        <span class="text-body-2 font-weight-medium">
                                            icttechnician@slsu.edu.ph
                                        </span>
                                    </div>

                                    <div class="d-flex justify-space-between">
                                        <span class="text-body-2">
                                            Password
                                        </span>

                                        <span class="text-body-2 font-weight-medium">
                                            password
                                        </span>
                                    </div>
                                </v-card-text>
                            </v-card>

                            <div class="text-center text-caption text-medium-emphasis mt-8">
                                ICT Inventory System
                                <span class="mx-1">•</span>
                                Frontend Preview
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>

            <!-- Snackbar -->
            <v-snackbar v-model="snackbar.show" :timeout="3000">
                {{ snackbar.message }}

                <template #actions>
                    <v-btn variant="text" @click="snackbar.show = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios'

const router = useRouter()

const loginForm = ref(null)

const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

const email = ref('')
const password = ref('')

const snackbar = reactive({
    show: false,
    message: '',
})

const rules = {
    required: value => {
        return !!value || 'This field is required'
    },

    email: value => {
        return (
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            'Please enter a valid email address'
        )
    },
}

/* async function login() {
    const { valid: formValid } =
        await loginForm.value.validate()

    if (!formValid) {
        return
    }

    loading.value = true

    // ------------------------------------------------
    // FRONTEND DEMO ONLY
    // Laravel authentication will replace this later.
    // ------------------------------------------------

    setTimeout(() => {
        if (
            email.value === 'icttechnician@slsu.edu.ph' &&
            password.value === 'password'
        ) {
            // Temporary dummy authentication state
            localStorage.setItem(
                'isAuthenticated',
                'true'
            )

            localStorage.setItem(
                'user',
                JSON.stringify({
                    id: 3,
                    name: 'ICT Technician',
                    email: email.value,
                    role: 'ICT Technician',
                })
            )

            snackbar.message =
                'Login successful. Welcome back!'

            snackbar.show = true

            setTimeout(() => {
                router.push('/dashboard')
            }, 500)
        } else {
            snackbar.message =
                'Invalid email or password.'

            snackbar.show = true
        }

        loading.value = false
    }, 800)
} */

async function login() {
    const { valid: formValid } =
        await loginForm.value.validate()

    if (!formValid) {
        return
    }

    loading.value = true

    try {
        const response = await api.post('/login', {
            email: email.value,
            password: password.value,
        })

        const data = response.data

        /* // Store authentication token
        localStorage.setItem(
            'authToken',
            data.token
        )

        // Store authenticated user
        localStorage.setItem(
            'user',
            JSON.stringify(data.user)
        )

        localStorage.setItem(
            'isAuthenticated',
            'true'
        ) */


        const auth = useAuthStore()

        snackbar.message =
            'Login successful. Welcome back!'

        snackbar.show = true

        setTimeout(async () => {
            /* router.push('/dashboard') */
            auth.setAuth(
                data.token,
                data.user
            )

            await auth.fetchUser()

            router.push('/dashboard')
        }, 500)

    } catch (error) {

        if (error.response?.status === 422) {
            snackbar.message =
                error.response.data.message ||
                'Please check your login information.'

        } else if (error.response?.status === 401) {
            snackbar.message =
                'Invalid email or password.'

        } else {
            snackbar.message =
                'Unable to connect to the server.'
        }

        snackbar.show = true

    } finally {
        loading.value = false
    }
}

function forgotPassword() {
    snackbar.message =
        'Password recovery will be connected to Laravel later.'

    snackbar.show = true
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    background: rgb(var(--v-theme-background));
}

.login-brand-section {
    position: relative;
    min-height: 100vh;
    background: rgb(var(--v-theme-primary));
    color: white;
    overflow: hidden;
}

.login-brand-section::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    top: -180px;
    right: -180px;
}

.login-brand-section::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    bottom: -180px;
    left: -180px;
}

.brand-content {
    position: relative;
    z-index: 1;
    max-width: 560px;
    margin: auto;
    padding: 48px;
}

.brand-description {
    line-height: 1.7;
    opacity: 0.9;
}

.feature-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.feature-item {
    display: flex;
    align-items: center;
    font-size: 15px;
}

.login-form-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
}

.login-form-wrapper {
    width: 100%;
    max-width: 480px;
}
</style>
```
