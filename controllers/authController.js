import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import { SendVerificationEmail } from "../services/authServices.js";
import {
  handleResponse,
  handleResponseAuthorization,
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

    await SendVerificationEmail(user);

    return handleResponseSuccess(
      res,
      "Pendaftaran berhasil. Silakan periksa email Anda untuk verifikasi."
    );
  } catch (error) {
    return handleResponseError(res);
  }
};

export const VerifyCodeRegister = async (req, res) => {
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

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

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
