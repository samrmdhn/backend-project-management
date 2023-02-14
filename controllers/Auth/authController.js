import prisma from "../../lib/prisma.js";import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const user = await prisma.users.create({
      data: {
        username: username,
        password: passwordHash,
        role: "admin",
      },
    });

    res.status(200);

    res.json({
      code: 200,
      status: "ok",
      data: user,
      message: "Success register",
    });
  } catch (error) {
    res.status(400).end();
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      res
        .status(403)
        .json({ message: "Username or password did not match" })
        .end();
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res
        .status(403)
        .json({ message: "Username or password did not match" })
        .end();
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      "iniSecretKey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200);
    res.json({
      code: 200,
      token: token,
      message: "Success login",
    });
  } catch (error) {
    res.status(400).end();
  }
};
