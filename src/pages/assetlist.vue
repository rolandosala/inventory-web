```vue
<script setup>
import { computed, ref } from 'vue'

/*
|--------------------------------------------------------------------------
| DUMMY ASSET DATA
|--------------------------------------------------------------------------
| Temporary frontend data.
| This will later be replaced with Laravel API data.
|--------------------------------------------------------------------------
*/

const search = ref('')
const statusFilter = ref('All')
const categoryFilter = ref('All')
const departmentFilter = ref('All')

const selectedAssets = ref([])

const showDeleteDialog = ref(false)
const assetToDelete = ref(null)

const assets = ref([
    {
        id: 1,
        assetTag: 'ICT-2026-0001',
        propertyNumber: 'SLSU-ICT-2026-001',
        itemName: 'Desktop Computer',
        category: 'Desktop Computer',
        brand: 'Dell',
        model: 'OptiPlex 7010',
        serialNumber: 'DL7010-001245',
        department: 'ICT Office',
        location: 'ICT Laboratory',
        acquisitionCost: 45000,
        purchaseDate: '2026-01-15',
        status: 'Serviceable',
        condition: 'Good',
    },
    {
        id: 2,
        assetTag: 'ICT-2026-0002',
        propertyNumber: 'SLSU-ICT-2026-002',
        itemName: 'Laptop',
        category: 'Laptop',
        brand: 'Lenovo',
        model: 'ThinkPad E14',
        serialNumber: 'LNV-E14-98231',
        department: 'Registrar',
        location: 'Registrar Office',
        acquisitionCost: 52000,
        purchaseDate: '2026-01-20',
        status: 'Serviceable',
        condition: 'Good',
    },
    {
        id: 3,
        assetTag: 'ICT-2026-0003',
        propertyNumber: 'SLSU-ICT-2026-003',
        itemName: 'Printer',
        category: 'Printer',
        brand: 'Epson',
        model: 'L5290',
        serialNumber: 'EP5290-002341',
        department: 'Accounting',
        location: 'Accounting Office',
        acquisitionCost: 18000,
        purchaseDate: '2026-02-05',
        status: 'Under Repair',
        condition: 'Needs Repair',
    },
    {
        id: 4,
        assetTag: 'ICT-2026-0004',
        propertyNumber: 'SLSU-ICT-2026-004',
        itemName: 'Projector',
        category: 'Projector',
        brand: 'Epson',
        model: 'EB-X06',
        serialNumber: 'EPX06-99182',
        department: 'College of Education',
        location: 'Room 204',
        acquisitionCost: 38000,
        purchaseDate: '2026-02-10',
        status: 'Serviceable',
        condition: 'Good',
    },
    {
        id: 5,
        assetTag: 'ICT-2026-0005',
        propertyNumber: 'SLSU-ICT-2026-005',
        itemName: 'Desktop Computer',
        category: 'Desktop Computer',
        brand: 'HP',
        model: 'ProDesk 400',
        serialNumber: 'HP400-778821',
        department: 'Library',
        location: 'Library',
        acquisitionCost: 42000,
        purchaseDate: '2026-02-12',
        status: 'Unserviceable',
        condition: 'Poor',
    },
    {
        id: 6,
        assetTag: 'ICT-2026-0006',
        propertyNumber: 'SLSU-ICT-2026-006',
        itemName: 'Network Switch',
        category: 'Network Equipment',
        brand: 'Cisco',
        model: 'CBS350-24T',
        serialNumber: 'CBS350-77219',
        department: 'ICT Office',
        location: 'Server Room',
        acquisitionCost: 35000,
        purchaseDate: '2026-02-18',
        status: 'Serviceable',
        condition: 'Excellent',
    },
    {
        id: 7,
        assetTag: 'ICT-2026-0007',
        propertyNumber: 'SLSU-ICT-2026-007',
        itemName: 'UPS',
        category: 'UPS',
        brand: 'APC',
        model: 'BX2200MI',
        serialNumber: 'APC-2200-1122',
        department: 'ICT Office',
        location: 'Server Room',
        acquisitionCost: 15000,
        purchaseDate: '2026-02-20',
        status: 'Serviceable',
        condition: 'Good',
    },
    {
        id: 8,
        assetTag: 'ICT-2026-0008',
        propertyNumber: 'SLSU-ICT-2026-008',
        itemName: 'Laptop',
        category: 'Laptop',
        brand: 'Acer',
        model: 'TravelMate P2',
        serialNumber: 'ACER-P2-12345',
        department: 'Human Resource',
        location: 'HR Office',
        acquisitionCost: 48000,
        purchaseDate: '2026-03-01',
        status: 'Under Repair',
        condition: 'Needs Repair',
    },
    {
        id: 9,
        assetTag: 'ICT-2026-0009',
        propertyNumber: 'SLSU-ICT-2026-009',
        itemName: 'Printer',
        category: 'Printer',
        brand: 'Brother',
        model: 'DCP-T720DW',
        serialNumber: 'BR720-331122',
        department: 'Admission',
        location: 'Admission Office',
        acquisitionCost: 22000,
        purchaseDate: '2026-03-05',
        status: 'Serviceable',
        condition: 'Good',
    },
    {
        id: 10,
        assetTag: 'ICT-2026-0010',
        propertyNumber: 'SLSU-ICT-2026-010',
        itemName: 'Access Point',
        category: 'Network Equipment',
        brand: 'Ubiquiti',
        model: 'U6 Pro',
        serialNumber: 'UBNT-U6-88221',
        department: 'ICT Office',
        location: 'Administration Building',
        acquisitionCost: 11500,
        purchaseDate: '2026-03-10',
        status: 'Serviceable',
        condition: 'Excellent',
    },
])

const categories = [
    'All',
    'Desktop Computer',
    'Laptop',
    'Printer',
    'Network Equipment',
    'Projector',
    'UPS',
]

const departments = [
    'All',
    'ICT Office',
    'Registrar',
    'Accounting',
    'College of Education',
    'Library',
    'Human Resource',
    'Admission',
]

const statuses = [
    'All',
    'Serviceable',
    'Under Repair',
    'Unserviceable',
]

/*
|--------------------------------------------------------------------------
| FILTERED ASSETS
|--------------------------------------------------------------------------
*/

const filteredAssets = computed(() => {
    const query = search.value.toLowerCase().trim()

    return assets.value.filter(asset => {
        const matchesSearch =
            !query ||
            asset.assetTag.toLowerCase().includes(query) ||
            asset.propertyNumber.toLowerCase().includes(query) ||
            asset.itemName.toLowerCase().includes(query) ||
            asset.brand.toLowerCase().includes(query) ||
            asset.model.toLowerCase().includes(query) ||
            asset.serialNumber.toLowerCase().includes(query)

        const matchesStatus =
            statusFilter.value === 'All' ||
            asset.status === statusFilter.value

        const matchesCategory =
            categoryFilter.value === 'All' ||
            asset.category === categoryFilter.value

        const matchesDepartment =
            departmentFilter.value === 'All' ||
            asset.department === departmentFilter.value

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory &&
            matchesDepartment
        )
    })
})

/*
|--------------------------------------------------------------------------
| SUMMARY
|--------------------------------------------------------------------------
*/

const totalAssets = computed(() => assets.value.length)

const serviceableAssets = computed(() =>
    assets.value.filter(
        asset => asset.status === 'Serviceable',
    ).length,
)

const repairAssets = computed(() =>
    assets.value.filter(
        asset => asset.status === 'Under Repair',
    ).length,
)

const unserviceableAssets = computed(() =>
    assets.value.filter(
        asset => asset.status === 'Unserviceable',
    ).length,
)

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const formatCurrency = value => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 0,
    }).format(value)
}

const statusColor = status => {
    switch (status) {
        case 'Serviceable':
            return 'success'

        case 'Under Repair':
            return 'warning'

        case 'Unserviceable':
            return 'error'

        default:
            return 'grey'
    }
}

const conditionColor = condition => {
    switch (condition) {
        case 'Excellent':
            return 'success'

        case 'Good':
            return 'primary'

        case 'Needs Repair':
            return 'warning'

        case 'Poor':
            return 'error'

        default:
            return 'grey'
    }
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

const confirmDelete = asset => {
    assetToDelete.value = asset
    showDeleteDialog.value = true
}

const deleteAsset = () => {
    if (!assetToDelete.value) return

    assets.value = assets.value.filter(
        asset => asset.id !== assetToDelete.value.id,
    )

    selectedAssets.value = selectedAssets.value.filter(
        id => id !== assetToDelete.value.id,
    )

    assetToDelete.value = null
    showDeleteDialog.value = false
}

/*
|--------------------------------------------------------------------------
| CLEAR FILTERS
|--------------------------------------------------------------------------
*/

const clearFilters = () => {
    search.value = ''
    statusFilter.value = 'All'
    categoryFilter.value = 'All'
    departmentFilter.value = 'All'
}
</script>

<template>
    <v-container fluid class="pa-6">

        <!-- ========================================================= -->
        <!-- HEADER -->
        <!-- ========================================================= -->

        <div class="d-flex flex-wrap align-center justify-space-between mb-6">

            <div>
                <h1 class="text-h4 font-weight-bold">
                    ICT Assets
                </h1>

                <p class="text-body-2 text-medium-emphasis mt-1">
                    Manage and monitor all ICT equipment
                </p>
            </div>

            <div class="d-flex ga-2 mt-3 mt-md-0">

                <v-btn variant="outlined" prepend-icon="mdi-qrcode-scan" to="/scan">
                    Scan Asset
                </v-btn>

                <v-btn color="primary" prepend-icon="mdi-plus" :to="{ name: 'assets-create' }">
                    Add Asset
                </v-btn>

            </div>
        </div>

        <!-- ========================================================= -->
        <!-- SUMMARY CARDS -->
        <!-- ========================================================= -->

        <v-row class="mb-2">

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" elevation="1">
                    <v-card-text>
                        <div class="d-flex align-center">

                            <v-avatar color="primary" variant="tonal" size="44">
                                <v-icon icon="mdi-package-variant" />
                            </v-avatar>

                            <div class="ml-4">
                                <div class="text-caption text-medium-emphasis">
                                    Total Assets
                                </div>

                                <div class="text-h5 font-weight-bold">
                                    {{ totalAssets }}
                                </div>
                            </div>

                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" elevation="1">
                    <v-card-text>
                        <div class="d-flex align-center">

                            <v-avatar color="success" variant="tonal" size="44">
                                <v-icon icon="mdi-check-circle-outline" />
                            </v-avatar>

                            <div class="ml-4">
                                <div class="text-caption text-medium-emphasis">
                                    Serviceable
                                </div>

                                <div class="text-h5 font-weight-bold">
                                    {{ serviceableAssets }}
                                </div>
                            </div>

                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" elevation="1">
                    <v-card-text>
                        <div class="d-flex align-center">

                            <v-avatar color="warning" variant="tonal" size="44">
                                <v-icon icon="mdi-wrench-outline" />
                            </v-avatar>

                            <div class="ml-4">
                                <div class="text-caption text-medium-emphasis">
                                    Under Repair
                                </div>

                                <div class="text-h5 font-weight-bold">
                                    {{ repairAssets }}
                                </div>
                            </div>

                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" elevation="1">
                    <v-card-text>
                        <div class="d-flex align-center">

                            <v-avatar color="error" variant="tonal" size="44">
                                <v-icon icon="mdi-alert-circle-outline" />
                            </v-avatar>

                            <div class="ml-4">
                                <div class="text-caption text-medium-emphasis">
                                    Unserviceable
                                </div>

                                <div class="text-h5 font-weight-bold">
                                    {{ unserviceableAssets }}
                                </div>
                            </div>

                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>

        <!-- ========================================================= -->
        <!-- FILTERS -->
        <!-- ========================================================= -->

        <v-card rounded="lg" elevation="1" class="mt-4">

            <v-card-text>

                <v-row align="center">

                    <!-- Search -->

                    <v-col cols="12" md="4">
                        <v-text-field v-model="search" label="Search assets"
                            placeholder="Asset tag, property no., serial..." prepend-inner-icon="mdi-magnify"
                            variant="outlined" density="comfortable" clearable hide-details />
                    </v-col>

                    <!-- Status -->

                    <v-col cols="12" sm="6" md="2">
                        <v-select v-model="statusFilter" label="Status" :items="statuses" variant="outlined"
                            density="comfortable" hide-details />
                    </v-col>

                    <!-- Category -->

                    <v-col cols="12" sm="6" md="3">
                        <v-select v-model="categoryFilter" label="Category" :items="categories" variant="outlined"
                            density="comfortable" hide-details />
                    </v-col>

                    <!-- Department -->

                    <v-col cols="12" sm="6" md="2">
                        <v-select v-model="departmentFilter" label="Department" :items="departments" variant="outlined"
                            density="comfortable" hide-details />
                    </v-col>

                    <!-- Clear -->

                    <v-col cols="12" sm="6" md="1">
                        <v-btn block variant="text" icon="mdi-filter-remove-outline" @click="clearFilters">
                            <v-tooltip activator="parent">
                                Clear filters
                            </v-tooltip>
                        </v-btn>
                    </v-col>

                </v-row>

            </v-card-text>
        </v-card>

        <!-- ========================================================= -->
        <!-- ASSET TABLE -->
        <!-- ========================================================= -->

        <v-card rounded="lg" elevation="1" class="mt-4">

            <v-card-title class="d-flex align-center pa-5">

                <div>
                    <div class="text-h6 font-weight-bold">
                        Asset Inventory
                    </div>

                    <div class="text-caption text-medium-emphasis">
                        {{ filteredAssets.length }} asset(s) displayed
                    </div>
                </div>

                <v-spacer />

                <v-btn variant="outlined" prepend-icon="mdi-file-export-outline" class="d-none d-sm-flex">
                    Export
                </v-btn>

            </v-card-title>

            <v-divider />

            <v-data-table v-model="selectedAssets" :headers="[
                {
                    title: 'Asset Tag',
                    key: 'assetTag',
                    sortable: true,
                },
                {
                    title: 'Item',
                    key: 'itemName',
                    sortable: true,
                },
                {
                    title: 'Brand / Model',
                    key: 'brand',
                    sortable: true,
                },
                {
                    title: 'Department',
                    key: 'department',
                    sortable: true,
                },
                {
                    title: 'Location',
                    key: 'location',
                },
                {
                    title: 'Cost',
                    key: 'acquisitionCost',
                    align: 'end',
                },
                {
                    title: 'Status',
                    key: 'status',
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    sortable: false,
                    align: 'end',
                },
            ]" :items="filteredAssets" item-value="id" show-select hover density="comfortable">

                <!-- Asset Tag -->

                <template #item.assetTag="{ item }">
                    <div>
                        <div class="font-weight-bold text-primary">
                            {{ item.assetTag }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ item.propertyNumber }}
                        </div>
                    </div>
                </template>

                <!-- Item -->

                <template #item.itemName="{ item }">
                    <div>
                        <div class="font-weight-medium">
                            {{ item.itemName }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ item.category }}
                        </div>
                    </div>
                </template>

                <!-- Brand -->

                <template #item.brand="{ item }">
                    <div>
                        <div class="font-weight-medium">
                            {{ item.brand }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ item.model }}
                        </div>
                    </div>
                </template>

                <!-- Cost -->

                <template #item.acquisitionCost="{ item }">
                    <span class="font-weight-medium">
                        {{ formatCurrency(item.acquisitionCost) }}
                    </span>
                </template>

                <!-- Status -->

                <template #item.status="{ item }">
                    <v-chip :color="statusColor(item.status)" size="small" variant="tonal">
                        <v-icon icon="mdi-circle" size="7" start />

                        {{ item.status }}
                    </v-chip>
                </template>

                <!-- Actions -->

                <template #item.actions="{ item }">

                    <div class="d-flex justify-end">

                        <v-btn variant="text" size="small" color="primary"
                            :to="{ name: 'assets-view', params: { id: item.id } }">
                            <v-icon>mdi-eye-outline</v-icon>
                            <v-tooltip activator="parent">
                                View Asset
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" :to="`/assets/${item.id}/edit`">
                            <v-icon>mdi-pencil-outline</v-icon>
                            <v-tooltip activator="parent">
                                Edit Asset
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="error" @click="confirmDelete(item)">
                            <v-icon>mdi-delete-outline</v-icon>
                            <v-tooltip activator="parent">
                                Delete Asset
                            </v-tooltip>
                        </v-btn>

                    </div>

                </template>

                <!-- No Data -->

                <template #no-data>
                    <div class="pa-10 text-center">

                        <v-icon icon="mdi-package-variant-remove" size="56" color="grey" />

                        <div class="text-h6 mt-3">
                            No assets found
                        </div>

                        <div class="text-body-2 text-medium-emphasis">
                            Try changing your search or filters.
                        </div>

                        <v-btn variant="text" color="primary" class="mt-2" @click="clearFilters">
                            Clear Filters
                        </v-btn>

                    </div>
                </template>

            </v-data-table>

        </v-card>

        <!-- ========================================================= -->
        <!-- DELETE CONFIRMATION -->
        <!-- ========================================================= -->

        <v-dialog v-model="showDeleteDialog" max-width="450">

            <v-card rounded="lg">

                <v-card-title class="d-flex align-center pa-5">

                    <v-avatar color="error" variant="tonal" size="42">
                        <v-icon icon="mdi-delete-outline" />
                    </v-avatar>

                    <span class="ml-3">
                        Delete Asset
                    </span>

                </v-card-title>

                <v-card-text>

                    Are you sure you want to delete

                    <strong>
                        {{ assetToDelete?.assetTag }}
                    </strong>

                    ?

                    <div class="text-body-2 text-medium-emphasis mt-2">
                        This is only a frontend demo, so the dummy data will
                        be removed from the current page.
                    </div>

                </v-card-text>

                <v-card-actions class="pa-5">

                    <v-spacer />

                    <v-btn variant="text" @click="showDeleteDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="error" variant="flat" @click="deleteAsset">
                        Delete
                    </v-btn>

                </v-card-actions>

            </v-card>

        </v-dialog>

    </v-container>
</template>

<style scoped>
.v-data-table {
    border-radius: 0 0 12px 12px;
}
</style>
```
