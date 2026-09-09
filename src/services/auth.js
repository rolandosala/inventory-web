import api from '@/api/axios'

export async function getCurrentUser() {
  const response = await api.get('/user')

  localStorage.setItem('user', JSON.stringify(response.data))

  return response.data
}

export async function logout() {
  try {
    await api.post('/logout')
  } finally {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }
}

export function getStoredUser() {
  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) : null
}

export function isAuthenticated() {
  return !!localStorage.getItem('authToken')
}