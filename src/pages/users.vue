<template>
    <v-container fluid class="pa-6">
        <!-- Header -->
        <div class="d-flex flex-wrap align-center justify-space-between mb-6">
            <div>
                <div class="text-h4 font-weight-bold">
                    Users
                </div>
                <div class="text-body-2 text-medium-emphasis mt-1">
                    Manage system users, roles, and access
                </div>
            </div>

            <v-btn color="primary" prepend-icon="mdi-account-plus-outline" class="mt-3 mt-sm-0" @click="openAddDialog">
                Add User
            </v-btn>
        </div>

        <!-- Summary Cards -->
        <v-row class="mb-2">
            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="primary" variant="tonal" size="48">
                            <v-icon>mdi-account-group-outline</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Total Users
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ summary.total }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="success" variant="tonal" size="48">
                            <v-icon>mdi-account-check-outline</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Active Users
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ summary.active }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="warning" variant="tonal" size="48">
                            <v-icon>mdi-account-clock-outline</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Inactive
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ summary.inactive }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-text class="d-flex align-center">
                        <v-avatar color="info" variant="tonal" size="48">
                            <v-icon>mdi-shield-account-outline</v-icon>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-caption text-medium-emphasis">
                                Roles
                            </div>
                            <div class="text-h5 font-weight-bold">
                                {{ roles.length }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>

        <!-- Main Content -->
        <v-row>
            <!-- Role Overview -->
            <v-col cols="12" md="3">
                <v-card rounded="lg" border elevation="0">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Roles
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                            Filter users by role
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-list class="py-2">
                        <v-list-item :active="selectedRole === null" rounded="lg" class="mx-2 my-1"
                            @click="selectedRole = null">
                            <template #prepend>
                                <v-avatar color="primary" variant="tonal" size="38">
                                    <v-icon>mdi-account-group-outline</v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                All Users
                            </v-list-item-title>

                            <template #append>
                                <v-chip size="small" variant="tonal">
                                    {{ users.length }}
                                </v-chip>
                            </template>
                        </v-list-item>

                        <v-list-item v-for="role in roles" :key="role.name" :active="selectedRole === role.name"
                            rounded="lg" class="mx-2 my-1" @click="selectedRole = role.name">
                            <template #prepend>
                                <v-avatar :color="role.color" variant="tonal" size="38">
                                    <v-icon>{{ role.icon }}</v-icon>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                {{ role.name }}
                            </v-list-item-title>

                            <template #append>
                                <v-chip size="small" variant="tonal">
                                    {{ role.user_count }}
                                </v-chip>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>

                <!-- Access Overview -->
                <v-card rounded="lg" border elevation="0" class="mt-5">
                    <v-card-title class="pa-5">
                        <div class="text-h6 font-weight-bold">
                            Access Overview
                        </div>
                    </v-card-title>

                    <v-divider />

                    <v-card-text>
                        <div v-for="role in roles" :key="role.name" class="mb-4">
                            <div class="d-flex justify-space-between mb-1">
                                <span class="text-body-2">
                                    {{ role.name }}
                                </span>

                                <span class="text-caption text-medium-emphasis">
                                    {{ role.user_count }} users
                                </span>
                            </div>

                            <v-progress-linear :model-value="rolePercentage(role.user_count)" :color="role.color"
                                rounded height="6" />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Users -->
            <v-col cols="12" md="9">
                <v-card rounded="lg" border elevation="0">
                    <!-- Search -->
                    <v-card-text class="pa-5">
                        <v-row>
                            <v-col cols="12" md="7">
                                <v-text-field v-model="search" label="Search users"
                                    placeholder="Search by name or email..." prepend-inner-icon="mdi-magnify"
                                    variant="outlined" density="comfortable" clearable hide-details />
                            </v-col>

                            <v-col cols="12" md="5">
                                <v-select v-model="statusFilter" label="Account Status"
                                    :items="['All', 'Active', 'Inactive']" variant="outlined" density="comfortable"
                                    hide-details />
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider />

                    <v-data-table :headers="headers" :items="filteredUsers" :items-per-page="10" hover>
                        <!-- User -->
                        <template #item.user="{ item }">
                            <div class="d-flex align-center py-2">
                                <v-avatar :color="avatarColor(item.name)" size="40">
                                    <span class="text-white font-weight-bold">
                                        {{ initials(item.name) }}
                                    </span>
                                </v-avatar>

                                <div class="ml-3">
                                    <div class="font-weight-medium">
                                        {{ item.name }}
                                    </div>

                                    <div class="text-caption text-medium-emphasis">
                                        {{ item.email }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Role -->
                        <template #item.role="{ item }">
                            <v-chip size="small" :color="roleColor(item.role)" variant="tonal">
                                <v-icon start size="16">
                                    {{ roleIcon(item.role) }}
                                </v-icon>

                                {{ item.role }}
                            </v-chip>
                        </template>

                        <!-- Status -->
                        <template #item.status="{ item }">
                            <v-chip size="small" :color="item.status === 'Active' ? 'success' : 'grey'" variant="tonal">
                                <v-icon start size="14">
                                    {{
                                        item.status === 'Active'
                                            ? 'mdi-check-circle'
                                            : 'mdi-close-circle-outline'
                                    }}
                                </v-icon>

                                {{ item.status }}
                            </v-chip>
                        </template>

                        <!-- Last Login -->
                        <template #item.last_login="{ item }">
                            <div class="text-body-2">
                                {{ item.last_login }}
                            </div>
                        </template>

                        <!-- Actions -->
                        <template #item.actions="{ item }">
                            <div class="d-flex">
                                <v-btn icon="mdi-eye-outline" variant="text" size="small" color="primary"
                                    @click="viewUser(item)">
                                    <v-icon>mdi-eye-outline</v-icon>

                                    <v-tooltip activator="parent">
                                        View User
                                    </v-tooltip>
                                </v-btn>

                                <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="warning"
                                    @click="editUser(item)">
                                    <v-icon>mdi-pencil-outline</v-icon>

                                    <v-tooltip activator="parent">
                                        Edit User
                                    </v-tooltip>
                                </v-btn>

                                <v-btn icon="mdi-shield-key-outline" variant="text" size="small" color="info"
                                    @click="managePermissions(item)">
                                    <v-icon>mdi-shield-key-outline</v-icon>

                                    <v-tooltip activator="parent">
                                        Permissions
                                    </v-tooltip>
                                </v-btn>

                                <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error"
                                    @click="confirmDelete(item)">
                                    <v-icon>mdi-delete-outline</v-icon>

                                    <v-tooltip activator="parent">
                                        Delete User
                                    </v-tooltip>
                                </v-btn>
                            </div>
                        </template>

                        <template #no-data>
                            <div class="py-10 text-center">
                                <v-icon size="48" color="grey" class="mb-3">
                                    mdi-account-search-outline
                                </v-icon>

                                <div class="text-h6">
                                    No users found
                                </div>

                                <div class="text-body-2 text-medium-emphasis">
                                    Try changing your search or filters.
                                </div>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <!-- Add / Edit Dialog -->
        <v-dialog v-model="formDialog" max-width="650">
            <v-card rounded="lg">
                <v-card-title class="pa-5">
                    <div class="text-h6 font-weight-bold">
                        {{ editingUser ? 'Edit User' : 'Add User' }}
                    </div>

                    <div class="text-caption text-medium-emphasis mt-1">
                        {{
                            editingUser
                                ? 'Update user account information'
                                : 'Create a new system user'
                        }}
                    </div>
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.name" label="Full Name"
                                prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field v-model="formData.email" label="Email Address" type="email"
                                prepend-inner-icon="mdi-email-outline" variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select v-model="formData.role" label="Role" :items="roleNames"
                                prepend-inner-icon="mdi-shield-account-outline" variant="outlined"
                                density="comfortable" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select v-model="formData.status" label="Account Status" :items="['Active', 'Inactive']"
                                prepend-inner-icon="mdi-account-check-outline" variant="outlined"
                                density="comfortable" />
                        </v-col>

                        <v-col v-if="!editingUser" cols="12" md="6">
                            <v-text-field v-model="formData.password" label="Password" type="password"
                                prepend-inner-icon="mdi-lock-outline" variant="outlined" density="comfortable" />
                        </v-col>

                        <v-col v-if="!editingUser" cols="12" md="6">
                            <v-text-field v-model="formData.password_confirmation" label="Confirm Password"
                                type="password" prepend-inner-icon="mdi-lock-check-outline" variant="outlined"
                                density="comfortable" />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-4">
                    <v-spacer />

                    <v-btn variant="text" @click="formDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="saveUser">
                        Save User
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View User Dialog -->
        <v-dialog v-model="viewDialog" max-width="600">
            <v-card v-if="selectedUser" rounded="lg">
                <v-card-title class="pa-5">
                    User Details
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <div class="d-flex align-center mb-6">
                        <v-avatar :color="avatarColor(selectedUser.name)" size="64">
                            <span class="text-h6 text-white font-weight-bold">
                                {{ initials(selectedUser.name) }}
                            </span>
                        </v-avatar>

                        <div class="ml-4">
                            <div class="text-h6 font-weight-bold">
                                {{ selectedUser.name }}
                            </div>

                            <div class="text-body-2 text-medium-emphasis">
                                {{ selectedUser.email }}
                            </div>
                        </div>
                    </div>

                    <v-list lines="two">
                        <v-list-item>
                            <template #prepend>
                                <v-icon>mdi-shield-account-outline</v-icon>
                            </template>

                            <v-list-item-title>
                                Role
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ selectedUser.role }}
                            </v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template #prepend>
                                <v-icon>mdi-account-check-outline</v-icon>
                            </template>

                            <v-list-item-title>
                                Status
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ selectedUser.status }}
                            </v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template #prepend>
                                <v-icon>mdi-login</v-icon>
                            </template>

                            <v-list-item-title>
                                Last Login
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ selectedUser.last_login }}
                            </v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                            <template #prepend>
                                <v-icon>mdi-calendar-plus-outline</v-icon>
                            </template>

                            <v-list-item-title>
                                Created
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                {{ selectedUser.created_at }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-4">
                    <v-spacer />

                    <v-btn variant="text" @click="viewDialog = false">
                        Close
                    </v-btn>

                    <v-btn color="primary" @click="editUser(selectedUser)">
                        Edit User
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Permissions Dialog -->
        <v-dialog v-model="permissionsDialog" max-width="750">
            <v-card v-if="selectedUser" rounded="lg">
                <v-card-title class="pa-5">
                    <div class="text-h6 font-weight-bold">
                        Manage Permissions
                    </div>

                    <div class="text-caption text-medium-emphasis mt-1">
                        {{ selectedUser.name }} · {{ selectedUser.role }}
                    </div>
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-5">
                    <v-alert type="info" variant="tonal" class="mb-5">
                        Permissions are currently displayed as a frontend
                        preview. They can be connected to Laravel RBAC later.
                    </v-alert>

                    <v-row>
                        <v-col v-for="module in permissionModules" :key="module.name" cols="12" sm="6">
                            <v-card border rounded="lg" variant="flat">
                                <v-card-title class="text-subtitle-1">
                                    <v-icon :color="module.color" class="mr-2">
                                        {{ module.icon }}
                                    </v-icon>

                                    {{ module.name }}
                                </v-card-title>

                                <v-card-text>
                                    <v-checkbox v-for="permission in module.permissions" :key="permission"
                                        v-model="selectedPermissions" :label="permission" :value="permission"
                                        density="compact" hide-details />
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider />

                <v-card-actions class="pa-4">
                    <v-spacer />

                    <v-btn variant="text" @click="permissionsDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="primary" prepend-icon="mdi-content-save-outline" @click="savePermissions">
                        Save Permissions
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="450">
            <v-card rounded="lg">
                <v-card-title class="pa-5">
                    Delete User
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete
                    <strong>{{ selectedUser?.name }}</strong>?
                    <br />
                    <span class="text-medium-emphasis">
                        This action is only simulated for now.
                    </span>
                </v-card-text>

                <v-card-actions class="pa-4">
                    <v-spacer />

                    <v-btn variant="text" @click="deleteDialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="error" prepend-icon="mdi-delete-outline" @click="deleteUser">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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

const search = ref('')
const selectedRole = ref(null)
const statusFilter = ref('All')

const formDialog = ref(false)
const viewDialog = ref(false)
const permissionsDialog = ref(false)
const deleteDialog = ref(false)

const editingUser = ref(null)
const selectedUser = ref(null)

const selectedPermissions = ref([])

const snackbar = reactive({
    show: false,
    message: '',
})

const summary = {
    total: 12,
    active: 10,
    inactive: 2,
}

const roles = [
    {
        name: 'Administrator',
        user_count: 2,
        color: 'error',
        icon: 'mdi-shield-crown-outline',
    },
    {
        name: 'ICT Technician',
        user_count: 3,
        color: 'primary',
        icon: 'mdi-tools',
    },
    {
        name: 'Custodian',
        user_count: 2,
        color: 'warning',
        icon: 'mdi-clipboard-account-outline',
    },
    {
        name: 'Department User',
        user_count: 4,
        color: 'info',
        icon: 'mdi-account-outline',
    },
    {
        name: 'Viewer',
        user_count: 1,
        color: 'grey',
        icon: 'mdi-eye-outline',
    },
]

const roleNames = roles.map(role => role.name)

const users = ref([
    {
        id: 1,
        name: 'ICT Administrator',
        email: 'ictadmin@slsu.edu.ph',
        role: 'Administrator',
        status: 'Active',
        last_login: 'Today, 8:42 AM',
        created_at: 'January 10, 2026',
    },
    {
        id: 2,
        name: 'ICT Technician',
        email: 'icttechnician@slsu.edu.ph',
        role: 'ICT Technician',
        status: 'Active',
        last_login: 'Today, 9:15 AM',
        created_at: 'January 12, 2026',
    },
    {
        id: 3,
        name: 'Network Administrator',
        email: 'networkadmin@slsu.edu.ph',
        role: 'ICT Technician',
        status: 'Active',
        last_login: 'Yesterday, 4:20 PM',
        created_at: 'January 15, 2026',
    },
    {
        id: 4,
        name: 'Property Custodian',
        email: 'custodian@slsu.edu.ph',
        role: 'Custodian',
        status: 'Active',
        last_login: 'Today, 8:10 AM',
        created_at: 'February 2, 2026',
    },
    {
        id: 5,
        name: 'Assistant Custodian',
        email: 'assistant.custodian@slsu.edu.ph',
        role: 'Custodian',
        status: 'Active',
        last_login: 'Yesterday, 3:45 PM',
        created_at: 'February 8, 2026',
    },
    {
        id: 6,
        name: 'Registrar Office',
        email: 'registrar@slsu.edu.ph',
        role: 'Department User',
        status: 'Active',
        last_login: 'Today, 7:55 AM',
        created_at: 'March 1, 2026',
    },
    {
        id: 7,
        name: 'Accounting Office',
        email: 'accounting@slsu.edu.ph',
        role: 'Department User',
        status: 'Active',
        last_login: 'Today, 8:30 AM',
        created_at: 'March 5, 2026',
    },
    {
        id: 8,
        name: 'Engineering Department',
        email: 'engineering@slsu.edu.ph',
        role: 'Department User',
        status: 'Active',
        last_login: 'Yesterday, 2:15 PM',
        created_at: 'March 12, 2026',
    },
    {
        id: 9,
        name: 'College of Education',
        email: 'education@slsu.edu.ph',
        role: 'Department User',
        status: 'Active',
        last_login: 'September 1, 2026',
        created_at: 'March 18, 2026',
    },
    {
        id: 10,
        name: 'Library User',
        email: 'library@slsu.edu.ph',
        role: 'Department User',
        status: 'Inactive',
        last_login: 'July 15, 2026',
        created_at: 'April 1, 2026',
    },
    {
        id: 11,
        name: 'Inventory Viewer',
        email: 'inventory.viewer@slsu.edu.ph',
        role: 'Viewer',
        status: 'Active',
        last_login: 'August 30, 2026',
        created_at: 'April 10, 2026',
    },
    {
        id: 12,
        name: 'Former ICT Staff',
        email: 'former.ict@slsu.edu.ph',
        role: 'ICT Technician',
        status: 'Inactive',
        last_login: 'June 20, 2026',
        created_at: 'January 20, 2026',
    },
])

const headers = [
    {
        title: 'User',
        key: 'user',
        sortable: true,
    },
    {
        title: 'Role',
        key: 'role',
        sortable: true,
    },
    {
        title: 'Status',
        key: 'status',
        sortable: true,
    },
    {
        title: 'Last Login',
        key: 'last_login',
        sortable: true,
    },
    {
        title: 'Actions',
        key: 'actions',
        sortable: false,
        align: 'end',
    },
]

const formData = reactive({
    name: '',
    email: '',
    role: 'Department User',
    status: 'Active',
    password: '',
    password_confirmation: '',
})

const permissionModules = [
    {
        name: 'Assets',
        icon: 'mdi-package-variant-closed',
        color: 'primary',
        permissions: [
            'assets.view',
            'assets.create',
            'assets.update',
            'assets.delete',
        ],
    },
    {
        name: 'Maintenance',
        icon: 'mdi-tools',
        color: 'warning',
        permissions: [
            'maintenance.view',
            'maintenance.create',
            'maintenance.update',
            'maintenance.delete',
        ],
    },
    {
        name: 'Inventory Setup',
        icon: 'mdi-cog-outline',
        color: 'info',
        permissions: [
            'categories.manage',
            'departments.manage',
            'locations.manage',
            'suppliers.manage',
        ],
    },
    {
        name: 'Reports',
        icon: 'mdi-file-chart-outline',
        color: 'success',
        permissions: [
            'reports.view',
            'reports.generate',
            'reports.export',
        ],
    },
    {
        name: 'Software',
        icon: 'mdi-application-outline',
        color: 'purple',
        permissions: [
            'software.view',
            'software.create',
            'software.update',
            'software.delete',
        ],
    },
    {
        name: 'Users',
        icon: 'mdi-account-group-outline',
        color: 'error',
        permissions: [
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
        ],
    },
]

const filteredUsers = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    return users.value.filter(user => {
        const matchesSearch =
            !keyword ||
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword)

        const matchesRole =
            !selectedRole.value ||
            user.role === selectedRole.value

        const matchesStatus =
            statusFilter.value === 'All' ||
            user.status === statusFilter.value

        return matchesSearch && matchesRole && matchesStatus
    })
})

