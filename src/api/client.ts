const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private isMockMode: boolean;
  private cachedToken: string | null = null;
  private tokenCacheTime: number = 0;
  private readonly TOKEN_CACHE_TTL = 60000;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.isMockMode = import.meta.env.VITE_USE_MOCK_DATA === 'true' || 
                     (!import.meta.env.VITE_API_BASE_URL && import.meta.env.DEV);
  }

  private getAuthToken(): string | null {
    const now = Date.now();
    if (this.cachedToken && (now - this.tokenCacheTime) < this.TOKEN_CACHE_TTL) {
      return this.cachedToken;
    }
    
    this.cachedToken = localStorage.getItem('authToken');
    this.tokenCacheTime = now;
    return this.cachedToken;
  }

  clearTokenCache(): void {
    this.cachedToken = null;
    this.tokenCacheTime = 0;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    if (this.isMockMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: null as T });
        }, 100);
      });
    }

    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = this.getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { data: undefined as T };
      }

      let data;
      const contentType = response.headers.get('content-type');
      
      try {
        data = contentType?.includes('application/json') 
          ? await response.json() 
          : await response.text();
      } catch (parseError) {
        const text = await response.text();
        throw {
          message: `Ошибка парсинга ответа: ${text.substring(0, 100)}`,
          status: response.status,
        } as ApiError;
      }

      if (!response.ok) {
        throw {
          message: (data as any)?.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          errors: (data as any)?.errors,
        } as ApiError;
      }

      return { data: data as T };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw {
          message: 'Ошибка сети. Проверьте подключение к интернету.',
          status: 0,
        } as ApiError;
      }
      
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }
      
      throw {
        message: error instanceof Error ? error.message : 'Неизвестная ошибка',
        status: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
