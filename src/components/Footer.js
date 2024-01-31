import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import X from "@mui/icons-material/X";

export default function Footer() {
  const navigate = useNavigate();

  const iconSx = {
    color: "white",
    fontSize: { xs: 20, sm: 30 },
  };

  return (
    <Box
      className="px-[5vw] md:px-[10vw]"
      bgcolor="#060C14"
      color="white"
      textAlign="center"
      display="flex"
      flexDirection="column"
      gap={3}
      py={5}
    >
      <Box display="flex" justifyContent="center" gap={{ xs: 3, sm: 5 }}>
        <Typography
          component="button"
          fontWeight={600}
          fontSize={{ xs: 14, sm: 20 }}
          onClick={() => navigate("/allmovie")}
        >
          All Movie
        </Typography>
        <Typography
          component="button"
          fontWeight={600}
          fontSize={{ xs: 14, sm: 20 }}
          onClick={() => navigate("/about")}
        >
          About
        </Typography>
        <Typography
          component="button"
          fontWeight={600}
          fontSize={{ xs: 14, sm: 20 }}
          onClick={() => navigate("/community")}
        >
          Community
        </Typography>
        <Typography
          component="button"
          fontWeight={600}
          fontSize={{ xs: 14, sm: 20 }}
          onClick={() => navigate("/termsOfUse")}
        >
          Terms of Use
        </Typography>
      </Box>

      <Typography fontSize={{ xs: 10, sm: 14 }}>
        © 2023 Filmocracy. All rights reserved. This website is designed by
        Filmocracy and powered by React. This website uses TMDB and the TMDB
        APIs but is not endorsed, certified, or otherwise approved by TMDB.
      </Typography>

      <Box display="flex" justifyContent="center" gap={{ xs: 3, sm: 5 }}>
        <IconButton
          aria-label="facebook"
          href="https://www.facebook.com"
          target="blank"
        >
          <FacebookRoundedIcon sx={iconSx} />
        </IconButton>
        <IconButton
          aria-label="twitter"
          href="https://www.twitter.com"
          target="blank"
        >
          <X sx={iconSx} />
        </IconButton>
        <IconButton
          aria-label="instagram"
          href="https://www.instagram.com/"
          target="blank"
        >
          <InstagramIcon sx={iconSx} />
        </IconButton>
        <IconButton
          aria-label="github"
          href="https://www.github.com"
          target="blank"
        >
          <GitHubIcon sx={iconSx} />
        </IconButton>
      </Box>
    </Box>
  );
}
