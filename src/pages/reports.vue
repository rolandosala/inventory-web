<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
            <div>
                <div class="text-h4 font-weight-bold">Reports</div>
                <div class="text-body-2 text-medium-emphasis mt-1">
                    Generate and view ICT inventory reports
                </div>
            </div>

            <div class="d-flex ga-2 mt-3 mt-sm-0">
                <v-btn variant="outlined" prepend-icon="mdi-printer-outline" @click="printReport">
                    Print
                </v-btn>

                <v-btn color="primary" prepend-icon="mdi-file-excel-outline" @click="exportReport">
                    Export
                </v-btn>
            </div>
        </div>

        <!-- Report Summary -->
        <v-row class="mb-2">
            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="primary" variant="tonal" size="48">
                            <v-icon>mdi-package-variant-closed</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Total Assets
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ summary.totalAssets }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="success" variant="tonal" size="48">
                            <v-icon>mdi-check-circle-outline</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Serviceable
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ summary.serviceable }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="warning" variant="tonal" size="48">
                            <v-icon>mdi-tools</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Under Repair
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ summary.underRepair }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="info" variant="tonal" size="48">
                            <v-icon>mdi-cash-multiple</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Inventory Value
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ formatCurrency(summary.inventoryValue) }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <!-- Report Types -->
            <v-col cols="12" md="4">
                <v-card rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Report Types
                        </div>
                        <div class="text-caption text-medium-emphasis mt-1">
                            Select a report to generate
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-list lines="two" class="py-2">
                        <v-list-item v-for="report in reportTypes" :key="report.id"
                            :active="selectedReport === report.id" rounded="lg" class="mx-2 my-1"
                            @click="selectedReport = report.id">
                            <template #prepend>
                                <v-avatar :color="report.color" variant="tonal" size="42">
                                    <v-icon>{{ report.icon }}</v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title class="font-weight-medium">
                                {{ report.name }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ report.description }}
                            </v-list-item-subtitle>

                            <template #append>
                                <v-icon size="18">
                                    mdi-chevron-right
                                </v-icon>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <!-- Report Configuration -->
            <v-col cols="12" md="8">
                <v-card rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div>
                            <div class="text-h6 font-weight-bold">
                                {{ selectedReportData.name }}
                            </div>

                            <div class="text-caption text-medium-emphasis mt-1">
                                Configure report filters
                            </div>
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select v-model="filters.department" label="Department" :items="departments"
                                    variant="outlined" density="comfortable" clearable />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="filters.category" label="Category" :items="categories"
                                    variant="outlined" density="comfortable" clearable />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="filters.status" label="Asset Status" :items="statuses"
                                    variant="outlined" density="comfortable" clearable />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="filters.condition" label="Condition" :items="conditions"
                                    variant="outlined" density="comfortable" clearable />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="filters.dateFrom" type="date" label="Date From"
                                    variant="outlined" density="comfortable" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="filters.dateTo" type="date" label="Date To" variant="outlined"
                                    density="comfortable" />
                            </v-col>
                        </v-row>

                        <div class="d-flex flex-wrap ga-2 mt-2">
                            <v-btn color="primary" prepend-icon="mdi-file-chart-outline" @click="generateReport">
                                Generate Report
                            </v-btn>

                            <v-btn variant="outlined" prepend-icon="mdi-filter-remove-outline" @click="clearFilters">
                                Clear Filters
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Quick Reports -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Quick Reports
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text>
                        <v-row>
                            <v-col v-for="report in quickReports" :key="report.name" cols="12" sm="6">
                                <v-card variant="tonal" rounded="lg" class="quick-report-card"
                                    @click="runQuickReport(report)">
                                    <v-card-text class="d-flex align-center pa-4">
                                        <v-avatar :color="report.color" size="44">
                                            <v-icon>{{ report.icon }}</v-icon>
                                        </v-avatar>

                                        <div class="ml-4">
                                            <div class="font-weight-medium">
                                                {{ report.name }}
                                            </div>

                                            <div class="text-caption text-medium-emphasis">
                                                {{ report.description }}
                                            </div>
                                        </div>

                                        <v-spacer />

                                        <v-icon>
                                            mdi-arrow-right
                                        </v-icon>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Report Preview -->
        <v-card rounded="lg" border elevation="0" class="mt-5">
            <v-card-title class="pa-5 d-flex align-center">
                <div>
                    <div class="text-h6 font-weight-bold">
                        Report Preview
                    </div>

                    <div class="text-caption text-medium-emphasis">
                        {{ selectedReportData.name }}
                    </div>
                </div>

                <v-spacer />

                <v-chip color="primary" variant="tonal">
                    {{ filteredAssets.length }} records
                </v-chip>
            </v-card-title>

            <v-divider />

            <v-data-table :headers="headers" :items="filteredAssets" :items-per-page="10" hover>
                <template #item.asset_tag="{ item }">
                    <span class="font-weight-medium">
                        {{ item.asset_tag }}
                    </span>
                </template>

                <template #item.unit_cost="{ item }">
                    {{ formatCurrency(item.unit_cost) }}
                </template>

                <template #item.status="{ item }">
                    <v-chip size="small" :color="statusColor(item.status)" variant="tonal">
                        {{ item.status }}
                    </v-chip>
                </template>

                <template #item.condition="{ item }">
                    <v-chip size="small" :color="conditionColor(item.condition)" variant="tonal">
                        {{ item.condition }}
                    </v-chip>
                </template>
            </v-data-table>
        </v-card>

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

