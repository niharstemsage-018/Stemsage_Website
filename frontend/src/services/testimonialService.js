import { apiFetch, normalizeImage } from './apiClient';

/**
 * Fetch all active testimonials
 * @returns {Promise<Array>} Array of testimonials
 */
export const getTestimonials = async () => {
  const data = await apiFetch('/api/testimonials');
  return (data.data || []).map((t) => ({
    ...t,
    avatar: normalizeImage(t.avatar),
    videoSrc: normalizeImage(t.videoSrc),
  }));
};