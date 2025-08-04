import axios from "axios";

const BASE_URL = "http://skunkworks.ignitesol.com:8000/books/";

/**
 * Fetches a list of books from the API.
 * @param {string} searchTerm - keyword to search books by title or author.
 * @param {string} genre - genre/topic to filter books.
 * @param {string|null} pageUrl - Optional URL to fetch for infinite scroll.
 * @returns {Promise<Object>} - The API response containing book data or an error fallback.
 */
export const fetchBooks = async ({
  searchTerm = "",
  genre = "",
  pageUrl = null,
}) => {
  const params = {
    mime_type: "image/", // Ensures books have cover images
    topic: genre,
    search: searchTerm,
    languages: "en",
  };

  // Use pageUrl if valid, otherwise use base URL
  const url = pageUrl?.startsWith("http") ? pageUrl : BASE_URL;

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error.message || error);

    //  return a standard fallback so your app doesn't crash
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
      error: error.message || "Something went wrong fetching books.",
    };
  }
};
