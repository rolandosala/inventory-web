<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
                <h1 class="text-h4 font-weight-bold">Departments</h1>
                <p class="text-body-2 text-medium-emphasis mt-1">
                    Manage departments and offices assigned to ICT assets.
                </p>
            </div>

            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
                Add Department
            </v-btn>
        </div>

        <!-- Summary Cards -->
        <v-row class="mb-4">
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text>
                        <div class="d-flex justify-space-between align-center">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Total Departments
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ departments.length }}
                                </div>
                            </div>

                            <v-avatar color="primary" variant="tonal" size="48">
                                <v-icon>mdi-office-building-outline</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text>
                        <div class="d-flex justify-space-between align-center">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Active
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ activeDepartments }}
                                </div>
                            </div>

                            <v-avatar color="success" variant="tonal" size="48">
                                <v-icon>mdi-check-circle-outline</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text>
                        <div class="d-flex justify-space-between align-center">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Inactive
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ inactiveDepartments }}
                                </div>
                            </div>

                            <v-avatar color="error" variant="tonal" size="48">
                                <v-icon>mdi-close-circle-outline</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text>
                        <div class="d-flex justify-space-between align-center">
                            <div>
                                <div class="text-body-2 text-medium-emphasis">
                                    Total Assets
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ totalAssets }}
                                </div>
                            </div>

                            <v-avatar color="info" variant="tonal" size="48">
                                <v-icon>mdi-devices</v-icon>
                            </v-avatar>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Filters -->
        <v-card class="mb-4">
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12" md="7">
                        <v-text-field v-model="search" label="Search departments"
                            placeholder="Search by code, name, head, or description..." prepend-inner-icon="mdi-magnify"
                            variant="outlined" density="comfortable" hide-details clearable />
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="statusFilter" label="Status" :items="['All', 'Active', 'Inactive']"
                            variant="outlined" density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-btn block variant="outlined" prepend-icon="mdi-filter-remove-outline" @click="clearFilters">
                            Clear
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Department Table -->
        <v-card>
            <v-card-title class="d-flex align-center">
                <span>Department List</span>

                <v-spacer />

                <span class="text-body-2 text-medium-emphasis">
                    {{ filteredDepartments.length }} records
                </span>
            </v-card-title>

            <v-divider />

            <v-data-table :headers="headers" :items="filteredDepartments" item-value="id" hover>
                <!-- Department -->
                <template #item.name="{ item }">
                    <div class="d-flex align-center py-2">
                        <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                            <v-icon>mdi-office-building-outline</v-icon>
                        </v-avatar>

                        <div>
                            <div class="font-weight-medium">
                                {{ item.name }}
                            </div>
                            <div class="text-caption text-medium-emphasis">
                                {{ item.code }}
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Head -->
                <template #item.head="{ item }">
                    <div>
                        <div class="font-weight-medium">
                            {{ item.head }}
                        </div>
                        <div class="text-caption text-medium-emphasis">
                            Department Head
                        </div>
                    </div>
                </template>

                <!-- Assets -->
                <template #item.asset_count="{ item }">
                    <v-chip color="primary" variant="tonal" size="small">
                        {{ item.asset_count }} assets
                    </v-chip>
                </template>

                <!-- Status -->
                <template #item.status="{ item }">
                    <v-chip :color="item.status === 'Active' ? 'success' : 'error'" size="small" variant="tonal">
                        <v-icon start size="16">
                            {{
                                item.status === 'Active'
                                    ? 'mdi-check-circle-outline'
                                    : 'mdi-close-circle-outline'
                            }}
                        </v-icon>

                        {{ item.status }}
                    </v-chip>
                </template>

                <!-- Actions -->
                <template #item.actions="{ item }">
                    <div class="d-flex">
                        <v-btn variant="text" size="small" color="primary" @click="viewDepartment(item)">
                            <v-icon>mdi-eye-outline</v-icon>

                            <v-tooltip activator="parent">
                                View Department
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="warning" @click="editDepartment(item)">
                            <v-icon>mdi-pencil-outline</v-icon>

                            <v-tooltip activator="parent">
                                Edit Department
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="error" @click="confirmDelete(item)">
                            <v-icon>mdi-delete-outline</v-icon>

                            <v-tooltip activator="parent">
                                Delete Department
                            </v-tooltip>
                        </v-btn>
                    </div>
                </template>

                <template #no-data>
                    <div class="text-center pa-8">
                        <v-icon size="48" color="grey" class="mb-3">
                            mdi-office-building-outline
                        </v-icon>

                        <div class="text-h6">
                            No departments found
                        </div>

                        <div class="text-body-2 text-medium-emphasis">
                            Try changing your search or filters.
                        </div>
                    </div>
                </template>
            </v-data-table>
        </v-card>

        <!-- Add/Edit Dialog -->
        <v-dialog v-model="formDialog" max-width="650">
            <v-card>
                <v-card-title class="d-flex align-center pa-5">
                    <v-icon color="primary" class="mr-2">
                        {{
                            editingDepartment
                                ? 'mdi-pencil-outline'
                                : 'mdi-office-building-plus-outline'
                        }}
                    </v-icon>

                    {{ editingDepartment ? 'Edit Department' : 'Add Department' }}

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="formDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-text-field v-model="formData.code" label="Department Code" placeholder="e.g. ICT"
                        variant="outlined" density="comfortable" class="mb-4" />

                    <v-text-field v-model="formData.name" label="Department Name" placeholder="e.g. ICT Office"
                        variant="outlined" density="comfortable" class="mb-4" />

                    <v-text-field v-model="formData.head" label="Department Head" placeholder="Enter department head"
                        variant="outlined" density="comfortable" class="mb-4" />

                    <v-textarea v-model="formData.description" label="Description"
                        placeholder="Enter department description" variant="outlined" density="comfortable" rows="3"
                        class="mb-4" />

                    <v-select v-model="formData.status" label="Status" :items="['Active', 'Inactive']"
                        variant="outlined" density="comfortable" />
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-5">
                    <v-spacer />

                    <v-btn variant="text" @click="formDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="saveDepartment">
                        {{ editingDepartment ? 'Update Department' : 'Save Department' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View Dialog -->
        <v-dialog v-model="viewDialog" max-width="600">
            <v-card v-if="selectedDepartment">
                <v-card-title class="d-flex align-center pa-5">
                    <v-avatar color="primary" variant="tonal" class="mr-3">
                        <v-icon>mdi-office-building-outline</v-icon>
                    </v-avatar>

                    <div>
                        <div class="text-h6">
                            {{ selectedDepartment.name }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ selectedDepartment.code }}
                        </div>
                    </div>

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="viewDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-list lines="two">
                        <v-list-item prepend-icon="mdi-account-outline" title="Department Head"
                            :subtitle="selectedDepartment.head" />

                        <v-list-item prepend-icon="mdi-devices" title="ICT Assets"
                            :subtitle="`${selectedDepartment.asset_count} assets assigned`" />

                        <v-list-item prepend-icon="mdi-information-outline" title="Description"
                            :subtitle="selectedDepartment.description" />

                        <v-list-item prepend-icon="mdi-calendar-outline" title="Created"
                            :subtitle="selectedDepartment.created_at" />
                    </v-list>

                    <div class="mt-4">
                        <v-chip :color="selectedDepartment.status === 'Active'
                                ? 'success'
                                : 'error'
                            " variant="tonal">
                            {{ selectedDepartment.status }}
                        </v-chip>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="450">
            <v-card>
                <v-card-title class="pa-5">
                    Delete Department
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete
                    <strong>{{ selectedDepartment?.name }}</strong>?
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

                    <v-btn color="error" prepend-icon="mdi-delete-outline" @click="deleteDepartment">
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
const statusFilter = ref('All')

const formDialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)

