const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.js");
const {
  handleResponse,
  handleResponseError,
  handleResponseSuccess,
} = require("../utils/handleResponse.js");

exports.Register = async (req, res) => {
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

    await Users.create({
      full_name,
      email,
      no_whatsapp,
      address,
      company_name,
      password,
    });

    return handleResponseSuccess(res, "Pendaftaran Akun berhasil.");
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.Login = async (req, res) => {
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
    // if (user.password !== password) {
    //   return handleResponse(res, 404, 'email atau password salah');
    // }

    const createToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ email: user.email, createToken });
  } catch (error) {
    return handleResponseError(res);
  }
};
