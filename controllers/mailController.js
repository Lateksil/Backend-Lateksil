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
      res.status(404).json({
        status: 404,
        message: "Email Tidak Terdaftar",
      });
    }

    const transporter = nodemailer.createTransport("SMTP", {
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

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).json({
            status: 500,
            message: "Gagal mengirim email",
            statusError: err,
          });
          reject(err);
        } else {
          res.status(200).json({
            status: 200,
            message: "Berhasil mengirim email",
          });
          resolve(info);
        }
      });
    });
  } catch (error) {
    return handleResponseError(res);
  }
};
