import prisma from "../../lib/prisma.js";export const createCompany = async (req, res) => {
  const clientRandom = [
    "BNI",
    "BRI",
    "BANK MEGA",
    "DANAMON",
    "NEFLIX",
    "BCA",
    "GOOLE",
    "FACEBOOK",
    "HBO",
    "UOB",
    "PEMPROV DKI JAKARTA",
    "PEMPROV JABAR",
    "DINAS KESEHATAN KOTA BANDUNG",
    "DINKES BANDUNG",
    "PUSKESMAS",
    "AMAZON",
    "ACER",
    "ASUS",
    "APPLE",
    "PT. SZY",
    "PT. SEJAHTERA SENTOAS",
    "KEMENTRIAN KESEHATAN",
  ];

  const addName = [];

  clientRandom.map((client, index) => {
    addName.push({ name: client });
  });

  const company = await prisma.company.createMany({
    data: addName,
  });

  res.status(201);
  res.json({
    code: 201,
    status: "OK",
    data: company,
  });
};

export const getCompany = async (req, res) => {
  const company = await prisma.company.findMany({
    select: {
      name: true,
    },
  });

  const companyLength = await prisma.company.count();

  const companyProject = await prisma.company.findMany({
    select: {
      name: true,
      _count: {
        select: {
          projects: true,
        },
      },
    },
  });

  res.status(200);
  res.json({
    code: 200,
    status: "OK",
    message: "Success get company length",
    data: {
      company_total: companyLength,
      projects_of_company: companyProject,
    },
  });
};

export const getCompanyById = async (req, res) => {
  const { id } = req.params;

  const company = await prisma.company.findUnique({
    where: {
      id: id,
    },
    include: {
      projects: true,
    },
  });

  const projectLength = await prisma.projects.count({
    where: {
      companyId: id,
    },
  });

  res.status(200);
  res.json({
    code: 200,
    status: "OK",
    message: "Succes get project",
    projects_length: projectLength,
    data: company,
  });
};
