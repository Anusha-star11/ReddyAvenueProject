const baseURL = import.meta.env.PROD 
  ? 'https://reddyavenueproject.onrender.com/'  // Production URL
  : 'http://localhost:3147'; // For local development
export default baseURL;
