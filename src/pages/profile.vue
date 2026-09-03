<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="mb-6">
            <div class="text-h4 font-weight-bold">
                My Profile
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
                Manage your personal information and account settings
            </div>
        </div>

        <v-row>
            <!-- Profile Card -->
            <v-col cols="12" md="4">
                <v-card rounded="lg" border elevation="0" class="profile-card">
                    <v-card-text class="text-center pa-6">
                        <div class="profile-avatar-wrapper">
                            <v-avatar size="110" color="primary">
                                <span class="text-h3 font-weight-bold text-white">
                                    {{ initials(profile.name) }}
                                </span>
                            </v-avatar>

                            <v-btn icon="mdi-camera-outline" size="small" color="primary" class="avatar-edit"
                                @click="changePhoto">
                                <v-icon>mdi-camera-outline</v-icon>

                                <v-tooltip activator="parent">
                                    Change Photo
                                </v-tooltip>
                            </v-btn>
                        </div>

                        <div class="text-h6 font-weight-bold mt-5">
                            {{ profile.name }}
                        </div>

                        <div class="text-body-2 text-medium-emphasis mt-1">
                            {{ profile.email }}
                        </div>

                        <v-chip color="primary" variant="tonal" class="mt-3">
                            <v-icon start size="16">
                                mdi-shield-account-outline
                            </v-icon>

                            {{ profile.role }}
                        </v-chip>

                        <v-divider class="my-6" />

                        <div class="text-left">
                            <div class="text-caption text-medium-emphasis">
                                Department
                            </div>

                            <div class="text-body-2 font-weight-medium mb-4">
                                {{ profile.department }}
                            </div>

                            <div class="text-caption text-medium-emphasis">
                                Account Status
                            </div>

                            <div class="mb-4">
                                <v-chip size="small" color="success" variant="tonal">
                                    <v-icon start size="14">
                                        mdi-check-circle
                                    </v-icon>
                                    Active
                                </v-chip>
                            </div>

                            <div class="text-caption text-medium-emphasis">
                                Member Since
                            </div>

                            <div class="text-body-2 font-weight-medium">
                                {{ profile.memberSince }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Account Statistics -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="text-subtitle-1 font-weight-bold">
                        Account Activity
                    </v-card-title>

                    <v-divider />

                    <v-list lines="two">
                        <v-list-item>
                            <template #prepend>
                                <v-avatar color="primary" variant="tonal" size="40">
                                    <v-icon>mdi-login</v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                Last Login
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ profile.lastLogin }}
                            </v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template #prepend>
                                <v-avatar color="success" variant="tonal" size="40">
                                    <v-icon>mdi-package-variant-closed</v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                Assets Managed
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                245 inventory records
                            </v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template #prepend>
                                <v-avatar color="warning" variant="tonal" size="40">
                                    <v-icon>mdi-tools</v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                Maintenance Records
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                48 records created
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <!-- Main Profile Settings -->
            <v-col cols="12" md="8">
                <!-- Personal Information -->
                <v-card rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Personal Information
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Update your personal account information
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="profile.firstName" label="First Name"
                                    prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="profile.lastName" label="Last Name"
                                    prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="profile.email" label="Email Address" type="email"
                                    prepend-inner-icon="mdi-email-outline" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="profile.phone" label="Contact Number"
                                    prepend-inner-icon="mdi-phone-outline" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12">
                                <v-text-field v-model="profile.position" label="Position"
                                    prepend-inner-icon="mdi-briefcase-outline" variant="outlined"
                                    density="comfortable" />
                            </v-col>
                        </v-row>

                        <div class="d-flex justify-end">
                            <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="saveProfile">
                                Save Profile
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Security -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Security
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Manage your password and account security
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <div class="d-flex align-center mb-5">
                            <v-avatar color="warning" variant="tonal" size="48">
                                <v-icon>
                                    mdi-lock-outline
                                </v-icon>
                            </v-avatar>

                            <div class="ml-4">
                                <div class="text-subtitle-1 font-weight-medium">
                                    Password
                                </div>

                                <div class="text-caption text-medium-emphasis">
                                    Last changed 30 days ago
                                </div>
                            </div>

                            <v-spacer />

                            <v-btn variant="outlined" @click="passwordDialog = true">
                                Change Password
                            </v-btn>
                        </div>

                        <v-divider class="mb-4" />

                        <v-list>
                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-shield-check-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Two-Factor Authentication
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Add another layer of protection to your account
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="profile.twoFactor" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-bell-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Login Notifications
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Notify me when my account is accessed
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="profile.loginNotifications" color="primary" hide-details />
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <!-- Preferences -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Preferences
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Customize your personal experience
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select v-model="profile.language" label="Language" :items="['English', 'Filipino']"
                                    prepend-inner-icon="mdi-translate" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="profile.theme" label="Theme" :items="[
                                    'System Default',
                                    'Light',
                                    'Dark'
                                ]" prepend-inner-icon="mdi-theme-light-dark" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12">
                                <v-select v-model="profile.itemsPerPage" label="Items Per Page"
                                    :items="[10, 25, 50, 100]" prepend-inner-icon="mdi-format-list-numbered"
                                    variant="outlined" density="comfortable" />
                            </v-col>
                        </v-row>

                        <v-divider class="my-3" />

                        <v-list>
                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-email-fast-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Email Notifications
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Receive system notifications through email
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="profile.emailNotifications" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-monitor-dashboard
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Dashboard Summary
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Show summary information on the dashboard
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="profile.dashboardSummary" color="primary" hide-details />
                                </template>
                            </v-list-item>
                        </v-list>

                        <div class="d-flex justify-end mt-4">
                            <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="savePreferences">
                                Save Preferences
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Recent Activity -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Recent Activity
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Recent actions performed using your account
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-list lines="two">
                        <v-list-item v-for="activity in activities" :key="activity.id">
                            <template #prepend>
                                <v-avatar :color="activity.color" variant="tonal" size="42">
                                    <v-icon>
                                        {{ activity.icon }}
                                    </v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                {{ activity.action }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ activity.description }}
                            </v-list-item-subtitle>

                            <template #append>
                                <span class="text-caption text-medium-emphasis">
                                    {{ activity.time }}
                                </span>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>

        <!-- Change Password Dialog -->
        <v-dialog v-model="passwordDialog" max-width="500">
            <v-card rounded="lg">
                <v-card-title class="pa-5">
                    <div class="text-h6 font-weight-bold">
                        Change Password
                    </div>

                    <div class="text-caption text-medium-emphasis mt-1">
                        Update your account password
                    </div>
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-text-field v-model="password.current" label="Current Password" type="password"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined" density="comfortable" class="mb-2" />

                    <v-text-field v-model="password.newPassword" label="New Password" type="password"
                        prepend-inner-icon="mdi-lock-plus-outline" variant="outlined" density="comfortable"
                        class="mb-2" />

                    <v-text-field v-model="password.confirmPassword" label="Confirm New Password" type="password"
                        prepend-inner-icon="mdi-lock-check-outline" variant="outlined" density="comfortable" />

                    <v-alert type="info" variant="tonal" class="mt-3">
                        Use at least 8 characters with a combination of
                        letters, numbers, and symbols.
                    </v-alert>
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-4">
                    <v-spacer />

                    <v-btn variant="text" @click="passwordDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-lock-check-outline" @click="changePassword">
                        Update Password
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar.show" :timeout="3000">
            {{ snackbar.message }}

            <template #actions>
                <v-btn variant="text" @click="snackbar.show = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'