const editingDepartment = ref(false)
const selectedDepartment = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const departments = ref([
    {
        id: 1,
        code: 'ICT',
        name: 'ICT Office',
        head: 'ICT Director',
        description: 'Information and Communications Technology Office',
        asset_count: 35,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 2,
        code: 'REG',
        name: 'Registrar',
        head: 'University Registrar',
        description: 'Office of the University Registrar',
        asset_count: 28,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 3,
        code: 'ACC',
        name: 'Accounting Office',
        head: 'Chief Accountant',
        description: 'University Accounting Office',
        asset_count: 24,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 4,
        code: 'COED',
        name: 'College of Education',
        head: 'College Dean',
        description: 'College of Education',
        asset_count: 21,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 5,
        code: 'COE',
        name: 'College of Engineering',
        head: 'College Dean',
        description: 'College of Engineering',
        asset_count: 19,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 6,
        code: 'LIB',
        name: 'Library',
        head: 'University Librarian',
        description: 'University Library',
        asset_count: 17,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 7,
        code: 'CAO',
        name: 'Campus Administrative Office',
        head: 'Campus Administrator',
        description: 'Campus Administrative Office',
        asset_count: 15,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 8,
        code: 'HR',
        name: 'Human Resource Management Office',
        head: 'HRMO Head',
        description: 'Human Resource Management Office',
        asset_count: 14,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 9,
        code: 'PROC',
        name: 'Procurement Office',
        head: 'Procurement Officer',
        description: 'Procurement Management Office',
        asset_count: 10,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 10,
        code: 'OSAS',
        name: 'Office of Student Affairs and Services',
        head: 'OSAS Director',
        description: 'Office of Student Affairs and Services',
        asset_count: 12,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 11,
        code: 'OLD',
        name: 'Old / Inactive Department',
        head: 'N/A',
        description: 'Inactive department record',
        asset_count: 0,
        status: 'Inactive',
        created_at: '2025-01-10',
    },
])