function initials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
}

function avatarColor(name) {
    const colors = [
        'primary',
        'success',
        'info',
        'warning',
        'purple',
        'teal',
    ]

    const index =
        name
            .split('')
            .reduce((total, char) => total + char.charCodeAt(0), 0) %
        colors.length

    return colors[index]
}

function roleColor(role) {
    const found = roles.find(item => item.name === role)
    return found?.color || 'grey'
}

function roleIcon(role) {
    const found = roles.find(item => item.name === role)
    return found?.icon || 'mdi-account-outline'
}

function rolePercentage(count) {
    const total = users.value.length || 1
    return (count / total) * 100
}

function resetForm() {
    formData.name = ''
    formData.email = ''
    formData.role = 'Department User'
    formData.status = 'Active'
    formData.password = ''
    formData.password_confirmation = ''
}

function openAddDialog() {
    editingUser.value = null
    resetForm()
    formDialog.value = true
}

function editUser(user) {
    editingUser.value = user

    formData.name = user.name
    formData.email = user.email
    formData.role = user.role
    formData.status = user.status
    formData.password = ''
    formData.password_confirmation = ''

    viewDialog.value = false
    formDialog.value = true
}

function saveUser() {
    if (!formData.name || !formData.email) {
        snackbar.message = 'Please enter the user name and email.'
        snackbar.show = true
        return
    }

    if (editingUser.value) {
        editingUser.value.name = formData.name
        editingUser.value.email = formData.email
        editingUser.value.role = formData.role
        editingUser.value.status = formData.status

        snackbar.message = 'User updated successfully.'
    } else {
        users.value.push({
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            last_login: 'Never',
            created_at: 'Today',
        })

        snackbar.message = 'User created successfully.'
    }

    formDialog.value = false
    snackbar.show = true
}

function viewUser(user) {
    selectedUser.value = user
    viewDialog.value = true
}

function managePermissions(user) {
    selectedUser.value = user

    selectedPermissions.value = [
        'assets.view',
        'maintenance.view',
        'reports.view',
    ]

    permissionsDialog.value = true
}

function savePermissions() {
    permissionsDialog.value = false

    snackbar.message =
        'Permissions saved successfully. Backend integration will be added later.'

    snackbar.show = true
}

function confirmDelete(user) {
    selectedUser.value = user
    deleteDialog.value = true
}

function deleteUser() {
    if (!selectedUser.value) return

    users.value = users.value.filter(
        user => user.id !== selectedUser.value.id,
    )

    deleteDialog.value = false

    snackbar.message = 'User deleted successfully.'
    snackbar.show = true

    selectedUser.value = null
}
</script>

<style scoped>
.v-list-item {
    transition: background-color 0.15s ease;
}
</style>