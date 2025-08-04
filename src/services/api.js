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
      const response = await axios.get(nextPageUrl);
      return response.data;
    }

    // Build search parameters according to Gutendex API documentation
    const params = {};

    // Add topic search (searches in bookshelves and subjects)
    if (topic) {
      params.topic = topic;
    }

    // Add text search (searches in author names and book titles)
    if (searchQuery) {
      params.search = searchQuery;
    }

    // Note: According to the documentation, books with covers would need
    // to be filtered on the frontend since there's no direct way to filter
    // for books with images via the API parameters

    const response = await api.get('/books', { params });
    
    // Filter books to only include those with potential cover images
    const filteredResults = response.data.results.filter(book => {
      const formats = book.formats || {};
      // Look for any format that might contain an image
      return Object.keys(formats).some(key => 
        key.includes('image') || 
        formats[key].includes('.jpg') || 
        formats[key].includes('.png') || 
        formats[key].includes('.gif') ||
        formats[key].includes('cover')
      );
    });

    return {
      ...response.data,
      results: filteredResults
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