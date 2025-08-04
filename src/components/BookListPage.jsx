import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrowIcon from "../assets/Back.svg";
import SearchIcon from "../assets/Search.svg";
import CancelIcon from "../assets/Cancel.svg";
import { fetchBooks } from "../Services/bookService";
import BookCard from "./BookCard";
import CircularProgress from "@mui/material/CircularProgress";

function BookListPage() {
  const navigate = useNavigate();
  const { genre } = useParams(); // Get genre from URL
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [books, setBooks] = useState([]); // Books to display
  const [nextPageUrl, setNextPageUrl] = useState(null); // Next page URL
  const [hasMore, setHasMore] = useState(true); // Infinite scroll flag

  // Fetch books based on genre/search and optionally reset results
  const getBooks = async (reset = false) => {
    try {
      const data = await fetchBooks({
        searchTerm,
        genre,
        pageUrl: reset ? null : nextPageUrl, // Reset means new query
      });

      if (reset) {
        setBooks(data.results); // Overwrite books list
      } else {
        setBooks((prev) => [...prev, ...data.results]); // Append to list
      }

      setNextPageUrl(data.next); // Store next page URL
      setHasMore(!!data.next); // Check if more pages exist

      // console.log("Next Page URL:", data.next);
      // console.log("Has More?", !!data.next);
      // console.log("Total books so far:", books.length);
    } catch (error) {
      console.error("Error fetching books:", error);
      setHasMore(false);
    }
  };

  // Trigger fetch on search/genre change with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getBooks(true); // Reset books on change
    }, 500); // Debounce delay

    return () => clearTimeout(delayDebounce); // Cleanup debounce
  }, [genre, searchTerm]);

  // Fetch next set of books when scrolling down
  const loadMore = () => {
    if (nextPageUrl) {
      getBooks();
    }
  };

  // Update search state
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate back to category selection
  function handleBack() {
    navigate("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: { xs: "20px", sm: "40px", md: "80px", lg: "100px" },
        gap: "20px",
      }}
    >
      {/* Header with back arrow and genre title */}
      <Box
        component="span"
        sx={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <Box
          component="img"
          src={BackArrowIcon}
          alt="Arrow"
          sx={{ height: "20px", width: "20px", cursor: "pointer" }}
          onClick={handleBack}
        ></Box>
        <Typography
          variant="h2"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            textAlign: "left",
          })}
        >
          {genre}
        </Typography>
      </Box>
      {/* Search Bar */}
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={(theme) => ({ backgroundColor: theme.palette.grey[100] })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="img" src={SearchIcon} alt="searchIcon"></Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  component="img"
                  src={CancelIcon}
                  alt="cancelIcon"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSearchTerm("")}
                ></Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Infinite Scroll + Book Cards */}
      <Box>
        <InfiniteScroll
          dataLength={books.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress />
            </Box>
          }
          endMessage={
            <Typography textAlign="center">No more books!</Typography>
          }
        >
          {/* Book Grid */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              marginLeft: "10px",
              gridTemplateColumns: {
                xs: "repeat(3, 1fr)",
                sm: "repeat(4, 1fr)",
                md: "repeat(6, 1fr)",
                lg: "repeat(8, 1fr)",
              },
            }}
          >
            {books.map((book) => {
              const coverImage = book.formats["image/jpeg"];
              const author = book.authors?.[0]?.name || "Unknown";

              return (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={author}
                  image={coverImage}
                  book={book}
                />
              );
            })}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
}

export default BookListPage;
