/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Homepage from '@/pages/homepage.vue'
import Dashboard from '@/pages/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Homepage,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },

        {
          path: 'assets',
          name: 'assets',
          component: () => import('@/pages/assetlist.vue'),
        },
        {
          path: 'create',
          name: 'assets-create',
          component: () => import('@/pages/assetcreate.vue'),
        },
        {
          path: ':id',
          name: 'assets-view',
          component: () => import('@/pages/assetview.vue'),
        },

        {
          path: 'maintenance',
          name: 'maintenance',
          component: () => import('@/pages/maintenance.vue'),
        },

        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/pages/categories.vue'),
        },

        {
          path: 'departments',
          name: 'departments',
          component: () => import('@/pages/departments.vue'),
        },

        {
          path: 'locations',
          name: 'locations',
          component: () => import('@/pages/locations.vue'),
        },

        {
          path: 'suppliers',
          name: 'suppliers',
          component: () => import('@/pages/suppliers.vue'),
        },

        {
          path: 'software',
          name: 'software',
          component: () => import('@/pages/softwares.vue'),
        },

        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/pages/reports.vue'),
        },

        {
          path: 'users',
          name: 'users',
          component: () => import('@/pages/users.vue'),
        },

        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/pages/settings.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/pages/profile.vue'),
        },
      ]
    },

  ],
})

export default router
