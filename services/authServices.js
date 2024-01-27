const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.SendVerificationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
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

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Gagal mengirim email:", error);
      } else {
        console.log("Email berhasil dikirim:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.SendResetPassowordLink = async ({ email, full_name, token }) => {
  try {
    const transporter = nodemailer.createTransport("SMTP", {
      service: "gmail",
      secure: false,
      auth: {
        user: "balapmotor70@gmail.com",
        pass: "xktmutuxxxqdtydx",
      },
    });

    const mailOptions = {
      from: "'Services | Laboratorium Teknik Sipil UBL' <no-reply@gmail.com>",
      to: email,
      subject: "Permintaan Perubahaan Password Akun Laboratorium Teknik Sipil",
      html: `
      <div style="text-align: center;">
        <h2>Ganti Password Baru</h2>
        <p>Helo ${full_name},</p>
        <p>Klik tombol di bawah ini untuk mengganti kata sandi Anda:</p>
        <a href="${process.env.BASE_URL_CLIENT}/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: #2c5281; color: #fff; text-decoration: none; border-radius: 5px;">Ganti Password</a>
        <p>Jika Tombol tidak berfungsi, akses URL berikut:</p>
        <p>${process.env.BASE_URL_CLIENT}/reset-password/${token}</p>
      </div>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Gagal mengirim email:", error);
      } else {
        console.log("Email berhasil dikirim:", info.response);
      }
    });

    // await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //       res.status(500).json({
    //         status: 500,
    //         message: "Gagal mengirim email",
    //         statusError: err,
    //       });
    //       reject(err);
    //     } else {
    //       res.status(200).json({
    //         status: 200,
    //         message: "Berhasil mengirim email",
    //       });
    //       resolve(info);
    //     }
    //   });
    // });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server Internal error",
    });
  }
};
