import { apiFetch, normalizeImage } from './apiClient';

/**
 * Fetch all active news items
 * @returns {Promise<Array>} Array of news items
 */
export const getNews = async () => {
  const data = await apiFetch('/api/news');
  return (data.data || []).map((n) => ({
    ...n,
    image: normalizeImage(n.image),
  }));
};