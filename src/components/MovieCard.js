import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, media, img, title, date, rate, tags }) {
  const RatingContainer = styled("div")(() => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    float: "right",
  }));

  const TagContainer = styled("div")(() => ({
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 8,
  }));

  const TagButton = styled(Button)(({ theme }) => ({
    textTransform: "capitalize",
    textWrap: "nowrap",
    // background: "#68507b",
    background: "#C51559",
    boxShadow: "none",
    color: "white",
    fontSize: 12,
    padding: 5,
    minWidth: "auto",
    "&:hover": {
      opacity: 0.8,
      // background: "#68507b",
      background: "#C51559",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
    },
  }));

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/moviedesc/${media}/${id}`);
  };

  return (
    <Card
      sx={{
        minWidth: { xs: 152, sm: "26.7vmin" },
        width: { xs: 152, sm: "26.7vmin" },
        boxShadow: "none",
        color: "white",
        background: "transparent",
      }}
    >
      <CardMedia
        image={img}
        sx={{
          height: { xs: 218, sm: "38.9vmin" },
          cursor: "pointer",
        }}
        onClick={handleNavigation}
      >
        <RatingContainer>
          <Typography
            position="absolute"
            fontWeight={700}
            fontSize={{ xs: 10, sm: 14 }}
          >
            {rate.toFixed(1)}
          </Typography>
          <StarIcon sx={{ color: "#EEC22B", fontSize: { xs: 40, sm: 50 } }} />
        </RatingContainer>
      </CardMedia>
      <CardContent sx={{ paddingLeft: 0 }}>
        <Typography
          gutterBottom
          fontWeight="600"
          fontSize={{ xs: 12, sm: 16 }}
          sx={{ cursor: "pointer" }}
          onClick={handleNavigation}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          fontSize={{ xs: 10, sm: 14 }}
          sx={{ cursor: "pointer" }}
          onClick={handleNavigation}
        >
          {date}
        </Typography>
        <TagContainer>
          {tags.map((tag, i) => (
            <TagButton key={i} variant="contained">
              {tag}
            </TagButton>
          ))}
        </TagContainer>
      </CardContent>
    </Card>
  );
}
