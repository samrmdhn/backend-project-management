import prisma from "../../lib/prisma.js";
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        users: true,
      },
    });

    const projectsLength = await prisma.projects.count();

    res.status(200);

    res.json({
      code: 200,
      length: projectsLength,
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
  const findIdCompany = await prisma.company.findMany();

  const nameRandom = [
    "E-COMMERCE",
    "WEBSITE",
    "DATABASE",
    "ERP",
    "SAAS",
    "IOT",
    "CLOUD SERVICES",
    "DESIGN",
    "SEO",
    "DATA CENTER",
    "MARKETING",
  ];

  const randomStart = () => {
    const start = new Date(2000, 0, 1).getTime();
    const end = new Date(2019, 11, 31).getTime();
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);
    return randomDate.toISOString();
  };

  const randomEnd = () => {
    const start = new Date(2020, 0, 1).getTime();
    const end = new Date(2022, 11, 31).getTime();
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);
    return randomDate.toISOString();
  };

  const createRandomClient = () => {
    const random = Math.floor(Math.random() * clientRandom.length);
    const randomClient = clientRandom[random];
    return randomClient;
  };

  const createRandomName = () => {
    const number = Math.floor(Math.random() * nameRandom.length);
    const randomName = nameRandom[number];
    return randomName;
  };

  const randomData = () => {
    let data = [];

    for (let i = 0; i < 194; i++) {
      data.push({
        name: createRandomName(),
        budget: Math.floor(Math.random() * 1000000000 + 1),
        project_status: false,
        project_start: randomStart(),
        project_end: randomEnd(),
        companyId: "19a58da0-c85a-4de9-a94c-39e67ff72598",
      });
    }

    return data;
  };

  // const { client, name, budget, project_status, project_start } = req.body;

  try {
    const project = await prisma.projects.createMany({
      data: randomData(),
      skipDuplicates: true,
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
  // console.log(client);

  // console.log(req.query);
  /*
  if (req.query.budget !== "" && req.query.budget) {
    let fixNumber = Number(req.query.budget);
    req.query.budget = fixNumber;
  }
  */
  const queryString = {
    name: req.query.project,
    budget: {
      gte: Number(req.query.minimum) || 0,
      lte: Number(req.query.maximum) || 1000000000,
    },
    Company: {
      name: req.query.company,
    },
  };

  //console.log(queryString);

  //Pagination
  const page = req.query.page || 1;
  const skip_number = Number(page - 1) * Number(5);
  const take_number = Number(5);

  try {
    const project = await prisma.projects.findMany({
      where: queryString,
      skip: skip_number,
      take: take_number,
      include: {
        users: true,
        Company: true,
      },
      orderBy: {
        budget: "asc",
      },
    });

    //console.log(project);

    const projectLength = await prisma.projects.count({
      where: queryString,
    });

    console.log(project);
    console.log(projectLength);

    const range_start = Number(page - 1) * Number(5) + 1;
    const range_end = Math.min(range_start + take_number - 1, projectLength);

    //  console.log(project);

    res.status(200);
    res.json({
      message: "Success get data",
      code: 200,
      length: projectLength,
      pick: take_number,
      range: `Items ${range_start} - ${range_end} of ${projectLength}`,
      data: project,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.projects.findUnique({
      where: {
        id: id,
      },
      include: {
        users: true,
        Company: true,
      },
    });

    if (!project) res.status(404).json({ message: "Project not found" }).end();

    res.status(200);

    res.json({
      code: 200,
      data: project,
      message: "Success get project data",
    });
  } catch (error) {
    console.log(error);
  }
};
