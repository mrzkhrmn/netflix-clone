import express from "express";
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/searchController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);
router.delete("/history/:id", protectRoute, removeItemFromSearchHistory);

export default router;
