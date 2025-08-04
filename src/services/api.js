import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

export const getBooksAPI = async (params = {}) => {
  try {
    const response = await api.get('/books', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const searchBooks = async (topic = '', searchQuery = '', nextPageUrl = null) => {
  try {
    // If we have a next page URL, use it directly
    if (nextPageUrl) {
      // Clean and secure the URL
      let secureUrl = nextPageUrl.replace('http://', 'https://');
      
      // Handle potential malformed URLs
      try {
        new URL(secureUrl); // Validate URL
      } catch (urlError) {
        console.warn('Invalid pagination URL:', secureUrl);
        throw new Error('Invalid pagination URL');
      }
      
      const response = await axios.get(secureUrl, {
        timeout: 5000, // Shorter timeout for pagination
        validateStatus: (status) => status === 200 // Only accept 200 status
      });
      return response.data;
    }

    // Build search parameters according to Gutendx API documentation
    const params = {};

    // Add topic search (searches in bookshelves and subjects)
    if (topic) {
      params.topic = topic;
    }

    // Add text search (searches in author names and book titles)
    if (searchQuery) {
      params.search = searchQuery;
    }

    const response = await api.get('/books', { params });
    
    // Validate and clean pagination URLs
    const cleanUrl = (url) => {
      if (!url) return null;
      try {
        const cleanedUrl = url.replace('http://', 'https://');
        new URL(cleanedUrl); // Validate
        return cleanedUrl;
      } catch {
        return null; // Return null for invalid URLs
      }
    };
    
    return {
      ...response.data,
      next: cleanUrl(response.data.next),
      previous: cleanUrl(response.data.previous)
    };

  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};