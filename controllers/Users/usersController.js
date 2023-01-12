import prisma from "../../lib/prisma.js";
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        projects: true,
      },
    });
    res.status(200);
    res.json({
      code: 200,
      status: "ok",
      data: users,
    });
  } catch (error) {
    res.status(400).end();
  }
};

export const getUsersID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.headers);

    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.json({
      code: 200,
      status: "ok",
      data: user,
    });
  } catch (error) {
    res.status(400).end();
  }
};
