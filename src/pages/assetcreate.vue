```vue
<template>
    <v-container fluid class="pa-6">
        <!-- Page Header -->
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
            <div>
                <div class="d-flex align-center mb-1">
                    <v-btn icon="mdi-arrow-left" variant="text" class="mr-2" @click="goBack" />

                    <h1 class="text-h5 font-weight-bold">
                        Add ICT Asset
                    </h1>
                </div>

                <p class="text-body-2 text-medium-emphasis ml-12">
                    Register a new ICT equipment or device
                </p>
            </div>

            <div class="d-flex ga-2">
                <v-btn variant="outlined" prepend-icon="mdi-close" @click="goBack">
                    Cancel
                </v-btn>

                <v-btn color="primary" prepend-icon="mdi-content-save" :loading="saving" @click="saveAsset">
                    Save Asset
                </v-btn>
            </div>
        </div>

        <v-form ref="form" v-model="valid">
            <v-row>
                <!-- Asset Information -->
                <v-col cols="12">
                    <v-card elevation="1" rounded="lg">
                        <v-card-title class="d-flex align-center pa-5">
                            <v-avatar color="primary" variant="tonal" size="42" class="mr-3">
                                <v-icon>mdi-package-variant-closed</v-icon>
                            </v-avatar>

                            <div>
                                <div class="text-subtitle-1 font-weight-bold">
                                    Asset Information
                                </div>

                                <div class="text-caption text-medium-emphasis">
                                    Basic information about the ICT asset
                                </div>
                            </div>
                        </v-card-title>

                        <v-divider />

                        <v-card-text class="pa-5">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="asset.asset_tag" label="Asset Tag"
                                        placeholder="e.g. ICT-2026-001" prepend-inner-icon="mdi-tag-outline"
                                        variant="outlined" density="comfortable" :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="asset.property_number" label="Property Number"
                                        placeholder="e.g. PAR-2026-001" prepend-inner-icon="mdi-file-document-outline"
                                        variant="outlined" density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="asset.item_name" label="Item Name"
                                        placeholder="e.g. Desktop Computer" prepend-inner-icon="mdi-monitor"
                                        variant="outlined" density="comfortable" :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-select v-model="asset.category" label="Category" :items="categories"
                                        prepend-inner-icon="mdi-shape-outline" variant="outlined" density="comfortable"
                                        :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="asset.brand" label="Brand" placeholder="e.g. Dell"
                                        prepend-inner-icon="mdi-alpha-b-circle-outline" variant="outlined"
                                        density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="asset.model" label="Model" placeholder="e.g. OptiPlex 7010"
                                        prepend-inner-icon="mdi-barcode-scan" variant="outlined"
                                        density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="asset.serial_number" label="Serial Number"
                                        placeholder="Enter serial number" prepend-inner-icon="mdi-identifier"
                                        variant="outlined" density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model.number="asset.quantity" label="Quantity" type="number" min="1"
                                        prepend-inner-icon="mdi-counter" variant="outlined" density="comfortable"
                                        :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="8">
                                    <v-textarea v-model="asset.specifications" label="Specifications"
                                        placeholder="Processor, RAM, storage, display, ports, etc."
                                        prepend-inner-icon="mdi-cog-outline" variant="outlined" density="comfortable"
                                        rows="3" />
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Assignment -->
                <v-col cols="12" md="6">
                    <v-card elevation="1" rounded="lg" height="100%">
                        <v-card-title class="d-flex align-center pa-5">
                            <v-avatar color="secondary" variant="tonal" size="42" class="mr-3">
                                <v-icon>mdi-office-building-outline</v-icon>
                            </v-avatar>

                            <div>
                                <div class="text-subtitle-1 font-weight-bold">
                                    Assignment
                                </div>

                                <div class="text-caption text-medium-emphasis">
                                    Where the asset is assigned
                                </div>
                            </div>
                        </v-card-title>

                        <v-divider />

                        <v-card-text class="pa-5">
                            <v-select v-model="asset.department" label="Department / Office" :items="departments"
                                prepend-inner-icon="mdi-domain" variant="outlined" density="comfortable"
                                :rules="[required]" class="mb-3" />

                            <v-select v-model="asset.location" label="Location / Room" :items="locations"
                                prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable"
                                :rules="[required]" class="mb-3" />

                            <v-text-field v-model="asset.assigned_to" label="Assigned To"
                                placeholder="Name of personnel" prepend-inner-icon="mdi-account-outline"
                                variant="outlined" density="comfortable" />
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Acquisition -->
                <v-col cols="12" md="6">
                    <v-card elevation="1" rounded="lg" height="100%">
                        <v-card-title class="d-flex align-center pa-5">
                            <v-avatar color="success" variant="tonal" size="42" class="mr-3">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-avatar>

                            <div>
                                <div class="text-subtitle-1 font-weight-bold">
                                    Acquisition
                                </div>

                                <div class="text-caption text-medium-emphasis">
                                    Purchase and warranty information
                                </div>
                            </div>
                        </v-card-title>

                        <v-divider />

                        <v-card-text class="pa-5">
                            <v-text-field v-model="asset.supplier" label="Supplier" placeholder="Supplier / Vendor"
                                prepend-inner-icon="mdi-store-outline" variant="outlined" density="comfortable"
                                class="mb-3" />

                            <v-text-field v-model.number="asset.unit_cost" label="Unit Cost" type="number" min="0"
                                prefix="₱" prepend-inner-icon="mdi-cash" variant="outlined" density="comfortable"
                                class="mb-3" />

                            <v-text-field v-model="asset.purchase_date" label="Purchase Date" type="date"
                                prepend-inner-icon="mdi-calendar-outline" variant="outlined" density="comfortable"
                                class="mb-3" />

                            <v-text-field v-model="asset.warranty_expiry" label="Warranty Expiry" type="date"
                                prepend-inner-icon="mdi-calendar-clock-outline" variant="outlined"
                                density="comfortable" />
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Status and Condition -->
                <v-col cols="12">
                    <v-card elevation="1" rounded="lg">
                        <v-card-title class="d-flex align-center pa-5">
                            <v-avatar color="warning" variant="tonal" size="42" class="mr-3">
                                <v-icon>mdi-clipboard-check-outline</v-icon>
                            </v-avatar>

                            <div>
                                <div class="text-subtitle-1 font-weight-bold">
                                    Status & Condition
                                </div>

                                <div class="text-caption text-medium-emphasis">
                                    Current operational status of the asset
                                </div>
                            </div>
                        </v-card-title>

                        <v-divider />

                        <v-card-text class="pa-5">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-select v-model="asset.status" label="Status" :items="statuses"
                                        prepend-inner-icon="mdi-list-status" variant="outlined" density="comfortable"
                                        :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-select v-model="asset.condition" label="Condition" :items="conditions"
                                        prepend-inner-icon="mdi-check-circle-outline" variant="outlined"
                                        density="comfortable" :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field v-model="asset.remarks" label="Remarks"
                                        placeholder="Additional remarks" prepend-inner-icon="mdi-note-text-outline"
                                        variant="outlined" density="comfortable" />
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Bottom Actions -->
                <v-col cols="12">
                    <div class="d-flex justify-end ga-2">
                        <v-btn variant="outlined" @click="goBack">
                            Cancel
                        </v-btn>

                        <v-btn color="primary" prepend-icon="mdi-content-save" :loading="saving" @click="saveAsset">
                            Save Asset
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-form>

        <!-- Success Snackbar -->
        <v-snackbar v-model="snackbar" color="success" location="top right" :timeout="3000">
            <div class="d-flex align-center">
                <v-icon class="mr-2">
                    mdi-check-circle
                </v-icon>

                Asset saved successfully!

                <v-btn variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </div>
        </v-snackbar>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref(null)
const valid = ref(false)
const saving = ref(false)
const snackbar = ref(false)

const asset = ref({
    asset_tag: '',
    property_number: '',
    item_name: '',
    category: '',
    brand: '',
    model: '',
    serial_number: '',
    specifications: '',
    quantity: 1,

    department: '',
    location: '',
    assigned_to: '',

    supplier: '',
    unit_cost: null,
    purchase_date: '',
    warranty_expiry: '',

    status: 'Serviceable',
    condition: 'Good',
    remarks: '',
})

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

const departments = [
    'ICT Office',
    'Registrar',
    'Accounting',
    'Budget Office',
    'Human Resource Office',
    'Library',
    'College of Education',
    'College of Engineering',
    'College of Arts and Sciences',
    'Student Affairs',
]

const locations = [
    'ICT Office',
    'Administration Building',
    'Registrar Office',
    'Accounting Office',
    'Library',
    'Computer Laboratory 1',
    'Computer Laboratory 2',
    'Science Laboratory',
    'Engineering Laboratory',
    'Faculty Room',
]

const statuses = [
    'Serviceable',
    'Under Repair',
    'Unserviceable',
    'For Disposal',
    'Lost',
]

const conditions = [
    'Excellent',
    'Good',
    'Fair',
    'Poor',
    'Damaged',
]

const required = value => {
    return !!value || 'This field is required'
}

const goBack = () => {
    router.push('/assets')
}

const saveAsset = async () => {
    const result = await form.value?.validate()

    if (!result?.valid) {
        return
    }

    saving.value = true

    // Dummy frontend save
    // No API / Laravel connection yet
    await new Promise(resolve => setTimeout(resolve, 800))

    console.log('New Asset:', asset.value)

    saving.value = false
    snackbar.value = true

    // Demo only:
    // return to asset list after saving
    setTimeout(() => {
        router.push('/assets')
    }, 1000)
}
</script>
```
