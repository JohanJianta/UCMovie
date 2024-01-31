import { Box, IconButton, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

export default function CardCarousel({ title, firstFetch, secondFetch }) {
  const [data, setData] = useState([]);
  const [switchStatus, setSwitchStatus] = useState();
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
      const indexShift =
        containerRef.current.scrollLeft - containerRef.current.clientWidth;
      if (indexShift > 0) {
        containerRef.current.scrollLeft = indexShift;
      } else containerRef.current.scrollLeft = 0;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
      const indexShift =
        containerRef.current.scrollLeft + containerRef.current.clientWidth;
      const limit =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      if (indexShift < limit) {
        containerRef.current.scrollLeft = indexShift;
      } else containerRef.current.scrollLeft = limit;
    }
  };

  const iconSx = {
    color: "white",
    fontSize: 40,
  };

  useEffect(() => {
    const updateData = async () => {
      try {
        const listMovie = !switchStatus
          ? await firstFetch()
          : await secondFetch();
        setData(listMovie);
      } catch (err) {
        console.error(err);
      }
    };

    updateData();
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [switchStatus, firstFetch, secondFetch]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography
          fontWeight={700}
          fontSize={{ xs: 20, sm: 24 }}
          color="white"
        >
          {title}
        </Typography>

        <Box
          position="relative"
          zIndex={0}
          borderRadius={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="white"
        >
          <Box
            position="absolute"
            width={
              !switchStatus
                ? {
                    xs: "50%",
                    sm: "55%",
                  }
                : "40%"
            }
            height="80%"
            borderRadius={5}
            zIndex={-1}
            left={{ xs: !switchStatus ? 4 : 91, sm: !switchStatus ? 4 : 112 }}
            sx={{
              background: "#aa405b",
              transition: "left .3s ease-in-out, width .3s ease-in-out",
            }}
          />
          <Typography
            component="span"
            fontWeight={500}
            fontSize={{ xs: 14, sm: 20 }}
            letterSpacing={{ xs: 2, sm: 3 }}
            paddingX={2}
            textAlign="center"
            color={!switchStatus ? "#ffffff" : "#000000"}
            sx={{ cursor: "pointer" }}
            onClick={() => setSwitchStatus(false)}
          >
            Movies
          </Typography>
          <Typography
            component="span"
            fontWeight={500}
            fontSize={{ xs: 14, sm: 20 }}
            letterSpacing={{ xs: 2, sm: 3 }}
            paddingX={3}
            textAlign="center"
            color={!switchStatus ? "#000000" : "#ffffff"}
            sx={{ cursor: "pointer" }}
            onClick={() => setSwitchStatus(true)}
          >
            TV
          </Typography>
        </Box>
      </Box>
      <Box position="relative" marginTop={3} width="100%">
        <IconButton
          className="!hidden md:!inline-flex"
          aria-label="prev"
          sx={{
            position: "absolute",
            top: "calc(50% - 40px)",
            left: -70,
            height: 80,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "RGBA(255, 255, 255, 0.15)",
            },
          }}
          onClick={scrollLeft}
        >
          <NavigateBeforeRoundedIcon sx={iconSx} />
        </IconButton>

        <Box
          display="flex"
          gap={{ xs: 3, sm: 5 }}
          sx={{
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          ref={containerRef}
        >
          {data}
        </Box>

        <IconButton
          className="!hidden md:!inline-flex"
          aria-label="next"
          sx={{
            position: "absolute",
            top: "calc(50% - 40px)",
            right: -70,
            height: 80,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "RGBA(255, 255, 255, 0.15)",
            },
          }}
          onClick={scrollRight}
        >
          <NavigateNextRoundedIcon sx={iconSx} />
        </IconButton>
      </Box>
    </div>
  );
}
