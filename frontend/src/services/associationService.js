import { apiFetch, normalizeImage } from './apiClient';

/**
 * Fetch all active association logos
 * @returns {Promise<Array>} Array of association logos
 */
export const getAssociations = async () => {
  const data = await apiFetch('/api/associations');
  return (data.data || []).map((a) => ({
    ...a,
    src: normalizeImage(a.src),
  }));
};