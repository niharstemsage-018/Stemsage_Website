const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifies a Google ID token and returns verified payload data.
 * @param {string} idToken - The Google ID token received from frontend.
 * @returns {Promise<Object>} Verified payload containing sub, email, email_verified, name, picture.
 */
const verifyGoogleToken = async (idToken) => {
  if (!idToken) {
    throw new Error('Google ID token is required.');
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Invalid token payload.');
  }

  return {
    sub: payload.sub,
    email: payload.email,
    email_verified: payload.email_verified,
    name: payload.name,
    picture: payload.picture
  };
};

module.exports = {
  verifyGoogleToken
};
