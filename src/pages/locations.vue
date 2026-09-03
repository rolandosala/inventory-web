<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
                <h1 class="text-h4 font-weight-bold">Locations</h1>
                <p class="text-body-2 text-medium-emphasis mt-1">
                    Manage campus buildings, rooms, and ICT asset locations.
                </p>
            </div>

            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
                Add Location
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
                                    Total Locations
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ locations.length }}
                                </div>
                            </div>

                            <v-avatar color="primary" variant="tonal" size="48">
                                <v-icon>mdi-map-marker-outline</v-icon>
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
                                    Buildings
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ buildingCount }}
                                </div>
                            </div>

                            <v-avatar color="info" variant="tonal" size="48">
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
                                    {{ activeLocations }}
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
                                    Total Assets
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ totalAssets }}
                                </div>
                            </div>

                            <v-avatar color="warning" variant="tonal" size="48">
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
                    <v-col cols="12" md="6">
                        <v-text-field v-model="search" label="Search locations"
                            placeholder="Search building, room, department..." prepend-inner-icon="mdi-magnify"
                            variant="outlined" density="comfortable" hide-details clearable />
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="buildingFilter" label="Building" :items="buildingOptions" variant="outlined"
                            density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-select v-model="statusFilter" label="Status" :items="['All', 'Active', 'Inactive']"
                            variant="outlined" density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" md="1">
                        <v-btn icon="mdi-filter-remove-outline" variant="outlined" @click="clearFilters">
                            <v-tooltip activator="parent">
                                Clear Filters
                            </v-tooltip>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Location Table -->
        <v-card>
            <v-card-title class="d-flex align-center">
                <span>Location List</span>

                <v-spacer />

                <span class="text-body-2 text-medium-emphasis">
                    {{ filteredLocations.length }} records
                </span>
            </v-card-title>

            <v-divider />

            <v-data-table :headers="headers" :items="filteredLocations" item-value="id" hover>
                <!-- Location -->
                <template #item.location="{ item }">
                    <div class="d-flex align-center py-2">
                        <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                            <v-icon>mdi-map-marker-outline</v-icon>
                        </v-avatar>

                        <div>
                            <div class="font-weight-medium">
                                {{ item.location_name }}
                            </div>

                            <div class="text-caption text-medium-emphasis">
                                Room {{ item.room }}
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Building -->
                <template #item.building="{ item }">
                    <div class="d-flex align-center">
                        <v-icon size="20" class="mr-2">
                            mdi-office-building-outline
                        </v-icon>

                        {{ item.building }}
                    </div>
                </template>

                <!-- Department -->
                <template #item.department="{ item }">
                    <v-chip variant="tonal" color="primary" size="small">
                        {{ item.department }}
                    </v-chip>
                </template>

                <!-- Assets -->
                <template #item.asset_count="{ item }">
                    <v-chip color="info" variant="tonal" size="small">
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
                        <v-btn variant="text" size="small" color="primary" @click="viewLocation(item)">
                            <v-icon>mdi-eye-outline</v-icon>

                            <v-tooltip activator="parent">
                                View Location
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="warning" @click="editLocation(item)">
                            <v-icon>mdi-pencil-outline</v-icon>

                            <v-tooltip activator="parent">
                                Edit Location
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="error" @click="confirmDelete(item)">
                            <v-icon>mdi-delete-outline</v-icon>

                            <v-tooltip activator="parent">
                                Delete Location
                            </v-tooltip>
                        </v-btn>
                    </div>
                </template>

                <template #no-data>
                    <div class="text-center pa-8">
                        <v-icon size="48" color="grey" class="mb-3">
                            mdi-map-marker-off-outline
                        </v-icon>

                        <div class="text-h6">
                            No locations found
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
                            editingLocation
                                ? 'mdi-pencil-outline'
                                : 'mdi-map-marker-plus-outline'
                        }}
                    </v-icon>

                    {{ editingLocation ? 'Edit Location' : 'Add Location' }}

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="formDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-text-field v-model="formData.building" label="Building"
                        placeholder="e.g. Administration Building" variant="outlined" density="comfortable"
                        class="mb-4" />

                    <v-text-field v-model="formData.room" label="Room" placeholder="e.g. Room 101" variant="outlined"
                        density="comfortable" class="mb-4" />

                    <v-text-field v-model="formData.location_name" label="Location Name" placeholder="e.g. ICT Office"
                        variant="outlined" density="comfortable" class="mb-4" />

                    <v-select v-model="formData.department" label="Department" :items="departmentOptions"
                        variant="outlined" density="comfortable" class="mb-4" />

                    <v-textarea v-model="formData.description" label="Description"
                        placeholder="Enter location description" variant="outlined" density="comfortable" rows="3"
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

                    <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="saveLocation">
                        {{ editingLocation ? 'Update Location' : 'Save Location' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View Dialog -->
        <v-dialog v-model="viewDialog" max-width="600">
            <v-card v-if="selectedLocation">
                <v-card-title class="d-flex align-center pa-5">
                    <v-avatar color="primary" variant="tonal" class="mr-3">
                        <v-icon>mdi-map-marker-outline</v-icon>
                    </v-avatar>

                    <div>
                        <div class="text-h6">
                            {{ selectedLocation.location_name }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ selectedLocation.building }}
                        </div>
                    </div>

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="viewDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-list lines="two">
                        <v-list-item prepend-icon="mdi-office-building-outline" title="Building"
                            :subtitle="selectedLocation.building" />

                        <v-list-item prepend-icon="mdi-door-outline" title="Room" :subtitle="selectedLocation.room" />

                        <v-list-item prepend-icon="mdi-account-group-outline" title="Department"
                            :subtitle="selectedLocation.department" />

                        <v-list-item prepend-icon="mdi-devices" title="ICT Assets"
                            :subtitle="`${selectedLocation.asset_count} assets assigned`" />

                        <v-list-item prepend-icon="mdi-information-outline" title="Description"
                            :subtitle="selectedLocation.description" />

                        <v-list-item prepend-icon="mdi-calendar-outline" title="Created"
                            :subtitle="selectedLocation.created_at" />
                    </v-list>

                    <div class="mt-4">
                        <v-chip :color="selectedLocation.status === 'Active'
                                ? 'success'
                                : 'error'
                            " variant="tonal">
                            {{ selectedLocation.status }}
                        </v-chip>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="450">
            <v-card>
                <v-card-title class="pa-5">
                    Delete Location
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete
                    <strong>{{ selectedLocation?.location_name }}</strong>?

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

                    <v-btn color="error" prepend-icon="mdi-delete-outline" @click="deleteLocation">
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
const buildingFilter = ref('All')
const statusFilter = ref('All')

const formDialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)

