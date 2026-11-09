import { apiFetch } from './apiClient';

/**
 * Fetch all active workshops
 * @param {Object} params - Query parameters (category, status, etc.)
 * @returns {Promise<Array>} Array of workshops
 */
export const getWorkshops = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = `/api/workshops${query ? `?${query}` : ''}`;

  const data = await apiFetch(endpoint);
  return data.data || [];
};