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

            <!-- <div class="d-flex ga-2">
                <v-btn variant="outlined" prepend-icon="mdi-close" @click="goBack">
                    Cancel
                </v-btn>

                <v-btn color="primary" prepend-icon="mdi-content-save" :loading="saving" @click="saveAsset">
                    Save Asset
                </v-btn>
            </div> -->
        </div>

        <v-form ref="form" v-model="valid">
            <v-row>
                <!-- Asset Information -->
                <v-col cols="7">
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
                                    <v-text-field v-model="generatedAssetTag" label="Asset Tag"
                                        placeholder="e.g. ICT-2026-001" prepend-inner-icon="mdi-tag-outline"
                                        variant="outlined" density="comfortable" readonly />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="formData.property_number" label="Property Number"
                                        placeholder="e.g. PAR-2026-001" prepend-inner-icon="mdi-file-document-outline"
                                        variant="outlined" density="comfortable" />
                                </v-col>



                                <v-col cols="12" md="6">
                                    <v-select v-model="formData.category_id" label="Category" :items="categories"
                                        item-title="name" item-value="id" prepend-inner-icon="mdi-shape-outline"
                                        variant="outlined" density="comfortable" :rules="[required]" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="formData.item_name" label="Item Name"
                                        placeholder="e.g. Desktop Computer" prepend-inner-icon="mdi-monitor"
                                        variant="outlined" density="comfortable" :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="formData.brand" label="Brand" placeholder="e.g. Dell"
                                        prepend-inner-icon="mdi-alpha-b-circle-outline" variant="outlined"
                                        density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="formData.model" label="Model"
                                        placeholder="e.g. OptiPlex 7010" prepend-inner-icon="mdi-barcode-scan"
                                        variant="outlined" density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="formData.serial_number" label="Serial Number"
                                        placeholder="Enter serial number" prepend-inner-icon="mdi-identifier"
                                        variant="outlined" density="comfortable" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model.number="formData.quantity" label="Quantity" type="number"
                                        min="1" prepend-inner-icon="mdi-counter" variant="outlined"
                                        density="comfortable" :rules="[required]" />
                                </v-col>

                                <v-col cols="12" md="12">
                                    <v-textarea v-model="formData.specifications" label="Specifications"
                                        placeholder="Processor, RAM, storage, display, ports, etc."
                                        prepend-inner-icon="mdi-cog-outline" variant="outlined" density="comfortable"
                                        rows="3" />
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6" md="5" v-if="formData.category_id == 1 || formData.category_id == 2">
                    <v-card elevation="1" rounded="lg" height="100%">
                        <v-card-title class="d-flex align-center pa-5">
                            <v-avatar color="secondary" variant="tonal" size="42" class="mr-3">
                                <v-icon>mdi-office-building-outline</v-icon>
                            </v-avatar>

                            <div>
                                <div class="text-subtitle-1 font-weight-bold">
                                    Software
                                </div>

                                <div class="text-body-2 text-medium-emphasis">

                                </div>
                            </div>
                        </v-card-title>

                        <v-divider />

                        <v-card-text class="pa-5">
                            <v-select label="Operating System" :items="['Windows', 'MacOS', 'Linux', 'Google Flex']"
                                prepend-inner-icon="mdi-domain" variant="outlined" density="comfortable"
                                :rules="[required]" />

                            <v-select label="Version" :items="['10 Home', '10 Pro', '11 Home', '11 Pro']"
                                prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable"
                                :rules="[required]" />

                            <v-select label="License" :items="['Perpetual', 'Volume MAK', 'Volume KMS', 'Unlicense']"
                                prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable"
                                :rules="[required]" />
                            <div class="d-flex ga-2 mb-2">
                                <v-btn color="primary" prepend-icon="mdi-content-save" :loading="saving" @click="">
                                    Add Software
                                </v-btn>

                            </div>
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-select label="Software Installed"
                                        :items="['MS Office 365', 'ChatGPT', 'Gemini', 'Grammarly']"
                                        prepend-inner-icon="mdi-map-marker-outline" variant="outlined"
                                        density="comfortable" :rules="[required]" />
                                </v-col>
                                <v-col cols="6" md="6"">
                                    <v-select label=" Type" :items="['Subscribed', 'Perpetual', 'Free/Open Source']"
                                    prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable"
                                    :rules="[required]" />
                </v-col>
            </v-row>
            <div class="d-flex ga-2 mb-2">
                <v-btn color="primary" prepend-icon="mdi-content-save" :loading="saving" @click="">
                    Add Security
                </v-btn>

            </div>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select label="Security Installed" :items="['Defender', 'Kaspersky', 'End-point', 'Avast']"
                        prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable"
                        :rules="[required]" />
                </v-col>
                <v-col cols="6" md="6"">
                                    <v-select label=" Type" :items="['Built-in', 'Subscription', 'Free/Open Source']"
                    prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable"
                    :rules="[required]" />
                </v-col>
            </v-row>
            </v-card-text>
            </v-card>
            </v-col>
            <!-- Assignment -->
            <v-col cols="4" md="5" v-if="formData.status == 'assigned'">
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
                        <v-select v-model="formData.department_id" label="Department / Office" :items="departments"
                            item-title="name" item-value="id" prepend-inner-icon="mdi-domain" variant="outlined"
                            density="comfortable" :rules="[required]" class="mb-3" />

                        <v-select v-model="formData.location_id" label="Location / Room" :items="locations"
                            item-title="name" item-value="id" prepend-inner-icon="mdi-map-marker-outline"
                            variant="outlined" density="comfortable" :rules="[required]" class="mb-3" />

                        <v-text-field label="End-User" placeholder="Name of personnel"
                            prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="5">
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
                            <v-col cols="12" md="12">
                                <v-select v-model="formData.status" label="Status" :items="statuses"
                                    prepend-inner-icon="mdi-list-status" variant="outlined" density="comfortable"
                                    :rules="[required]" />
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-select v-model="formData.condition" label="Condition" :items="conditions"
                                    prepend-inner-icon="mdi-check-circle-outline" variant="outlined"
                                    density="comfortable" :rules="[required]" />
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field v-model="formData.remarks" label="Remarks"
                                    placeholder="Additional remarks" prepend-inner-icon="mdi-note-text-outline"
                                    variant="outlined" density="comfortable" />
                            </v-col>
                        </v-row>
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
                        <v-text-field v-model="formData.supplier_id" label="Supplier" placeholder="Supplier / Vendor"
                            prepend-inner-icon="mdi-store-outline" variant="outlined" density="comfortable"
                            class="mb-3" />

                        <v-text-field v-model.number="formData.unit_cost" label="Unit Cost" type="number" min="0"
                            prefix="₱" prepend-inner-icon="mdi-cash" variant="outlined" density="comfortable"
                            class="mb-3" />

                        <v-text-field v-model="formData.purchase_date" label="Purchase Date" type="date"
                            prepend-inner-icon="mdi-calendar-outline" variant="outlined" density="comfortable"
                            class="mb-3" />

                        <v-text-field v-model="formData.warranty_expiry" label="Warranty Expiry" type="date"
                            prepend-inner-icon="mdi-calendar-clock-outline" variant="outlined" density="comfortable" />
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Status and Condition -->


            <!-- Bottom Actions -->
            <v-col cols="12">
                <div class="d-flex justify-end ga-2">
                    <v-btn variant="outlined" @click="goBack">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-content-save" :loading="saving" @click="createAsset">
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()

