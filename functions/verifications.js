const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require("axios");

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const { sub, name } = payload;
  return { sub, fullName: name };
};

const facebookAuth = async (token) => {
  let result = await axios
    .get(`https://graph.facebook.com/me?access_token=${token}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

module.exports = {
  googleAuth: googleAuth,
  facebookAuth: facebookAuth,
};
