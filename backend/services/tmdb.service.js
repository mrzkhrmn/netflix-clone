fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

export const fetchFromTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);

    // Hata kontrolü
    if (!response.ok) {
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }

    // Veriyi JSON formatında döndür
    const data = await response.json();
    return data;
  } catch (error) {
    // Hata durumunda mesajı at
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
};