const editingLocation = ref(false)
const selectedLocation = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const locations = ref([
    {
        id: 1,
        building: 'Administration Building',
        room: '101',
        location_name: 'ICT Office',
        department: 'ICT Office',
        description: 'Main ICT Office',
        asset_count: 25,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 2,
        building: 'Administration Building',
        room: '102',
        location_name: 'Registrar Office',
        department: 'Registrar',
        description: 'University Registrar Office',
        asset_count: 18,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 3,
        building: 'Administration Building',
        room: '103',
        location_name: 'Accounting Office',
        department: 'Accounting Office',
        description: 'University Accounting Office',
        asset_count: 15,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 4,
        building: 'Engineering Building',
        room: '201',
        location_name: 'Computer Laboratory 1',
        department: 'College of Engineering',
        description: 'Engineering Computer Laboratory',
        asset_count: 30,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 5,
        building: 'Engineering Building',
        room: '202',
        location_name: 'Computer Laboratory 2',
        department: 'College of Engineering',
        description: 'Engineering Computer Laboratory',
        asset_count: 28,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 6,
        building: 'Education Building',
        room: '101',
        location_name: 'Faculty Room',
        department: 'College of Education',
        description: 'College of Education Faculty Room',
        asset_count: 21,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 7,
        building: 'Library Building',
        room: 'Ground Floor',
        location_name: 'Main Library',
        department: 'Library',
        description: 'University Main Library',
        asset_count: 17,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 8,
        building: 'Student Center',
        room: 'Ground Floor',
        location_name: 'OSAS Office',
        department: 'OSAS',
        description: 'Office of Student Affairs and Services',
        asset_count: 12,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 9,
        building: 'ICT Building',
        room: 'Server Room',
        location_name: 'Network and Server Room',
        department: 'ICT Office',
        description: 'Core network and server infrastructure',
        asset_count: 22,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 10,
        building: 'ICT Building',
        room: '102',
        location_name: 'ICT Training Room',
        department: 'ICT Office',
        description: 'ICT training and technical support room',
        asset_count: 35,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 11,
        building: 'Old Building',
        room: '105',
        location_name: 'Old Computer Laboratory',
        department: 'ICT Office',
        description: 'Former computer laboratory',
        asset_count: 0,
        status: 'Inactive',
        created_at: '2025-01-10',
    },
])

