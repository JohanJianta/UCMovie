import {
  fetchMovies,
  fetchTVs,
  fetchImgByPath,
  fetchGenreById,
  searchWithFilter,
} from "./tmdbService";
import PostCard from "../components/PostCard";
import MovieCard from "../components/MovieCard";

// export const host = "https://4gh92pj3-5000.asse.devtunnels.ms/";
export const host = "http://localhost:5000/";

export const generateAllCards = async (category, genre, sort, page) => {
  // Category: "movie" atau "tv"
  // Genre: [pakai id dari list genre] hanya satu id dalam satu waktu
  // Sort: "popularity.desc" "popularity.asc" "primary_release_date.desc" "primary_release_date.asc" "vote_count.desc" "vote_count.asc"

  try {
    const data = await searchWithFilter(category, genre, sort, page);

    const listMovie = await Promise.all(
      data.results.map(async (d, index) => {
        const movieDetail = {
          id: d.id,
          media: category,
          img: fetchImgByPath(d.poster_path),
          title: d.title || d.name,
          date: formatDate(d.release_date || d.first_air_date),
          rate: d.vote_average,
          tags: await Promise.all(
            d.genre_ids.map((genre) => fetchGenreById(genre))
          ),
        };

        return <MovieCard key={index} {...movieDetail} />;
      })
    );

    return listMovie;
  } catch (err) {
    console.error(err);
  }
};

export const generateMovieCards = async (category) => {
  try {
    const data = await fetchMovies(category);

    const listMovie = await Promise.all(
      data.results.map(
        async (
          { id, poster_path, title, release_date, vote_average, genre_ids },
          index
        ) => {
          const movieDetail = {
            id: id,
            media: "movie",
            img: fetchImgByPath(poster_path),
            title: title,
            date: formatDate(release_date),
            rate: vote_average,
            tags: await Promise.all(
              genre_ids.map((genre) => fetchGenreById(genre))
            ),
          };

          return <MovieCard key={index} {...movieDetail} />;
        }
      )
    );

    return listMovie;
  } catch (err) {
    console.error(err);
  }
};

export const generateTVCards = async (category) => {
  try {
    const data = await fetchTVs(category);

    const listMovie = await Promise.all(
      data.results.map(
        async (
          { id, poster_path, name, first_air_date, vote_average, genre_ids },
          index
        ) => {
          const movieDetail = {
            id: id,
            media: "tv",
            img: fetchImgByPath(poster_path),
            title: name,
            date: formatDate(first_air_date),
            rate: vote_average,
            tags: await Promise.all(
              genre_ids.map((genre) => fetchGenreById(genre))
            ),
          };

          return <MovieCard key={index} {...movieDetail} />;
        }
      )
    );

    return listMovie;
  } catch (err) {
    console.error(err);
  }
};

export const generatePostCards = async (page) => {
  const offset = (page - 1 ?? 0) * 5;

  try {
    const response = await fetch(`${host}post?offset=${offset}`, {
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

    const listPost = json.rows.map(
      (
        { id, User, title, mediaType, mediaId, createdAt, commentCount },
        index
      ) => {
        const postData = {
          postId: id,
          username: User.username,
          color: User.color,
          title: title,
          mediaType: mediaType,
          mediaId: mediaId,
          date: formatDateTime(createdAt),
          commentCount: commentCount,
        };

        return <PostCard key={index} {...postData} />;
      }
    );

    return { listPost, count: Math.ceil(json.count / 5) };
  } catch (err) {
    console.log(err);
  }
};

export const generateCommentCards = async (postId) => {
  try {
    const response = await fetch(`${host}post/${postId}`, {
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

    const { User, title, createdAt, desc } = await response.json();

    const postData = {
      username: User.username,
      color: User.color,
      title: title,
      date: formatDateTime(createdAt),
      comment: desc,
    };

    const response2 = await fetch(`${host}post/${postId}/comment`, {
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

    const json = await response2.json();

    const commentList = json.map(({ User, createdAt, comment }, index) => {
      const commentData = {
        username: User.username,
        color: User.color,
        date: formatDateTime(createdAt),
        comment: comment,
      };

      return <PostCard key={index} {...commentData} />;
    });

    return { postData, commentList };
  } catch (err) {
    console.log(err);
  }
};

export function formatDateTime(inputDate) {
  if (!inputDate) return "N/A";
  const date = new Date(inputDate);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

function formatDate(inputDate) {
  if (!inputDate) return "N/A";
  const date = new Date(inputDate);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
