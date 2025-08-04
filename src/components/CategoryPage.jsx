import React from "react";
import BackgroundImage from "../assets/Pattern.svg";
import { Box, Button, Typography, Grid } from "@mui/material";
// Genre icons
import FictionImage from "../assets/Fiction.svg";
import PhilosophyImage from "../assets/Philosophy.svg";
import DramaImage from "../assets/Drama.svg";
import HistoryImage from "../assets/History.svg";
import HumourImage from "../assets/Humour.svg";
import AdventureImage from "../assets/Adventure.svg";
import PoliticsImage from "../assets/Politics.svg";
import NextImage from "../assets/Next.svg";

import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const navigate = useNavigate();

  // Navigate to books by selected genre
  const handleClick = (genre) => {
    navigate(`/books/${genre}`);
  };
  const genres = [
    {
      name: "Fiction",
      image: FictionImage,
    },
    {
      name: "Philosophy",
      image: PhilosophyImage,
    },
    {
      name: "Drama",
      image: DramaImage,
    },
    {
      name: "History",
      image: HistoryImage,
    },
    {
      name: "Humour",
      image: HumourImage,
    },
    {
      name: "Adventure",
      image: AdventureImage,
    },
    {
      name: "Politics",
      image: PoliticsImage,
    },
  ];

  return (
    <Box sx={{ position: "relative", width: "100%", height: 300 }}>
      {/* Background pattern image */}
      <Box
        component="img"
        src={BackgroundImage}
        alt="Background Image"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Overlay content: Heading and description */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "30px" },
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "flex-start" },
          px: { xs: 2, md: 10 },
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            fontSize: { xs: "30px", md: "48px" },
            textAlign: "left",
          })}
        >
          Gutenberg Project
        </Typography>
        {/* Subtitle/Description */}
        <Typography
          variant="h3"
          sx={{
            mt: 2,
            color: "#333",
            textAlign: "left",
            maxWidth: "100%",
            whiteSpace: "normal",
          }}
        >
          A social cataloging website that allows you to freely search its
          database of books, annotations, and reviews.
        </Typography>
      </Box>
      {/* Genre buttons list */}
      <Box sx={{ padding: { xs: "20px", md: "50px" } }}>
        <Grid container spacing={2}>
          {genres.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Button
                onClick={() => handleClick(item.name)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: { xs: "300px", md: "400px" },
                  color: "#000",
                  overflow: "hidden",
                }}
              >
                {/* Genre icon + name */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ height: "24px", width: "24px" }}
                  />
                  {item.name}
                </Box>
                 {/* Next/arrow icon */}
                <Box
                  component="img"
                  src={NextImage}
                  alt="arrow"
                  sx={{ height: "20px", width: "20px" }}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default CategoryPage;