const headers = [
    {
        title: 'Location',
        key: 'location',
        minWidth: 230,
    },
    {
        title: 'Building',
        key: 'building',
        minWidth: 180,
    },
    {
        title: 'Department',
        key: 'department',
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

const departmentOptions = [
    'ICT Office',
    'Registrar',
    'Accounting Office',
    'College of Education',
    'College of Engineering',
    'Library',
    'Campus Administrative Office',
    'Human Resource Management Office',
    'Procurement Office',
    'OSAS',
]

const buildingOptions = computed(() => {
    const buildings = locations.value.map(
        (location) => location.building,
    )

    return ['All', ...new Set(buildings)]
})

const filteredLocations = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    return locations.value.filter((location) => {
        const matchesSearch =
            !keyword ||
            location.location_name.toLowerCase().includes(keyword) ||
            location.building.toLowerCase().includes(keyword) ||
            location.room.toLowerCase().includes(keyword) ||
            location.department.toLowerCase().includes(keyword) ||
            location.description.toLowerCase().includes(keyword)

        const matchesBuilding =
            buildingFilter.value === 'All' ||
            location.building === buildingFilter.value

        const matchesStatus =
            statusFilter.value === 'All' ||
            location.status === statusFilter.value

        return (
            matchesSearch &&
            matchesBuilding &&
            matchesStatus
        )
    })
})

const buildingCount = computed(() => {
    return new Set(
        locations.value.map((location) => location.building),
    ).size
})

const activeLocations = computed(() => {
    return locations.value.filter(
        (location) => location.status === 'Active',
    ).length
})

const totalAssets = computed(() => {
    return locations.value.reduce(
        (total, location) => total + location.asset_count,
        0,
    )
})

const formData = ref({
    building: '',
    room: '',
    location_name: '',
    department: '',
    description: '',
    status: 'Active',
})

function resetForm() {
    formData.value = {
        building: '',
        room: '',
        location_name: '',
        department: '',
        description: '',
        status: 'Active',
    }
}

function openCreateDialog() {
    editingLocation.value = false
    selectedLocation.value = null
    resetForm()
    formDialog.value = true
}

function editLocation(location) {
    editingLocation.value = true
    selectedLocation.value = location

    formData.value = {
        building: location.building,
        room: location.room,
        location_name: location.location_name,
        department: location.department,
        description: location.description,
        status: location.status,
    }

    formDialog.value = true
}

function viewLocation(location) {
    selectedLocation.value = location
    viewDialog.value = true
}

function saveLocation() {
    if (
        !formData.value.building ||
        !formData.value.room ||
        !formData.value.location_name
    ) {
        showSnackbar(
            'Building, room, and location name are required.',
            'error',
        )

        return
    }

    if (editingLocation.value) {
        const index = locations.value.findIndex(
            (location) =>
                location.id === selectedLocation.value.id,
        )

        if (index !== -1) {
            locations.value[index] = {
                ...locations.value[index],
                ...formData.value,
            }
        }

        showSnackbar('Location updated successfully.')
    } else {
        locations.value.push({
            id: Date.now(),
            ...formData.value,
            asset_count: 0,
            created_at: new Date()
                .toISOString()
                .split('T')[0],
        })

        showSnackbar('Location added successfully.')
    }

    formDialog.value = false
}

function confirmDelete(location) {
    selectedLocation.value = location
    deleteDialog.value = true
}

function deleteLocation() {
    if (!selectedLocation.value) return

    locations.value = locations.value.filter(
        (location) =>
            location.id !== selectedLocation.value.id,
    )

    deleteDialog.value = false
    showSnackbar('Location deleted successfully.')
    selectedLocation.value = null
}

function clearFilters() {
    search.value = ''
    buildingFilter.value = 'All'
    statusFilter.value = 'All'
}

function showSnackbar(message, color = 'success') {
    snackbarMessage.value = message
    snackbarColor.value = color
    snackbar.value = true
}
</script>