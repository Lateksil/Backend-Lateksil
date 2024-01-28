const nodemailer = require("nodemailer");
const crypto = require("crypto");
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

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'balapmotor70@gmail.com',
        pass: 'kkjpksqfbtgaalnx',
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
    res.status(500).json({
      status: 500,
      message: "Server Internal error",
    });
  }
};

exports.sendEmailTahapPermintaan = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'balapmotor70@gmail.com',
        pass: 'kkjpksqfbtgaalnx',
      },
    });

    const users = await Users.findAll({
      where: {
        role: "frontliner",
      },
    });

    const recipients = users.map((user) => user.email).join(", ");

    const mailOptions = {
      from: "'Ada Pesanan Masuk!' <no-reply@gmail.com>",
      to: recipients,
      subject: "Tahap Permintaan Pemesanan Dari PT. INDONESIA",
      html: `
          <div class="es-wrapper-color" style="background-color:#F6F6F6">
           <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
             <tr>
              <td valign="top" style="padding:0;Margin:0">
               <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                 <tr>
                  <td align="center" style="padding:0;Margin:0">
                   <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                       <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr class="es-visible-simple-html-only">
                              <td align="center" bgcolor="#2c5281" style="padding:10px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#f6f3f3;font-size:14px"><b>Pesanan Masuk!</b></p></td>
                             </tr>
                             <tr class="es-visible-simple-html-only">
                              <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:11px">Berikut ini adalah pesanan order masuk ke tahap permintaan, Atas Nama Perusahaan <strong>PT INDONESIA.</strong> (Deva Aji Saputra)<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:11px"><strong></strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:11px">Silahkan Cek Kembali di website&nbsp;</p></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
               <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                 <tr>
                  <td align="center" style="padding:0;Margin:0">
                   <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr class="es-visible-simple-html-only">
                              <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:11px">Salam hangat,</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:11px">Tim Support</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
          </div>
        `,
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
    res.status(500).json({
      status: 500,
      message: "Server Internal error",
    });
  }
};
