import { useUserStore } from '../stores/userStore'

const API_URL = 'http://89.111.175.253:8080'

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const userStore = useUserStore()
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers 
      ? (Array.isArray(options.headers)
          ? Object.fromEntries(options.headers.filter(([k, v]) => 
              typeof k === 'string' && typeof v === 'string'))
          : options.headers instanceof Headers
            ? Object.fromEntries(options.headers.entries())
            : (typeof options.headers === 'object' 
                ? options.headers 
                : {}))
      : {})
  };
  
  if (userStore.accessToken) {
    headers['Authorization'] = `Bearer ${userStore.accessToken}`
  }
  
  let response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  })
  
  if (response.status === 401 && userStore.refreshToken) {
    try {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: userStore.refreshToken }),
      })
      
      if (refreshResponse.ok) {
        const { access_token } = await refreshResponse.json()
        
        userStore.accessToken = access_token
        userStore.saveToLocalStorage()
        
        headers['Authorization'] = `Bearer ${access_token}`
        response = await fetch(`${API_URL}${url}`, {
          ...options,
          headers,
        })
      } else {
        userStore.logout()
        window.location.href = '/login'
        throw new Error('Сессия истекла')
      }
    } catch (error) {
      userStore.logout()
      window.location.href = '/login'
      throw new Error('Ошибка обновления токена')
    }
  } else if (response.status === 401) {
    userStore.logout()
    window.location.href = '/login'
    throw new Error('Требуется авторизация')
  }
  
  return response
}

export const scriptsApi = {
  async getUserScripts(limit: number = 20, offset: number = 0, search: string = '') {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    })
    if (search) params.append('search', search)

    const response = await fetchWithAuth(`/scripts/user?${params}`)
    
    if (!response.ok) {
      throw new Error('Не удалось получить сценарии')
    }
    
    return response.json()
  },

  async getPublicScripts(limit: number = 20, offset: number = 0, search: string = '') {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    })
    if (search) params.append('search', search)

    const response = await fetchWithAuth(`/scripts/public?${params}`)
    
    if (!response.ok) {
      throw new Error('Не удалось получить публичные сценарии')
    }
    
    return response.json()
  },

  async uploadScript(formData: FormData) {
    const response = await fetchWithAuth(`/scripts/`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Ошибка загрузки сценария')
    }

    return response.json()
  },

  async updateScript(scriptHash: string, formData: FormData) {
    const response = await fetchWithAuth(`/scripts/${scriptHash}`, {
      method: 'PUT',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Ошибка обновления сценария')
    }

    return response.json()
  }
}