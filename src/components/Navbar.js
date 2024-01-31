import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  InputBase,
  AppBar,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LogoWeb from "../assets/LogoWeb.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState, useContext } from "react";
import { AuthContext } from "../Auth";

export default function Navbar(props) {
  const [searchFocus, setFocus] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const iconSx = {
    color: "white",
    fontSize: { xs: 20, sm: 30 },
  };

  const StyledAppBar = styled(AppBar)(() => ({
    paddingTop: "10px",
    paddingBottom: "10px",
    background: "#222222B3",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  const SearchContainer = styled("div")(({ theme }) => ({
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("sm")]: {
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
      },
      "&:focus-within": {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
      },
      "&:focus-within div": {
        padding: theme.spacing(1),
      },
      "&:focus-within div input": {
        width: "20ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: searchFocus && theme.palette.grey[700],
      position: searchFocus ? "absolute" : "relative",
      top: searchFocus ? "calc(50% - 24px)" : 0,
      left: searchFocus ? "5vw" : 0,
      zIndex: 1,
      "&:hover": {
        backgroundColor: !searchFocus && alpha(theme.palette.common.white, 0.3),
      },
      "& div": {
        padding: searchFocus ? theme.spacing(1) : 0,
      },
      "& div .MuiInputBase-input": {
        width: searchFocus
          ? `calc(90vw - (2*${theme.spacing(1)}) - 72px)`
          : "0ch",
      },
    },
  }));

  const SearchInput = styled(InputBase)(({ theme }) => ({
    color: "white",
    "& .MuiInputBase-input": {
      transition: theme.transitions.create("width"),
      width: "0ch",
    },
  }));

  function HideOnScroll(props) {
    const { children } = props;

    return (
      <Slide appear={false} direction="down" in={!useScrollTrigger()}>
        {children}
      </Slide>
    );
  }

  return (
    <HideOnScroll {...props}>
      <StyledAppBar className="px-[5vw] md:px-[10vw]">
        <img
          src={LogoWeb}
          alt="logo"
          style={{
            cursor: "pointer",
            width: "30%",
            minWidth: "180px",
            maxWidth: "290px",
          }}
          onClick={() => navigate("/home")}
        />
        <Box
          display="flex"
          sx={{ gap: { xs: "16px", sm: "24px", md: "48px" } }}
        >
          <SearchContainer>
            <SearchInput
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              aria-label="search"
              onClick={() => {
                if (window.innerWidth <= 600) setFocus(true);
              }}
            >
              <SearchRoundedIcon sx={iconSx} />
            </IconButton>
            <IconButton
              aria-label="search"
              onClick={() => setFocus(false)}
              sx={{
                display: {
                  xs: searchFocus ? "inline-flex" : "none",
                  sm: "none",
                },
              }}
            >
              <CloseRoundedIcon sx={iconSx} />
            </IconButton>
          </SearchContainer>
          {currentUser ? (
            <>
              <IconButton
                aria-label="profil"
                onClick={() => navigate("/profile")}
              >
                <PersonOutlineRoundedIcon sx={iconSx} />
              </IconButton>
            </>
          ) : (
            <Button
              sx={{ color: "white", fontSize: { xs: 14, sm: 18 } }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Box>
      </StyledAppBar>
    </HideOnScroll>
  );
}
