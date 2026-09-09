<template>
    <v-container fluid class="pa-6">

        <!-- Page Header -->
        <div class="d-flex align-center justify-space-between mb-6">
            <div>
                <div class="text-h5 font-weight-bold">
                    Edit Asset
                </div>

                <div class="text-body-2 text-medium-emphasis">
                    Update asset information
                </div>
            </div>

            <v-btn variant="outlined" prepend-icon="mdi-arrow-left" @click="goBack">
                Back
            </v-btn>
        </div>

        <!-- Success Alert -->
        <!-- <v-alert v-if="successMessage" type="success" variant="tonal" closable class="mb-5">
            {{ successMessage }}
        </v-alert> -->
        <v-snackbar v-model="snackbar" color="success" location="top right" :timeout="3000">
            <div class="d-flex align-center">
                <v-icon class="mr-2">
                    mdi-check-circle
                </v-icon>

                Asset updated successfully!

                <v-btn variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </div>
        </v-snackbar>

        <!-- Error Alert -->
        <v-alert v-if="errorMessage" type="error" variant="tonal" closable class="mb-5">
            {{ errorMessage }}
        </v-alert>

        <v-card rounded="lg">

            <v-card-title class="pa-5">
                <div class="d-flex align-center">
                    <v-icon color="primary" class="mr-3">
                        mdi-pencil-box-outline
                    </v-icon>

                    Asset Information
                </div>
            </v-card-title>

            <v-divider />

            <v-card-text class="pa-6">

                <v-form @submit.prevent="updateAsset">

                    <!-- Basic Information -->
                    <div class="text-subtitle-1 font-weight-bold mb-4">
                        Basic Information
                    </div>

                    <v-row>

                        <!-- Asset Tag -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.asset_tag" label="Asset Tag"
                                prepend-inner-icon="mdi-tag-outline" variant="outlined" density="comfortable"
                                :error-messages="errors.asset_tag" />
                        </v-col>

                        <!-- Property Number -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.property_number" label="Property Number"
                                prepend-inner-icon="mdi-file-document-outline" variant="outlined" density="comfortable"
                                :error-messages="errors.property_number" />
                        </v-col>

                        <!-- Item Name -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.item_name" label="Item Name"
                                prepend-inner-icon="mdi-package-variant-closed" variant="outlined" density="comfortable"
                                :error-messages="errors.item_name" />
                        </v-col>

                        <!-- Category -->
                        <v-col cols="12" md="6">
                            <v-select v-model="formData.category_id" :items="categories" item-title="name"
                                item-value="id" label="Category" prepend-inner-icon="mdi-shape-outline"
                                variant="outlined" density="comfortable" :error-messages="errors.category_id" />
                        </v-col>

                        <!-- Brand -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.brand" label="Brand"
                                prepend-inner-icon="mdi-tag-text-outline" variant="outlined" density="comfortable"
                                :error-messages="errors.brand" />
                        </v-col>

                        <!-- Model -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.model" label="Model" prepend-inner-icon="mdi-barcode"
                                variant="outlined" density="comfortable" :error-messages="errors.model" />
                        </v-col>

                        <!-- Serial Number -->
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.serial_number" label="Serial Number"
                                prepend-inner-icon="mdi-identifier" variant="outlined" density="comfortable"
                                :error-messages="errors.serial_number" />
                        </v-col>

                        <!-- Quantity -->
                        <v-col cols="12" md="3">
                            <v-text-field v-model.number="formData.quantity" label="Quantity" type="number"
                                prepend-inner-icon="mdi-counter" variant="outlined" density="comfortable"
                                :error-messages="errors.quantity" />
                        </v-col>

                        <!-- Unit Cost -->
                        <v-col cols="12" md="3">
                            <v-text-field v-model.number="formData.unit_cost" label="Unit Cost" type="number" prefix="₱"
                                prepend-inner-icon="mdi-cash" variant="outlined" density="comfortable"
                                :error-messages="errors.unit_cost" />
                        </v-col>

                    </v-row>

                    <v-divider class="my-6" />

                    <!-- Assignment -->
                    <div class="text-subtitle-1 font-weight-bold mb-4">
                        Assignment
                    </div>

                    <v-row>

                        <!-- Department -->
                        <v-col cols="12" md="4">
                            <v-select v-model="formData.department_id" :items="departments" item-title="name"
                                item-value="id" label="Department" prepend-inner-icon="mdi-domain" variant="outlined"
                                density="comfortable" :error-messages="errors.department_id" />
                        </v-col>

                        <!-- Location -->
                        <v-col cols="12" md="4">
                            <v-select v-model="formData.location_id" :items="locations" item-title="name"
                                item-value="id" label="Location" prepend-inner-icon="mdi-map-marker-outline"
                                variant="outlined" density="comfortable" :error-messages="errors.location_id" />
                        </v-col>

                        <!-- Supplier -->
                        <v-col cols="12" md="4">
                            <v-select v-model="formData.supplier_id" :items="suppliers" item-title="name"
                                item-value="id" label="End-User" prepend-inner-icon="mdi-account-outline"
                                variant="outlined" density="comfortable" :error-messages="errors.supplier_id" />
                        </v-col>

                    </v-row>

                    <v-divider class="my-6" />

                    <!-- Purchase Information -->
                    <div class="text-subtitle-1 font-weight-bold mb-4">
                        Purchase Information
                    </div>

                    <v-row>

                        <!-- Purchase Date -->
                        <v-col cols="12" md="4">
                            <v-text-field v-model="formData.purchase_date" label="Purchase Date" type="date"
                                prepend-inner-icon="mdi-calendar-outline" variant="outlined" density="comfortable"
                                :error-messages="errors.purchase_date" />
                        </v-col>

                        <!-- Warranty Expiry -->
                        <v-col cols="12" md="4">
                            <v-text-field v-model="formData.warranty_expiry" label="Warranty Expiry" type="date"
                                prepend-inner-icon="mdi-calendar-check-outline" variant="outlined" density="comfortable"
                                :error-messages="errors.warranty_expiry" />
                        </v-col>
                        <!-- Supplier -->
                        <v-col cols="12" md="4">
                            <v-select v-model="formData.supplier_id" :items="suppliers" item-title="name"
                                item-value="id" label="Supplier" prepend-inner-icon="mdi-truck-outline"
                                variant="outlined" density="comfortable" :error-messages="errors.supplier_id" />
                        </v-col>
                    </v-row>

                    <v-divider class="my-6" />

                    <!-- Status -->
                    <div class="text-subtitle-1 font-weight-bold mb-4">
                        Asset Status
                    </div>

                    <v-row>

                        <!-- Status -->
                        <v-col cols="12" md="6">
                            <v-select v-model="formData.status" :items="statuses" item-title="name" item-value="value"
                                label="Status" prepend-inner-icon="mdi-state-machine" variant="outlined"
                                density="comfortable" :error-messages="errors.status" />
                        </v-col>

                        <!-- Condition -->
                        <v-col cols="12" md="6">
                            <v-select v-model="formData.condition" :items="conditions" item-title="name"
                                item-value="value" label="Condition" prepend-inner-icon="mdi-check-circle-outline"
                                variant="outlined" density="comfortable" :error-messages="errors.condition" />
                        </v-col>

                        <!-- Specifications -->
                        <v-col cols="12">
                            <v-textarea v-model="formData.specifications" label="Specifications"
                                prepend-inner-icon="mdi-text-box-outline" variant="outlined" rows="3"
                                :error-messages="errors.specifications" />
                        </v-col>

                        <!-- Remarks -->
                        <v-col cols="12">
                            <v-textarea v-model="formData.remarks" label="Remarks"
                                prepend-inner-icon="mdi-note-text-outline" variant="outlined" rows="3"
                                :error-messages="errors.remarks" />
                        </v-col>

                    </v-row>

                    <!-- Buttons -->
                    <div class="d-flex justify-end ga-3 mt-6">

                        <v-btn variant="outlined" @click="goBack">
                            Cancel
                        </v-btn>

                        <v-btn type="submit" color="primary" prepend-icon="mdi-content-save-outline" :loading="loading">
                            Update Asset
                        </v-btn>

                    </div>

                </v-form>

            </v-card-text>

        </v-card>

    </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const loadingAsset = ref(false)

