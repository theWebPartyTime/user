// import { useUserStore } from '../stores/userStore'

const API_URL = 'http://89.111.175.253:8080'

// async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   const userStore = useUserStore()
  
//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//     ...(options.headers 
//       ? (Array.isArray(options.headers)
//           ? Object.fromEntries(options.headers.filter(([k, v]) => 
//               typeof k === 'string' && typeof v === 'string'))
//           : options.headers instanceof Headers
//             ? Object.fromEntries(options.headers.entries())
//             : (typeof options.headers === 'object' 
//                 ? options.headers 
//                 : {}))
//       : {})
//   };
  
//   if (userStore.accessToken) {
//     headers['Authorization'] = `Bearer ${userStore.accessToken}`
//   }
  
//   let response = await fetch(`${API_URL}${url}`, {
//     ...options,
//     headers,
//   })
  
//   if (response.status === 401 && userStore.refreshToken) {
//     try {
//       const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refresh_token: userStore.refreshToken }),
//       })
      
//       if (refreshResponse.ok) {
//         const { access_token } = await refreshResponse.json()
        
//         userStore.accessToken = access_token
//         userStore.saveToLocalStorage()
        
//         headers['Authorization'] = `Bearer ${access_token}`
//         response = await fetch(`${API_URL}${url}`, {
//           ...options,
//           headers,
//         })
//       } else {
//         userStore.logout()
//         window.location.href = '/login'
//         throw new Error('Сессия истекла')
//       }
//     } catch (error) {
//       userStore.logout()
//       window.location.href = '/login'
//       throw new Error('Ошибка обновления токена')
//     }
//   } else if (response.status === 401) {
//     userStore.logout()
//     window.location.href = '/login'
//     throw new Error('Требуется авторизация')
//   }
  
//   return response
// }

export const authApi = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      throw new Error('Неверный email или пароль')
    }
    
    return response.json()
  },
  
  async register(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      throw new Error('Ошибка регистрации')
    }
    
    return response.json()
  },

  async refreshToken(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    
    if (!response.ok) {
      throw new Error('Не удалось обновить токен')
    }
    
    return response.json()
  },
}