const form = ref(null)
const valid = ref(false)
const saving = ref(false)
const snackbar = ref(false)
const generatedAssetTag = ref('')



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
    purchase_date: null,
    warranty_expiry: null,
    status: '',
    condition: '',
    remarks: '',
})
const getNextAssetTag = async () => {
    const response = await api.get('/assets/next-number')

    generatedAssetTag.value = response.data.asset_tag
    //formData.asset_tag.value = response.data.asset_tag
    console.log(formData.asset_tag)
    console.log(generatedAssetTag.value)
}
onMounted(() => {
    getNextAssetTag()
})
console.log(generatedAssetTag.value)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const createAsset = async () => {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    try {
        formData.value.asset_tag = generatedAssetTag.value
        console.log(generatedAssetTag.value)
        console.log(formData.value.asset_tag )
        const response = await api.post('/assets', formData.value)


        saving.value = true

        
        successMessage.value = 'Asset created successfully.'
        await new Promise(resolve => setTimeout(resolve, 800));

        saving.value = false
        snackbar.value = true

        // Demo only:
        // return to asset list after saving
        setTimeout(() => {
            router.push('/assets')
        }, 1000)

        // Reset form
        formData.value = {
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
            purchase_date: null,
            warranty_expiry: null,
            status: 'active',
            condition: 'good',
            remarks: '',
        }

    } catch (error) {
        console.error('Failed to create asset:', error)

        if (error.response?.data?.errors) {
            errorMessage.value = Object.values(
                error.response.data.errors
            ).flat().join(' ')
        } else {
            errorMessage.value =
                error.response?.data?.message ||
                'Failed to create formData.'
        }

    } finally {
        loading.value = false
    }
}

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
    {
        id: 1,
        name: 'Desktop Computer',
    },
    {
        id: 2,
        name: 'Laptop',
    },
    {
        id: 3,
        name: 'Printer',
    },
    {
        id: 4,
        name: 'Network Equipment',
    },
    {
        id: 5,
        name: 'Projector',
    },
    {
        id: 6,
        name: 'UPS',
    },
    {
        id: 7,
        name: 'Server',
    },
    {
        id: 8,
        name: 'Monitor',
    },
    {
        id: 9,
        name: 'Scanner',
    },
    {
        id: 10,
        name: 'Other',
    },
]

