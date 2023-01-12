import jwt from "jsonwebtoken";
export const verifyAdmin = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(
    authorization.split(" ")[1],
    "iniSecretKey",
    function (err, decode) {
      const { role } = decode;

      if (role !== "admin") {
        res.status(401);
        res.json({
          message: "You're not permitted to the data",
        });
      } else {
        next();
      }
    }
  );
};

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const authSplit = authorization.split(" ");

  const [authType, authToken] = [authSplit[0], authSplit[1]];

  if (authType !== "Bearer") return res.status(401).end();

  if (!authToken) return res.status(401).end();

  jwt.verify(authToken, "iniSecretKey", function (err, decode) {
    if (err) return res.status(401).end();
    next();
  });
};
