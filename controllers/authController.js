const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.js");
const {
  handleResponse,
  handleResponseError,
  handleResponseSuccess,
} = require("../utils/handleResponse.js");
const { SendResetPassowordLink } = require("../services/authServices.js");

exports.Register = async (req, res) => {
  const { full_name, email, no_whatsapp, address, company_name, password } =
    req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return handleResponse(res, 404, "Email Sudah Terdaftar");
    }

    await Users.create({
      full_name,
      email,
      no_whatsapp,
      address,
      company_name,
      password: hashPassword,
    });

    return handleResponseSuccess(res, "Pendaftaran Akun berhasil.");
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
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
      { expiresIn: "1d" }
    );

    res.status(200).json({ email: user.email, createToken });
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return handleResponse(res, 404, "Email Belum Terdaftar");
    }
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    user.reset_password_token = token;

    await user.save();

    SendResetPassowordLink({
      email: user.email,
      full_name: user.full_name,
      token: token,
    });
    return handleResponseSuccess(res, "Reset Password Terkirim");
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await Users.findOne({
      where: { reset_password_token: token },
    });

    if(!user) {
      return handleResponse(res, 404, "Gagal, Silahkan ajukan permintaan");
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;
    user.reset_password_token = null;
    await user.save();

    return handleResponseSuccess(res, "Berhasil Ganti Kata sandi");
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
