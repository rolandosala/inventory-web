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
import Login from '@/pages/login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
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
          path: 'assets/:id', 
          name: 'assets-view',
          component: () => import('@/pages/assetview.vue'),
        },
        {
          path: 'assets/:id/edit',
          name: 'assets-edit',
          component: () => import('@/pages/assetedit.vue'),
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
          meta: {
            permission: 'users.view',
          },
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

router.beforeEach((to) => {
  const token = localStorage.getItem('authToken')
  const auth = useAuthStore()

  if (to.name !== 'login' && !token) {
    return { name: 'login' }
  }

  if (to.name === 'login' && token) {
    if (to.meta.permission) {
      if (!auth.hasPermission(to.meta.permission as string)) {
        return { name: 'dashboard' }
      }
    }
    /* return { name: 'dashboard' } */
  }

  return true
})
/* router.beforeEach((to) => {
const token = localStorage.getItem('authToken')
  const auth = useAuthStore()

  if (to.meta.permission) {
    if (!auth.hasPermission(to.meta.permission as string)) {
      return { name: 'dashboard' }
    }
  }

  return true
}) */
export default router
