import { Box, Typography, Button, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import { generateCommentCards, host } from "../services/generateCard";
import { AuthContext } from "../Auth";

export default function PostDetailPage() {
  const [modalState, setModalState] = useState(false);
  const [postData, setPostData] = useState();
  const [commentCard, setCommentCard] = useState([]);

  const commentInput = useRef();

  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmitComment = async () => {
    const comment = commentInput.current.value;
    if (comment && comment.trim().length > 0) {
      try {
        const response = await fetch(`${host}comment`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment.trimEnd(), postId: id }),
          credentials: "include",
          withCredentials: true,
        });

        if (!response.ok) {
          const errorJson = await response.json();
          throw new Error(errorJson.field ?? errorJson.message);
        }

        fetchPost();
        commentInput.current.value = "";
      } catch (err) {
        if (err.message === "user") window.location.assign("/login");
        else console.log(err.message);
      }
    }
  };

  const fetchPost = async () => {
    try {
      const { postData, commentList } = await generateCommentCards(id);
      setPostData(postData);
      setCommentCard(commentList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id, fetchPost]);

  return (
    <Box
      minHeight={"100svh" || "100vh"}
      overflow="hidden"
      // bgcolor="#0A1322"
      bgcolor="#231233"
      position="relative"
    >
      <Navbar />

      <Box
        width={{ xs: "100vw", sm: "80vw" }}
        marginTop={{ xs: 12, sm: 14, md: 18 }}
        paddingBottom="307px"
        marginX="auto"
        display="flex"
        flexDirection="column"
        color="white"
        gap={{ xs: 2, sm: 4 }}
      >
        <Typography
          fontWeight={700}
          marginLeft={{ xs: 2, sm: 0 }}
          fontSize={{ xs: 16, sm: 24 }}
        >
          {postData?.title}
        </Typography>

        <PostCard
          comment={postData?.comment}
          username={postData?.username}
          color={postData?.color}
          date={postData?.date}
        />

        <Typography
          fontWeight={700}
          marginLeft={{ xs: 2, sm: 0 }}
          marginTop={2}
          marginBottom={{ xs: 0, sm: -2 }}
          fontSize={{ xs: 12, sm: 16 }}
        >
          Comment(s)
        </Typography>

        {commentCard.length > 0 ? (
          commentCard
        ) : (
          <Box bgcolor="rgba(255, 255, 255, 0.15)" padding={2} borderRadius={2}>
            <Typography fontSize={{ xs: 12, sm: 16 }}>
              There is no comment in this discussion
            </Typography>
          </Box>
        )}

        <Box
          marginX={{ xs: 2, sm: 0 }}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {modalState ? (
            <>
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
                  onClick={handleSubmitComment}
                  sx={{
                    backgroundColor: "#aa405b",
                    color: "#fff",
                    width: { xs: 50, sm: 80 },
                    fontSize: { xs: 10, sm: 14 },
                    fontWeight: 600,
                    "&:hover": {
                      transition: "all 150ms ease-in-out",
                      background: "#aa405b",
                      opacity: 0.9,
                    },
                  }}
                >
                  Submit
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
                width: { xs: 70, sm: 100 },
                fontSize: { xs: 10, sm: 14 },
                fontWeight: 600,
                "&:hover": {
                  transition: "all 150ms ease-in-out",
                  background: "#aa405b",
                  opacity: 0.9,
                },
              }}
            >
              Comment
            </Button>
          )}
        </Box>
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
