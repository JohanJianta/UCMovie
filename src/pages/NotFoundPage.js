import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  const navigate = useNavigate();

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
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        height="calc(100vh)"
        paddingTop={{ xs: 12, sm: 14, md: 18 }}
        paddingBottom="307px"
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">Page Not Found</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          sx={{
            marginTop: 5,
            backgroundColor: "#aa405b",
            color: "#fff",
            width: { xs: 120, sm: 150 },
            fontSize: { xs: 10, sm: 14 },
            fontWeight: 600,
            "&:hover": {
              transition: "all 150ms ease-in-out",
              background: "#aa405b",
              opacity: 0.9,
            },
          }}
        >
          Back To Home
        </Button>
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
