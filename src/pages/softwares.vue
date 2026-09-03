<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
                <h1 class="text-h4 font-weight-bold">Software Inventory</h1>
                <p class="text-body-2 text-medium-emphasis mt-1">
                    Manage software, licenses, installations, and compliance.
                </p>
            </div>

            <div class="d-flex ga-2">
                <v-btn variant="outlined" prepend-icon="mdi-file-chart-outline"
                    @click="showSnackbar('Software report selected.')">
                    Report
                </v-btn>

                <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
                    Add Software
                </v-btn>
            </div>
        </div>

        <!-- Summary -->
        <v-row class="mb-6">
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text class="pa-5">
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Software Products
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ softwares.length }}
                                </div>
                            </div>

                            <v-avatar color="primary" variant="tonal" size="48">
                                <v-icon>mdi-application-outline</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text class="pa-5">
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Total Licenses
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ totalLicenses }}
                                </div>
                            </div>

                            <v-avatar color="info" variant="tonal" size="48">
                                <v-icon>mdi-license</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text class="pa-5">
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Installed
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ totalInstalled }}
                                </div>
                            </div>

                            <v-avatar color="success" variant="tonal" size="48">
                                <v-icon>mdi-check-decagram-outline</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text class="pa-5">
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Expiring Soon
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ expiringSoon }}
                                </div>
                            </div>

                            <v-avatar color="warning" variant="tonal" size="48">
                                <v-icon>mdi-calendar-alert</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Search and Filters -->
        <v-card class="mb-6">
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12" md="6">
                        <v-text-field v-model="search" label="Search software"
                            placeholder="Search software name, publisher, version..." prepend-inner-icon="mdi-magnify"
                            variant="outlined" density="comfortable" clearable hide-details />
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-select v-model="categoryFilter" label="Category" :items="categoryOptions" variant="outlined"
                            density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-select v-model="licenseFilter" label="License" :items="licenseOptions" variant="outlined"
                            density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-select v-model="statusFilter" label="Status" :items="['All', 'Active', 'Expired']"
                            variant="outlined" density="comfortable" hide-details />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Software Grid -->
        <v-row>
            <v-col v-for="software in filteredSoftwares" :key="software.id" cols="12" sm="6" lg="4" xl="3">
                <v-card class="software-card h-100" elevation="1">
                    <!-- Card Header -->
                    <v-card-item>
                        <template #prepend>
                            <v-avatar :color="software.color" variant="tonal" size="52">
                                <v-icon size="28">
                                    {{ software.icon }}
                                </v-icon>
                            </v-avatar>
                        </template>

                        <v-card-title class="text-subtitle-1 font-weight-bold">
                            {{ software.name }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ software.publisher }}
                        </v-card-subtitle>

                        <template #append>
                            <v-menu>
                                <template #activator="{ props }">
                                    <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" size="small" />
                                </template>

                                <v-list density="compact">
                                    <v-list-item prepend-icon="mdi-eye-outline" title="View"
                                        @click="viewSoftware(software)" />

                                    <v-list-item prepend-icon="mdi-pencil-outline" title="Edit"
                                        @click="editSoftware(software)" />

                                    <v-list-item prepend-icon="mdi-delete-outline" title="Delete"
                                        @click="confirmDelete(software)" />
                                </v-list>
                            </v-menu>
                        </template>
                    </v-card-item>

                    <v-divider />

                    <v-card-text>
                        <!-- Version -->
                        <div class="d-flex justify-space-between mb-3">
                            <span class="text-body-2 text-medium-emphasis">
                                Version
                            </span>

                            <span class="font-weight-medium">
                                {{ software.version }}
                            </span>
                        </div>

                        <!-- Category -->
                        <div class="d-flex justify-space-between mb-3">
                            <span class="text-body-2 text-medium-emphasis">
                                Category
                            </span>

                            <v-chip size="x-small" variant="tonal" color="primary">
                                {{ software.category }}
                            </v-chip>
                        </div>

                        <!-- License -->
                        <div class="d-flex justify-space-between mb-3">
                            <span class="text-body-2 text-medium-emphasis">
                                License
                            </span>

                            <span>
                                {{ software.license_type }}
                            </span>
                        </div>

                        <!-- License Usage -->
                        <div class="mb-2">
                            <div class="d-flex justify-space-between mb-1">
                                <span class="text-body-2 text-medium-emphasis">
                                    License Usage
                                </span>

                                <span class="text-body-2 font-weight-medium">
                                    {{ software.installed }} /
                                    {{ software.licenses }}
                                </span>
                            </div>

                            <v-progress-linear :model-value="licenseUsage(software)" :color="licenseColor(software)"
                                height="7" rounded />
                        </div>

                        <!-- Expiry -->
                        <div class="d-flex justify-space-between mt-4">
                            <span class="text-body-2 text-medium-emphasis">
                                Expiry
                            </span>

                            <v-chip :color="expiryColor(software)" size="small" variant="tonal">
                                {{ software.expiry }}
                            </v-chip>
                        </div>
                    </v-card-text>

                    <v-divider />

                    <!-- Card Footer -->
                    <v-card-actions class="px-4 py-3">
                        <v-btn variant="text" size="small" color="primary" @click="viewSoftware(software)">
                            <v-icon start>
                                mdi-eye-outline
                            </v-icon>

                            View Details
                        </v-btn>

                        <v-spacer />

                        <v-chip :color="software.status === 'Active'
                                ? 'success'
                                : 'error'
                            " size="x-small" variant="tonal">
                            {{ software.status }}
                        </v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Empty -->
            <v-col v-if="filteredSoftwares.length === 0" cols="12">
                <v-card class="pa-10 text-center">
                    <v-icon size="64" color="grey" class="mb-4">
                        mdi-application-off-outline
                    </v-icon>

                    <div class="text-h6">
                        No software found
                    </div>

                    <div class="text-body-2 text-medium-emphasis">
                        Try changing your search or filters.
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <!-- Add/Edit Dialog -->
        <v-dialog v-model="formDialog" max-width="700" scrollable>
            <v-card>
                <v-card-title class="d-flex align-center pa-5">
                    <v-icon color="primary" class="mr-2">
                        {{
                            editingSoftware
                                ? 'mdi-pencil-outline'
                                : 'mdi-application-plus-outline'
                        }}
                    </v-icon>

                    {{
                        editingSoftware
                            ? 'Edit Software'
                            : 'Add Software'
                    }}

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="formDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-text-field v-model="formData.name" label="Software Name"
                                placeholder="e.g. Microsoft Office" variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field v-model="formData.version" label="Version" placeholder="e.g. 2024"
                                variant="outlined" density="comfortable" />
                        </v-col>
                    </v-row>

                    <v-text-field v-model="formData.publisher" label="Publisher" placeholder="e.g. Microsoft"
                        prepend-inner-icon="mdi-domain" variant="outlined" density="comfortable" class="mb-4" />

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select v-model="formData.category" label="Category" :items="[
                                'Operating System',
                                'Office Productivity',
                                'Graphics & Design',
                                'Security',
                                'Development',
                                'Database',
                                'Utility',
                                'Other',
                            ]" variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select v-model="formData.license_type" label="License Type" :items="[
                                'Subscription',
                                'Perpetual',
                                'Open Source',
                                'Freeware',
                                'Volume License',
                            ]" variant="outlined" density="comfortable" />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field v-model.number="formData.licenses" label="Total Licenses" type="number"
                                variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field v-model.number="formData.installed" label="Installed" type="number"
                                variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field v-model="formData.expiry" label="Expiry Date" type="date" variant="outlined"
                                density="comfortable" />
                        </v-col>
                    </v-row>

                    <v-textarea v-model="formData.description" label="Description / Remarks"
                        placeholder="Enter additional information" variant="outlined" density="comfortable" rows="3"
                        class="mb-4" />

                    <v-select v-model="formData.status" label="Status" :items="['Active', 'Expired']" variant="outlined"
                        density="comfortable" />
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-5">
                    <v-spacer />

                    <v-btn variant="text" @click="formDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="saveSoftware">
                        {{
                            editingSoftware
                                ? 'Update Software'
                                : 'Save Software'
                        }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View Dialog -->
        <v-dialog v-model="viewDialog" max-width="650">
            <v-card v-if="selectedSoftware">
                <v-card-title class="d-flex align-center pa-5">
                    <v-avatar :color="selectedSoftware.color" variant="tonal" size="52" class="mr-3">
                        <v-icon size="28">
                            {{ selectedSoftware.icon }}
                        </v-icon>
                    </v-avatar>

                    <div>
                        <div class="text-h6">
                            {{ selectedSoftware.name }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ selectedSoftware.publisher }}
                        </div>
                    </div>

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="viewDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="6">
                            <div class="text-caption text-medium-emphasis">
                                Version
                            </div>
                            <div class="font-weight-medium mt-1">
                                {{ selectedSoftware.version }}
                            </div>
                        </v-col>

                        <v-col cols="6">
                            <div class="text-caption text-medium-emphasis">
                                Category
                            </div>
                            <div class="font-weight-medium mt-1">
                                {{ selectedSoftware.category }}
                            </div>
                        </v-col>

                        <v-col cols="6">
                            <div class="text-caption text-medium-emphasis">
                                License Type
                            </div>
                            <div class="font-weight-medium mt-1">
                                {{ selectedSoftware.license_type }}
                            </div>
                        </v-col>

                        <v-col cols="6">
                            <div class="text-caption text-medium-emphasis">
                                Expiry
                            </div>
                            <div class="font-weight-medium mt-1">
                                {{ selectedSoftware.expiry }}
                            </div>
                        </v-col>
                    </v-row>

                    <v-divider class="my-4" />

                    <div class="text-subtitle-2 mb-2">
                        License Utilization
                    </div>

                    <div class="d-flex justify-space-between mb-2">
                        <span>
                            {{ selectedSoftware.installed }} installed
                        </span>

                        <span>
                            {{ selectedSoftware.licenses }} licenses
                        </span>
                    </div>

                    <v-progress-linear :model-value="licenseUsage(selectedSoftware)"
                        :color="licenseColor(selectedSoftware)" height="10" rounded />

                    <div class="text-body-2 text-medium-emphasis mt-4">
                        {{ selectedSoftware.description }}
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="450">
            <v-card>
                <v-card-title class="pa-5">
                    Delete Software
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete
                    <strong>{{ selectedSoftware?.name }}</strong>?

                    <br />

                    <span class="text-caption text-medium-emphasis">
                        This is only a frontend dummy operation for now.
                    </span>
                </v-card-text>

                <v-card-actions class="pa-5">
                    <v-spacer />

                    <v-btn variant="text" @click="deleteDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="error" prepend-icon="mdi-delete-outline" @click="deleteSoftware">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
            {{ snackbarMessage }}

            <template #actions>
                <v-btn variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const categoryFilter = ref('All')