const passwordDialog = ref(false)

const profile = reactive({
    firstName: 'ICT',
    lastName: 'Technician',
    name: 'ICT Technician',
    email: 'icttechnician@slsu.edu.ph',
    phone: '0917 000 0000',
    position: 'ICT Technician',
    role: 'ICT Technician',
    department: 'ICT Office',
    memberSince: 'January 12, 2026',
    lastLogin: 'Today, 9:15 AM',

    twoFactor: false,
    loginNotifications: true,

    language: 'English',
    theme: 'System Default',
    itemsPerPage: 25,

    emailNotifications: true,
    dashboardSummary: true,
})

const password = reactive({
    current: '',
    newPassword: '',
    confirmPassword: '',
})

const snackbar = reactive({
    show: false,
    message: '',
})

const activities = [
    {
        id: 1,
        action: 'Updated asset',
        description: 'ICT-2026-0003 · Laser Printer',
        time: '10 minutes ago',
        icon: 'mdi-pencil-outline',
        color: 'primary',
    },
    {
        id: 2,
        action: 'Created maintenance record',
        description: 'Printer preventive maintenance',
        time: '1 hour ago',
        icon: 'mdi-tools',
        color: 'warning',
    },
    {
        id: 3,
        action: 'Added new asset',
        description: 'ICT-2026-0010 · Document Scanner',
        time: 'Yesterday',
        icon: 'mdi-plus-circle-outline',
        color: 'success',
    },
    {
        id: 4,
        action: 'Generated report',
        description: 'ICT Asset Inventory Report',
        time: 'Yesterday',
        icon: 'mdi-file-chart-outline',
        color: 'info',
    },
    {
        id: 5,
        action: 'Logged in',
        description: 'Successful account login',
        time: 'Yesterday',
        icon: 'mdi-login',
        color: 'purple',
    },
]

function initials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
}

function changePhoto() {
    snackbar.message =
        'Profile photo upload will be connected later.'
    snackbar.show = true
}

function saveProfile() {
    profile.name =
        `${profile.firstName} ${profile.lastName}`.trim()

    snackbar.message = 'Profile information saved successfully.'
    snackbar.show = true
}

function savePreferences() {
    snackbar.message = 'Preferences saved successfully.'
    snackbar.show = true
}

function changePassword() {
    if (
        !password.current ||
        !password.newPassword ||
        !password.confirmPassword
    ) {
        snackbar.message = 'Please complete all password fields.'
        snackbar.show = true
        return
    }

    if (password.newPassword !== password.confirmPassword) {
        snackbar.message = 'New passwords do not match.'
        snackbar.show = true
        return
    }

    passwordDialog.value = false

    password.current = ''
    password.newPassword = ''
    password.confirmPassword = ''

    snackbar.message =
        'Password updated successfully. Backend integration will be added later.'
    snackbar.show = true
}
</script>

<style scoped>
.profile-card {
    overflow: visible;
}

.profile-avatar-wrapper {
    position: relative;
    width: 110px;
    margin: 0 auto;
}

.avatar-edit {
    position: absolute;
    right: -4px;
    bottom: 0;
}
</style>