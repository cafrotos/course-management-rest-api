const { google } = require('googleapis');
const SystemSetting = require('libs/SystemSetting');

const
  clientSecret = process.env.GOOGLE_CLIENT_SECRET,
  clientId = process.env.GOOGLE_CLIENT_ID,
  redirectURI = process.env.GOOGLE_REDIRECT_URI;
const token = {
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  scope: SystemSetting('google.scope'),
  token_type: "Bearer",
  expiry_date: process.env.GOOGLE_EXPIRY_AT
}
const oAuth2Client = google.auth.OAuth2(clientId, clientSecret, redirectURI);
oAuth2Client.setCredentials(token);

module.exports = oAuth2Client;