import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GenreCard from '../components/GenreCard';
import { GENRES } from '../utils/constants';

const Home = () => {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/books/${genre.topic}`, { 
      state: { genreName: genre.name } 
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-montserrat font-semibold text-4xl md:text-heading-1 
                         text-primary mb-6 leading-tight text-primary">
            Gutenberg Project
          </h1>
          <p className="font-montserrat font-normal text-body text-grey-dark 
                        max-w-2xl mx-auto leading-relaxed px-4">
            A social cataloging website that allows you to freely search its database of books, 
            annotations, and reviews.
          </p>
        </div>

        {/* Genre Cards - Mobile Layout (Single Column) */}
        <div className="block md:hidden space-y-4 px-4">
          {GENRES.map((genre) => (
            <GenreCard 
              key={genre.name} 
              genre={genre} 
              onClick={handleGenreClick}
            />
          ))}
        </div>

        {/* Genre Cards - Desktop Layout (Two Columns) */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 px-4">
          {GENRES.map((genre) => (
            <GenreCard 
              key={genre.name} 
              genre={genre} 
              onClick={handleGenreClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;