const licenseFilter = ref('All')
const statusFilter = ref('All')

const formDialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)

const editingSoftware = ref(false)
const selectedSoftware = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const softwares = ref([
    {
        id: 1,
        name: 'Microsoft Windows 11 Pro',
        publisher: 'Microsoft',
        version: '24H2',
        category: 'Operating System',
        license_type: 'Volume License',
        licenses: 120,
        installed: 105,
        expiry: '2027-06-30',
        status: 'Active',
        icon: 'mdi-microsoft-windows',
        color: 'info',
        description: 'Windows operating system used for institutional computers.',
    },
    {
        id: 2,
        name: 'Microsoft 365',
        publisher: 'Microsoft',
        version: 'Business Standard',
        category: 'Office Productivity',
        license_type: 'Subscription',
        licenses: 50,
        installed: 42,
        expiry: '2027-03-15',
        status: 'Active',
        icon: 'mdi-microsoft-office',
        color: 'primary',
        description: 'Cloud-based productivity and collaboration suite.',
    },
    {
        id: 3,
        name: 'Microsoft Office 2021',
        publisher: 'Microsoft',
        version: '2021',
        category: 'Office Productivity',
        license_type: 'Perpetual',
        licenses: 75,
        installed: 68,
        expiry: 'Perpetual',
        status: 'Active',
        icon: 'mdi-file-document-outline',
        color: 'error',
        description: 'Desktop productivity software suite.',
    },
    {
        id: 4,
        name: 'Adobe Acrobat Pro',
        publisher: 'Adobe',
        version: '2025',
        category: 'Office Productivity',
        license_type: 'Subscription',
        licenses: 15,
        installed: 12,
        expiry: '2026-12-20',
        status: 'Active',
        icon: 'mdi-file-pdf-box',
        color: 'error',
        description: 'PDF creation, editing, and document management software.',
    },
    {
        id: 5,
        name: 'ESET Endpoint Security',
        publisher: 'ESET',
        version: '12',
        category: 'Security',
        license_type: 'Subscription',
        licenses: 100,
        installed: 87,
        expiry: '2026-11-30',
        status: 'Active',
        icon: 'mdi-shield-check-outline',
        color: 'success',
        description: 'Endpoint security and antivirus protection.',
    },
    {
        id: 6,
        name: 'AutoCAD',
        publisher: 'Autodesk',
        version: '2026',
        category: 'Graphics & Design',
        license_type: 'Subscription',
        licenses: 20,
        installed: 18,
        expiry: '2027-01-31',
        status: 'Active',
        icon: 'mdi-vector-square',
        color: 'warning',
        description: 'Computer-aided design software.',
    },
    {
        id: 7,
        name: 'Visual Studio Code',
        publisher: 'Microsoft',
        version: '1.104',
        category: 'Development',
        license_type: 'Freeware',
        licenses: 999,
        installed: 35,
        expiry: 'Perpetual',
        status: 'Active',
        icon: 'mdi-microsoft-visual-studio-code',
        color: 'info',
        description: 'Source-code editor for software development.',
    },
    {
        id: 8,
        name: 'PostgreSQL',
        publisher: 'PostgreSQL Global Development Group',
        version: '17',
        category: 'Database',
        license_type: 'Open Source',
        licenses: 999,
        installed: 6,
        expiry: 'Perpetual',
        status: 'Active',
        icon: 'mdi-database-outline',
        color: 'primary',
        description: 'Open-source relational database management system.',
    },
    {
        id: 9,
        name: '7-Zip',
        publisher: 'Igor Pavlov',
        version: '24.09',
        category: 'Utility',
        license_type: 'Open Source',
        licenses: 999,
        installed: 85,
        expiry: 'Perpetual',
        status: 'Active',
        icon: 'mdi-archive-outline',
        color: 'secondary',
        description: 'File compression and archive utility.',
    },
    {
        id: 10,
        name: 'Legacy Antivirus',
        publisher: 'Legacy Software',
        version: '2020',
        category: 'Security',
        license_type: 'Subscription',
        licenses: 25,
        installed: 0,
        expiry: '2025-12-31',
        status: 'Expired',
        icon: 'mdi-shield-off-outline',
        color: 'error',
        description: 'Legacy antivirus software no longer in use.',
    },
])

