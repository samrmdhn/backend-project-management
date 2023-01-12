import prisma from "../../lib/prisma.js";
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        users: true,
      },
    });

    res.status(200);

    res.json({
      data: projects,
      message: "Success get all projects",
    });
  } catch (error) {
    res.json({
      message: "token error",
    });
    res.status(401).end();
    console.log(error);
  }
};

export const createProject = async (req, res) => {
  const { client, name, budget, project_status, project_start } = req.body;
  try {
    const project = await prisma.projects.create({
      data: {
        client,
        name,
        budget,
        project_status,
        project_start,
      },
    });
    res.status(200);
    res.json({
      code: 200,
      message: "Project has been created",
      data: project,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchProject = async (req, res) => {
  // const client = req.query.client;

  // console.log(client);

  if (req.query.budget !== "" && req.query.budget) {
    let fixNumber = Number(req.query.budget);
    req.query.budget = fixNumber;
  }

  try {
    const project = await prisma.projects.findMany({
      where: req.query,
    });

    res.status(200);
    res.json({
      message: "Success get data",
      data: project,
    });
  } catch (error) {
    console.log(error);
  }
};
