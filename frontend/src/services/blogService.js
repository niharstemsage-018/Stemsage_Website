const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch all published blogs
 * @returns {Promise<Object>} API response data with array of blogs
 */
export const getBlogs = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${API_URL}/api/blogs${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to fetch blogs.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Fetch a single blog by slug
 * @param {string} slug 
 * @returns {Promise<Object>} API response data with blog object
 */
export const getBlogBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to fetch blog post.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
