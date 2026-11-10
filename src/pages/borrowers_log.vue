<template>
    <v-container fluid class="pa-6">

        <!-- Page Header -->
        <div class="d-flex justify-space-between align-center flex-wrap mb-6 ga-3">
            <div>
                <h2 class="text-h5 font-weight-bold">Borrowers Log</h2>
                <div class="text-body-2 text-medium-emphasis">
                    Manage borrowed ICT equipment and monitor returns.
                </div>
            </div>

            <v-btn color="primary" prepend-icon="mdi-plus" @click="openBorrowDialog">
                New Borrowing
            </v-btn>
        </div>

        <!-- Summary Cards -->
        <v-row class="mb-3">
            <v-col cols="12" sm="6" md="3">
                <v-card variant="outlined" rounded="lg">
                    <v-card-text>
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-caption text-medium-emphasis">Total Records</div>
                                <div class="text-h4 font-weight-bold">{{ logs.length }}</div>
                            </div>
                            <v-icon color="primary" size="32">mdi-clipboard-list-outline</v-icon>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card variant="outlined" rounded="lg">
                    <v-card-text>
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-caption text-medium-emphasis">Currently Borrowed</div>
                                <div class="text-h4 font-weight-bold">{{ borrowedCount }}</div>
                            </div>
                            <v-icon color="info" size="32">mdi-hand-coin-outline</v-icon>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card variant="outlined" rounded="lg">
                    <v-card-text>
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-caption text-medium-emphasis">Returned</div>
                                <div class="text-h4 font-weight-bold">{{ returnedCount }}</div>
                            </div>
                            <v-icon color="success" size="32">mdi-check-circle-outline</v-icon>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card variant="outlined" rounded="lg">
                    <v-card-text>
                        <div class="d-flex justify-space-between">
                            <div>
                                <div class="text-caption text-medium-emphasis">Overdue</div>
                                <div class="text-h4 font-weight-bold">{{ overdueCount }}</div>
                            </div>
                            <v-icon color="error" size="32">mdi-alert-circle-outline</v-icon>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Search and Filters -->
        <v-card variant="outlined" rounded="lg">
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12" md="5">
                        <v-text-field v-model="search" label="Search borrower, equipment or reference"
                            prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details
                            clearable />
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-select v-model="statusFilter" :items="['All', 'Borrowed', 'Returned', 'Overdue']"
                            label="Status" variant="outlined" density="comfortable" hide-details />
                    </v-col>

                    <v-col cols="12" sm="6" md="4" class="d-flex justify-end">
                        <v-btn variant="outlined" prepend-icon="mdi-refresh" @click="resetFilters">
                            Reset Filters
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider />

            <!-- Borrowers Table -->
            <v-data-table :headers="headers" :items="filteredLogs" :search="search" item-value="id" hover
                class="borrowers-table">
                <template #item.borrower="{ item }">
                    <div class="font-weight-medium">{{ item.borrower }}</div>
                    <div class="text-caption text-medium-emphasis">
                        {{ item.department }}
                    </div>
                </template>

                <template #item.equipment="{ item }">
                    <div class="font-weight-medium">{{ item.equipment }}</div>
                    <div class="text-caption text-medium-emphasis">
                        {{ item.asset_tag }}
                    </div>
                </template>

                <template #item.borrow_date="{ item }">
                    {{ formatDate(item.borrow_date) }}
                </template>

                <template #item.due_date="{ item }">
                    <span :class="{ 'text-error font-weight-bold': getStatus(item) === 'Overdue' }">
                        {{ formatDate(item.due_date) }}
                    </span>
                </template>

                <template #item.status="{ item }">
                    <v-chip size="small" :color="statusColor(getStatus(item))" variant="tonal">
                        {{ getStatus(item) }}
                    </v-chip>
                </template>

                <template #item.actions="{ item }">
                    <div class="d-flex align-center">
                        <v-tooltip text="View details">
                            <template #activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-eye-outline" size="small" variant="text"
                                    @click="viewLog(item)" />
                            </template>
                        </v-tooltip>

                        <v-tooltip v-if="item.status === 'Borrowed' && getStatus(item) !== 'Overdue'"
                            text="Record return">
                            <template #activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-keyboard-return" size="small" color="success"
                                    variant="text" @click="confirmReturn(item)" />
                            </template>
                        </v-tooltip>
                    </div>
                </template>

                <template #no-data>
                    <div class="pa-8 text-center text-medium-emphasis">
                        No borrowing records found.
                    </div>
                </template>
            </v-data-table>
        </v-card>

        <!-- New Borrowing Dialog -->
        <v-dialog v-model="borrowDialog" max-width="650" persistent>
            <v-card rounded="lg">
                <v-card-title class="pa-5">
                    <div class="text-h6 font-weight-bold">New Equipment Borrowing</div>
                    <div class="text-caption text-medium-emphasis">
                        Record equipment issued to a borrower.
                    </div>
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-form ref="borrowForm">
                        <v-row>
                            <v-col cols="12">
                                <v-select v-model="form.asset_tag" :items="availableEquipment" item-title="label"
                                    item-value="asset_tag" label="Select Equipment" variant="outlined"
                                    :rules="[rules.required]" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.borrower" label="Borrower's Name" variant="outlined"
                                    :rules="[rules.required]" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.department" label="Department / Office" variant="outlined"
                                    :rules="[rules.required]" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.contact" label="Contact Number" variant="outlined" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.borrow_date" label="Borrow Date" type="date"
                                    variant="outlined" :rules="[rules.required]" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.due_date" label="Expected Return Date" type="date"
                                    variant="outlined" :rules="[rules.required, rules.dueDate]" />
                            </v-col>

                            <v-col cols="12">
                                <v-textarea v-model="form.purpose" label="Purpose of Borrowing" variant="outlined"
                                    rows="2" />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-5">
                    <v-spacer />
                    <v-btn variant="text" @click="borrowDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" @click="saveBorrowing">
                        Save Record
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View Details Dialog -->
        <v-dialog v-model="detailsDialog" max-width="550">
            <v-card v-if="selectedLog" rounded="lg">
                <v-card-title class="pa-5">Borrowing Details</v-card-title>
                <v-divider />
                <v-card-text class="pa-5">
                    <v-list density="comfortable">
                        <v-list-item title="Reference Number" :subtitle="selectedLog.reference" />
                        <v-list-item title="Borrower" :subtitle="selectedLog.borrower" />
                        <v-list-item title="Department" :subtitle="selectedLog.department" />
                        <v-list-item title="Equipment" :subtitle="selectedLog.equipment" />
                        <v-list-item title="Asset Tag" :subtitle="selectedLog.asset_tag" />
                        <v-list-item title="Borrow Date" :subtitle="formatDate(selectedLog.borrow_date)" />
                        <v-list-item title="Due Date" :subtitle="formatDate(selectedLog.due_date)" />
                        <v-list-item title="Return Date"
                            :subtitle="selectedLog.return_date ? formatDate(selectedLog.return_date) : 'Not yet returned'" />
                        <v-list-item title="Purpose" :subtitle="selectedLog.purpose || 'N/A'" />
                    </v-list>
                    <v-chip :color="statusColor(getStatus(selectedLog))" variant="tonal">
                        {{ getStatus(selectedLog) }}
                    </v-chip>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer />
                    <v-btn @click="detailsDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Return Confirmation -->
        <v-dialog v-model="returnDialog" max-width="420">
            <v-card rounded="lg">
                <v-card-title>Confirm Equipment Return</v-card-title>
                <v-card-text>
                    Mark <strong>{{ selectedLog?.equipment }}</strong> as returned?
                    <div class="text-caption text-medium-emphasis mt-2">
                        This will record today's date as the actual return date.
                    </div>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer />
                    <v-btn variant="text" @click="returnDialog = false">Cancel</v-btn>
                    <v-btn color="success" @click="processReturn">Confirm Return</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
            {{ snackbar.message }}
        </v-snackbar>

    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const today = () => {
    const date = new Date()
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10)
}

