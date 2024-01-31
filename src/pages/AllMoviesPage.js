import { Box, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState, useEffect } from "react";
import { generateAllCards } from "../services/generateCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AllMoviesPage() {
  const [contentType, setContentType] = useState("movie");
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        let url;
        if (contentType === "all") {
          const tvGenreURL =
            "https://api.themoviedb.org/3/genre/tv/list?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf";
          const movieGenreURL =
            "https://api.themoviedb.org/3/genre/movie/list?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf";

          const [tvGenreResponse, movieGenreResponse] = await Promise.all([
            fetch(tvGenreURL),
            fetch(movieGenreURL),
          ]);

          const [tvGenreData, movieGenreData] = await Promise.all([
            tvGenreResponse.json(),
            movieGenreResponse.json(),
          ]);

          const combinedGenres = [
            ...tvGenreData.genres,
            ...movieGenreData.genres,
          ];
          setGenreList(combinedGenres);
        } else {
          url = `https://api.themoviedb.org/3/genre/${contentType}/list?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`;
          const response = await fetch(url);
          const data = await response.json();
          setGenreList(data.genres);
        }
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };

    const getData = async () => {
      try {
        const data = await generateAllCards(
          contentType,
          selectedGenre,
          sortBy,
          page
        );
        setCards((prev) => [...prev, data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenreList();
    getData();
  }, [contentType, selectedGenre, sortBy, page]);

  const handleContentTypeChange = async (event) => {
    setContentType(event.target.value);
    setSelectedGenre("");
    setCards([]);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCards([]);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setCards([]);
  };

  return (
    <div className="bg-[#231233] min-h-screen w-full absolute">
      <Navbar />
      <div className="flex flex-col items-center mt-[5vmax] pb-[307px] mx-[5vw] md:mx-[10vw]">
        <div className="flex flex-col md:flex-row items-center justify-between w-full my-10">
          <div className="flex">
            <p className="text-white font-bold text-xl">
              Explore Movies All Over World
            </p>
          </div>

          <div className="flex flex-row justify-between ">
            <div className="flex md:w-[30%]">
              <select
                value={contentType}
                onChange={handleContentTypeChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="movie">Movie</option>
                <option value="tv">TV</option>
              </select>
            </div>
            <div className="flex md:w-[30%]">
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="all">Select Genre</option>
                {genreList.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex md:w-[30%]">
              <select
                value={sortBy}
                onChange={handleSortByChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Sort By</option>
                <option value="popularity.desc">Sort by Popularity</option>
                <option value="primary_release_date.desc">
                  Sort by Release Date
                </option>
                <option value="vote_average.desc">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        <Box
          display="flex"
          flexWrap="wrap"
          gap="1%"
          justifyContent="space-around"
        >
          {cards}
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            setPage(page + 1);
          }}
          sx={{
            marginTop: 5,
            paddingY: 1,
            backgroundColor: "#aa405b",
            color: "#fff",
            width: { xs: 130, sm: 160 },
            fontSize: { xs: 10, sm: 14 },
            fontWeight: 600,
            "&:hover": {
              transition: "all 150ms ease-in-out",
              background: "#aa405b",
              opacity: 0.9,
            },
          }}
        >
          <AutorenewIcon
            sx={{ marginRight: 1, fontSize: { xs: 20, sm: 24 } }}
          />
          Load More
        </Button>
      </div>
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
    </div>
  );
}