const errorMessage = ref('')
const successMessage = ref('')
const snackbar = ref(false)

const errors = ref({})
const assetId = route.params.id
const categories = [
    { id: 1, name: 'Desktop Computer' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Printer' },
    { id: 4, name: 'Network Equipment' },
    { id: 5, name: 'Projector' },
    { id: 6, name: 'UPS' },
    { id: 7, name: 'Server' },
    { id: 8, name: 'Monitor' },
    { id: 9, name: 'Scanner' },
    { id: 10, name: 'Other' },
]
const departments = [
    { id: 1, name: 'ICT Office' },
    { id: 2, name: 'Registrar' },
    { id: 3, name: 'Accounting' },
    { id: 4, name: 'Budget Office' },
    { id: 5, name: 'Human Resource Office' },
    { id: 6, name: 'Library' },
    { id: 7, name: 'College of Education' },
    { id: 8, name: 'College of Engineering' },
    { id: 9, name: 'College of Arts and Sciences' },
    { id: 10, name: 'Student Affairs' },
]
const locations = [
    { id: 1, name: 'ICT Office' },
    { id: 2, name: 'Administration Building' },
    { id: 3, name: 'Registrar Office' },
    { id: 4, name: 'Accounting Office' },
    { id: 5, name: 'Library' },
    { id: 6, name: 'Computer Laboratory 1' },
    { id: 7, name: 'Computer Laboratory 2' },
    { id: 8, name: 'Science Laboratory' },
    { id: 9, name: 'Engineering Laboratory' },
    { id: 10, name: 'Faculty Room' },
]
const statuses = [
    'available', 'assigned', 'in_storage', 'under_maintenance', 'lost', 'damaged', 'for disposal', 'disposed', 'retired'
]
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

        const asset = response.data.data ?? response.data

        formData.value = {
            asset_tag: asset.asset_tag ?? '',
            category_id: asset.category_id ?? null,
            supplier_id: asset.supplier_id ?? null,
            department_id: asset.department_id ?? null,
            location_id: asset.location_id ?? null,
            property_number: asset.property_number ?? '',
            item_name: asset.item_name ?? '',
            brand: asset.brand ?? '',
            model: asset.model ?? '',
            serial_number: asset.serial_number ?? '',
            specifications: asset.specifications ?? '',
            quantity: asset.quantity ?? 1,
            unit_cost: asset.unit_cost ?? 0,
            purchase_date: asset.purchase_date
                ? asset.purchase_date.substring(0, 10)
                : '',
            warranty_expiry: asset.warranty_expiry
                ? asset.warranty_expiry.substring(0, 10)
                : '',
            status: asset.status ?? 'active',
            condition: asset.condition ?? 'good',
            remarks: asset.remarks ?? '',
        }

    } catch (error) {
        console.error('Failed to load asset:', error)

        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load asset.'

    } finally {
        loadingAsset.value = false
    }
}
const updateAsset = async () => {
    loading.value = true
    errorMessage.value = ''
    errors.value = {}

    try {
        const response = await api.put(
            `/assets/${assetId}`,
            formData.value
        )

        snackbar.value = true
        setTimeout(() => {
            router.push('/dashboard/assets')
        }, 1000)

    } catch (error) {
        console.error('Failed to update asset:', error)

        if (error.response?.status === 422) {
            errors.value = error.response.data.errors || {}
            errorMessage.value = 'Please check the form for errors.'
        } else {
            errorMessage.value =
                error.response?.data?.message ||
                'Failed to update asset.'
        }

    } finally {
        loading.value = false
    }
}
const goBack = () => {
    router.push('/dashboard/assets')
}

onMounted(() => {
    fetchAsset()
})
</script>