const formData = ref({
    code: '',
    name: '',
    head: '',
    description: '',
    status: 'Active',
})

const headers = [
    {
        title: 'Department',
        key: 'name',
        minWidth: 250,
    },
    {
        title: 'Department Head',
        key: 'head',
        minWidth: 180,
    },
    {
        title: 'Assets',
        key: 'asset_count',
        align: 'center',
        width: 130,
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        width: 130,
    },
    {
        title: 'Actions',
        key: 'actions',
        sortable: false,
        align: 'center',
        width: 150,
    },
]

const filteredDepartments = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    return departments.value.filter((department) => {
        const matchesSearch =
            !keyword ||
            department.code.toLowerCase().includes(keyword) ||
            department.name.toLowerCase().includes(keyword) ||
            department.head.toLowerCase().includes(keyword) ||
            department.description.toLowerCase().includes(keyword)

        const matchesStatus =
            statusFilter.value === 'All' ||
            department.status === statusFilter.value

        return matchesSearch && matchesStatus
    })
})

const activeDepartments = computed(() =>
    departments.value.filter(
        (department) => department.status === 'Active',
    ).length,
)

const inactiveDepartments = computed(() =>
    departments.value.filter(
        (department) => department.status === 'Inactive',
    ).length,
)

const totalAssets = computed(() =>
    departments.value.reduce(
        (total, department) => total + department.asset_count,
        0,
    ),
)

function resetForm() {
    formData.value = {
        code: '',
        name: '',
        head: '',
        description: '',
        status: 'Active',
    }
}

function openCreateDialog() {
    editingDepartment.value = false
    selectedDepartment.value = null
    resetForm()
    formDialog.value = true
}

function editDepartment(department) {
    editingDepartment.value = true
    selectedDepartment.value = department

    formData.value = {
        code: department.code,
        name: department.name,
        head: department.head,
        description: department.description,
        status: department.status,
    }

    formDialog.value = true
}

function viewDepartment(department) {
    selectedDepartment.value = department
    viewDialog.value = true
}

function saveDepartment() {
    if (!formData.value.code || !formData.value.name) {
        showSnackbar(
            'Department code and name are required.',
            'error',
        )
        return
    }

    if (editingDepartment.value) {
        const index = departments.value.findIndex(
            (department) => department.id === selectedDepartment.value.id,
        )

        if (index !== -1) {
            departments.value[index] = {
                ...departments.value[index],
                ...formData.value,
            }
        }

        showSnackbar('Department updated successfully.')
    } else {
        departments.value.push({
            id: Date.now(),
            ...formData.value,
            asset_count: 0,
            created_at: new Date().toISOString().split('T')[0],
        })

        showSnackbar('Department added successfully.')
    }

    formDialog.value = false
}

function confirmDelete(department) {
    selectedDepartment.value = department
    deleteDialog.value = true
}

function deleteDepartment() {
    if (!selectedDepartment.value) return

    departments.value = departments.value.filter(
        (department) => department.id !== selectedDepartment.value.id,
    )

    deleteDialog.value = false
    showSnackbar('Department deleted successfully.')
    selectedDepartment.value = null
}

function clearFilters() {
    search.value = ''
    statusFilter.value = 'All'
}

function showSnackbar(message, color = 'success') {
    snackbarMessage.value = message
    snackbarColor.value = color
    snackbar.value = true
}
</script>