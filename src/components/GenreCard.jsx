import React from 'react';
import { ChevronRight } from 'lucide-react';

const GenreCard = ({ genre, onClick }) => {
  return (
    <button
      onClick={() => onClick(genre)}
      className="w-full bg-white rounded border border-grey-light px-4 py-3
                 flex items-center justify-between text-left
                 hover:bg-grey-light/50 transition-colors duration-200
                 shadow-card h-12 md:h-14"
    >
      <div className="flex items-center gap-3">
        <img 
          src={genre.icon} 
          alt={`${genre.name} icon`} 
          className="w-6 h-6 flex-shrink-0" 
        />
        <span className="font-montserrat font-normal text-lg md:text-genre-card text-grey-dark">
          {genre.name}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
    </button>
  );
};

export default GenreCard;