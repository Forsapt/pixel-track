module.exports = {
  post: process.env.PORT || 8080,
  database_url:process.env.DATABASE_URL,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  jwt_ttl: 300,
};
