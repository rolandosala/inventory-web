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
        /*
        {
          path: 'maintenance',
          name: 'maintenance',
          component: () => import('@/views/Maintenance.vue'),
        },

        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/Categories.vue'),
        },

        {
          path: 'departments',
          name: 'departments',
          component: () => import('@/views/Departments.vue'),
        },

        {
          path: 'locations',
          name: 'locations',
          component: () => import('@/views/Locations.vue'),
        },

        {
          path: 'suppliers',
          name: 'suppliers',
          component: () => import('@/views/Suppliers.vue'),
        },

        {
          path: 'software',
          name: 'software',
          component: () => import('@/views/Software.vue'),
        },

        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/views/Reports.vue'),
        },

        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/Users.vue'),
        },

        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/Settings.vue'),
        }, */
      ]
    },

  ],
})

export default router