const search = ref('')
const statusFilter = ref('All')

const borrowDialog = ref(false)
const detailsDialog = ref(false)
const returnDialog = ref(false)

const borrowForm = ref(null)
const selectedLog = ref(null)

const snackbar = ref({
    show: false,
    message: '',
    color: 'success',
})

const headers = [
    { title: 'Reference', key: 'reference' },
    { title: 'Borrower', key: 'borrower' },
    { title: 'Equipment', key: 'equipment' },
    { title: 'Borrow Date', key: 'borrow_date' },
    { title: 'Due Date', key: 'due_date' },
    { title: 'Status', key: 'status', sortable: false },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
]

// Sample data - replace with Laravel API response
const logs = ref([
    {
        id: 1,
        reference: 'BR-2026-001',
        borrower: 'Juan Dela Cruz',
        department: 'CISA',
        contact: '09123456789',
        asset_tag: 'ICT-2026-001',
        equipment: 'Dell Latitude 5440',
        borrow_date: '2026-11-01',
        due_date: '2026-11-10',
        return_date: null,
        status: 'Borrowed',
        purpose: 'Academic presentation',
    },
    {
        id: 2,
        reference: 'BR-2026-002',
        borrower: 'Maria Santos',
        department: 'Registrar',
        contact: '09123456780',
        asset_tag: 'ICT-2026-005',
        equipment: 'Epson Projector',
        borrow_date: '2026-10-20',
        due_date: '2026-10-25',
        return_date: null,
        status: 'Borrowed',
        purpose: 'Department meeting',
    },
    {
        id: 3,
        reference: 'BR-2026-003',
        borrower: 'Pedro Reyes',
        department: 'Library',
        contact: '09123456781',
        asset_tag: 'ICT-2026-009',
        equipment: 'Wireless Microphone',
        borrow_date: '2026-10-15',
        due_date: '2026-10-17',
        return_date: '2026-10-17',
        status: 'Returned',
        purpose: 'Library event',
    },
])

