import router from '@/router'
import api from '@/api/axios'

const TIMEOUT = 30 *  60 * 1000 // 30 minutes

let timeoutId = null


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
        router.push({
            path: '/login',
            query: { sessionExpired: 'true' }
        })
    }
}

/* function logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')

    router.push({
        path: '/login',
        query: { sessionExpired: 'true' }
    })
} */

function resetTimer() {
    if (!localStorage.getItem('authToken')) {
        return
    }

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
        logout()
    }, TIMEOUT)
}

export function startSessionTimeout() {
    const events = [
        'mousemove',
        'mousedown',
        'keydown',
        'scroll',
        'touchstart',
        'click'
    ]

    events.forEach(event => {
        window.addEventListener(event, resetTimer)
    })

    resetTimer()
}

export function stopSessionTimeout() {
    clearTimeout(timeoutId)

    const events = [
        'mousemove',
        'mousedown',
        'keydown',
        'scroll',
        'touchstart',
        'click'
    ]

    events.forEach(event => {
        window.removeEventListener(event, resetTimer)
    })
}