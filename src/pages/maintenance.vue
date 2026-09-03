```vue
<template>
  <v-container fluid class="pa-6">

    <!-- Page Header -->
    <div class="d-flex flex-wrap align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">
          Maintenance
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Monitor repairs, preventive maintenance, and service history
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="openCreateDialog"
      >
        Add Maintenance Record
      </v-btn>
    </div>

    <!-- Summary Cards -->
    <v-row class="mb-2">
      <v-col
        v-for="stat in summaryCards"
        :key="stat.title"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="lg"
          elevation="1"
          class="pa-4"
        >
          <div class="d-flex align-center">
            <v-avatar
              :color="stat.color"
              variant="tonal"
              size="48"
              class="mr-4"
            >
              <v-icon>{{ stat.icon }}</v-icon>
            </v-avatar>

            <div>
              <div class="text-caption text-medium-emphasis">
                {{ stat.title }}
              </div>

              <div class="text-h5 font-weight-bold">
                {{ stat.value }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-card
      rounded="lg"
      elevation="1"
      class="mb-6"
    >
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="search"
              label="Search maintenance records"
              placeholder="Asset tag, item, technician..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              hide-details
              clearable
            />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="typeFilter"
              label="Maintenance Type"
              :items="['All', 'Preventive', 'Corrective', 'Inspection']"
              variant="outlined"
              density="comfortable"
              hide-details
            />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="statusFilter"
              label="Status"
              :items="['All', 'Completed', 'In Progress', 'Pending']"
              variant="outlined"
              density="comfortable"
              hide-details
            />
          </v-col>

          <v-col cols="12" md="1">
            <v-btn
              icon="mdi-filter-remove-outline"
              variant="text"
              size="large"
              @click="clearFilters"
            >
              <v-icon>mdi-filter-remove-outline</v-icon>

              <v-tooltip activator="parent">
                Clear Filters
              </v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Maintenance Table -->
    <v-card
      rounded="lg"
      elevation="1"
    >
      <v-card-title class="pa-5">
        <div class="d-flex align-center">
          <v-icon
            icon="mdi-wrench-outline"
            class="mr-3"
          />

          <span class="text-subtitle-1 font-weight-bold">
            Maintenance Records
          </span>

          <v-chip
            class="ml-3"
            size="small"
            variant="tonal"
          >
            {{ filteredRecords.length }} records
          </v-chip>
        </div>
      </v-card-title>

      <v-divider />

      <v-data-table
        :headers="headers"
        :items="filteredRecords"
        :items-per-page="10"
        hover
      >

        <!-- Asset -->
        <template #item.asset="{ item }">
          <div>
            <div class="font-weight-medium">
              {{ item.asset_tag }}
            </div>

            <div class="text-caption text-medium-emphasis">
              {{ item.item_name }}
            </div>
          </div>
        </template>

        <!-- Maintenance Type -->
        <template #item.type="{ item }">
          <v-chip
            :color="typeColor(item.type)"
            size="small"
            variant="tonal"
          >
            {{ item.type }}
          </v-chip>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <v-chip
            :color="statusColor(item.status)"
            size="small"
            variant="tonal"
          >
            <v-icon
              start
              size="14"
            >
              {{ statusIcon(item.status) }}
            </v-icon>

            {{ item.status }}
          </v-chip>
        </template>

        <!-- Cost -->
        <template #item.cost="{ item }">
          {{ formatCurrency(item.cost) }}
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn
              icon
              variant="text"
              size="small"
              color="primary"
              @click="viewRecord(item)"
            >
              <v-icon>mdi-eye-outline</v-icon>

              <v-tooltip activator="parent">
                View
              </v-tooltip>
            </v-btn>

            <v-btn
              icon
              variant="text"
              size="small"
              @click="editRecord(item)"
            >
              <v-icon>mdi-pencil-outline</v-icon>

              <v-tooltip activator="parent">
                Edit
              </v-tooltip>
            </v-btn>

            <v-btn
              icon
              variant="text"
              size="small"
              color="error"
              @click="deleteRecord(item)"
            >
              <v-icon>mdi-delete-outline</v-icon>

              <v-tooltip activator="parent">
                Delete
              </v-tooltip>
            </v-btn>
          </div>
        </template>

      </v-data-table>
    </v-card>

    <!-- Create / Edit Dialog -->
    <v-dialog
      v-model="dialog"
      max-width="750"
    >
      <v-card rounded="lg">

        <v-card-title class="pa-5">
          <div class="d-flex align-center">
            <v-avatar
              color="primary"
              variant="tonal"
              class="mr-3"
            >
              <v-icon>mdi-wrench-outline</v-icon>
            </v-avatar>

            <div>
              <div class="text-h6 font-weight-bold">
                {{ editing ? 'Edit Maintenance Record' : 'Add Maintenance Record' }}
              </div>

              <div class="text-caption text-medium-emphasis">
                Record maintenance activity for an ICT asset
              </div>
            </div>
          </div>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">
          <v-form ref="form">

            <v-row>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.asset_tag"
                  label="Asset"
                  :items="assetOptions"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-monitor"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.type"
                  label="Maintenance Type"
                  :items="['Preventive', 'Corrective', 'Inspection']"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-wrench-outline"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.date"
                  label="Maintenance Date"
                  type="date"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-calendar-outline"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.status"
                  label="Status"
                  :items="['Completed', 'In Progress', 'Pending']"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-list-status"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.technician"
                  label="Technician"
                  placeholder="Technician / ICT Personnel"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-account-wrench-outline"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="formData.cost"
                  label="Maintenance Cost"
                  type="number"
                  prefix="₱"
                  min="0"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-cash"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="formData.description"
                  label="Maintenance Description"
                  placeholder="Describe the maintenance performed..."
                  variant="outlined"
                  density="comfortable"
                  rows="3"
                  prepend-inner-icon="mdi-text-box-outline"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="formData.remarks"
                  label="Remarks"
                  placeholder="Additional notes..."
                  variant="outlined"
                  density="comfortable"
                  rows="2"
                  prepend-inner-icon="mdi-note-text-outline"
                />
              </v-col>

            </v-row>

          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            variant="outlined"
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            prepend-icon="mdi-content-save"
            @click="saveRecord"
          >
            {{ editing ? 'Update Record' : 'Save Record' }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- View Dialog -->
    <v-dialog
      v-model="viewDialog"
      max-width="650"
    >
      <v-card
        v-if="selectedRecord"
        rounded="lg"
      >
        <v-card-title class="pa-5">
          <div class="d-flex align-center">
            <v-avatar
              color="primary"
              variant="tonal"
              class="mr-3"
            >
              <v-icon>mdi-wrench-outline</v-icon>
            </v-avatar>

            <div>
              <div class="text-h6 font-weight-bold">
                Maintenance Details
              </div>

              <div class="text-caption text-medium-emphasis">
                {{ selectedRecord.asset_tag }}
              </div>
            </div>
          </div>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <v-row>
            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Asset
              </div>

              <div class="font-weight-medium">
                {{ selectedRecord.asset_tag }}
              </div>

              <div class="text-caption">
                {{ selectedRecord.item_name }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Maintenance Type
              </div>

              <v-chip
                :color="typeColor(selectedRecord.type)"
                size="small"
                variant="tonal"
                class="mt-1"
              >
                {{ selectedRecord.type }}
              </v-chip>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Date
              </div>

              <div class="font-weight-medium">
                {{ selectedRecord.date }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Status
              </div>

              <v-chip
                :color="statusColor(selectedRecord.status)"
                size="small"
                variant="tonal"
                class="mt-1"
              >
                {{ selectedRecord.status }}
              </v-chip>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Technician
              </div>

              <div class="font-weight-medium">
                {{ selectedRecord.technician }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Cost
              </div>

              <div class="font-weight-medium">
                {{ formatCurrency(selectedRecord.cost) }}
              </div>
            </v-col>

            <v-col cols="12">
              <v-divider class="my-2" />
            </v-col>

            <v-col cols="12">
              <div class="text-caption text-medium-emphasis">
                Description
              </div>

              <div class="mt-1">
                {{ selectedRecord.description }}
              </div>
            </v-col>

            <v-col cols="12">
              <div class="text-caption text-medium-emphasis">
                Remarks
              </div>

              <div class="mt-1">
                {{ selectedRecord.remarks || 'No remarks' }}
              </div>
            </v-col>

          </v-row>

        </v-card-text>

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            variant="outlined"
            @click="viewDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog
      v-model="deleteDialog"
      max-width="450"
    >
      <v-card rounded="lg">

        <v-card-title class="pa-5">
          Delete Maintenance Record?
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete the maintenance record for
          <strong>{{ selectedRecord?.asset_tag }}</strong>?
          <br />
          This is only a frontend demo and will not affect the database.
        </v-card-text>

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            variant="outlined"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            prepend-icon="mdi-delete-outline"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="top right"
      :timeout="3000"
    >
      {{ snackbarMessage }}

      <template #actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const typeFilter = ref('All')
const statusFilter = ref('All')

const dialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)

const editing = ref(false)
const selectedRecord = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const records = ref([
  {
    id: 1,
    asset_tag: 'ICT-2026-001',
    item_name: 'Dell OptiPlex 7010 Desktop',
    type: 'Preventive',
    date: '2026-08-28',
    technician: 'ICT Technician',
    cost: 0,
    status: 'Completed',
    description: 'System cleaning, Windows updates, antivirus update, and hardware inspection.',
    remarks: 'Operating normally.',
  },
  {
    id: 2,
    asset_tag: 'ICT-2026-002',
    item_name: 'HP LaserJet Pro Printer',
    type: 'Corrective',
    date: '2026-08-25',
    technician: 'ICT Technician',
    cost: 1850,
    status: 'Completed',
    description: 'Paper feed problem repaired and rollers cleaned.',
    remarks: 'Replacement roller installed.',
  },
  {
    id: 3,
    asset_tag: 'ICT-2026-015',
    item_name: 'Ubiquiti U6 Pro Access Point',
    type: 'Inspection',
    date: '2026-08-20',
    technician: 'Network Administrator',
    cost: 0,
    status: 'Completed',
    description: 'Network connectivity and AP health inspection.',
    remarks: 'Signal strength within acceptable range.',
  },
  {
    id: 4,
    asset_tag: 'ICT-2026-021',
    item_name: 'Epson Projector',
    type: 'Corrective',
    date: '2026-08-18',
    technician: 'ICT Technician',
    cost: 3200,
    status: 'In Progress',
    description: 'Projector display issue. Unit sent for further diagnostic testing.',
    remarks: 'Awaiting replacement lamp.',
  },
  {
    id: 5,
    asset_tag: 'ICT-2026-035',
    item_name: 'APC UPS 1200VA',
    type: 'Preventive',
    date: '2026-08-15',
    technician: 'ICT Technician',
    cost: 0,
    status: 'Completed',
    description: 'Battery health check, terminal inspection, and runtime test.',
    remarks: 'Battery condition good.',
  },
  {
    id: 6,
    asset_tag: 'ICT-2026-048',
    item_name: 'Lenovo ThinkCentre Desktop',
    type: 'Corrective',
    date: '2026-08-12',
    technician: 'ICT Technician',
    cost: 2500,
    status: 'Pending',
    description: 'Desktop experiencing intermittent shutdowns.',
    remarks: 'For diagnostic inspection.',
  },
  {
    id: 7,
    asset_tag: 'ICT-2026-052',
    item_name: 'Cisco Network Switch',
    type: 'Inspection',
    date: '2026-08-10',
    technician: 'Network Administrator',
    cost: 0,
    status: 'Completed',
    description: 'Port utilization and temperature inspection.',
    remarks: 'No abnormal conditions found.',
  },
])

const formData = ref({
  asset_tag: '',
  type: 'Preventive',
  date: '',
  technician: '',
  cost: 0,
  status: 'Completed',
  description: '',
  remarks: '',
})

const headers = [
  {
    title: 'Asset',
    key: 'asset',
    sortable: true,
  },
  {
    title: 'Type',
    key: 'type',
    sortable: true,
  },
  {
    title: 'Date',
    key: 'date',
    sortable: true,
  },
  {
    title: 'Technician',
    key: 'technician',
    sortable: true,
  },
  {
    title: 'Cost',
    key: 'cost',
    align: 'end',
    sortable: true,
  },
  {
    title: 'Status',
    key: 'status',
    sortable: true,
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]

const summaryCards = computed(() => [
  {
    title: 'Total Records',
    value: records.value.length,
    icon: 'mdi-wrench-outline',
    color: 'primary',
  },
  {
    title: 'Completed',
    value: records.value.filter(
      item => item.status === 'Completed'
    ).length,
    icon: 'mdi-check-circle-outline',
    color: 'success',
  },
  {
    title: 'In Progress',
    value: records.value.filter(
      item => item.status === 'In Progress'
    ).length,
    icon: 'mdi-progress-wrench',
    color: 'warning',
  },
  {
    title: 'Total Cost',
    value: formatCurrency(
      records.value.reduce(
        (total, item) => total + Number(item.cost || 0),
        0
      )
    ),
    icon: 'mdi-cash-multiple',
    color: 'secondary',
  },
])

const assetOptions = computed(() =>
  [...new Set(records.value.map(item => item.asset_tag))]
)

const filteredRecords = computed(() => {
  const query = search.value.toLowerCase().trim()

  return records.value.filter(item => {
    const matchesSearch =
      !query ||
      item.asset_tag.toLowerCase().includes(query) ||
      item.item_name.toLowerCase().includes(query) ||
      item.technician.toLowerCase().includes(query)

    const matchesType =
      typeFilter.value === 'All' ||
      item.type === typeFilter.value

    const matchesStatus =
      statusFilter.value === 'All' ||
      item.status === statusFilter.value

    return matchesSearch && matchesType && matchesStatus
  })
})

const formatCurrency = value => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(Number(value || 0))
}

const typeColor = type => {
  switch (type) {
    case 'Preventive':
      return 'primary'
    case 'Corrective':
      return 'warning'
    case 'Inspection':
      return 'secondary'
    default:
      return 'default'
  }
}

const statusColor = status => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'In Progress':
      return 'warning'
    case 'Pending':
      return 'error'
    default:
      return 'default'
  }
}

const statusIcon = status => {
  switch (status) {
    case 'Completed':
      return 'mdi-check-circle-outline'
    case 'In Progress':
      return 'mdi-progress-clock'
    case 'Pending':
      return 'mdi-clock-alert-outline'
    default:
      return 'mdi-information-outline'
  }
}

const clearFilters = () => {
  search.value = ''
  typeFilter.value = 'All'
  statusFilter.value = 'All'
}

const openCreateDialog = () => {
  editing.value = false

  formData.value = {
    asset_tag: '',
    type: 'Preventive',
    date: new Date().toISOString().substring(0, 10),
    technician: 'ICT Technician',
    cost: 0,
    status: 'Completed',
    description: '',
    remarks: '',
  }

  dialog.value = true
}

const editRecord = record => {
  editing.value = true

  formData.value = {
    ...record,
  }

  dialog.value = true
}

const viewRecord = record => {
  selectedRecord.value = record
  viewDialog.value = true
}

const deleteRecord = record => {
  selectedRecord.value = record
  deleteDialog.value = true
}

const confirmDelete = () => {
  records.value = records.value.filter(
    item => item.id !== selectedRecord.value.id
  )

  deleteDialog.value = false

  showSnackbar(
    'Maintenance record deleted successfully.',
    'success'
  )

  selectedRecord.value = null
}

const saveRecord = () => {
  if (!formData.value.asset_tag) {
    showSnackbar(
      'Please select an asset.',
      'error'
    )

    return
  }

  if (!formData.value.description) {
    showSnackbar(
      'Please enter a maintenance description.',
      'error'
    )

    return
  }

  if (editing.value) {
    const index = records.value.findIndex(
      item => item.id === formData.value.id
    )

    if (index !== -1) {
      records.value[index] = {
        ...formData.value,
      }
    }

    showSnackbar(
      'Maintenance record updated successfully.',
      'success'
    )
  } else {
    const newRecord = {
      ...formData.value,
      id: Date.now(),
      item_name: formData.value.asset_tag,
    }

    records.value.unshift(newRecord)

    showSnackbar(
      'Maintenance record added successfully.',
      'success'
    )
  }

  dialog.value = false
}

const showSnackbar = (message, color = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}
</script>
```
