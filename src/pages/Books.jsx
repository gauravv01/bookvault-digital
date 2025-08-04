import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/api';
import { FORMAT_PRIORITY, BOOK_FORMATS } from '../utils/constants';

const Books = () => {
  const { topic } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const genreName = location.state?.genreName || topic.toUpperCase();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [error, setError] = useState(null);

  const loadBooks = useCallback(async (query = '', reset = false) => {
    setLoading(true);
    setError(null);
    
    try {
      if (reset || !nextPage) {
        // First page or reset
        const data = await searchBooks(topic, query);
        setBooks(data.results || []);
        setNextPage(data.next);
        setHasMore(!!data.next);
      } else {
        // Load next page using the full URL
        const data = await searchBooks('', '', nextPage);
        setBooks(prev => [...prev, ...(data.results || [])]);
        setNextPage(data.next);
        setHasMore(!!data.next);
      }
    } catch (err) {
      console.error('Error loading books:', err);
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [topic, nextPage]);

  // Initial load
  useEffect(() => {
    loadBooks('', true);
  }, [topic]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setNextPage(null); // Reset pagination
    loadBooks(query, true);
  };

  // Handle scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
        && hasMore && !loading
      ) {
        loadBooks(searchQuery);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadBooks, searchQuery, hasMore, loading]);

  // Handle book click
  const handleBookClick = (book) => {
    const getBookUrl = (book) => {
      const formats = book.formats || {};
      
      // Try HTML first
      let url = formats['text/html'];
      if (url && !url.toLowerCase().includes('.zip')) return url;
      
      // Look for other HTML formats
      const htmlKey = Object.keys(formats).find(key => key.includes('html'));
      if (htmlKey) {
        url = formats[htmlKey];
        if (url && !url.toLowerCase().includes('.zip')) return url;
      }
      
      // Try PDF
      url = formats['application/pdf'];
      if (url && !url.toLowerCase().includes('.zip')) return url;
      
      // Look for other PDF formats
      const pdfKey = Object.keys(formats).find(key => key.includes('pdf'));
      if (pdfKey) {
        url = formats[pdfKey];
        if (url && !url.toLowerCase().includes('.zip')) return url;
      }
      
      // Try plain text
      url = formats['text/plain'] || formats['text/plain; charset=utf-8'];
      if (url && !url.toLowerCase().includes('.zip')) return url;
      
      // Look for other text formats
      const textKey = Object.keys(formats).find(key => key.includes('plain'));
      if (textKey) {
        url = formats[textKey];
        if (url && !url.toLowerCase().includes('.zip')) return url;
      }
      
      // If no priority format found, try any non-zip format
      const nonZipFormat = Object.keys(formats).find(key => {
        const url = formats[key];
        return url && !url.toLowerCase().includes('.zip');
      });
      
      return nonZipFormat ? formats[nonZipFormat] : null;
    };

    const url = getBookUrl(book);
    
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('No viewable version available');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={handleBackClick}
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-montserrat font-semibold text-2xl md:text-heading-2 text-primary">
            {genreName}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search"
            value={searchQuery}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Books Grid - Mobile: 3 columns, Tablet: 4 columns, Desktop: 6+ columns */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 md:gap-4 mb-8">
          {books.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onBookClick={handleBookClick}
            />
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* No More Books Message */}
        {!hasMore && books.length > 0 && (
          <div className="text-center text-grey-medium py-8 text-sm">
            No more books to load
          </div>
        )}

        {/* No Books Found */}
        {!loading && books.length === 0 && !error && (
          <div className="text-center text-grey-medium py-8 text-sm">
            No books found
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;