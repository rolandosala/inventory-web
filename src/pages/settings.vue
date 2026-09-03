<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
            <div>
                <div class="text-h4 font-weight-bold">
                    Settings
                </div>
                <div class="text-body-2 text-medium-emphasis mt-1">
                    Configure system preferences and inventory settings
                </div>
            </div>

            <v-btn color="primary" prepend-icon="mdi-content-save-outline" class="mt-3 mt-sm-0" @click="saveSettings">
                Save Changes
            </v-btn>
        </div>

        <v-row>
            <!-- Settings Navigation -->
            <v-col cols="12" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-list v-model:selected="selectedSection" mandatory nav>
                        <v-list-subheader>
                            SYSTEM SETTINGS
                        </v-list-subheader>

                        <v-list-item value="general" rounded="lg" prepend-icon="mdi-cog-outline" title="General"
                            subtitle="Basic system information" />

                        <v-list-item value="inventory" rounded="lg" prepend-icon="mdi-package-variant-closed"
                            title="Inventory" subtitle="Inventory preferences" />

                        <v-list-item value="notifications" rounded="lg" prepend-icon="mdi-bell-outline"
                            title="Notifications" subtitle="Alerts and reminders" />

                        <v-list-item value="security" rounded="lg" prepend-icon="mdi-shield-lock-outline"
                            title="Security" subtitle="Account and access" />

                        <v-list-item value="backup" rounded="lg" prepend-icon="mdi-backup-restore" title="Backup"
                            subtitle="Data backup settings" />

                        <v-list-item value="appearance" rounded="lg" prepend-icon="mdi-palette-outline"
                            title="Appearance" subtitle="Interface preferences" />
                    </v-list>
                </v-card>

                <!-- System Status -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="text-subtitle-1 font-weight-bold">
                        System Status
                    </v-card-title>

                    <v-divider />

                    <v-card-text>
                        <div class="d-flex align-center mb-4">
                            <v-icon color="success" class="mr-3">
                                mdi-check-circle
                            </v-icon>

                            <div>
                                <div class="text-body-2 font-weight-medium">
                                    System Status
                                </div>
                                <div class="text-caption text-success">
                                    Operational
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-center mb-4">
                            <v-icon color="success" class="mr-3">
                                mdi-database-check-outline
                            </v-icon>

                            <div>
                                <div class="text-body-2 font-weight-medium">
                                    Database
                                </div>
                                <div class="text-caption text-success">
                                    Connected
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-center">
                            <v-icon color="success" class="mr-3">
                                mdi-cloud-check-outline
                            </v-icon>

                            <div>
                                <div class="text-body-2 font-weight-medium">
                                    Backup
                                </div>
                                <div class="text-caption">
                                    Last backup: Today, 2:00 AM
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Settings Content -->
            <v-col cols="12" md="9">
                <!-- GENERAL -->
                <v-card v-if="currentSection === 'general'" rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            General Settings
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Basic information about the inventory system
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settings.systemName" label="System Name"
                                    prepend-inner-icon="mdi-application-outline" variant="outlined"
                                    density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="settings.organization" label="Organization"
                                    prepend-inner-icon="mdi-domain" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="settings.campus" label="Campus"
                                    prepend-inner-icon="mdi-school-outline" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="settings.systemEmail" label="System Email" type="email"
                                    prepend-inner-icon="mdi-email-outline" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12">
                                <v-textarea v-model="settings.systemDescription" label="System Description" rows="3"
                                    prepend-inner-icon="mdi-text-box-outline" variant="outlined" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- INVENTORY -->
                <v-card v-if="currentSection === 'inventory'" rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Inventory Settings
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Configure asset numbering and inventory behavior
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <div class="text-subtitle-1 font-weight-bold mb-4">
                            Asset Identification
                        </div>

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settings.assetPrefix" label="Asset Tag Prefix"
                                    hint="Example: ICT" persistent-hint prepend-inner-icon="mdi-tag-outline"
                                    variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="settings.assetNumberFormat" label="Asset Number Format" :items="[
                                    'ICT-YYYY-####',
                                    'ICT-####',
                                    'YYYY-ICT-####'
                                ]" prepend-inner-icon="mdi-pound" variant="outlined" density="comfortable" />
                            </v-col>
                        </v-row>

                        <v-divider class="my-5" />

                        <div class="text-subtitle-1 font-weight-bold mb-4">
                            Inventory Behavior
                        </div>

                        <v-list>
                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-barcode-scan
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Require Asset Tag
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Every asset must have a unique asset tag
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.requireAssetTag" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-map-marker-check-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Require Location
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Require a location when adding an asset
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.requireLocation" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-office-building-check-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Require Department
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Require a department assignment
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.requireDepartment" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-history
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Enable Audit Trail
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Record changes made to inventory records
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.auditTrail" color="primary" hide-details />
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <!-- NOTIFICATIONS -->
                <v-card v-if="currentSection === 'notifications'" rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Notification Settings
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Configure inventory alerts and reminders
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-list>
                            <v-list-item>
                                <template #prepend>
                                    <v-icon color="warning">
                                        mdi-shield-alert-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Warranty Expiration Alerts
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Notify when asset warranties are about to expire
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.warrantyAlerts" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon color="error">
                                        mdi-alert-circle-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Unserviceable Asset Alerts
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Notify when assets become unserviceable
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.unserviceableAlerts" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon color="info">
                                        mdi-tools
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Maintenance Reminders
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Send reminders for scheduled maintenance
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.maintenanceAlerts" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-email-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Email Notifications
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Enable email notifications
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.emailNotifications" color="primary" hide-details />
                                </template>
                            </v-list-item>
                        </v-list>

                        <v-divider class="my-5" />

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select v-model="settings.warrantyDays" label="Warranty Alert Before"
                                    :items="[30, 60, 90, 120]" suffix="days" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="settings.notificationFrequency" label="Notification Frequency"
                                    :items="[
                                        'Immediately',
                                        'Daily',
                                        'Weekly'
                                    ]" variant="outlined" density="comfortable" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- SECURITY -->
                <v-card v-if="currentSection === 'security'" rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Security Settings
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Configure authentication and account security
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-list>
                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-lock-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Strong Password Policy
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Require strong passwords for user accounts
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.strongPasswords" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-account-lock-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Account Lockout
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Temporarily lock accounts after failed attempts
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.accountLockout" color="primary" hide-details />
                                </template>
                            </v-list-item>

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
                                    Require an additional authentication method
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.twoFactor" color="primary" hide-details />
                                </template>
                            </v-list-item>
                        </v-list>

                        <v-divider class="my-5" />

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model.number="settings.maxLoginAttempts" type="number"
                                    label="Maximum Login Attempts" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="settings.sessionTimeout" label="Session Timeout" :items="[
                                    '15 minutes',
                                    '30 minutes',
                                    '1 hour',
                                    '4 hours',
                                    '8 hours'
                                ]" variant="outlined" density="comfortable" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- BACKUP -->
                <v-card v-if="currentSection === 'backup'" rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Backup Settings
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Manage inventory database backups
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-alert type="info" variant="tonal" class="mb-5">
                            Backup functionality is currently a frontend
                            preview and will be connected to the backend later.
                        </v-alert>

                        <div class="d-flex align-center mb-5">
                            <v-avatar color="success" variant="tonal" size="52">
                                <v-icon>
                                    mdi-backup-restore
                                </v-icon>
                            </v-avatar>

                            <div class="ml-4">
                                <div class="text-subtitle-1 font-weight-bold">
                                    Last Backup
                                </div>

                                <div class="text-body-2 text-medium-emphasis">
                                    September 3, 2026 · 2:00 AM
                                </div>
                            </div>

                            <v-spacer />

                            <v-chip color="success" variant="tonal">
                                Successful
                            </v-chip>
                        </div>

                        <v-divider class="mb-5" />

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select v-model="settings.backupFrequency" label="Backup Frequency" :items="[
                                    'Daily',
                                    'Weekly',
                                    'Monthly'
                                ]" variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="settings.backupTime" type="time" label="Backup Time"
                                    variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12">
                                <v-text-field v-model="settings.backupLocation" label="Backup Location"
                                    prepend-inner-icon="mdi-folder-outline" variant="outlined" density="comfortable" />
                            </v-col>
                        </v-row>

                        <div class="d-flex flex-wrap ga-2 mt-2">
                            <v-btn color="primary" prepend-icon="mdi-database-export-outline" @click="createBackup">
                                Backup Now
                            </v-btn>

                            <v-btn variant="outlined" prepend-icon="mdi-history" @click="showBackupHistory">
                                Backup History
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- APPEARANCE -->
                <v-card v-if="currentSection === 'appearance'" rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Appearance
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Customize the application interface
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <div class="text-subtitle-1 font-weight-bold mb-4">
                            Theme
                        </div>

                        <v-radio-group v-model="settings.theme" inline>
                            <v-radio label="System Default" value="system" />

                            <v-radio label="Light" value="light" />

                            <v-radio label="Dark" value="dark" />
                        </v-radio-group>

                        <v-divider class="my-5" />

                        <div class="text-subtitle-1 font-weight-bold mb-4">
                            Interface
                        </div>

                        <v-list>
                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-menu-open
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Compact Navigation
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Use a more compact sidebar
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.compactNavigation" color="primary" hide-details />
                                </template>
                            </v-list-item>

                            <v-list-item>
                                <template #prepend>
                                    <v-icon>
                                        mdi-animation-outline
                                    </v-icon>
                                </template>

                                <v-list-item-title>
                                    Interface Animations
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Enable interface transition effects
                                </v-list-item-subtitle>

                                <template #append>
                                    <v-switch v-model="settings.animations" color="primary" hide-details />
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

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
import { computed, reactive, ref } from 'vue'

