import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/backgrnd.jpg";
import logo from "../assets/LogoSimple.png";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";
import { host } from "../services/generateCard";

const Background = styled("div")(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  background: `linear-gradient(to bottom, rgba(10, 19, 34, 0.3), #0A1322), url(${background}) center top/cover no-repeat`,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    height: "110vh",
  },
}));

const Logo = styled("img")(() => ({
  position: "absolute",
  top: "1px",
  left: "40px",
  width: "35vh",
  height: "auto",
}));

const Card = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "52%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vh",

  padding: "20px",
  background: "rgba(28, 24, 24, 0.85)",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",

  [theme.breakpoints.down("sm")]: {
    top: "400px",
  },
}));

const Title = styled("h2")(() => ({
  fontSize: "42px",
  marginTop: "10px",
  marginLeft: "22px",
  fontWeight: "700",
  color: "#ffff",
}));

const InputContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",

  marginTop: "30px",
  marginBottom: "5px",
  marginLeft: "5%",
  marginRight: "5%",
}));

const Input = styled("input")(() => ({
  height: "6.2vh",
  padding: "10px",
  boxSizing: "border-box",
  borderRadius: "10px",
  backgroundColor: "#D9D9D9",
  color: "#737379",
  border: "none",
  outline: "none",
}));

const Button = styled("button")(({ theme }) => ({
  marginTop: "50px",
  height: "auto",
  padding: "10px",
  boxSizing: "border-box",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#aa405b",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "20px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const SignUpText = styled("p")(() => ({
  marginTop: "15px",
  marginBottom: "10px",
  fontSize: "16px",
  color: "#fff",
  textAlign: "center",
}));

const SignUpLink = styled("a")(() => ({
  color: "#aa405b",
  textDecoration: "underline",
  cursor: "pointer",
}));

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorPass2, setErrorPass2] = useState("");
  let { currentUser, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      setErrorName("");
      setErrorEmail("");
      setErrorPass("");
      setErrorPass2("");

      if (password.length < 8)
        return setErrorPass("Password must be at least 8 characters long");

      if (password !== confirmPassword)
        return setErrorPass2("Password did not match");

      const response = await fetch(`${host}register`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
        credentials: "include",
        withCredentials: true,
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(JSON.stringify(errorJson));
      }

      const json = await response.json();
      login(json.userId);
    } catch (err) {
      const { path, message } = JSON.parse(err.message);
      if (path === "username") {
        setErrorName(message);
      } else if (path === "email") {
        setErrorEmail(message);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (currentUser) window.location.assign("/home");
  }, [currentUser, navigate]);

  return (
    <>
      <Background>
        <Logo
          src={logo}
          alt="Logo"
          onClick={() => navigate("/home")}
          sx={{ cursor: "pointer" }}
        />
        <Card>
          <Title>Sign Up</Title>
          <InputContainer>
            <Input
              type="email"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Typography sx={{ color: "red", paddingLeft: "12px" }}>
              {errorEmail}
            </Typography>
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Your Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography sx={{ color: "red", paddingLeft: "12px" }}>
              {errorName}
            </Typography>
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Typography sx={{ color: "red", paddingLeft: "12px" }}>
              {errorPass}
            </Typography>
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Typography sx={{ color: "red", paddingLeft: "12px" }}>
              {errorPass2}
            </Typography>
            <Button onClick={signUp}>Sign Up</Button>
          </InputContainer>
          <SignUpText>
            Already have an account?{" "}
            <SignUpLink onClick={() => navigate("/login")}>
              Sign In Here
            </SignUpLink>
          </SignUpText>
        </Card>
      </Background>
    </>
  );
}