const selectedReport = ref('asset-inventory')

const summary = {
    totalAssets: 245,
    serviceable: 218,
    underRepair: 15,
    inventoryValue: 4850000,
}

const reportTypes = [
    {
        id: 'asset-inventory',
        name: 'Asset Inventory',
        description: 'Complete list of ICT assets',
        icon: 'mdi-package-variant-closed',
        color: 'primary',
    },
    {
        id: 'asset-by-category',
        name: 'Assets by Category',
        description: 'Inventory grouped by category',
        icon: 'mdi-shape-outline',
        color: 'purple',
    },
    {
        id: 'asset-by-department',
        name: 'Assets by Department',
        description: 'Inventory assigned to departments',
        icon: 'mdi-office-building-outline',
        color: 'info',
    },
    {
        id: 'asset-by-location',
        name: 'Assets by Location',
        description: 'Inventory grouped by location',
        icon: 'mdi-map-marker-outline',
        color: 'success',
    },
    {
        id: 'unserviceable',
        name: 'Unserviceable Assets',
        description: 'Assets requiring disposal or action',
        icon: 'mdi-alert-circle-outline',
        color: 'error',
    },
    {
        id: 'maintenance',
        name: 'Maintenance Report',
        description: 'Maintenance and repair history',
        icon: 'mdi-tools',
        color: 'warning',
    },
    {
        id: 'warranty',
        name: 'Warranty Report',
        description: 'Assets with upcoming expiry',
        icon: 'mdi-shield-alert-outline',
        color: 'orange',
    },
    {
        id: 'inventory-value',
        name: 'Inventory Valuation',
        description: 'Asset acquisition and current value',
        icon: 'mdi-cash-multiple',
        color: 'teal',
    },
]

const quickReports = [
    {
        name: 'Inventory Summary',
        description: 'Current campus inventory',
        icon: 'mdi-chart-box-outline',
        color: 'primary',
    },
    {
        name: 'Unserviceable Assets',
        description: 'Assets needing action',
        icon: 'mdi-alert-outline',
        color: 'error',
    },
    {
        name: 'Warranty Expiring',
        description: 'Warranty expiration monitoring',
        icon: 'mdi-calendar-alert-outline',
        color: 'warning',
    },
    {
        name: 'Inventory Valuation',
        description: 'Total acquisition value',
        icon: 'mdi-cash-multiple',
        color: 'success',
    },
]

const departments = [
    'ICT Office',
    'Registrar',
    'Accounting Office',
    'College of Education',
    'College of Engineering',
    'Library',
    'Campus Administrative Office',
    'Human Resource Management Office',
    'Procurement Office',
    'Office of Student Affairs and Services',
]

const categories = [
    'Desktop Computer',
    'Laptop',
    'Printer',
    'Network Equipment',
    'Projector',
    'UPS',
    'Server',
    'Monitor',
    'Scanner',
    'Other',
]

const statuses = [
    'Serviceable',
    'Unserviceable',
    'Under Repair',
    'Missing',
    'Disposed',
]

const conditions = [
    'Excellent',
    'Good',
    'Fair',
    'Poor',
]

const filters = reactive({
    department: null,
    category: null,
    status: null,
    condition: null,
    dateFrom: '',
    dateTo: '',
})

const headers = [
    {
        title: 'Asset Tag',
        key: 'asset_tag',
    },
    {
        title: 'Property No.',
        key: 'property_number',
    },
    {
        title: 'Item',
        key: 'item_name',
    },
    {
        title: 'Category',
        key: 'category',
    },
    {
        title: 'Department',
        key: 'department',
    },
    {
        title: 'Location',
        key: 'location',
    },
    {
        title: 'Status',
        key: 'status',
    },
    {
        title: 'Condition',
        key: 'condition',
    },
    {
        title: 'Value',
        key: 'unit_cost',
    },
]

