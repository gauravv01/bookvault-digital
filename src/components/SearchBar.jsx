import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search", value = "" }) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    // Auto-search as user types (debounced)
    const timeoutId = setTimeout(() => {
      onSearch(newValue);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-grey-medium" />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-10 rounded border-0
                     bg-grey-light text-search font-montserrat font-normal
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white
                     placeholder-grey-medium transition-colors duration-200"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2
                       w-4 h-4 text-grey-medium hover:text-grey-dark transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;