const formData = ref({
    name: '',
    publisher: '',
    version: '',
    category: 'Office Productivity',
    license_type: 'Subscription',
    licenses: 1,
    installed: 0,
    expiry: '',
    description: '',
    status: 'Active',
})

const categoryOptions = computed(() => [
    'All',
    ...new Set(
        softwares.value.map((software) => software.category),
    ),
])

const licenseOptions = computed(() => [
    'All',
    ...new Set(
        softwares.value.map(
            (software) => software.license_type,
        ),
    ),
])

const filteredSoftwares = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    return softwares.value.filter((software) => {
        const matchesSearch =
            !keyword ||
            software.name.toLowerCase().includes(keyword) ||
            software.publisher.toLowerCase().includes(keyword) ||
            software.version.toLowerCase().includes(keyword) ||
            software.category.toLowerCase().includes(keyword)

        const matchesCategory =
            categoryFilter.value === 'All' ||
            software.category === categoryFilter.value

        const matchesLicense =
            licenseFilter.value === 'All' ||
            software.license_type === licenseFilter.value

        const matchesStatus =
            statusFilter.value === 'All' ||
            software.status === statusFilter.value

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLicense &&
            matchesStatus
        )
    })
})

const totalLicenses = computed(() =>
    softwares.value.reduce(
        (total, software) => total + software.licenses,
        0,
    ),
)

