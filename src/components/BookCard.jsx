import React from 'react';

const BookCard = ({ book, onBookClick }) => {
  const handleClick = () => {
    onBookClick(book);
  };

  const getCoverImage = (book) => {
    const formats = book.formats || {};
    
    // Look for cover images in the formats
    const coverKeys = Object.keys(formats).filter(key => 
      key.includes('image') || 
      formats[key].includes('.jpg') || 
      formats[key].includes('.png') || 
      formats[key].includes('.gif') ||
      formats[key].includes('cover') ||
      key.includes('cover')
    );
    
    if (coverKeys.length > 0) {
      return formats[coverKeys[0]];
    }
    
    // Try to construct cover URL from Project Gutenberg ID
    if (book.id) {
      // Project Gutenberg cover image pattern
      const gutenbergCover = `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;
      return gutenbergCover;
    }
    
    // Fallback to a styled placeholder
    return `https://via.placeholder.com/114x162/F0F0F6/666666?text=${encodeURIComponent(book.title?.substring(0, 10) || 'Book')}`;
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getAuthorName = () => {
    if (!book.authors || book.authors.length === 0) {
      return 'Unknown Author';
    }
    return book.authors[0].name;
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-card cursor-pointer 
                 hover:shadow-lg transition-shadow duration-200
                 w-full max-w-[114px] mx-auto"
    >
      {/* Book Cover Image */}
      <div className="aspect-[114/162] relative overflow-hidden rounded-t-lg bg-grey-light">
        <img
          src={getCoverImage(book)}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/114x162/F0F0F6/666666?text=No+Cover`;
          }}
        />
      </div>
      
      {/* Book Info */}
      <div className="p-2">
        <h3 className="font-montserrat font-normal text-book-name text-grey-dark 
                       leading-tight mb-1 min-h-[2.5em] flex items-start">
          <span className="line-clamp-2">
            {truncateText(book.title, 40)}
          </span>
        </h3>
        
        <p className="font-montserrat font-normal text-book-author text-grey-medium 
                      leading-tight truncate">
          {truncateText(getAuthorName(), 25)}
        </p>
      </div>
    </div>
  );
};

export default BookCard;