const departments = [
    {
        id: 1,
        name: 'ICT Office',
    },
    {
        id: 2,
        name: 'Registrar',
    },
    {
        id: 3,
        name: 'Accounting',
    },
    {
        id: 4,
        name: 'Budget Office',
    },
    {
        id: 5,
        name: 'Human Resource Office',
    },
    {
        id: 6,
        name: 'Library',
    },
    {
        id: 7,
        name: 'College of Education',
    },
    {
        id: 8,
        name: 'College of Engineering',
    },
    {
        id: 9,
        name: 'College of Arts and Sciences',
    },
    {
        id: 10,
        name: 'Student Affairs',
    },
]

const locations = [
    {
        id: 1,
        name: 'ICT Office',
    },
    {
        id: 2,
        name: 'Administration Building',
    },
    {
        id: 3,
        name: 'Registrar Office',
    },
    {
        id: 4,
        name: 'Accounting Office',
    },
    {
        id: 5,
        name: 'Library',
    },
    {
        id: 6,
        name: 'Computer Laboratory 1',
    },
    {
        id: 7,
        name: 'Computer Laboratory 2',
    },
    {
        id: 8,
        name: 'Science Laboratory',
    },
    {
        id: 9,
        name: 'Engineering Laboratory',
    },
    {
        id: 10,
        name: 'Faculty Room',
    },
]

const statuses = [
    'available', 'assigned', 'in_storage', 'under_maintenance', 'lost', 'damaged', 'for disposal', 'disposed', 'retired'
]

const conditions = [
    'new',
    'good',
    'fair',
    'poor',
    'damaged',
    'unserviceable',
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

    console.log('New Asset:', formData.value)

    saving.value = false
    snackbar.value = true

    // Demo only:
    // return to asset list after saving
    setTimeout(() => {
        router.push('/assets')
        nextNumber.value += 1
    }, 1000)
}


</script>
```
