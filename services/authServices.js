const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.SendVerificationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: 'balapmotor70@gmail.com',
        pass: 'xktmutuxxxqdtydx',
      },
    });

    const verificationCode = crypto.randomInt(1000, 10000).toString();

    user.verificationCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: 'balapmotor70@gmail.com',
      to: user.email,
      subject: 'Verifikasi Email',
      text:
        `Halo ${user.full_name} \n\n` +
        'Terima kasih telah mendaftar. Berikut adalah kode verifikasi Anda:\n\n' +
        `Code : ${verificationCode}\n\n` +
        'Silakan masukkan kode tersebut pada halaman verifikasi akun Anda.\n\n' +
        'Salam,\n' +
        'Tim Support',
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
