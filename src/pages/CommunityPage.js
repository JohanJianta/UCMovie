import { Box, Typography, Pagination, PaginationItem } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { generatePostCards } from "../services/generateCard";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [cards, setCards] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { listPost, count } = await generatePostCards(page);
        setCards(listPost);
        setCount(count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <Box
      minHeight={"100svh" || "100vh"}
      overflow="hidden"
      // bgcolor="#0A1322"
      bgcolor="#231233"
      position="relative"
    >
      <Navbar hasLogin={false} />

      <Box
        width={{ xs: "100vw", sm: "80vw" }}
        marginTop={{ xs: 12, sm: 14, md: 18 }}
        paddingBottom="307px"
        marginX="auto"
        display="flex"
        flexDirection="column"
        gap={{ xs: 2, sm: 4 }}
      >
        <Typography
          fontWeight={700}
          marginLeft={{ xs: 2, sm: 0 }}
          fontSize={{ xs: 20, sm: 24 }}
          color="white"
        >
          Community
        </Typography>

        {cards}

        <Pagination
          count={count}
          defaultPage={page ?? " "}
          shape="rounded"
          size={matches ? "large" : "small"}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/community${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
          sx={{
            marginX: "auto",
            "& .MuiPaginationItem-root": {
              color: "#fff",
            },
            "& a.Mui-selected": {
              bgcolor: "rgba(255, 255, 255, 0.15)",
            },
            "& a.MuiPaginationItem-root:hover": {
              bgcolor: { sm: "rgba(255, 255, 255, 0.1)" },
            },
            "& a.Mui-selected:hover": {
              bgcolor: "rgba(255, 255, 255, 0.15)",
            },
          }}
        />
      </Box>

      <Box
        position="absolute"
        bottom={0}
        width="100%"
        height={307}
        display="flex"
        flexDirection="column"
        justifyContent="end"
      >
        <Footer />
      </Box>
    </Box>
  );
}
