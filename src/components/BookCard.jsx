import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

// BookCard displays a single book's image, title, and author.
// On click, it opens the book in a prioritized readable format.
function BookCard({ title, author, image, book }) {
  const handleClick = () => {
    const { formats } = book;

    // Define preferred formats in priority order
    const priorityFormats = [
      "text/html; charset=utf-8",
      "text/html",
      "application/pdf",
      "text/plain; charset=utf-8",
      "text/plain",
    ];
    let bookUrl = null;

    // Look for the first available readable format that isn't a .zip file
    for (const format of priorityFormats) {
      if (formats[format] && !formats[format].endsWith(".zip")) {
        bookUrl = formats[format];
        break;
      }
    }

    // Open the book in a new tab if a suitable format is found
    if (bookUrl) {
      window.open(bookUrl, "_blank");
    } else {
      alert("No viewable version available for this book.");
    }
  };
  return (
    <Box
      onClick={handleClick}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Book Cover */}
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardMedia component="img" height="160" image={image} alt={title} />
        </CardActionArea>
      </Card>

      {/* Book Title */}
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          fontWeight: 600,
          textAlign: "center",
          whiteSpace: "normal",
          overflow: "visible",
          textOverflow: "initial",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>

      {/* Book Author */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          whiteSpace: "normal",
          overflow: "visible",
          textOverflow: "initial",
        }}
      >
        {author}
      </Typography>
    </Box>
  );
}

export default BookCard;
