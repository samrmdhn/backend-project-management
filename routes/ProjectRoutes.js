import express from "express";
import { register, login } from "../controllers/Auth/authController.js";
import {
  createProject,
  getProjects,
  searchProject,
} from "../controllers/Projects/projectsController.js";
import { getUsers, getUsersID } from "../controllers/Users/usersController.js";
import { verifyAdmin, verifyToken } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/projects", verifyToken, verifyAdmin, getProjects);
router.post("/projects", verifyToken, verifyAdmin, createProject);
router.get("/project/search", searchProject);
router.get("/users", getUsers);
router.get("/users/:id", verifyToken, getUsersID);
router.post("/register", register);
router.post("/login", login);

export default router;
