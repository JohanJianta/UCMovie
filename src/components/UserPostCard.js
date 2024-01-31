import { Box, Typography } from "@mui/material";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMediaById } from "../services/tmdbService";

export default function UserPostCard({
  postId,
  date,
  title,
  mediaId,
  mediaType,
  commentCount,
}) {
  const navigate = useNavigate();

  const handleNavigatePost = () => navigate("/community/" + postId);

  const [media, setMedia] = useState();

  useEffect(() => {
    const setup = async () => {
      const data = await fetchMediaById(mediaType, mediaId);
      setMedia(data);
    };

    if (mediaType && mediaId) {
      setup();
    }
  }, [mediaId, mediaType]);

  return (
    <Box
      color="white"
      bgcolor="rgba(255, 255, 255, 0.15)"
      display="flex"
      flexDirection="column"
      gap={{ xs: 1, sm: 2 }}
      padding={2}
      borderRadius={{ xs: 0, sm: 2 }}
      sx={{ cursor: "pointer" }}
      onClick={handleNavigatePost}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography
          width={{ xs: "60%", sm: "fit-content" }}
          fontSize={{ xs: 12, sm: 16 }}
          fontWeight={600}
          paddingTop={1}
          noWrap
        >
          {title}
        </Typography>

        <Typography
          fontSize={{ xs: 10, sm: 14 }}
          textAlign="right"
          marginLeft="auto"
          width={{ xs: "30%", sm: "fit-content" }}
        >
          {date}
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
        gap={{ xs: 1, sm: 0 }}
      >
        {mediaId != null && mediaType && (
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            width={{ xs: "100%", sm: "70%" }}
          >
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/original${media?.poster_path}?api_key=6f2e52edcd453db0d1ff76a8bdb66fcf&quot`}
              alt="poster"
              width={50}
              height={75}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/moviedesc/${mediaType}/${mediaId}`)}
            />
            <Typography
              fontSize={{ xs: 10, sm: 14 }}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/moviedesc/${mediaType}/${mediaId}`)}
            >
              {media?.title || media?.name || "N/A"}
            </Typography>
          </Box>
        )}

        {commentCount >= 0 && (
          <Box
            component="button"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
            width={{ xs: "100%", sm: "30%" }}
            onClick={handleNavigatePost}
          >
            <Typography fontSize={{ xs: 12, sm: 14 }}>
              {commentCount} comment(s)
            </Typography>
            <ReplyRoundedIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
