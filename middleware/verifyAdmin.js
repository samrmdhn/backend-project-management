import jwt from "jsonwebtoken";export const verifyAdmin = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(
    authorization.split(" ")[1],
    "iniSecretKey",
    function (err, decode) {
      const { role } = decode;

      if (role !== "admin") {
        res
          .status(401)
          .json({
            message: "You're not permitted access data",
          })
          .end();
      } else {
        next();
      }
    }
  );
};

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(403).json({ message: "You are unauthenticated" }).end();

  const authSplit = authorization.split(" ");

  const [authType, authToken] = [authSplit[0], authSplit[1]];

  if (authType !== "Bearer")
    return res
      .status(403)
      .json({ message: "Error authentication/authorization type" })
      .end();

  if (!authToken)
    return res.status(403).json({ message: "Error token is not valid" }).end();

  jwt.verify(authToken, "iniSecretKey", function (err, decode) {
    if (err)
      return res.status(403).json({ message: "Invalid token submitted" }).end();
    next();
  });
};
