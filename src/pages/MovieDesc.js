import StarRating from "./StarRating";
import logoWatch from "../assets/LogoWatch2.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { formatDateTime, host } from "../services/generateCard";
import { AuthContext } from "../Auth";
import PostCard from "../components/PostCard";

export default function MovieDesc() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id, media } = useParams();
  const [vid, setVid] = useState();
  const [res, setRes] = useState();
  const [pop, setPop] = useState([]);
  const [dir, setDir] = useState();
  const [writers, setWriters] = useState();
  const [mediaPost, setMediaPost] = useState([]);
  const [modalState, setModalState] = useState(false);

  const titleInput = useRef();
  const commentInput = useRef();

  const handlePublishDiscussion = async () => {
    const title = titleInput.current.value;
    const comment = commentInput.current.value;

    if (
      comment &&
      comment.trim().length > 0 &&
      title &&
      title.trim().length > 0 &&
      title.trim().length <= 50
    ) {
      try {
        const response = await fetch(`${host}post`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trimEnd(),
            desc: comment.trimEnd(),
            mediaId: id,
            mediaType: media,
          }),
          credentials: "include",
          withCredentials: true,
        });

        if (!response.ok) {
          const errorJson = await response.json();
          throw new Error(errorJson.field ?? errorJson.message);
        }

        const json = await response.json();

        titleInput.current.value = "";
        commentInput.current.value = "";

        navigate("/community/" + json.postId);
      } catch (err) {
        if (err.message === "user") window.location.assign("/login");
        else console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.themoviedb.org/3/${media}/${id}?language=en-US&api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setRes(response);
      })
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`,
      options
    )
      .then((response) => response.json())
      .then((response) => setVid(response.results))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/${media}/${id}/credits?language=en-US&api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const crew = response.crew;
        if (crew) {
          const directorsArray = crew
            .filter((item) => item.job === "Director")
            .map((director) => director.name);

          const directorsString = directorsArray.join(", ");

          setDir(directorsString);

          const writersArray = crew
            .filter((item) => item.job === "Writer")
            .map((writer) => writer.name);

          const writersString = writersArray.join(", ");

          setWriters(writersString);
        }

        const cast = response.cast;
        if (cast) {
          const filteredData = cast.filter((item) => item.popularity > 20);
          const sortedData = filteredData.sort(
            (a, b) => b.popularity - a.popularity
          );
          setPop(sortedData);
        }
      })
      .catch((err) => console.error(err));

    fetch(`${host}media/post/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.message) throw new Error(response.message);

        const postList = response.map(
          ({ id, User, title, createdAt, commentCount }, index) => {
            const postData = {
              postId: id,
              username: User.username,
              color: User.color,
              title: title,
              date: formatDateTime(createdAt),
              commentCount: commentCount,
            };

            return <PostCard key={index} {...postData} />;
          }
        );

        setMediaPost(postList);
      })
      .catch((err) => console.log(err.message));
  }, [id, media]);

  return (
    <div className="bg-[#231233] min-h-screen overflow-hidden relative z-10">
      <Navbar />
      <img
        className="w-screen mih-h-full opacity-10 absolute z-0"
        alt="background"
        src={`https://image.tmdb.org/t/p/original/${res?.backdrop_path}?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`}
      />
      <div className="flex flex-col mt-32 pb-[307px] mx-[5vw] md:mx-[20vw] relative z-20">
        <div className="flex flex-row justify-center mt-8 ">
          <div className="w-[25%]">
            <img
              className="w-[100%] float-right"
              alt="poster"
              src={`https://image.tmdb.org/t/p/original/${res?.poster_path}?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`}
            ></img>
          </div>
          <div className="flex flex-col ml-5 w-[80%]">
            <h1 className="text-white text-2xl font-bold">{res?.title}</h1>
            <div className="flex flex-row mt-2 gap-2">
              {res?.genres.map((genre) => (
                <button
                  key={genre.id}
                  className="bg-[#C51559] rounded-sm text-sm p-1 text-white w-20%"
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <div className="flex my-3 items-center">
              <StarRating rating={res?.vote_average / 2} />
              <p className="text-white ml-2">
                {res?.vote_average ? `(${res?.vote_average.toFixed(1)})` : ""}
              </p>
            </div>
            <a
              rel="noreferrer"
              href={`https://www.youtube.com/watch?v=${
                vid && vid.length > 0 ? vid[0].key : ""
              }`}
              target="_blank"
              className="flex flex-row items-center mt-1 z-0 w-[25%]"
            >
              <img src={logoWatch} className="w-10 h-10" alt="trailer" />
              <p className="text-white ml-2">Watch Trailer</p>
            </a>
            <br></br>
            <h2 className="text-white font-bold">Overview</h2>
            <p className="text-white text-xs mt-1">{res?.overview}</p>
            <br></br>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row text-white text-xs">
                  <b>Status:</b>
                  <p className="opacity-50 ml-2">{res?.status}</p>
                </div>

                <div className="flex flex-row text-white text-xs">
                  <b>Release Date:</b>
                  <p className="opacity-50 ml-2">
                    {formatDate(res?.release_date)}
                  </p>
                </div>

                <div className="flex flex-row text-white text-xs">
                  <b>Runtime:</b>
                  <p className="opacity-50 ml-2">{timeConvert(res?.runtime)}</p>
                </div>
              </div>
              <hr className="mt-3 mb-3"></hr>

              <div className="flex flex-row text-white text-xs">
                <b>Director:</b>
                <p className="opacity-50 ml-2">{dir ? dir : "N/A"}</p>
              </div>
              <hr className="mt-3 mb-3"></hr>

              <div className="flex flex-row text-white text-xs">
                <b>Writer:</b>
                <p className="opacity-50 ml-2">{writers ? writers : "N/A"}</p>
              </div>
              <hr className="mt-3"></hr>
            </div>
          </div>
        </div>

        <br />
        <div className="flex flex-col justify-center">
          <h2 className="text-white font-bold">Top Cast</h2>
          <br></br>
          <div className="flex flex-row w-full overflow-x-auto no-scrollbar">
            {pop.map((cast, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-white text-xs"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf`}
                  alt={cast.name}
                  className="w-20 h-20 rounded-full mb-1 object-cover"
                />
                <p>{cast.name}</p>
                <p className="opacity-50 w-[120px] text-center">
                  {cast.character}
                </p>
              </div>
            ))}
          </div>
        </div>

        <br />

        <Box>
          <Typography color="#fff" fontWeight="bold">
            Discussion
          </Typography>

          <br />

          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            maxHeight={380}
            sx={{
              overflowY: "auto",
              "scrollbar-width": "none", //  Firefox
              "-ms-overflow-style": "none", //  Internet Explorer 10+
              "&::-webkit-scrollbar": { display: "none" }, // Chrome
            }}
          >
            {mediaPost.length > 0 ? (
              mediaPost
            ) : (
              <Box
                bgcolor="rgba(255, 255, 255, 0.15)"
                padding={2}
                borderRadius={2}
              >
                <Typography fontSize={{ xs: 12, sm: 16 }} color="white">
                  This {media} doesn't have discussion yet
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          marginX={{ xs: 2, sm: 0 }}
          marginTop={5}
          display="flex"
          flexDirection="column"
          color="white"
          gap={2}
        >
          {modalState ? (
            <>
              <Typography fontWeight={700}>Create Discussion</Typography>
              <TextField
                id="title-modal"
                placeholder="Add a title..."
                inputRef={titleInput}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset, &:hover fieldset, &.Mui-focused fieldset": {
                      borderColor: "#aa405b",
                      borderRadius: 2,
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "inherit",
                    // fontSize: { xs: 12, sm: 16 }, // error ResizeObserver loop
                  },
                }}
              />
              <TextField
                id="comment-modal"
                placeholder="Add a comment..."
                rows={5}
                multiline
                inputRef={commentInput}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset, &:hover fieldset, &.Mui-focused fieldset": {
                      borderColor: "#aa405b",
                      borderRadius: 2,
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "inherit",
                    // fontSize: { xs: 12, sm: 16 }, // error ResizeObserver loop
                  },
                }}
              />
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={handlePublishDiscussion}
                  sx={{
                    backgroundColor: "#aa405b",
                    color: "#fff",
                    width: { xs: 60, sm: 90 },
                    fontSize: { xs: 10, sm: 14 },
                    fontWeight: 600,
                    "&:hover": {
                      transition: "all 150ms ease-in-out",
                      background: "#aa405b",
                      opacity: 0.9,
                    },
                  }}
                >
                  Publish
                </Button>
                <Button
                  onClick={() => setModalState(false)}
                  sx={{
                    color: "inherit",
                    width: { xs: 50, sm: 80 },
                    fontSize: { xs: 8, sm: 12 },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                if (currentUser) {
                  setModalState(true);
                } else {
                  navigate("/login");
                }
              }}
              sx={{
                backgroundColor: "#aa405b",
                color: "#fff",
                width: { xs: 150, sm: 190 },
                fontSize: { xs: 10, sm: 14 },
                fontWeight: 600,
                "&:hover": {
                  transition: "all 150ms ease-in-out",
                  background: "#aa405b",
                  opacity: 0.9,
                },
              }}
            >
              Create Discussion
            </Button>
          )}
        </Box>
      </div>

      <Box
        position="absolute"
        zIndex={20}
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

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "hr " + rminutes + "m";
}
