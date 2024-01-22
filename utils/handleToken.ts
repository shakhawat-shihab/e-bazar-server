import jwt from "jsonwebtoken";
import IResponse from "../interfaces/http/responseInterface";

const generateToken = (data: IResponse) => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30d",
  });

  return token;
};

export { generateToken };
