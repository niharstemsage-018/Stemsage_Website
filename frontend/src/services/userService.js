const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch authenticated user profile from GET /api/auth/me
 * @param {string} token - STEMSAGE JWT
 * @returns {Promise<Object>} API response data with user object
 */
export const getProfile = async (token) => {
  if (!token) {
    throw new Error('Authentication token is required.');
  }

  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to fetch user profile.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Update authenticated user profile via PUT /api/users/me
 * @param {string} token - STEMSAGE JWT
 * @param {Object} profileData - Fields to update (name, phone, gender, profilePicture)
 * @returns {Promise<Object>} API response data with updated user object
 */
export const updateProfile = async (token, profileData) => {
  if (!token) {
    throw new Error('Authentication token is required.');
  }

  const response = await fetch(`${API_URL}/api/users/me`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to update profile.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
