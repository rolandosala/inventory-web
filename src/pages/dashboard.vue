```vue
<script setup>
import { computed } from 'vue'

/*
|--------------------------------------------------------------------------
| DUMMY DATA
|--------------------------------------------------------------------------
| Temporary frontend data.
| Later, this can be replaced with Laravel API data.
|--------------------------------------------------------------------------
*/

const stats = {
  total: 245,
  serviceable: 218,
  unserviceable: 12,
  repair: 15,
  inventoryValue: 4850000,
  warrantyExpiring: 7,
}

const categories = [
  { name: 'Desktop Computer', count: 85 },
  { name: 'Laptop', count: 62 },
  { name: 'Printer', count: 35 },
  { name: 'Network Equipment', count: 28 },
  { name: 'Projector', count: 18 },
  { name: 'UPS', count: 17 },
]

const departments = [
  { name: 'ICT Office', count: 35 },
  { name: 'Registrar', count: 28 },
  { name: 'Accounting', count: 24 },
  { name: 'College of Education', count: 21 },
  { name: 'College of Engineering', count: 19 },
  { name: 'Library', count: 17 },
]

const recentAssets = [
  {
    id: 1,
    assetTag: 'ICT-2026-0001',
    item: 'Desktop Computer',
    brand: 'Dell',
    model: 'OptiPlex 7010',
    department: 'ICT Office',
    status: 'Serviceable',
  },
  {
    id: 2,
    assetTag: 'ICT-2026-0002',
    item: 'Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad E14',
    department: 'Registrar',
    status: 'Serviceable',
  },
  {
    id: 3,
    assetTag: 'ICT-2026-0003',
    item: 'Printer',
    brand: 'Epson',
    model: 'L5290',
    department: 'Accounting',
    status: 'Under Repair',
  },
  {
    id: 4,
    assetTag: 'ICT-2026-0004',
    item: 'Projector',
    brand: 'Epson',
    model: 'EB-X06',
    department: 'College of Education',
    status: 'Serviceable',
  },
  {
    id: 5,
    assetTag: 'ICT-2026-0005',
    item: 'Desktop Computer',
    brand: 'HP',
    model: 'ProDesk 400',
    department: 'Library',
    status: 'Unserviceable',
  },
]

const maintenance = [
  {
    id: 1,
    assetTag: 'ICT-2026-0003',
    description: 'Printer paper feed problem',
    date: 'Sep 2, 2026',
    type: 'Repair',
  },
  {
    id: 2,
    assetTag: 'ICT-2026-0015',
    description: 'Desktop RAM replacement',
    date: 'Sep 1, 2026',
    type: 'Repair',
  },
  {
    id: 3,
    assetTag: 'ICT-2026-0021',
    description: 'Laptop OS reinstallation',
    date: 'Aug 30, 2026',
    type: 'Preventive',
  },
  {
    id: 4,
    assetTag: 'ICT-2026-0032',
    description: 'Network switch configuration',
    date: 'Aug 28, 2026',
    type: 'Maintenance',
  },
]

const maxCategoryCount = computed(() => {
  return Math.max(...categories.map(item => item.count))
})

const maxDepartmentCount = computed(() => {
  return Math.max(...departments.map(item => item.count))
})

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
    case 'Unserviceable':
      return 'error'
    case 'Under Repair':
      return 'warning'
    default:
      return 'grey'
  }
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
          Dashboard
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Overview of ICT assets and inventory status
        </p>
      </div>

      <div class="d-flex ga-2 mt-3 mt-md-0">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-qrcode-scan"
          to="/scan"
        >
          Scan Asset
        </v-btn>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          to="/assets/create"
        >
          Add Asset
        </v-btn>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- STAT CARDS -->
    <!-- ========================================================= -->

    <v-row>
      <!-- Total -->
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card
          rounded="lg"
          elevation="1"
          class="stat-card"
        >
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Total Assets
                </div>

                <div class="text-h4 font-weight-bold mt-2">
                  {{ stats.total.toLocaleString() }}
                </div>

                <div class="text-caption text-medium-emphasis mt-2">
                  All registered ICT assets
                </div>
              </div>

              <v-avatar
                color="primary"
                variant="tonal"
                size="50"
              >
                <v-icon
                  icon="mdi-package-variant-closed"
                  size="26"
                />
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Serviceable -->
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card
          rounded="lg"
          elevation="1"
          class="stat-card"
        >
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Serviceable
                </div>

                <div class="text-h4 font-weight-bold mt-2">
                  {{ stats.serviceable.toLocaleString() }}
                </div>

                <div class="text-caption text-success mt-2">
                  {{ Math.round((stats.serviceable / stats.total) * 100) }}%
                  of inventory
                </div>
              </div>

              <v-avatar
                color="success"
                variant="tonal"
                size="50"
              >
                <v-icon
                  icon="mdi-check-circle-outline"
                  size="26"
                />
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Unserviceable -->
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card
          rounded="lg"
          elevation="1"
          class="stat-card"
        >
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Unserviceable
                </div>

                <div class="text-h4 font-weight-bold mt-2">
                  {{ stats.unserviceable.toLocaleString() }}
                </div>

                <div class="text-caption text-error mt-2">
                  Requires attention
                </div>
              </div>

              <v-avatar
                color="error"
                variant="tonal"
                size="50"
              >
                <v-icon
                  icon="mdi-alert-circle-outline"
                  size="26"
                />
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Repair -->
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card
          rounded="lg"
          elevation="1"
          class="stat-card"
        >
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Under Repair
                </div>

                <div class="text-h4 font-weight-bold mt-2">
                  {{ stats.repair.toLocaleString() }}
                </div>

                <div class="text-caption text-warning mt-2">
                  Currently being serviced
                </div>
              </div>

              <v-avatar
                color="warning"
                variant="tonal"
                size="50"
              >
                <v-icon
                  icon="mdi-wrench-outline"
                  size="26"
                />
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ========================================================= -->
    <!-- INVENTORY VALUE + WARRANTY -->
    <!-- ========================================================= -->

    <v-row class="mt-1">

      <v-col
        cols="12"
        md="8"
      >
        <v-card
          rounded="lg"
          elevation="1"
          color="primary"
        >
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between">

              <div>
                <div class="text-body-2 opacity-80">
                  Total Inventory Value
                </div>

                <div class="text-h3 font-weight-bold mt-2">
                  {{ formatCurrency(stats.inventoryValue) }}
                </div>

                <div class="text-body-2 mt-2 opacity-80">
                  Based on recorded acquisition cost
                </div>
              </div>

              <v-icon
                icon="mdi-cash-multiple"
                size="64"
                class="opacity-60 d-none d-sm-block"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          rounded="lg"
          elevation="1"
          height="100%"
        >
          <v-card-text class="pa-6">

            <div class="d-flex align-center">
              <v-avatar
                color="warning"
                variant="tonal"
                size="48"
              >
                <v-icon icon="mdi-calendar-alert-outline" />
              </v-avatar>

              <div class="ml-4">
                <div class="text-body-2 text-medium-emphasis">
                  Warranty Expiring
                </div>

                <div class="text-h4 font-weight-bold">
                  {{ stats.warrantyExpiring }}
                </div>
              </div>
            </div>

            <v-btn
              variant="text"
              color="warning"
              class="px-0 mt-3"
              to="/assets"
            >
              View Assets
              <v-icon
                icon="mdi-arrow-right"
                end
              />
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <!-- ========================================================= -->
    <!-- CATEGORY + DEPARTMENT -->
    <!-- ========================================================= -->

    <v-row class="mt-1">

      <!-- Categories -->
      <v-col
        cols="12"
        lg="6"
      >
        <v-card
          rounded="lg"
          elevation="1"
          height="100%"
        >
          <v-card-title class="pa-5">
            <div>
              <div class="text-h6 font-weight-bold">
                Assets by Category
              </div>

              <div class="text-caption text-medium-emphasis">
                Distribution of ICT equipment
              </div>
            </div>
          </v-card-title>

          <v-card-text class="px-5 pb-5">

            <div
              v-for="category in categories"
              :key="category.name"
              class="mb-4"
            >
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2">
                  {{ category.name }}
                </span>

                <span class="text-body-2 font-weight-bold">
                  {{ category.count }}
                </span>
              </div>

              <v-progress-linear
                :model-value="(category.count / maxCategoryCount) * 100"
                color="primary"
                height="8"
                rounded
              />
            </div>

          </v-card-text>
        </v-card>
      </v-col>

      <!-- Departments -->
      <v-col
        cols="12"
        lg="6"
      >
        <v-card
          rounded="lg"
          elevation="1"
          height="100%"
        >
          <v-card-title class="pa-5">
            <div>
              <div class="text-h6 font-weight-bold">
                Assets by Department
              </div>

              <div class="text-caption text-medium-emphasis">
                Distribution across offices
              </div>
            </div>
          </v-card-title>

          <v-card-text class="px-5 pb-5">

            <div
              v-for="department in departments"
              :key="department.name"
              class="mb-4"
            >
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2">
                  {{ department.name }}
                </span>

                <span class="text-body-2 font-weight-bold">
                  {{ department.count }}
                </span>
              </div>

              <v-progress-linear
                :model-value="(department.count / maxDepartmentCount) * 100"
                color="secondary"
                height="8"
                rounded
              />
            </div>

          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <!-- ========================================================= -->
    <!-- RECENT ASSETS -->
    <!-- ========================================================= -->

    <v-row class="mt-1">

      <v-col
        cols="12"
        lg="8"
      >
        <v-card
          rounded="lg"
          elevation="1"
        >

          <v-card-title class="d-flex align-center pa-5">

            <div>
              <div class="text-h6 font-weight-bold">
                Recently Added Assets
              </div>

              <div class="text-caption text-medium-emphasis">
                Latest equipment registered in the system
              </div>
            </div>

            <v-spacer />

            <v-btn
              variant="text"
              color="primary"
              to="/assets"
            >
              View All
            </v-btn>

          </v-card-title>

          <v-divider />

          <v-table hover>
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Item</th>
                <th class="d-none d-md-table-cell">
                  Brand / Model
                </th>
                <th class="d-none d-lg-table-cell">
                  Department
                </th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="asset in recentAssets"
                :key="asset.id"
              >
                <td>
                  <span class="font-weight-medium">
                    {{ asset.assetTag }}
                  </span>
                </td>

                <td>
                  {{ asset.item }}
                </td>

                <td class="d-none d-md-table-cell">
                  {{ asset.brand }} {{ asset.model }}
                </td>

                <td class="d-none d-lg-table-cell">
                  {{ asset.department }}
                </td>

                <td>
                  <v-chip
                    :color="statusColor(asset.status)"
                    size="small"
                    variant="tonal"
                  >
                    {{ asset.status }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>

        </v-card>
      </v-col>

      <!-- ======================================================= -->
      <!-- MAINTENANCE -->
      <!-- ======================================================= -->

      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          rounded="lg"
          elevation="1"
          height="100%"
        >

          <v-card-title class="pa-5">
            <div>
              <div class="text-h6 font-weight-bold">
                Recent Maintenance
              </div>

              <div class="text-caption text-medium-emphasis">
                Latest maintenance activities
              </div>
            </div>
          </v-card-title>

          <v-divider />

          <v-list lines="two">

            <v-list-item
              v-for="item in maintenance"
              :key="item.id"
              class="py-3"
            >

              <template #prepend>

                <v-avatar
                  color="warning"
                  variant="tonal"
                  size="42"
                >
                  <v-icon icon="mdi-wrench-outline" />
                </v-avatar>

              </template>

              <v-list-item-title class="font-weight-medium">
                {{ item.assetTag }}
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ item.description }}
              </v-list-item-subtitle>

              <template #append>
                <div class="text-caption text-medium-emphasis">
                  {{ item.date }}
                </div>
              </template>

            </v-list-item>

          </v-list>

          <v-card-actions class="pa-4">
            <v-btn
              block
              variant="tonal"
              color="primary"
              to="/maintenance"
            >
              View Maintenance
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<style scoped>
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}
</style>
```
