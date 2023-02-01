import express from "express";
import { register, login } from "../controllers/Auth/authController.js";
import {
  createCompany,
  getCompany,
  getCompanyById,
} from "../controllers/Company/companyController.js";
import {
  createProject,
  getProjectById,
  getProjects,
  searchProject,
} from "../controllers/Projects/projectsController.js";
import {
  getUsers,
  getUsersID,
  updateUser,
} from "../controllers/Users/usersController.js";
import { verifyAdmin, verifyToken } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/projects", verifyToken, verifyAdmin, getProjects);
router.post("/projects", createProject);
router.get("/project/search", verifyToken, verifyAdmin, searchProject);
router.get("/project/:id", verifyToken, verifyAdmin, getProjectById);

router.post("/company", createCompany);
router.get("/company", getCompany);
router.get("/company/:id", getCompanyById);

router.get("/users", getUsers);
router.put("/users", updateUser);
router.get("/users/:id", verifyToken, getUsersID);
router.post("/register", register);
router.post("/login", login);

export default router;
