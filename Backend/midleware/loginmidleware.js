import jwt from "jsonwebtoken";

const loginMiddleware = async (req, res, next) => {

  try{
    const {token} = req.headers;

    if(!token){
      return res.status(401).json({message:"No token"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  }catch(err){
    return res.status(401).json({message:"Invalid token"});
  }
};

export default loginMiddleware;
