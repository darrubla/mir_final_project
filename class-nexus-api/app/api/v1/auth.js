import jwt from "jsonwebtoken";

import { configuration } from "../../config.js";

const { token } = configuration;
const { secret, expires } = token;

export const signToken = (payload, expiresIn = expires) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const auth = (req, res, next) => {
  let token = req.headers.authorization || "";
  if (token.startsWith("Bearer")) {
    token = token.substring(7); // Para eliminar bearer
  }

  if (!token) {
    return next({
      message: "Forbidden",
      status: 403,
    });
  }

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return next({
        message: "Forbidden token invalid",
        status: 403,
      });
    }

    req.decoded = decoded;
    next();
  });
};

export const me = (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { id: studentId } = decoded;
  const { id } = params;
  if (studentId !== id) {
    return next({
      message: "Forbidden me",
      status: 403,
    });
  }
  next();
};

export const owner = (req, res, next) => {
  const { decoded = {}, data = {} } = req;
  const { id: studentOwnerId } = decoded;
  const { studentId } = data;
  console.log(":::");
  console.log(decoded);

  if (studentOwnerId !== studentId) {
    return next({
      message: "Forbidden owner",
      status: 403,
    });
  }
  next();
};
