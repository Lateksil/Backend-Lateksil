import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import {
  handleResponse,
  handleResponseError,
  handleResponseSuccess,
} from "../utils/handleResponse.js";

export const Register = async (req, res) => {
  const { full_name, email, no_whatsapp, address, company_name, password } =
    req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const existingEmail = await Users.findOne({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return handleResponse(res, 404, "Email Sudah Terdaftar");
    }
    const user = await Users.create({
      full_name,
      email,
      no_whatsapp,
      address,
      company_name,
      password: hashPassword,
    });
    const result = {
      full_name: user.dataValues.full_name,
      email: user.dataValues.email,
      no_whatsapp: user.dataValues.no_whatsapp,
      address: user.dataValues.address,
      company_name: user.dataValues.company_name,
    };
    return handleResponseSuccess(res, result);
  } catch (error) {
    return handleResponseError(res);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return handleResponse(res, 404, "email atau password salah");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return handleResponse(res, 404, "email atau password salah");
    }
    const createToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ email: user.email, createToken });
  } catch (error) {
    return handleResponseError(res);
  }
};
