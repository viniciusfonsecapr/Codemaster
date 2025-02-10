import jwt from "jsonwebtoken";

const secretKey = "minha-chave-secreta";

const generateToken = (user: any) => {
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  return token;
};

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado" });
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ message: "Acesso não autorizado" });
    }
    req.user = user;
    next();
  });
};

export { generateToken, verifyToken };
