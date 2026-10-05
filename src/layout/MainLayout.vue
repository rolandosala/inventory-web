<template>
    <v-app>

        <!-- SIDEBAR -->
        <v-navigation-drawer
            v-model="drawer"
            :width="270"
            elevation="1"
        >
            <!-- Logo / Brand -->
            <div class="pa-5">
                <div class="d-flex align-center">

                    <v-avatar
                        color="primary"
                        size="44"
                        rounded="lg"
                    >
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

                <v-list-item
                    v-for="item in visibleMenuItems"
                    :key="item.title"
                    :to="{ name: item.to }"
                    :prepend-icon="item.icon"
                    :title="item.title"
                    rounded="lg"
                    class="mb-1"
                />

                <v-list-subheader class="mt-4">
                    SYSTEM
                </v-list-subheader>

                <v-list-item
                    v-for="item in visibleSystemItems"
                    :key="item.title"
                    :to="{ name: item.to }"
                    :prepend-icon="item.icon"
                    :title="item.title"
                    rounded="lg"
                    class="mb-1"
                />

            </v-list>

            <!-- User -->
            <template #append>

                <v-divider />

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
                            {{ userName }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            {{ userRole }}
                        </v-list-item-subtitle>

                    </v-list-item>

                </div>

            </template>

        </v-navigation-drawer>


        <!-- TOP BAR -->
        <v-app-bar elevation="1" height="70">

            <v-app-bar-nav-icon
                @click="drawer = !drawer"
            />

            <v-toolbar-title class="font-weight-medium">
                ICT Inventory
            </v-toolbar-title>

            <v-spacer />

            <v-text-field
                class="mr-3"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search assets..."
                variant="solo-filled"
                density="compact"
                hide-details
                single-line
                style="max-width: 280px"
            />

            <!-- User Menu -->
            <v-menu>

                <template #activator="{ props }">

                    <v-btn
                        v-bind="props"
                        variant="text"
                        class="ml-1"
                    >

                        <v-avatar color="primary" size="36">
                            <span class="text-caption font-weight-bold">
                                IK
                            </span>
                        </v-avatar>

                        <span class="ml-2 d-none d-md-block">
                            {{ userName }}
                        </span>

                        <v-icon
                            icon="mdi-chevron-down"
                            class="ml-1"
                        />

                    </v-btn>

                </template>

                <v-list min-width="200">

                    <v-list-item
                        prepend-icon="mdi-account-outline"
                        title="My Profile"
                        to="/profile"
                    />

                    <v-list-item
                        prepend-icon="mdi-cog-outline"
                        title="Settings"
                        to="/settings"
                    />

                    <v-divider class="my-2" />

                    <v-list-item
                        prepend-icon="mdi-logout"
                        title="Logout"
                        @click="handleLogout"
                    />

                </v-list>

            </v-menu>

        </v-app-bar>


        <!-- PAGE CONTENT -->
        <v-main class="main-content">
            <router-view />
        </v-main>

    </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)

// your existing user/menu logic
// const userName = ...
// const userRole = ...
// const visibleMenuItems = ...
// const visibleSystemItems = ...
// const handleLogout = ...
</script>

<style scoped>
.main-content {
    height: calc(100vh - 70px);
    overflow-y: auto;
}
</style>