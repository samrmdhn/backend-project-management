import express from "express";import ProjectRoutes from "./routes/ProjectRoutes.js";
import cors from "cors";

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(ProjectRoutes);

app.listen(port, () => {
  console.log(`Server run in ${port}`);
});
