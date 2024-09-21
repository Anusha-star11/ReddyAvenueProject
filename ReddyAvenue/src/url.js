const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.BASE_URL // This will pull the value from Render's environment variables
  : 'http://localhost:3147'; // For local development
export default baseURL;
