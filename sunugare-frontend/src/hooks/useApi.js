import { useState, useCallback } from 'react';
import api from '../api/axios';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const request = useCallback(async (method, url, data = null, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({ method, url, data, params });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Une erreur est survenue';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const get    = (url, params)       => request('GET', url, null, params);
  const post   = (url, data)         => request('POST', url, data);
  const put    = (url, data)         => request('PUT', url, data);
  const patch  = (url, data)         => request('PATCH', url, data);
  const del    = (url)               => request('DELETE', url);

  return { get, post, put, patch, del, loading, error, setError };
}
// ... tout ton code existant ...

export default useApi; // Ajoute ou vérifie cette ligne à la fin
