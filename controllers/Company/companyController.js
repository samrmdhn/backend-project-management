import prisma from "../../lib/prisma.js";
export const createCompany = async (req, res) => {
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
  const company = await prisma.company.findMany();

  res.status(200);
  res.json({
    code: 200,
    status: "OK",
    data: company,
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
    length: projectLength,
    message: "Succes get project",
    data: company,
  });
};