const assets = ref([
    {
        id: 1,
        asset_tag: 'ICT-2026-0001',
        property_number: 'PN-2026-0001',
        item_name: 'Desktop Computer',
        category: 'Desktop Computer',
        department: 'ICT Office',
        location: 'ICT Training Room',
        status: 'Serviceable',
        condition: 'Good',
        unit_cost: 45000,
        purchase_date: '2026-01-15',
    },
    {
        id: 2,
        asset_tag: 'ICT-2026-0002',
        property_number: 'PN-2026-0002',
        item_name: 'Laptop Computer',
        category: 'Laptop',
        department: 'Registrar',
        location: 'Registrar Office',
        status: 'Serviceable',
        condition: 'Excellent',
        unit_cost: 58000,
        purchase_date: '2026-01-20',
    },
    {
        id: 3,
        asset_tag: 'ICT-2026-0003',
        property_number: 'PN-2026-0003',
        item_name: 'Laser Printer',
        category: 'Printer',
        department: 'Accounting Office',
        location: 'Accounting Office',
        status: 'Under Repair',
        condition: 'Fair',
        unit_cost: 32000,
        purchase_date: '2025-06-10',
    },
    {
        id: 4,
        asset_tag: 'ICT-2026-0004',
        property_number: 'PN-2026-0004',
        item_name: 'Managed Network Switch',
        category: 'Network Equipment',
        department: 'ICT Office',
        location: 'Server Room',
        status: 'Serviceable',
        condition: 'Good',
        unit_cost: 28500,
        purchase_date: '2025-08-12',
    },
    {
        id: 5,
        asset_tag: 'ICT-2026-0005',
        property_number: 'PN-2026-0005',
        item_name: 'Projector',
        category: 'Projector',
        department: 'College of Education',
        location: 'Faculty Room',
        status: 'Serviceable',
        condition: 'Good',
        unit_cost: 42000,
        purchase_date: '2024-09-18',
    },
    {
        id: 6,
        asset_tag: 'ICT-2026-0006',
        property_number: 'PN-2026-0006',
        item_name: 'UPS 1500VA',
        category: 'UPS',
        department: 'ICT Office',
        location: 'Server Room',
        status: 'Serviceable',
        condition: 'Good',
        unit_cost: 18500,
        purchase_date: '2025-11-05',
    },
    {
        id: 7,
        asset_tag: 'ICT-2026-0007',
        property_number: 'PN-2026-0007',
        item_name: 'Desktop Computer',
        category: 'Desktop Computer',
        department: 'College of Engineering',
        location: 'Computer Laboratory 1',
        status: 'Unserviceable',
        condition: 'Poor',
        unit_cost: 39000,
        purchase_date: '2021-03-22',
    },
    {
        id: 8,
        asset_tag: 'ICT-2026-0008',
        property_number: 'PN-2026-0008',
        item_name: 'Laptop Computer',
        category: 'Laptop',
        department: 'Library',
        location: 'Main Library',
        status: 'Serviceable',
        condition: 'Good',
        unit_cost: 52000,
        purchase_date: '2025-04-11',
    },
    {
        id: 9,
        asset_tag: 'ICT-2026-0009',
        property_number: 'PN-2026-0009',
        item_name: 'Network Access Point',
        category: 'Network Equipment',
        department: 'ICT Office',
        location: 'Administration Building',
        status: 'Serviceable',
        condition: 'Excellent',
        unit_cost: 12500,
        purchase_date: '2026-02-14',
    },
    {
        id: 10,
        asset_tag: 'ICT-2026-0010',
        property_number: 'PN-2026-0010',
        item_name: 'Document Scanner',
        category: 'Scanner',
        department: 'Registrar',
        location: 'Registrar Office',
        status: 'Under Repair',
        condition: 'Fair',
        unit_cost: 22000,
        purchase_date: '2024-05-20',
    },
])

const snackbar = reactive({
    show: false,
    message: '',
})

const selectedReportData = computed(() => {
    return (
        reportTypes.find(
            report => report.id === selectedReport.value,
        ) || reportTypes[0]
    )
})

const filteredAssets = computed(() => {
    return assets.value.filter(asset => {
        if (
            filters.department &&
            asset.department !== filters.department
        ) {
            return false
        }

        if (
            filters.category &&
            asset.category !== filters.category
        ) {
            return false
        }

        if (
            filters.status &&
            asset.status !== filters.status
        ) {
            return false
        }

        if (
            filters.condition &&
            asset.condition !== filters.condition
        ) {
            return false
        }

        if (
            filters.dateFrom &&
            asset.purchase_date < filters.dateFrom
        ) {
            return false
        }

        if (
            filters.dateTo &&
            asset.purchase_date > filters.dateTo
        ) {
            return false
        }

        return true
    })
})

function formatCurrency(value) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 0,
    }).format(value)
}

function statusColor(status) {
    const colors = {
        Serviceable: 'success',
        Unserviceable: 'error',
        'Under Repair': 'warning',
        Missing: 'orange',
        Disposed: 'grey',
    }

    return colors[status] || 'grey'
}

function conditionColor(condition) {
    const colors = {
        Excellent: 'success',
        Good: 'info',
        Fair: 'warning',
        Poor: 'error',
    }

    return colors[condition] || 'grey'
}

function clearFilters() {
    filters.department = null
    filters.category = null
    filters.status = null
    filters.condition = null
    filters.dateFrom = ''
    filters.dateTo = ''
}

function generateReport() {
    snackbar.message = `${selectedReportData.value.name} generated successfully.`
    snackbar.show = true
}

function runQuickReport(report) {
    snackbar.message = `${report.name} generated successfully.`
    snackbar.show = true
}

function exportReport() {
    snackbar.message = 'Excel export will be connected to the backend later.'
    snackbar.show = true
}

function printReport() {
    window.print()
}
</script>

<style scoped>
.quick-report-card {
    cursor: pointer;
    transition: transform 0.15s ease;
}

.quick-report-card:hover {
    transform: translateY(-2px);
}
</style>