const totalInstalled = computed(() =>
    softwares.value.reduce(
        (total, software) => total + software.installed,
        0,
    ),
)

const expiringSoon = computed(() => {
    return softwares.value.filter((software) => {
        if (
            software.expiry === 'Perpetual' ||
            software.status === 'Expired'
        ) {
            return false
        }

        const expiry = new Date(software.expiry)
        const today = new Date()
        const difference =
            expiry.getTime() - today.getTime()

        const days =
            difference / (1000 * 60 * 60 * 24)

        return days >= 0 && days <= 180
    }).length
})

function licenseUsage(software) {
    if (!software.licenses || software.licenses <= 0) {
        return 0
    }

    return Math.min(
        100,
        (software.installed / software.licenses) * 100,
    )
}

function licenseColor(software) {
    const usage = licenseUsage(software)

    if (usage >= 95) return 'error'
    if (usage >= 80) return 'warning'

    return 'success'
}

function expiryColor(software) {
    if (software.status === 'Expired') {
        return 'error'
    }

    if (software.expiry === 'Perpetual') {
        return 'success'
    }

    const expiry = new Date(software.expiry)
    const today = new Date()

    const days =
        (expiry.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)

    if (days <= 180) return 'warning'

    return 'success'
}

function resetForm() {
    formData.value = {
        name: '',
        publisher: '',
        version: '',
        category: 'Office Productivity',
        license_type: 'Subscription',
        licenses: 1,
        installed: 0,
        expiry: '',
        description: '',
        status: 'Active',
    }
}