const selectedSection = ref(['general'])

const settings = reactive({
    // General
    systemName: 'ICT Inventory System',
    organization: 'Southern Leyte State University',
    campus: 'Tomas Oppus Campus',
    systemEmail: 'icttechnician@slsu.edu.ph',
    systemDescription:
        'ICT Asset and Inventory Management System',

    // Inventory
    assetPrefix: 'ICT',
    assetNumberFormat: 'ICT-YYYY-####',
    requireAssetTag: true,
    requireLocation: true,
    requireDepartment: true,
    auditTrail: true,

    // Notifications
    warrantyAlerts: true,
    unserviceableAlerts: true,
    maintenanceAlerts: true,
    emailNotifications: true,
    warrantyDays: 90,
    notificationFrequency: 'Daily',

    // Security
    strongPasswords: true,
    accountLockout: true,
    twoFactor: false,
    maxLoginAttempts: 5,
    sessionTimeout: '1 hour',

    // Backup
    backupFrequency: 'Daily',
    backupTime: '02:00',
    backupLocation: 'D:\\ICT Inventory Backups',

    // Appearance
    theme: 'system',
    compactNavigation: false,
    animations: true,
})

const snackbar = reactive({
    show: false,
    message: '',
})

const currentSection = computed(() => {
    return selectedSection.value[0] || 'general'
})

function saveSettings() {
    snackbar.message =
        'Settings saved successfully. Backend integration will be added later.'
    snackbar.show = true
}

function createBackup() {
    snackbar.message =
        'Backup requested. This will be connected to the backend later.'
    snackbar.show = true
}

function showBackupHistory() {
    snackbar.message =
        'Backup history will be available after backend integration.'
    snackbar.show = true
}
</script>

<style scoped>
.v-list-item {
    margin-bottom: 2px;
}

.v-list-item--active {
    background: rgba(var(--v-theme-primary), 0.08);
}
</style>