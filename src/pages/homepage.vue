<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const menuItems = [
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/',
    },
    {
        title: 'Assets',
        icon: 'mdi-laptop',
        to: '/assets',
    },
    {
        title: 'Maintenance',
        icon: 'mdi-wrench-outline',
        to: '/maintenance',
    },
    {
        title: 'Categories',
        icon: 'mdi-shape-outline',
        to: '/categories',
    },
    {
        title: 'Departments',
        icon: 'mdi-office-building-outline',
        to: '/departments',
    },
    {
        title: 'Locations',
        icon: 'mdi-map-marker-outline',
        to: '/locations',
    },
    {
        title: 'Suppliers',
        icon: 'mdi-truck-outline',
        to: '/suppliers',
    },
]

const systemItems = [
    {
        title: 'Software',
        icon: 'mdi-application-cog-outline',
        to: '/software',
    },
    {
        title: 'Reports',
        icon: 'mdi-file-chart-outline',
        to: '/reports',
    },
    {
        title: 'Users',
        icon: 'mdi-account-group-outline',
        to: '/users',
    },
    {
        title: 'Settings',
        icon: 'mdi-cog-outline',
        to: '/settings',
    },
]
</script>

<template>
    <v-app>

        <!-- SIDEBAR -->
        <v-navigation-drawer v-model="drawer" :width="270" elevation="1">
            <!-- Logo / Brand -->
            <div class="pa-5">
                <div class="d-flex align-center">

                    <v-avatar color="primary" size="44" rounded="lg">
                        <v-icon icon="mdi-server" size="26" />
                    </v-avatar>

                    <div class="ml-3">
                        <div class="text-subtitle-1 font-weight-bold">
                            ICT Inventory
                        </div>

                        <div class="text-caption text-medium-emphasis">
                            Asset Management System
                        </div>
                    </div>

                </div>
            </div>

            <v-divider />

            <!-- Navigation -->
            <v-list nav class="pa-3">

                <v-list-subheader>
                    MAIN
                </v-list-subheader>

                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to" :prepend-icon="item.icon"
                    :title="item.title" rounded="lg" class="mb-1" />

                <v-list-subheader class="mt-4">
                    SYSTEM
                </v-list-subheader>

                <v-list-item v-for="item in systemItems" :key="item.title" :to="item.to" :prepend-icon="item.icon"
                    :title="item.title" rounded="lg" class="mb-1" />

            </v-list>

            <template #append>

                <v-divider />

                <!-- User -->
                <div class="pa-4">

                    <v-list-item rounded="lg" class="px-2">
                        <template #prepend>
                            <v-avatar color="primary" size="40">
                                <span class="text-body-2 font-weight-bold">
                                    IK
                                </span>
                            </v-avatar>
                        </template>

                        <v-list-item-title class="font-weight-medium">
                            ICT Technician
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            Administrator
                        </v-list-item-subtitle>

                        <template #append>
                            <v-btn icon="mdi-dots-vertical" variant="text" size="small" />
                        </template>

                    </v-list-item>

                </div>

            </template>
        </v-navigation-drawer>

        <!-- TOP BAR -->
        <v-app-bar elevation="1" height="70">

            <v-app-bar-nav-icon @click="drawer = !drawer" />

            <v-toolbar-title class="font-weight-medium">
                ICT Inventory
            </v-toolbar-title>

            <v-spacer />

            <!-- Search -->
            <v-text-field class="mr-3 d-none d-md-flex" prepend-inner-icon="mdi-magnify" placeholder="Search assets..."
                variant="solo-filled" density="compact" hide-details single-line style="max-width: 280px" />

            <!-- Notifications -->
            <v-btn icon variant="text" class="mr-1">
                <v-badge color="error" content="3" floating>
                    <v-icon icon="mdi-bell-outline" />
                </v-badge>
            </v-btn>

            <!-- User Menu -->
            <v-menu>
                <template #activator="{ props }">

                    <v-btn v-bind="props" variant="text" class="ml-1">
                        <v-avatar color="primary" size="36">
                            <span class="text-caption font-weight-bold">
                                IK
                            </span>
                        </v-avatar>

                        <span class="ml-2 d-none d-md-block">
                            ICT Technician
                        </span>

                        <v-icon icon="mdi-chevron-down" class="ml-1" />
                    </v-btn>

                </template>

                <v-list min-width="200">

                    <v-list-item prepend-icon="mdi-account-outline" title="My Profile" to="/profile" />

                    <v-list-item prepend-icon="mdi-cog-outline" title="Settings" to="/settings" />

                    <v-divider class="my-2" />

                    <v-list-item prepend-icon="mdi-logout" title="Logout" />

                </v-list>
            </v-menu>

        </v-app-bar>

        <!-- MAIN CONTENT -->
        <v-main>
            <v-container fluid class="pa-0">
                <router-view />
            </v-container>
        </v-main>

    </v-app>
</template>