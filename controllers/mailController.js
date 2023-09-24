const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {
  handleResponseSuccess,
  handleResponseError,
  handleResponseAuthorization,
  handleResponse,
} = require("../utils/handleResponse");
const Users = require("../models/user");

exports.SendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return handleResponse(res, 404, "Email Tidak Ada");
    }

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
      from: "'Services | Laboratorium Teknik Sipil UBL' <no-reply@gmail.com>",
      to: email,
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
        return handleResponseAuthorization(res, "Gagal mengirim email");
      } else {
        return handleResponseSuccess(res, "Berhasil Mengirim email");
      }
    });
  } catch (error) {
    return handleResponseError(res);
  }
};
