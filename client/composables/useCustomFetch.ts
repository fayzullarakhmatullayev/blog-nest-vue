import type { OptionsType } from '~/interfaces/http';

export const useCustomFetch = () => {
  const { getToken } = useToken();

  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl;

  const $fetchApi = async <DataT>(url: string, options: OptionsType = {}) => {
    const token = getToken();

    const headers = {
      ...(options.headers || {})
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await $fetch<DataT>(`${baseURL}${url}`, {
        ...options,
        headers
      });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return {
    $fetchApi
  };
};