function openCreateDialog() {
    editingSoftware.value = false
    selectedSoftware.value = null
    resetForm()
    formDialog.value = true
}

function editSoftware(software) {
    editingSoftware.value = true
    selectedSoftware.value = software

    formData.value = {
        name: software.name,
        publisher: software.publisher,
        version: software.version,
        category: software.category,
        license_type: software.license_type,
        licenses: software.licenses,
        installed: software.installed,
        expiry:
            software.expiry === 'Perpetual'
                ? ''
                : software.expiry,
        description: software.description,
        status: software.status,
    }

    formDialog.value = true
}

function viewSoftware(software) {
    selectedSoftware.value = software
    viewDialog.value = true
}

function saveSoftware() {
    if (
        !formData.value.name ||
        !formData.value.publisher
    ) {
        showSnackbar(
            'Software name and publisher are required.',
            'error',
        )

        return
    }

    if (editingSoftware.value) {
        const index = softwares.value.findIndex(
            (software) =>
                software.id === selectedSoftware.value.id,
        )

        if (index !== -1) {
            softwares.value[index] = {
                ...softwares.value[index],
                ...formData.value,
                expiry:
                    formData.value.expiry ||
                    'Perpetual',
            }
        }

        showSnackbar('Software updated successfully.')
    } else {
        softwares.value.push({
            id: Date.now(),
            ...formData.value,
            expiry:
                formData.value.expiry ||
                'Perpetual',
            icon: 'mdi-application-outline',
            color: 'primary',
        })

        showSnackbar('Software added successfully.')
    }

    formDialog.value = false
}

function confirmDelete(software) {
    selectedSoftware.value = software
    deleteDialog.value = true
}

function deleteSoftware() {
    if (!selectedSoftware.value) return

    softwares.value = softwares.value.filter(
        (software) =>
            software.id !== selectedSoftware.value.id,
    )

    deleteDialog.value = false
    showSnackbar('Software deleted successfully.')
    selectedSoftware.value = null
}

function showSnackbar(message, color = 'success') {
    snackbarMessage.value = message
    snackbarColor.value = color
    snackbar.value = true
}
</script>

<style scoped>
.software-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.software-card:hover {
    transform: translateY(-3px);
}
</style>