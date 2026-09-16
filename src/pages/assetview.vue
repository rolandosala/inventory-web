```vue
<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QRCode from 'qrcode'
import api from '@/api/axios'


const route = useRoute()
const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')
const loadingAsset = ref(false)
const qrCodeData = ref('')
const maintenanceRecords = ref([])
const assetId = route.params.id
console.log(assetId)
const formData = ref({
    asset_tag: '',
    category_id: null,
    supplier_id: null,
    department_id: null,
    location_id: null,
    property_number: '',
    item_name: '',
    brand: '',
    model: '',
    serial_number: '',
    specifications: '',
    quantity: 1,
    unit_cost: 0,
    purchase_date: '',
    warranty_expiry: '',
    status: 'active',
    condition: 'good',
    remarks: '',
})
const fetchAsset = async () => {
    loadingAsset.value = true
    errorMessage.value = ''

    try {
        const response = await api.get(`/assets/${assetId}`)
        const assets = response.data.data
        console.log(assets)
        maintenanceRecords.value = assets.maintenance_records
        console.log(maintenanceRecords.value)
        formData.value = {
            id: assets.id,
            asset_tag: assets.asset_tag ?? '',
            category_id: assets.category.name ?? '',
            supplier_id: assets.supplier_id ?? '',
            department_id: assets.department.name ?? '',
            location_id: assets.location.location_name ?? '',
            property_number: assets.property_number ?? '',
            item_name: assets.item_name ?? '',
            brand: assets.brand ?? '',
            model: assets.model ?? '',
            serial_number: assets.serial_number ?? '',
            specifications: assets.specifications ?? '',
            quantity: assets.quantity ?? 1,
            unit_cost: assets.unit_cost ?? 0,
            purchase_date: assets.purchase_date
                ? assets.purchase_date.substring(0, 10)
                : '',
            warranty_expiry: assets.warranty_expiry
                ? assets.warranty_expiry.substring(0, 10)
                : '',
            status: assets.status ?? 'active',
            condition: assets.condition ?? 'good',
            remarks: assets.remarks ?? '',
        }


    } catch (error) {
        console.error('Failed to load asset:', error)

        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load formData.'

    } finally {
        loadingAsset.value = false
    }
}
const generateQRCode = async () => {
    if (!formData.value.asset_tag) {
        qrCodeData.value = ''
        return
    }

    qrCodeData.value = await QRCode.toDataURL(
        formData.value.asset_tag,
        {
            width: 300,
            margin: 2,
            errorCorrectionLevel: 'H'
        }
    )
}
watch(
    () => formData.value.asset_tag,
    () => {
        generateQRCode()
    },
    { immediate: true }
)

onMounted(() => {
    fetchAsset()
})

const goBack = () => {
    router.push('/dashboard/assets')
}

const editAsset = () => {
    router.push({
        name: 'assets-edit',
        params: {
            id: route.params.id
        }
    })
}



const maintenanceHistory = [
    {
        id: 1,
        date: 'September 2, 2026',
        type: 'Repair',
        description: 'Printer paper feed problem',
        technician: 'ICT Technician',
        status: 'Ongoing',
    },
    {
        id: 2,
        date: 'August 15, 2026',
        type: 'Preventive Maintenance',
        description: 'General inspection and cleaning',
        technician: 'ICT Technician',
        status: 'Completed',
    },
]

/* const asset = computed(() => {
    return (
        assets.find(item => item.id === Number(route.params.id)) ||
        assets[0]
    )
}) */

const showQrDialog = ref(false)

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

const formatCurrency = value => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 0,
    }).format(value)
}
const printPropertyLabel = async () => {

    try {

        const response = await api.get(
            `/assets/${formData.value.id}/property-label`,
            {
                responseType: 'blob'
            }
        )

        const blob = new Blob(
            [response.data],
            {
                type: 'application/pdf'
            }
        )

        const url = window.URL.createObjectURL(blob)

        window.open(url, '_blank')

    } catch (error) {

        console.error(
            'Failed to generate property label:',
            error
        )

    }

}

</script>

<template>
    <v-container fluid class="pa-6">

        <!-- ========================================================= -->
        <!-- HEADER -->
        <!-- ========================================================= -->

        <div class="d-flex flex-wrap align-center justify-space-between mb-6">

            <div class="d-flex align-center">

                <v-btn icon="mdi-arrow-left" variant="text" class="mr-2" to="/dashboard/assets" />

                <div>
                    <div class="text-caption text-medium-emphasis">
                        ICT Assets / Asset Details
                    </div>

                    <h1 class="text-h4 font-weight-bold">
                        {{ formData.asset_tag }}
                    </h1>
                </div>

            </div>

            <div class="d-flex ga-2 mt-3 mt-md-0">

                <v-btn variant="outlined" prepend-icon="mdi-qrcode" @click="showQrDialog = true">
                    QR Code
                </v-btn>

                <v-btn color="primary" prepend-icon="mdi-pencil-outline" @click="editAsset">
                    Edit Asset
                </v-btn>

            </div>

        </div>

        <!-- ========================================================= -->
        <!-- STATUS -->
        <!-- ========================================================= -->

        <v-card rounded="lg" elevation="1" class="mb-4">

            <v-card-text class="pa-5">

                <div class="d-flex flex-wrap align-center">

                    <v-avatar color="primary" variant="tonal" size="64" rounded="lg">
                        <v-icon icon="mdi-desktop-classic" size="34" />
                    </v-avatar>

                    <div class="ml-4">

                        <div class="text-h5 font-weight-bold">
                            {{ formData.item_name }}
                        </div>

                        <div class="text-body-2 text-medium-emphasis">
                            {{ formData.brand }} {{ formData.model }}
                        </div>

                    </div>

                    <v-spacer />

                    <div class="d-flex flex-column align-end mt-3 mt-md-0">

                        <v-chip :color="statusColor(formData.status)" variant="tonal" class="mb-2">
                            <v-icon icon="mdi-circle" size="8" start />

                            {{ formData.status }}
                        </v-chip>

                        <v-chip :color="conditionColor(formData.condition)" variant="outlined" size="small">
                            {{ formData.condition }}
                        </v-chip>

                    </div>

                </div>

            </v-card-text>

        </v-card>

        <!-- ========================================================= -->
        <!-- BASIC INFORMATION -->
        <!-- ========================================================= -->

        <v-row>

            <v-col cols="12" lg="8">

                <v-card rounded="lg" elevation="1" class="mb-4">

                    <v-card-title class="pa-5">
                        Asset Information
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">

                        <v-row>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Asset Tag
                                </div>

                                <div class="info-value">
                                    {{ formData.asset_tag }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Property Number
                                </div>

                                <div class="info-value">
                                    {{ formData.property_number }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Category
                                </div>

                                <div class="info-value">
                                    {{ formData.category_id }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Serial Number
                                </div>

                                <div class="info-value">
                                    {{ formData.serial_number }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Brand
                                </div>

                                <div class="info-value">
                                    {{ formData.brand }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Model
                                </div>

                                <div class="info-value">
                                    {{ formData.model }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Quantity
                                </div>

                                <div class="info-value">
                                    {{ formData.quantity }}
                                </div>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="info-label">
                                    Supplier
                                </div>

                                <div class="info-value">
                                    {{ formData.supplier_id }}
                                </div>
                            </v-col>

                        </v-row>

                    </v-card-text>

                </v-card>

                <!-- ===================================================== -->
                <!-- SPECIFICATIONS -->
                <!-- ===================================================== -->

                <v-card rounded="lg" elevation="1" class="mb-4">

                    <v-card-title class="pa-5">
                        Specifications
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">

                        <div class="text-body-1">
                            {{ formData.specifications }}
                        </div>

                    </v-card-text>

                </v-card>

                <!-- ===================================================== -->
                <!-- MAINTENANCE HISTORY -->
                <!-- ===================================================== -->

                <v-card rounded="lg" elevation="1">

                    <v-card-title class="d-flex align-center pa-5">

                        <div>
                            <div class="text-h6 font-weight-bold">
                                Maintenance History
                            </div>

                            <div class="text-caption text-medium-emphasis">
                                Service and maintenance records
                            </div>
                        </div>

                        <v-spacer />

                        <v-btn variant="tonal" color="primary" prepend-icon="mdi-plus" to="/maintenance">
                            Add Record
                        </v-btn>

                    </v-card-title>

                    <v-divider />

                    <v-timeline side="end" density="compact" class="pa-5">

                        <v-timeline-item v-for="item in maintenanceRecords" :key="item.id" dot-color="primary"
                            size="small">

                            <template #opposite>
                                <span class="text-caption">
                                    {{ item.date_started }}
                                </span>
                            </template>

                            <div>

                                <div class="d-flex align-center">

                                    <strong>
                                        {{ item.maintenance_type }}
                                    </strong>

                                    <v-chip size="x-small" class="ml-2" :color="item.status === 'completed'
                                        ? 'success'
                                        : 'warning'
                                        " variant="tonal">
                                        {{ item.status }}
                                    </v-chip>

                                </div>

                                <div class="text-body-2 mt-1">
                                    {{ item.problem_description }}
                                </div>

                                <div class="text-caption text-medium-emphasis mt-1">
                                    Technician: {{ item.technician_id }}
                                </div>

                            </div>

                        </v-timeline-item>

                    </v-timeline>

                </v-card>

            </v-col>

            <!-- ======================================================= -->
            <!-- RIGHT COLUMN -->
            <!-- ======================================================= -->

            <v-col cols="12" lg="4">

                <!-- Location -->

                <v-card rounded="lg" elevation="1" class="mb-4">

                    <v-card-title class="pa-5">
                        Location & Assignment
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">

                        <div class="detail-row">
                            <v-icon icon="mdi-office-building-outline" color="primary" />

                            <div>
                                <div class="info-label">
                                    Department
                                </div>

                                <div class="info-value">
                                    {{ formData.department_id }}
                                </div>
                            </div>
                        </div>

                        <div class="detail-row">
                            <v-icon icon="mdi-map-marker-outline" color="primary" />

                            <div>
                                <div class="info-label">
                                    Location
                                </div>

                                <div class="info-value">
                                    {{ formData.location_id }}
                                </div>
                            </div>
                        </div>

                        <div class="detail-row">
                            <v-icon icon="mdi-door-open" color="primary" />

                            <div>
                                <div class="info-label">
                                    End-User
                                </div>

                                <div class="info-value">
                                    {{ formData.room }}
                                </div>
                            </div>
                        </div>

                        <div class="detail-row">
                            <v-icon icon="mdi-account-outline" color="primary" />

                            <div>
                                <div class="info-label">
                                    Current End-User
                                </div>

                                <div class="info-value">
                                    {{ formData.custodian }}
                                </div>
                            </div>
                        </div>

                    </v-card-text>

                </v-card>

                <!-- Acquisition -->

                <v-card rounded="lg" elevation="1" class="mb-4">

                    <v-card-title class="pa-5">
                        Acquisition Information
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">

                        <div class="detail-row">
                            <v-icon icon="mdi-cash" color="success" />

                            <div>
                                <div class="info-label">
                                    Acquisition Cost
                                </div>

                                <div class="info-value text-success">
                                    {{ formatCurrency(formData.unit_cost) }}
                                </div>
                            </div>
                        </div>

                        <div class="detail-row">
                            <v-icon icon="mdi-calendar-outline" color="primary" />

                            <div>
                                <div class="info-label">
                                    Purchase Date
                                </div>

                                <div class="info-value">
                                    {{ formData.purchase_date }}
                                </div>
                            </div>
                        </div>

                        <div class="detail-row">
                            <v-icon icon="mdi-shield-check-outline" color="primary" />

                            <div>
                                <div class="info-label">
                                    Warranty Expiry
                                </div>

                                <div class="info-value">
                                    {{ formData.warranty_expiry }}
                                </div>
                            </div>
                        </div>

                    </v-card-text>

                </v-card>

                <!-- Remarks -->

                <v-card rounded="lg" elevation="1">

                    <v-card-title class="pa-5">
                        Remarks
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">

                        <div class="text-body-2 text-medium-emphasis">
                            {{ formData.remarks }}
                        </div>

                    </v-card-text>

                </v-card>

            </v-col>

        </v-row>

        <!-- ========================================================= -->
        <!-- QR CODE DIALOG -->
        <!-- ========================================================= -->

        <v-dialog v-model="showQrDialog" max-width="500">

            <!--  <v-card rounded="lg">

                <v-card-title class="text-center pt-6">
                    Asset QR Code
                </v-card-title>

                <v-card-text class="text-center">

                    <div class="qr-placeholder mx-auto my-4">

                        <v-icon icon="mdi-qrcode" size="180" />

                    </div>

                    <div class="text-h6">
                        {{ formData.asset_tag }}
                    </div>

                    <div class="text-caption text-medium-emphasis">
                        {{ formData.item_name }}
                    </div>

                </v-card-text>

                <v-card-actions class="pa-5">

                    <v-btn block variant="tonal" color="primary" prepend-icon="mdi-printer">
                        Print QR Code
                    </v-btn>

                </v-card-actions>

            </v-card> -->
            <v-card rounded="lg" class="qr-card"> <!-- Header --> <v-card-text class="pb-2">
                    <div class="school-header">
                        <div class="row d-flex justify-content-center align-items-center">
                            <!-- School Logo -->
                            <div class="col-md-2">
                                <v-img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMj92tMTV36BAjxnF8BnCg-9sL1uUPe-BNDx0hxhc0cg&s=10"
                                    width="65" height="65" contain class="school-logo" />
                            </div>
                            <div class="col-md-8 mx-2">
                                <div class="school-name">
                                    <div class="text-h6 font-weight-bold"> Southern Leyte State University </div>
                                    <div class="text-subtitle-1 "> Tomas Oppus Campus </div>
                                    <div class="text-subtitle-1 "> San Isidro, Tomas Oppus, Southern Leyte </div>

                                </div>
                            </div>


                        </div>

                    </div>
                </v-card-text> <v-divider /> <!-- QR + Information --> <v-card-text class="pa-6">
                    <div class="property-label"> <!-- QR CODE -->
                        <div class="row d-flex">
                            <div class="col-md-4">
                                <div class="qr-section">
                                    <div class="qr-code">
                                        <img v-if="qrCodeData" :src="qrCodeData" alt="Asset QR Code"
                                            class="qr-image d-block" width="200" height="200" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="property-info">
                                    <div class="text-subtitle-2 text-medium-emphasis"> PROPERTY INFORMATION </div>
                                    <div class="info-row">
                                        <div class="info-label"> Asset Tag: </div>
                                        <div class="info-value"> {{ formData.asset_tag || 'N/A' }} </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="info-label"> Property No: </div>
                                        <div class="info-value"> {{ formData.property_number || 'N/A' }} </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="info-label"> Cost: </div>
                                        <div class="info-value"> {{ formData.unit_cost || 'N/A' }} </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="info-label"> End-USer: </div>
                                        <div class="info-value"> {{ formData.department_id || 'N/A' }} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- PROPERTY DETAILS -->

                    </div>
                </v-card-text> <!-- Print --> <v-card-actions class="pa-5 pt-0"> <v-btn block variant="tonal"
                        color="primary" prepend-icon="mdi-printer" @click="printPropertyLabel"> Print QR Code </v-btn>
                </v-card-actions> </v-card>

        </v-dialog>
    </v-container>
</template>

<style scoped>
.info-label {
    font-size: 0.75rem;
    color: rgba(var(--v-theme-on-surface), 0.6);
    margin-bottom: 4px;
}

.info-value {
    font-size: 0.95rem;
    font-weight: 500;
}

.detail-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 24px;
}

.detail-row:last-child {
    margin-bottom: 0;
}

.qr-placeholder {
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed rgba(var(--v-theme-on-surface), 0.15);
    border-radius: 12px;
}
</style>
```
