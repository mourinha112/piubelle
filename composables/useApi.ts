export const useApi = () => {
  const { authHeaders } = useAuth()

  const api = async <T>(
    url: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      body?: any
      params?: Record<string, any>
    } = {}
  ): Promise<{ data: T | null; error: string | null }> => {
    try {
      const response = await $fetch<T>(url, {
        method: options.method || 'GET',
        body: options.body,
        params: options.params,
        headers: authHeaders.value
      })

      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data?.message || error.message || 'Erro na requisição'
      }
    }
  }

  return { api }
}
