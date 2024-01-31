const apiKey = "api_key=6f2e52edcd453db0d1ff76a8bdb66fcf";
const options = { method: "GET", headers: { accept: "application/json" } };

export const searchMulti = async (query) => {
  const url = `https://api.themoviedb.org/3/search/multi?language=en-US&include_adult=false&vote_count.gte=10&query=${encodeURIComponent(
    query
  )}&${apiKey}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Filter item dengan tipe 'person'
    const filteredResults = data.results.filter(
      (item) => item.media_type !== "person"
    );

    // Sortir list berdasarkan popularitas dari atas ke bawah
    const sortedResults = filteredResults.sort(
      (a, b) => b.popularity - a.popularity
    );

    return sortedResults;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const searchWithFilter = async (category, genre, sort, page) => {
  const url = `https://api.themoviedb.org/3/discover/${category}?language=en-US&include_adult=false&page=${
    page || 1
  }&with_genres=${genre}&sort_by=${sort || "popularity.desc"}&${apiKey}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const fetchMediaById = async (category, id) => {
  const url = `https://api.themoviedb.org/3/${category}/${id}?${apiKey}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const fetchMovies = async (category) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&${apiKey}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const fetchTVs = async (category) => {
  const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1&${apiKey}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const fetchGenreById = async (id) => {
  const url = `https://api.themoviedb.org/3/genre/${id}?${apiKey}`;
  try {
    const response = await fetch(url, options);
    const { name } = await response.json();
    return name;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const fetchImgByPath = (path) => {
  const url = `https://image.tmdb.org/t/p/original${path}?${apiKey}`;
  return url;
};
