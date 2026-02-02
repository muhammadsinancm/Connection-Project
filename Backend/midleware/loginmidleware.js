import jwt from "jsonwebtoken";

const loginMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ success:false, message:"No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();

  } catch (error) {
    console.log(error.message);
    return res.json({ success:false, message:"Invalid Token" });
  }
};

export default loginMiddleware;
