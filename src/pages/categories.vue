```vue
<template>
    <v-container fluid class="pa-6">

        <!-- Page Header -->
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
            <div>
                <h1 class="text-h5 font-weight-bold">
                    Asset Categories
                </h1>

                <p class="text-body-2 text-medium-emphasis mt-1">
                    Manage categories used to classify ICT assets
                </p>
            </div>

            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
                Add Category
            </v-btn>
        </div>

        <!-- Summary Cards -->
        <v-row class="mb-2">

            <v-col v-for="stat in summaryCards" :key="stat.title" cols="12" sm="6" md="3">
                <v-card rounded="lg" elevation="1" class="pa-4">
                    <div class="d-flex align-center">

                        <v-avatar :color="stat.color" variant="tonal" size="48" class="mr-4">
                            <v-icon>
                                {{ stat.icon }}
                            </v-icon>
                        </v-avatar>

                        <div>
                            <div class="text-caption text-medium-emphasis">
                                {{ stat.title }}
                            </div>

                            <div class="text-h5 font-weight-bold">
                                {{ stat.value }}
                            </div>
                        </div>

                    </div>
                </v-card>
            </v-col>

        </v-row>

        <!-- Search and Filter -->
        <v-card rounded="lg" elevation="1" class="mb-6">
            <v-card-text>
                <v-row align="center">

                    <v-col cols="12" md="7">
                        <v-text-field v-model="search" label="Search categories"
                            placeholder="Category name or description..." prepend-inner-icon="mdi-magnify"
                            variant="outlined" density="comfortable" hide-details clearable />
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-select v-model="statusFilter" label="Status" :items="['All', 'Active', 'Inactive']"
                            variant="outlined" density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" sm="6" md="1">
                        <v-btn icon variant="text" size="large" @click="clearFilters">
                            <v-icon>
                                mdi-filter-remove-outline
                            </v-icon>

                            <v-tooltip activator="parent">
                                Clear Filters
                            </v-tooltip>
                        </v-btn>
                    </v-col>

                </v-row>
            </v-card-text>
        </v-card>

        <!-- Categories Table -->
        <v-card rounded="lg" elevation="1">

            <v-card-title class="pa-5">

                <div class="d-flex align-center">

                    <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                        <v-icon>
                            mdi-shape-outline
                        </v-icon>
                    </v-avatar>

                    <div>
                        <div class="text-subtitle-1 font-weight-bold">
                            Categories
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ filteredCategories.length }} categories
                        </div>
                    </div>

                </div>

            </v-card-title>

            <v-divider />

            <v-data-table :headers="headers" :items="filteredCategories" :items-per-page="10" hover>

                <!-- Category -->
                <template #item.name="{ item }">

                    <div class="d-flex align-center">

                        <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                            <v-icon>
                                {{ item.icon }}
                            </v-icon>
                        </v-avatar>

                        <div>
                            <div class="font-weight-medium">
                                {{ item.name }}
                            </div>

                            <div class="text-caption text-medium-emphasis">
                                {{ item.description }}
                            </div>
                        </div>

                    </div>

                </template>

                <!-- Asset Count -->
                <template #item.asset_count="{ item }">

                    <v-chip variant="tonal" color="primary" size="small">
                        <v-icon start size="14">
                            mdi-package-variant
                        </v-icon>

                        {{ item.asset_count }}
                    </v-chip>

                </template>

                <!-- Status -->
                <template #item.status="{ item }">

                    <v-chip :color="item.status === 'Active' ? 'success' : 'default'" size="small" variant="tonal">
                        <v-icon start size="14">
                            {{
                                item.status === 'Active'
                                    ? 'mdi-check-circle-outline'
                                    : 'mdi-close-circle-outline'
                            }}
                        </v-icon>

                        {{ item.status }}
                    </v-chip>

                </template>

                <!-- Created -->
                <template #item.created_at="{ item }">
                    {{ formatDate(item.created_at) }}
                </template>

                <!-- Actions -->
                <template #item.actions="{ item }">

                    <div class="d-flex justify-end">

                        <v-btn icon variant="text" size="small" color="primary" @click="viewCategory(item)">
                            <v-icon>
                                mdi-eye-outline
                            </v-icon>

                            <v-tooltip activator="parent">
                                View
                            </v-tooltip>
                        </v-btn>

                        <v-btn icon variant="text" size="small" @click="editCategory(item)">
                            <v-icon>
                                mdi-pencil-outline
                            </v-icon>

                            <v-tooltip activator="parent">
                                Edit
                            </v-tooltip>
                        </v-btn>

                        <v-btn icon variant="text" size="small" color="error" @click="deleteCategory(item)">
                            <v-icon>
                                mdi-delete-outline
                            </v-icon>

                            <v-tooltip activator="parent">
                                Delete
                            </v-tooltip>
                        </v-btn>

                    </div>

                </template>

            </v-data-table>

        </v-card>

        <!-- Add / Edit Dialog -->
        <v-dialog v-model="dialog" max-width="600">
            <v-card rounded="lg">

                <v-card-title class="pa-5">

                    <div class="d-flex align-center">

                        <v-avatar color="primary" variant="tonal" size="42" class="mr-3">
                            <v-icon>
                                {{ editing
                                    ? 'mdi-pencil-outline'
                                    : 'mdi-shape-plus-outline'
                                }}
                            </v-icon>
                        </v-avatar>

                        <div>

                            <div class="text-h6 font-weight-bold">
                                {{ editing ? 'Edit Category' : 'Add Category' }}
                            </div>

                            <div class="text-caption text-medium-emphasis">
                                {{
                                    editing
                                        ? 'Update category information'
                                        : 'Create a new ICT asset category'
                                }}
                            </div>

                        </div>

                    </div>

                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">

                    <v-text-field v-model="formData.name" label="Category Name" placeholder="e.g. Desktop Computer"
                        prepend-inner-icon="mdi-shape-outline" variant="outlined" density="comfortable" class="mb-4" />

                    <v-textarea v-model="formData.description" label="Description"
                        placeholder="Describe this asset category..." prepend-inner-icon="mdi-text-box-outline"
                        variant="outlined" density="comfortable" rows="3" class="mb-4" />

                    <v-select v-model="formData.icon" label="Category Icon" :items="iconOptions" item-title="label"
                        item-value="value" variant="outlined" density="comfortable" class="mb-4">

                        <template #item="{ props, item }">
                            <v-list-item v-bind="props">

                                <template #prepend>
                                    <v-icon>
                                        {{ item?.raw?.value }}
                                    </v-icon>
                                </template>

                            </v-list-item>
                        </template>

                        <template #selection="{ item }">
                            <div class="d-flex align-center">
                                <v-icon class="mr-2">
                                    {{ item?.raw?.value }}
                                </v-icon>

                                {{ item?.raw?.label }}
                            </div>
                        </template>

                    </v-select>

                    <v-switch v-model="formData.status" color="success" label="Active Category" true-value="Active"
                        false-value="Inactive" hide-details />

                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-5">

                    <v-spacer />

                    <v-btn variant="outlined" @click="dialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-content-save" @click="saveCategory">
                        {{ editing ? 'Update Category' : 'Save Category' }}
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-dialog>

        <!-- View Dialog -->
        <v-dialog v-model="viewDialog" max-width="550">
            <v-card v-if="selectedCategory" rounded="lg">

                <v-card-title class="pa-5">

                    <div class="d-flex align-center">

                        <v-avatar color="primary" size="52" variant="tonal" class="mr-4">
                            <v-icon size="28">
                                {{ selectedCategory.icon }}
                            </v-icon>
                        </v-avatar>

                        <div>

                            <div class="text-h6 font-weight-bold">
                                {{ selectedCategory.name }}
                            </div>

                            <v-chip :color="selectedCategory.status === 'Active'
                                ? 'success'
                                : 'default'
                                " size="small" variant="tonal" class="mt-1">
                                {{ selectedCategory.status }}
                            </v-chip>

                        </div>

                    </div>

                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">

                    <div class="mb-5">

                        <div class="text-caption text-medium-emphasis">
                            Description
                        </div>

                        <div class="mt-1">
                            {{ selectedCategory.description || 'No description' }}
                        </div>

                    </div>

                    <v-row>

                        <v-col cols="6">

                            <div class="text-caption text-medium-emphasis">
                                Assets
                            </div>

                            <div class="text-h6 font-weight-bold">
                                {{ selectedCategory.asset_count }}
                            </div>

                        </v-col>

                        <v-col cols="6">

                            <div class="text-caption text-medium-emphasis">
                                Created
                            </div>

                            <div class="font-weight-medium">
                                {{ formatDate(selectedCategory.created_at) }}
                            </div>

                        </v-col>

                    </v-row>

                </v-card-text>

                <v-card-actions class="pa-5">

                    <v-spacer />

                    <v-btn variant="outlined" @click="viewDialog = false">
                        Close
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="450">
            <v-card rounded="lg">

                <v-card-title class="pa-5">
                    Delete Category?
                </v-card-title>

                <v-card-text>

                    Are you sure you want to delete

                    <strong>
                        {{ selectedCategory?.name }}
                    </strong>

                    ?

                    <div v-if="selectedCategory?.asset_count > 0" class="text-warning mt-3">
                        <v-icon size="18">
                            mdi-alert-outline
                        </v-icon>

                        This category currently has
                        {{ selectedCategory.asset_count }}
                        asset(s) assigned to it.
                    </div>

                    <div class="text-caption text-medium-emphasis mt-3">
                        This is currently a frontend demo. No database records will
                        actually be deleted.
                    </div>

                </v-card-text>

                <v-card-actions class="pa-5">

                    <v-spacer />

                    <v-btn variant="outlined" @click="deleteDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="error" prepend-icon="mdi-delete-outline" @click="confirmDelete">
                        Delete
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-dialog>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="snackbarColor" location="top right" :timeout="3000">

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
const statusFilter = ref('All')

const dialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)

const editing = ref(false)
const selectedCategory = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

/*
|--------------------------------------------------------------------------
| Dummy Categories
|--------------------------------------------------------------------------
*/

const categories = ref([
    {
        id: 1,
        name: 'Desktop Computer',
        description: 'Desktop computers and workstations',
        icon: 'mdi-desktop-tower',
        asset_count: 85,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 2,
        name: 'Laptop',
        description: 'Portable computers and notebooks',
        icon: 'mdi-laptop',
        asset_count: 62,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 3,
        name: 'Printer',
        description: 'Laser, inkjet, and multifunction printers',
        icon: 'mdi-printer-outline',
        asset_count: 35,
        status: 'Active',
        created_at: '2026-01-12',
    },
    {
        id: 4,
        name: 'Network Equipment',
        description: 'Switches, routers, access points, and network devices',
        icon: 'mdi-switch',
        asset_count: 28,
        status: 'Active',
        created_at: '2026-01-15',
    },
    {
        id: 5,
        name: 'Projector',
        description: 'Multimedia projectors and presentation equipment',
        icon: 'mdi-projector',
        asset_count: 18,
        status: 'Active',
        created_at: '2026-01-18',
    },
    {
        id: 6,
        name: 'UPS',
        description: 'Uninterruptible Power Supply equipment',
        icon: 'mdi-battery-charging',
        asset_count: 17,
        status: 'Active',
        created_at: '2026-01-20',
    },
    {
        id: 7,
        name: 'Server',
        description: 'Physical servers and server hardware',
        icon: 'mdi-server',
        asset_count: 8,
        status: 'Active',
        created_at: '2026-01-22',
    },
    {
        id: 8,
        name: 'Monitor',
        description: 'Computer monitors and displays',
        icon: 'mdi-monitor',
        asset_count: 42,
        status: 'Active',
        created_at: '2026-01-25',
    },
    {
        id: 9,
        name: 'Scanner',
        description: 'Document and image scanners',
        icon: 'mdi-scanner',
        asset_count: 7,
        status: 'Active',
        created_at: '2026-02-01',
    },
    {
        id: 10,
        name: 'Other',
        description: 'Other ICT equipment and peripherals',
        icon: 'mdi-devices',
        asset_count: 12,
        status: 'Active',
        created_at: '2026-02-05',
    },
    {
        id: 11,
        name: 'Legacy Equipment',
        description: 'Old equipment retained for reference',
        icon: 'mdi-archive-outline',
        asset_count: 0,
        status: 'Inactive',
        created_at: '2026-02-10',
    },
])

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const formData = ref({
    name: '',
    description: '',
    icon: 'mdi-devices',
    status: 'Active',
})

/*
|--------------------------------------------------------------------------
| Table
|--------------------------------------------------------------------------
*/

const headers = [
    {
        title: 'Category',
        key: 'name',
    },
    {
        title: 'Assets',
        key: 'asset_count',
        align: 'center',
    },
    {
        title: 'Status',
        key: 'status',
    },
    {
        title: 'Created',
        key: 'created_at',
    },
    {
        title: 'Actions',
        key: 'actions',
        sortable: false,
        align: 'end',
    },
]

/*
|--------------------------------------------------------------------------
| Icons
|--------------------------------------------------------------------------
*/

const iconOptions = [
    {
        label: 'Desktop',
        value: 'mdi-desktop-tower',
    },
    {
        label: 'Laptop',
        value: 'mdi-laptop',
    },
    {
        label: 'Printer',
        value: 'mdi-printer-outline',
    },
    {
        label: 'Network',
        value: 'mdi-switch',
    },
    {
        label: 'Projector',
        value: 'mdi-projector',
    },
    {
        label: 'UPS / Battery',
        value: 'mdi-battery-charging',
    },
    {
        label: 'Server',
        value: 'mdi-server',
    },
    {
        label: 'Monitor',
        value: 'mdi-monitor',
    },
    {
        label: 'Scanner',
        value: 'mdi-scanner',
    },
    {
        label: 'Other Devices',
        value: 'mdi-devices',
    },
    {
        label: 'Archive',
        value: 'mdi-archive-outline',
    },
]

/*
|--------------------------------------------------------------------------
| Summary
|--------------------------------------------------------------------------
*/

const summaryCards = computed(() => [
    {
        title: 'Total Categories',
        value: categories.value.length,
        icon: 'mdi-shape-outline',
        color: 'primary',
    },
    {
        title: 'Active',
        value: categories.value.filter(
            item => item.status === 'Active'
        ).length,
        icon: 'mdi-check-circle-outline',
        color: 'success',
    },
    {
        title: 'Inactive',
        value: categories.value.filter(
            item => item.status === 'Inactive'
        ).length,
        icon: 'mdi-close-circle-outline',
        color: 'warning',
    },
    {
        title: 'Total Assets',
        value: categories.value.reduce(
            (total, item) => total + Number(item.asset_count),
            0
        ),
        icon: 'mdi-package-variant',
        color: 'secondary',
    },
])

/*
|--------------------------------------------------------------------------
| Filtering
|--------------------------------------------------------------------------
*/

const filteredCategories = computed(() => {
    const query = search.value.toLowerCase().trim()

    return categories.value.filter(item => {

        const matchesSearch =
            !query ||
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)

        const matchesStatus =
            statusFilter.value === 'All' ||
            item.status === statusFilter.value

        return matchesSearch && matchesStatus
    })
})

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const formatDate = date => {
    if (!date) {
        return '-'
    }

    return new Date(date).toLocaleDateString(
        'en-PH',
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
    )
}

const clearFilters = () => {
    search.value = ''
    statusFilter.value = 'All'
}

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const openCreateDialog = () => {
    editing.value = false

    formData.value = {
        name: '',
        description: '',
        icon: 'mdi-devices',
        status: 'Active',
    }

    dialog.value = true
}

/*
|--------------------------------------------------------------------------
| Edit
|--------------------------------------------------------------------------
*/

const editCategory = category => {
    editing.value = true

    formData.value = {
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        status: category.status,
    }

    dialog.value = true
}

/*
|--------------------------------------------------------------------------
| Save
|--------------------------------------------------------------------------
*/

const saveCategory = () => {

    if (!formData.value.name.trim()) {
        showSnackbar(
            'Please enter a category name.',
            'error'
        )

        return
    }

    if (editing.value) {

        const index = categories.value.findIndex(
            item => item.id === formData.value.id
        )

        if (index !== -1) {
            categories.value[index] = {
                ...categories.value[index],
                ...formData.value,
            }
        }

        showSnackbar(
            'Category updated successfully.',
            'success'
        )

    } else {

        categories.value.unshift({
            id: Date.now(),
            name: formData.value.name,
            description: formData.value.description,
            icon: formData.value.icon,
            asset_count: 0,
            status: formData.value.status,
            created_at: new Date()
                .toISOString()
                .substring(0, 10),
        })

        showSnackbar(
            'Category added successfully.',
            'success'
        )
    }

    dialog.value = false
}

/*
|--------------------------------------------------------------------------
| View
|--------------------------------------------------------------------------
*/

const viewCategory = category => {
    selectedCategory.value = category
    viewDialog.value = true
}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const deleteCategory = category => {
    selectedCategory.value = category
    deleteDialog.value = true
}

const confirmDelete = () => {

    if (!selectedCategory.value) {
        return
    }

    categories.value = categories.value.filter(
        item => item.id !== selectedCategory.value.id
    )

    deleteDialog.value = false

    showSnackbar(
        'Category deleted successfully.',
        'success'
    )

    selectedCategory.value = null
}

/*
|--------------------------------------------------------------------------
| Snackbar
|--------------------------------------------------------------------------
*/

const showSnackbar = (
    message,
    color = 'success'
) => {
    snackbarMessage.value = message
    snackbarColor.value = color
    snackbar.value = true
}
</script>
```
