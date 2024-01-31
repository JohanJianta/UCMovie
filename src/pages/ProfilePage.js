import { styled } from "@mui/system";
import background from "../assets/yellow.jpg";
import profile from "../assets/avatar.jpg";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import UserPostCard from "../components/UserPostCard";
import { formatDateTime, host } from "../services/generateCard";

const Container = styled(Box)({
  minHeight: "100vh",
  overflow: "hidden",
  // background: `linear-gradient(to bottom, rgba(10, 19, 34, 0.3), #0A1322), url(${profile}) center top/cover no-repeat`,
  background: `linear-gradient(to bottom, rgba(10, 19, 34, 0.3), #0A1322), url(${background}) center top/cover no-repeat`,
  position: "relative",
});

const CenteredBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "15vh",
  paddingBottom: "307px",
});

const ProfileCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  background: "rgba(169, 169, 169, 0.1)",
  width: "75%",
  maxHeight: "400px",
  alignItems: "center",
  overflow: "hidden",
});

const AvatarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "30px",
});

const ProfileAvatar = styled(Avatar)({
  width: 200,
  height: 200,
  background: `url(${profile}) center top/cover no-repeat`,
  color: "transparent",
  "& img": {
    borderRadius: "50%",
  },
});

const ProfileInfo = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  overflowY: "auto",
});

const InfoText = styled(Typography)({
  marginBottom: "5px",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  "&.title": {
    color: "#fff",
    fontWeight: "bold",
  },
  "&.description": {
    color: "#D6D6D6",
    fontSize: "17px",
  },
});

const TagCard = styled(Card)({
  marginTop: "5px",
  background: "none",
  width: "95%",
  boxShadow: "none",
});

const TagCardContent = styled(CardContent)({
  padding: "0",
  background: "rgba(0, 0, 0, 0)",
});

const TagText = styled(Button)({
  color: "#B7B7B7",
  fontSize: "7.5px",
  padding: "4px",
  background: "#373737",
  borderRadius: "4px",
  display: "inline-block",
  touchAction: "manipulation",
  cursor: "pointer",
  "&:hover": {
    color: "#6B6B6B",
    background: "#202020",
  },
});

const ActionButtonContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
});

const ActionButton = styled(Button)({
  fontSize: "10px",
  fontWeight: "600",
  padding: "5px 10px 4px 15px",
  color: "#fff",
  "&.edit": {
    backgroundColor: "#CBC8C8",
    color: "#404040",
    "&:hover": {
      backgroundColor: "#404040",
      color: "#fff",
    },
  },
  "&.logout": {
    backgroundColor: "#D54040",
    "&:hover": {
      backgroundColor: "#990000",
    },
  },
});

const BottomCard = styled(Card)({
  background: "none",
  width: "77%",
  marginTop: "5px",
  boxShadow: "none",
});

const BottomCardContent = styled(CardContent)({
  padding: "20px",
  background: "rgba(0, 0, 0, 0)",
});

const RecentlyWatchedHeading = styled(Typography)({
  fontSize: "22px",
  color: "white",
});

const ScrollableCardContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px",
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
  },
});

const ContentCard = styled(Card)({
  flex: "0 0 calc(32% - 35px)",
  height: "220px",
  background: "rgba(169, 169, 169, 0.1)",
  marginRight: "20px",
  marginTop: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
});

const ContentCardContent = styled(CardContent)({
  padding: "15px",
  background: "rgba(0, 0, 0, 0)",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  textAlign: "center",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
});

const NewSectionCard = styled(Card)({
  background: "transparent",
  width: "77%",
  marginTop: "1px",
  boxShadow: "none",
});

const NewSectionCardContent = styled(CardContent)({
  padding: "0",
  marginLeft: "20px",
});

const NewSectionHeading = styled(Typography)({
  marginBottom: "15px",
  fontSize: "22px",
  color: "#ffff",
});

