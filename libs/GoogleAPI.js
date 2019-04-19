const { google } = require('googleapis');
const SystemSetting = require('libs/SystemSetting');
const { GOOGLE_SERVICE } = require('../constants');

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

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
oAuth2Client.setCredentials(token);

module.exports = (service) => {
  switch (service) {
    case GOOGLE_SERVICE.DRIVE: return google.drive({version: 'v3', auth: oAuth2Client});
    case GOOGLE_SERVICE.GMAIL: return google.gmail({version: 'v1', auth: oAuth2Client});
    default: return null;
  }
}