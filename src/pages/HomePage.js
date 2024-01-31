import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CardCarousel from "../components/CardCarousel";
import { generateMovieCards, generateTVCards } from "../services/generateCard";
// import bg from "../assets/bg-blade-runner.jpg";

const backgroundUrl =
  // "https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg";
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxt6fg87KGXjNO9s7MsvANN5UwzVOMHi6NnQ&usqp=CAU";
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZYkgnIAv_nMIijXrGCg6KafD6eXyGRl2oA&usqp=CAU";

export default function HomePage() {
  const BackgroundPhoto = styled("div")(() => ({
    position: "absolute",
    width: "100%",
    height: "65vmax",
    maxHeight: "75vh",
    background: `linear-gradient(to bottom, rgba(10, 19, 34, 0.3), #231233), url(${backgroundUrl}) center top/cover no-repeat`,
  }));

  const Body = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20vh",
  }));

  const CardSection = styled("div")(() => ({
    marginTop: "13vmax",
    marginBottom: 40,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5vh",
    zIndex: 0,
  }));

  return (
    <div
      style={{
        // background: "#0A1322",
        background: "#231233",
        minHeight: "100svh" || "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <BackgroundPhoto />

      <Body className="mx-[5vw] mt-10 md:mx-[10vw]">
        <Typography
          color="white"
          fontSize="3.1vmax"
          fontWeight={600}
          letterSpacing={{ xs: 5, md: 10 }}
          zIndex={0}
        >
          Welcome
        </Typography>
        <Typography
          color="#d9d9d9"
          fontSize="1.3vmax"
          letterSpacing={{ xs: 3, sm: 5 }}
          zIndex={0}
        >
          Search billions of movie in one click.
        </Typography>

        <SearchBar />

        <CardSection>
          <CardCarousel
            title="Popular"
            firstFetch={() => generateMovieCards("popular")}
            secondFetch={() => generateTVCards("popular")}
          />
          <CardCarousel
            title="Top Rated"
            firstFetch={() => generateMovieCards("top_rated")}
            secondFetch={() => generateTVCards("top_rated")}
          />
        </CardSection>
      </Body>

      <Footer />
    </div>
  );
}
