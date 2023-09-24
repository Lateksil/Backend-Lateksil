const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Users = require("../models/user.js");
const {
  handleResponse,
  handleResponseError,
  handleResponseSuccess,
  handleResponseAuthorization,
} = require("../utils/handleResponse.js");
const {
  SendResetPassowordLink,
  SendVerificationEmail,
} = require("../services/authServices.js");

exports.Register = async (req, res) => {
  const { full_name, email, no_whatsapp, address, company_name, password } =
    req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const existingEmail = await Users.findOne({
      where: {
        email,
        isVerified: true,
      },
    });
    if (existingEmail) {
      return handleResponse(res, 404, "Email Sudah Terdaftar");
    }

    const verifiedEmail = await Users.findOne({
      where: {
        email,
        isVerified: false,
      },
    });

    if (verifiedEmail) {
      verifiedEmail.full_name = full_name;
      verifiedEmail.email = email;
      verifiedEmail.no_whatsapp = no_whatsapp;
      verifiedEmail.address = address;
      verifiedEmail.company_name = company_name;
      verifiedEmail.password = hashPassword;
      await verifiedEmail.save();

      await SendVerificationEmail(verifiedEmail);

      return handleResponseSuccess(
        res,
        "Pendaftaran berhasil. Silakan periksa email Anda untuk verifikasi."
      );
    }

    const user = await Users.create({
      full_name,
      email,
      no_whatsapp,
      address,
      company_name,
      password: hashPassword,
    });
    // await SendVerificationEmail(create);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "balapmotor70@gmail.com",
        pass: "xktmutuxxxqdtydx",
      },
    });

    const verificationCode = crypto.randomInt(1000, 10000).toString();

    user.verificationCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: "balapmotor70@gmail.com",
      to: user.email,
      subject: "Verifikasi Email",
      text:
        `Halo ${user.full_name} \n\n` +
        "Terima kasih telah mendaftar. Berikut adalah kode verifikasi Anda:\n\n" +
        `Code : ${verificationCode}\n\n` +
        "Silakan masukkan kode tersebut pada halaman verifikasi akun Anda.\n\n" +
        "Salam,\n" +
        "Tim Support",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Gagal mengirim email:", error);
      } else {
        console.log("Email berhasil dikirim:", info.response);
      }
    });

    return handleResponseSuccess(res, "Pendaftaran Akun berhasil");
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.VerifyCodeRegister = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Users.findOne({ where: { email, isVerified: false } });

    if (user) {
      if (user.verificationCode === code) {
        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        return handleResponseAuthorization(
          res,
          200,
          "Verifikasi berhasil. Akun Anda telah diaktifkan"
        );
      } else {
        return handleResponseAuthorization(
          res,
          400,
          "Kode verifikasi tidak cocok. Silakan coba lagi."
        );
      }
    } else {
      return handleResponseAuthorization(
        res,
        404,
        "Pengguna tidak ditemukan atau akun telah terverifikasi."
      );
    }
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
        isVerified: true,
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

    const user = await Users.findOne({ where: { email, isVerified: true } });

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
      where: { reset_password_token: token, isVerified: true },
    });

    if (!user) {
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

exports.ChangePassword = async (req, res) => {
  const { id, old_password, new_password } = req.body;
  try {
    const user = await Users.findByPk(id);

    const salt = await bcrypt.genSalt();
    const isValidPassword = await bcrypt.compare(old_password, user.password);

    if (!isValidPassword) {
      return handleResponse(res, 404, "Wrong old password");
    }
    const newHashPassword = await bcrypt.hash(new_password, salt);

    user.password = newHashPassword;
    await user.save();

    return handleResponseSuccess(res, "Berhasil Ganti Password");
  } catch (error) {
    return handleResponseError(res);
  }
};
