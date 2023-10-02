module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  gmailSecret: process.env.GOOGLE_SECRET,
  gmailClientId: process.env.GOOGLE_CLIENT_ID,
  gmailProjectId: process.env.GOOGLE_PROJECT_ID,
  expressSessionSecret: process.env.EXPRESS_SESSION_SECRET,
  gmailRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  chatGPTKey: process.env.CHAT_GPT_KEY,
  openAPIURL: process.env.OPEN_API_URL,
  openAPIOrganizationId: process.env.OPEN_API_ORGANIZATION_ID,
  isProduction: process.env.NODE_ENV === "production",
};
