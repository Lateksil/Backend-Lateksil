import jwt from "jsonwebtoken";
import { handleResponseAuthorization } from "../utils/handleResponse.js";

export const verifyTokenUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return handleResponseAuthorization(
      res,
      401,
      "Token Not Found! Please Check Data in Authorization"
    );
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return handleResponseAuthorization(
        res,
        403,
        "Token Expired Please login again"
      );
    }
    const role = (req.role = decoded.role);
    const email = (req.email = decoded.email);
    if (role === "user" && email) {
      next();
    } else {
      return handleResponseAuthorization(
        res,
        401,
        "Token Not Found! Please Check Data in Authorization"
      );
    }
  });
};
