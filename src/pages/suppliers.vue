<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
                <h1 class="text-h4 font-weight-bold">Suppliers</h1>
                <p class="text-body-2 text-medium-emphasis mt-1">
                    Manage ICT equipment suppliers and vendor information.
                </p>
            </div>

            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
                Add Supplier
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
                                    Total Suppliers
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ suppliers.length }}
                                </div>
                            </div>

                            <v-avatar color="primary" variant="tonal" size="48">
                                <v-icon>mdi-truck-outline</v-icon>
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
                                    Active Suppliers
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ activeSuppliers }}
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
                                    {{ inactiveSuppliers }}
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
                                    Supplied Assets
                                </div>
                                <div class="text-h4 font-weight-bold mt-1">
                                    {{ totalAssets }}
                                </div>
                            </div>

                            <v-avatar color="info" variant="tonal" size="48">
                                <v-icon>mdi-package-variant-closed</v-icon>
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
                        <v-text-field v-model="search" label="Search suppliers"
                            placeholder="Search supplier, contact person, email, phone..."
                            prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details
                            clearable />
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

        <!-- Supplier Table -->
        <v-card>
            <v-card-title class="d-flex align-center">
                <span>Supplier List</span>

                <v-spacer />

                <span class="text-body-2 text-medium-emphasis">
                    {{ filteredSuppliers.length }} records
                </span>
            </v-card-title>

            <v-divider />

            <v-data-table :headers="headers" :items="filteredSuppliers" item-value="id" hover>
                <!-- Supplier -->
                <template #item.supplier="{ item }">
                    <div class="d-flex align-center py-2">
                        <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                            <v-icon>mdi-truck-outline</v-icon>
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

                <!-- Contact -->
                <template #item.contact="{ item }">
                    <div>
                        <div class="font-weight-medium">
                            {{ item.contact_person }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ item.email }}
                        </div>
                    </div>
                </template>

                <!-- Phone -->
                <template #item.phone="{ item }">
                    <div class="d-flex align-center">
                        <v-icon size="18" class="mr-2">
                            mdi-phone-outline
                        </v-icon>

                        {{ item.phone }}
                    </div>
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
                        <v-btn variant="text" size="small" color="primary" @click="viewSupplier(item)">
                            <v-icon>mdi-eye-outline</v-icon>

                            <v-tooltip activator="parent">
                                View Supplier
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="warning" @click="editSupplier(item)">
                            <v-icon>mdi-pencil-outline</v-icon>

                            <v-tooltip activator="parent">
                                Edit Supplier
                            </v-tooltip>
                        </v-btn>

                        <v-btn variant="text" size="small" color="error" @click="confirmDelete(item)">
                            <v-icon>mdi-delete-outline</v-icon>

                            <v-tooltip activator="parent">
                                Delete Supplier
                            </v-tooltip>
                        </v-btn>
                    </div>
                </template>

                <template #no-data>
                    <div class="text-center pa-8">
                        <v-icon size="48" color="grey" class="mb-3">
                            mdi-truck-off-outline
                        </v-icon>

                        <div class="text-h6">
                            No suppliers found
                        </div>

                        <div class="text-body-2 text-medium-emphasis">
                            Try changing your search or filters.
                        </div>
                    </div>
                </template>
            </v-data-table>
        </v-card>

        <!-- Add/Edit Dialog -->
        <v-dialog v-model="formDialog" max-width="700">
            <v-card>
                <v-card-title class="d-flex align-center pa-5">
                    <v-icon color="primary" class="mr-2">
                        {{
                            editingSupplier
                                ? 'mdi-pencil-outline'
                                : 'mdi-truck-plus-outline'
                        }}
                    </v-icon>

                    {{ editingSupplier ? 'Edit Supplier' : 'Add Supplier' }}

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="formDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="formData.code" label="Supplier Code" placeholder="e.g. SUP-001"
                                variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="8">
                            <v-text-field v-model="formData.name" label="Supplier Name"
                                placeholder="Enter supplier/company name" variant="outlined" density="comfortable" />
                        </v-col>
                    </v-row>

                    <v-text-field v-model="formData.contact_person" label="Contact Person"
                        placeholder="Enter contact person" prepend-inner-icon="mdi-account-outline" variant="outlined"
                        density="comfortable" class="mb-4" />

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.email" label="Email" type="email"
                                placeholder="supplier@example.com" prepend-inner-icon="mdi-email-outline"
                                variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.phone" label="Phone" placeholder="09XX XXX XXXX"
                                prepend-inner-icon="mdi-phone-outline" variant="outlined" density="comfortable" />
                        </v-col>
                    </v-row>

                    <v-textarea v-model="formData.address" label="Address" placeholder="Enter supplier address"
                        prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable" rows="2"
                        class="mb-4" />

                    <v-textarea v-model="formData.description" label="Description / Remarks"
                        placeholder="Additional supplier information" variant="outlined" density="comfortable" rows="3"
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

                    <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="saveSupplier">
                        {{ editingSupplier ? 'Update Supplier' : 'Save Supplier' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View Dialog -->
        <v-dialog v-model="viewDialog" max-width="650">
            <v-card v-if="selectedSupplier">
                <v-card-title class="d-flex align-center pa-5">
                    <v-avatar color="primary" variant="tonal" class="mr-3">
                        <v-icon>mdi-truck-outline</v-icon>
                    </v-avatar>

                    <div>
                        <div class="text-h6">
                            {{ selectedSupplier.name }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            {{ selectedSupplier.code }}
                        </div>
                    </div>

                    <v-spacer />

                    <v-btn icon="mdi-close" variant="text" @click="viewDialog = false" />
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-list lines="two">
                        <v-list-item prepend-icon="mdi-account-outline" title="Contact Person"
                            :subtitle="selectedSupplier.contact_person" />

                        <v-list-item prepend-icon="mdi-email-outline" title="Email"
                            :subtitle="selectedSupplier.email" />

                        <v-list-item prepend-icon="mdi-phone-outline" title="Phone"
                            :subtitle="selectedSupplier.phone" />

                        <v-list-item prepend-icon="mdi-map-marker-outline" title="Address"
                            :subtitle="selectedSupplier.address" />

                        <v-list-item prepend-icon="mdi-package-variant-closed" title="Supplied Assets"
                            :subtitle="`${selectedSupplier.asset_count} assets`" />

                        <v-list-item prepend-icon="mdi-information-outline" title="Description"
                            :subtitle="selectedSupplier.description" />

                        <v-list-item prepend-icon="mdi-calendar-outline" title="Created"
                            :subtitle="selectedSupplier.created_at" />
                    </v-list>

                    <div class="mt-4">
                        <v-chip :color="selectedSupplier.status === 'Active'
                                ? 'success'
                                : 'error'
                            " variant="tonal">
                            {{ selectedSupplier.status }}
                        </v-chip>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="450">
            <v-card>
                <v-card-title class="pa-5">
                    Delete Supplier
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete
                    <strong>{{ selectedSupplier?.name }}</strong>?

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

                    <v-btn color="error" prepend-icon="mdi-delete-outline" @click="deleteSupplier">
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

const editingSupplier = ref(false)
const selectedSupplier = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const suppliers = ref([
    {
        id: 1,
        code: 'SUP-001',
        name: 'PC Express',
        contact_person: 'Sales Department',
        email: 'sales@pcexpress.com.ph',
        phone: '0917 123 4567',
        address: 'Cebu City',
        description: 'Computer hardware and accessories supplier',
        asset_count: 42,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 2,
        code: 'SUP-002',
        name: 'VillMan Computers',
        contact_person: 'Corporate Sales',
        email: 'sales@villman.com',
        phone: '0918 234 5678',
        address: 'Cebu City',
        description: 'Computers, laptops, peripherals and accessories',
        asset_count: 35,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 3,
        code: 'SUP-003',
        name: 'Wordtext Systems',
        contact_person: 'Government Sales',
        email: 'sales@wordtext.com',
        phone: '0919 345 6789',
        address: 'Makati City',
        description: 'ICT equipment and government procurement supplier',
        asset_count: 28,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 4,
        code: 'SUP-004',
        name: 'Epson Philippines',
        contact_person: 'Business Solutions',
        email: 'business@epson.com.ph',
        phone: '0920 456 7890',
        address: 'Makati City',
        description: 'Printers, projectors and imaging equipment',
        asset_count: 31,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 5,
        code: 'SUP-005',
        name: 'Brother Philippines',
        contact_person: 'Corporate Sales',
        email: 'sales@brother.com.ph',
        phone: '0921 567 8901',
        address: 'Pasig City',
        description: 'Printers and office equipment',
        asset_count: 18,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 6,
        code: 'SUP-006',
        name: 'APC / Schneider Electric',
        contact_person: 'Enterprise Sales',
        email: 'sales@se.com',
        phone: '0922 678 9012',
        address: 'Makati City',
        description: 'UPS and power protection equipment',
        asset_count: 17,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 7,
        code: 'SUP-007',
        name: 'Ubiquiti Networks',
        contact_person: 'Authorized Distributor',
        email: 'sales@example.com',
        phone: '0923 789 0123',
        address: 'Manila',
        description: 'Network equipment and wireless infrastructure',
        asset_count: 25,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 8,
        code: 'SUP-008',
        name: 'Dell Technologies',
        contact_person: 'Enterprise Sales',
        email: 'sales@example.com',
        phone: '0924 890 1234',
        address: 'Manila',
        description: 'Servers, workstations and enterprise hardware',
        asset_count: 12,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 9,
        code: 'SUP-009',
        name: 'HP Philippines',
        contact_person: 'Business Sales',
        email: 'sales@example.com',
        phone: '0925 901 2345',
        address: 'Makati City',
        description: 'Computers, printers and business equipment',
        asset_count: 24,
        status: 'Active',
        created_at: '2026-01-10',
    },
    {
        id: 10,
        code: 'SUP-010',
        name: 'Legacy ICT Supplier',
        contact_person: 'N/A',
        email: 'N/A',
        phone: 'N/A',
        address: 'N/A',
        description: 'Previous supplier record',
        asset_count: 0,
        status: 'Inactive',
        created_at: '2025-01-10',
    },
])

const headers = [
    {
        title: 'Supplier',
        key: 'supplier',
        minWidth: 220,
    },
    {
        title: 'Contact',
        key: 'contact',
        minWidth: 180,
    },
    {
        title: 'Phone',
        key: 'phone',
        minWidth: 150,
    },
    {
        title: 'Assets',
        key: 'asset_count',
        align: 'center',
        width: 120,
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

const formData = ref({
    code: '',
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    status: 'Active',
})

const filteredSuppliers = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    return suppliers.value.filter((supplier) => {
        const matchesSearch =
            !keyword ||
            supplier.code.toLowerCase().includes(keyword) ||
            supplier.name.toLowerCase().includes(keyword) ||
            supplier.contact_person.toLowerCase().includes(keyword) ||
            supplier.email.toLowerCase().includes(keyword) ||
            supplier.phone.toLowerCase().includes(keyword) ||
            supplier.address.toLowerCase().includes(keyword)

        const matchesStatus =
            statusFilter.value === 'All' ||
            supplier.status === statusFilter.value

        return matchesSearch && matchesStatus
    })
})

const activeSuppliers = computed(() => {
    return suppliers.value.filter(
        (supplier) => supplier.status === 'Active',
    ).length
})

const inactiveSuppliers = computed(() => {
    return suppliers.value.filter(
        (supplier) => supplier.status === 'Inactive',
    ).length
})

const totalAssets = computed(() => {
    return suppliers.value.reduce(
        (total, supplier) => total + supplier.asset_count,
        0,
    )
})

function resetForm() {
    formData.value = {
        code: '',
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        status: 'Active',
    }
}

function openCreateDialog() {
    editingSupplier.value = false
    selectedSupplier.value = null
    resetForm()
    formDialog.value = true
}

function editSupplier(supplier) {
    editingSupplier.value = true
    selectedSupplier.value = supplier

    formData.value = {
        code: supplier.code,
        name: supplier.name,
        contact_person: supplier.contact_person,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        description: supplier.description,
        status: supplier.status,
    }

    formDialog.value = true
}

function viewSupplier(supplier) {
    selectedSupplier.value = supplier
    viewDialog.value = true
}

function saveSupplier() {
    if (!formData.value.code || !formData.value.name) {
        showSnackbar(
            'Supplier code and supplier name are required.',
            'error',
        )

        return
    }

    if (editingSupplier.value) {
        const index = suppliers.value.findIndex(
            (supplier) =>
                supplier.id === selectedSupplier.value.id,
        )

        if (index !== -1) {
            suppliers.value[index] = {
                ...suppliers.value[index],
                ...formData.value,
            }
        }

        showSnackbar('Supplier updated successfully.')
    } else {
        suppliers.value.push({
            id: Date.now(),
            ...formData.value,
            asset_count: 0,
            created_at: new Date()
                .toISOString()
                .split('T')[0],
        })

        showSnackbar('Supplier added successfully.')
    }

    formDialog.value = false
}

function confirmDelete(supplier) {
    selectedSupplier.value = supplier
    deleteDialog.value = true
}

function deleteSupplier() {
    if (!selectedSupplier.value) return

    suppliers.value = suppliers.value.filter(
        (supplier) =>
            supplier.id !== selectedSupplier.value.id,
    )

    deleteDialog.value = false
    showSnackbar('Supplier deleted successfully.')
    selectedSupplier.value = null
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