export default function ProfilePage() {
  const [userData, setUserData] = useState();
  const [userPost, setUserPost] = useState([]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${host}logout`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.message);
      }

      window.location.assign("/home");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${host}user`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        });

        if (!response.ok) {
          const errorJson = await response.json();
          throw new Error(errorJson.message);
        }

        const json = await response.json();

        setUserData(json);

        const response2 = await fetch(`${host}user/post`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        });

        if (!response2.ok) {
          const errorJson = await response2.json();
          throw new Error(errorJson.message);
        }

        const json2 = await response2.json();

        const postList = json2.map(
          (
            { id, title, mediaType, mediaId, createdAt, commentCount },
            index
          ) => {
            const postData = {
              postId: id,
              title: title,
              mediaType: mediaType,
              mediaId: mediaId,
              date: formatDateTime(createdAt),
              commentCount: commentCount,
            };

            return <UserPostCard key={index} {...postData} />;
          }
        );

        setUserPost(postList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container>
      <Navbar />
      <CenteredBox>
        <ProfileCard>
          <AvatarContainer>
            <ProfileAvatar
              alt="Profile Avatar"
              src="/path/to/your/avatar-image.jpg"
            />
          </AvatarContainer>
          <ProfileInfo>
            {/* Title outside the card */}
            <InfoText variant="h4" className="title" color="primary">
              {userData?.username}
            </InfoText>
            {/* Description inside the card */}
            <InfoText
              variant="subtitle1"
              className="description"
              color="textSecondary"
            >
              Description goes here.
            </InfoText>
            <TagCard>
              <TagCardContent>
                <TagText onClick={() => console.log("Tag clicked")}>
                  #Tag1
                </TagText>
                {/* Add more tags as needed */}
              </TagCardContent>
            </TagCard>
            <ActionButtonContainer>
              <ActionButton
                variant="contained"
                className="edit"
                startIcon={<EditIcon />}
                onClick={() => console.log("Edit clicked")}
              >
                Edit
              </ActionButton>
              <ActionButton
                variant="contained"
                className="logout"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </ActionButton>
              {/* You can add more buttons with icons here */}
            </ActionButtonContainer>
          </ProfileInfo>
        </ProfileCard>
        <BottomCard>
          <BottomCardContent>
            <RecentlyWatchedHeading color="white">
              WatchMark List
            </RecentlyWatchedHeading>
            {/* Content Cards with scrolling animation */}
            <ScrollableCardContainer>
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 1
                  </Typography>
                </ContentCardContent>
              </ContentCard>
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 2
                  </Typography>
                </ContentCardContent>
              </ContentCard>
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 3
                  </Typography>
                </ContentCardContent>
              </ContentCard>
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 4
                  </Typography>
                </ContentCardContent>
              </ContentCard>
              {/* Add more content cards as needed */}
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 5
                  </Typography>
                </ContentCardContent>
              </ContentCard>
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 6
                  </Typography>
                </ContentCardContent>
              </ContentCard>
              {/* Add even more content cards as needed */}
              <ContentCard>
                <ContentCardContent>
                  <Typography variant="body1" color="white">
                    Movie 7
                  </Typography>
                </ContentCardContent>
              </ContentCard>
            </ScrollableCardContainer>
          </BottomCardContent>
        </BottomCard>

        {/* New Section Underneath Movie Cards */}
        <NewSectionCard>
          <NewSectionCardContent>
            <NewSectionHeading>Discussion You Posted</NewSectionHeading>
            <Box display="flex" flexDirection="column" gap={2}>
              {userPost.length > 0 ? (
                userPost
              ) : (
                <Box
                  bgcolor="rgba(255, 255, 255, 0.15)"
                  padding={2}
                  borderRadius={2}
                >
                  <Typography fontSize={{ xs: 12, sm: 16 }} color="white">
                    You haven't post any discussion
                  </Typography>
                </Box>
              )}
            </Box>
          </NewSectionCardContent>
        </NewSectionCard>
      </CenteredBox>

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
    </Container>
  );
}
