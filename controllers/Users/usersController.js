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

export const updateUser = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        projects: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    const updatedUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: true,
      },
    });

    res.status(200);
    res.json({
      code: 200,
      message: "Success update user",
      data: updatedUser,
    });
  } catch (error) {
    res.status(401);
    console.log(error);
  }
};
