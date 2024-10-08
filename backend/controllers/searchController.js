import { User } from "../models/userModel.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].title,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json(response.results);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ error: error.message });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json(response.results);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ error: error.message });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json(response.results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json(req.user.searchHistory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;

    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id } },
    });

    res.status(200).json({ message: "History has been deleted!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