// Sample equipment list - load available assets from Laravel
const availableEquipment = ref([
    { asset_tag: 'ICT-2026-001', label: 'ICT-2026-001 - Dell Latitude 5440' },
    { asset_tag: 'ICT-2026-005', label: 'ICT-2026-005 - Epson Projector' },
    { asset_tag: 'ICT-2026-009', label: 'ICT-2026-009 - Wireless Microphone' },
    { asset_tag: 'ICT-2026-012', label: 'ICT-2026-012 - Portable Speaker' },
])

const form = ref({})

const rules = {
    required: value => !!value || 'This field is required',
    dueDate: value =>
        !value || !form.value.borrow_date || value >= form.value.borrow_date ||
        'Return date cannot be before borrowing date',
}

const getStatus = item => {
    if (item.return_date || item.status === 'Returned') return 'Returned'

    return item.due_date < today() ? 'Overdue' : 'Borrowed'
}

const borrowedCount = computed(() =>
    logs.value.filter(item => getStatus(item) === 'Borrowed').length
)

const returnedCount = computed(() =>
    logs.value.filter(item => getStatus(item) === 'Returned').length
)

const overdueCount = computed(() =>
    logs.value.filter(item => getStatus(item) === 'Overdue').length
)

const filteredLogs = computed(() => {
    if (statusFilter.value === 'All') return logs.value

    return logs.value.filter(item => getStatus(item) === statusFilter.value)
})

const statusColor = status => ({
    Borrowed: 'info',
    Returned: 'success',
    Overdue: 'error',
}[status] || 'grey')

const formatDate = value => {
    if (!value) return 'N/A'

    return new Date(`${value}T00:00:00`).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const openBorrowDialog = () => {
    form.value = {
        asset_tag: null,
        borrower: '',
        department: '',
        contact: '',
        borrow_date: today(),
        due_date: '',
        purpose: '',
    }
    borrowDialog.value = true
}

const resetFilters = () => {
    search.value = ''
    statusFilter.value = 'All'
}

const saveBorrowing = async () => {
    const { valid } = await borrowForm.value.validate()
    if (!valid) return

    const equipment = availableEquipment.value.find(
        item => item.asset_tag === form.value.asset_tag
    )

    if (!equipment) return

    if (logs.value.some(item =>
        item.asset_tag === form.value.asset_tag &&
        item.status === 'Borrowed'
    )) {
        snackbar.value = {
            show: true,
            message: 'This equipment is already borrowed.',
            color: 'error',
        }
        return
    }

    const nextId = Math.max(0, ...logs.value.map(item => item.id)) + 1

    logs.value.unshift({
        id: nextId,
        reference: `BR-${today().slice(0, 4)}-${String(nextId).padStart(3, '0')}`,
        ...form.value,
        equipment: equipment.label.split(' - ').slice(1).join(' - '),
        return_date: null,
        status: 'Borrowed',
    })

    borrowDialog.value = false

    snackbar.value = {
        show: true,
        message: 'Borrowing record created successfully.',
        color: 'success',
    }
}

const viewLog = item => {
    selectedLog.value = item
    detailsDialog.value = true
}

const confirmReturn = item => {
    selectedLog.value = item
    returnDialog.value = true
}

const processReturn = () => {
    if (!selectedLog.value) return

    selectedLog.value.return_date = today()
    selectedLog.value.status = 'Returned'

    returnDialog.value = false

    snackbar.value = {
        show: true,
        message: 'Equipment return recorded successfully.',
        color: 'success',
    }
}
</script>
