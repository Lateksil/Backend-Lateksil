const fs = require("fs");

const Users = require("../models/user.js");
const Order = require("../models/order.js");
const TeknisiPengujian = require("../models/teknisiPengujian.js");
const {
  handleResponseAuthorization,
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
} = require("../utils/handleResponse.js");
const Status = require("../models/status.js");
const Project = require("../models/project.js");
const Item = require("../models/itemOrder.js");
const Pengujian = require("../models/pengujian.js");
const { Op } = require("sequelize");

exports.GetAllTeknisi = async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Users.findAndCountAll({
      where: {
        role: "teknisi",
      },
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      attributes: [
        "id",
        "full_name",
        "email",
        "no_whatsapp",
        "address",
        "company_name",
      ],
      include: [
        {
          model: TeknisiPengujian,
          attributes: ["status_penugasan"],
          required: false,
        },
      ],
    });

    return res.status(200).json({
      status: 200,
      error: false,
      message: "success",
      data: rows,
      limit,
      totalData: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.GetRiwayatTeknisiStandById = async (req, res) => {
  const { id } = req.params;

  try {
    const dataOrderRiwayat = await Users.findOne({
      where: {
        id,
        role: "teknisi",
      },
      attributes: [
        "id",
        "full_name",
        "email",
        "no_whatsapp",
        "address",
        "company_name",
        "image_profile",
      ],
      include: [
        {
          model: TeknisiPengujian,
          where: {
            status_penugasan: "1",
          },
          attributes: ["id", "file_task_pengujian", "status_penugasan"],
          required: false,
          include: [
            {
              model: Order,
              attributes: ["id", "file_result_pengujian"],
              include: [
                {
                  model: Users,
                  attributes: ["id", "company_name", "full_name"],
                },
                {
                  model: Project,
                  as: "proyek",
                  attributes: [
                    "id",
                    "nama_proyek",
                    "tanggal_mulai",
                    "tanggal_selesai",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      status: 200,
      error: false,
      message: "success",
      data: dataOrderRiwayat,
    });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.GetRiwayatTeknisiOnGoingById = async (req, res) => {
  const { id } = req.params;

  try {
    const dataOrderRiwayat = await Users.findOne({
      where: {
        id,
        role: "teknisi",
      },
      attributes: ["id"],
      include: [
        {
          model: TeknisiPengujian,
          where: {
            status_penugasan: "0",
          },
          attributes: ["id", "status_penugasan"],
          required: false,
          include: [
            {
              model: Order,
              attributes: ["id", "file_result_pengujian"],
              include: [
                {
                  model: Users,
                  attributes: ["id", "company_name", "full_name"],
                },
                {
                  model: Project,
                  as: "proyek",
                  attributes: [
                    "id",
                    "nama_proyek",
                    "tanggal_mulai",
                    "tanggal_selesai",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      status: 200,
      error: false,
      message: "success",
      data: dataOrderRiwayat,
    });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.GetDetailRiwayatByIdTeknisiPengujian = async (req, res) => {
  const { id } = req.params;
  try {
    const findDataRiwayat = await TeknisiPengujian.findByPk(id);

    if (!findDataRiwayat) {
      return handleResponseNotFound(res);
    }

    const dataRiwayatOrder = await TeknisiPengujian.findOne({
      where: {
        id,
      },
      attributes: ["id", "file_task_pengujian", "status_penugasan"],
      include: [
        {
          model: Order,
          attributes: ["id", "total_price"],
          include: [
            {
              model: Users,
              attributes: [
                "id",
                "full_name",
                "email",
                "no_whatsapp",
                "address",
                "company_name",
                "image_profile",
              ],
            },
            {
              model: Status,
              as: "status",
              attributes: [
                "id",
                "status_persetujuan", // PERSETUJUAN
                "status_transaction", // STATUS TRANSACTION
                "status_payment", // PAY OR NOT PAY
                "accept_payment", // LUNAS
              ],
            },
            {
              model: Project,
              as: "proyek",
              attributes: { exclude: ["keterangan_to_client"] },
            },
            {
              model: Item,
              attributes: ["id"],
              include: [
                {
                  model: Pengujian,
                  attributes: [
                    "id",
                    "jenis_pengujian",
                    "tempat_pengujian",
                    "code",
                    "category",
                    "sampler",
                    "price",
                  ],
                },
              ],
              through: { attributes: ["quantity"] },
            },
          ],
        },
      ],
    });

    return handleResponseSuccess(res, dataRiwayatOrder);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.CreateTeknisiPengujian = async (req, res) => {
  const { teknisi_id, order_id } = req.body;
  try {
    const findUser = await Users.findByPk(teknisi_id);

    const findOrder = await Order.findByPk(order_id);

    if (!findUser && !findOrder) {
      return handleResponseNotFound(res);
    }

    const createTeknisiPengujian = await TeknisiPengujian.create({
      UserId: teknisi_id,
      orderId: order_id,
    });

    return handleResponseSuccess(res, createTeknisiPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.GetAllTeknisiPengujian = async (req, res) => {
  try {
    const getAllTeknisiPengujian = await TeknisiPengujian.findAll({
      attributes: { exclude: ["UserId", "orderId"] },
      include: [
        {
          model: Users,
          as: "teknisi",
          attributes: [
            "id",
            "full_name",
            "email",
            "no_whatsapp",
            "address",
            "company_name",
          ],
        },
        {
          model: Order,
          include: [
            {
              model: Users,
              attributes: [
                "id",
                "full_name",
                "email",
                "no_whatsapp",
                "address",
                "company_name",
              ],
            },
            {
              model: Status,
              as: "status",
              attributes: [
                "id",
                "status_persetujuan",
                "status_transaction",
                "status_payment",
              ],
            },
            {
              model: Project,
              as: "proyek",
            },
            {
              model: Item,
              attributes: ["id"],
              include: [
                {
                  model: Pengujian,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
              through: { attributes: ["quantity"] },
            },
          ],
        },
      ],
    });

    return handleResponseSuccess(res, getAllTeknisiPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.GetTeknisiByOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const getAllTeknisiPengujian = await TeknisiPengujian.findAll({
      where: { orderId: id },
      attributes: { exclude: ["UserId"] },
      include: [
        {
          model: Users,
          as: "teknisi",
          attributes: ["id", "full_name"],
        },
      ],
    });

    return handleResponseSuccess(res, getAllTeknisiPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.deleteTeknisiPengujian = async (req, res) => {
  const { id } = req.params;
  try {
    const teknisiPengujian = await TeknisiPengujian.findByPk(id);

    if (!teknisiPengujian) {
      return handleResponseNotFound(res);
    }
    await TeknisiPengujian.destroy({
      where: { id: id },
    });

    return handleResponseDeleteSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.GetTeknisiByUserId = async (req, res) => {
  const { teknisi_id, status_task = "", page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await TeknisiPengujian.findAndCountAll({
      where: {
        UserId: teknisi_id,
        status_task: {
          [Op.like]: `%${status_task}%`,
        },
      },
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      include: [
        {
          model: Order,
          include: [
            {
              model: Users,
              attributes: ["id", "full_name", "company_name"],
            },
            {
              model: Project,
              as: "proyek",
              attributes: [
                "id",
                "nama_proyek",
                "tujuan_proyek",
                "no_surat",
                "no_identifikasi",
                "tanggal_mulai",
                "tanggal_selesai",
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      status: 200,
      error: false,
      message: "success",
      data: rows,
      limit,
      totalData: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.uploadLaporanTeknisi = async (req, res) => {
  const { id, status_task, status_pengerjaan } = req.body;

  try {
    const statusPengerjaan = await TeknisiPengujian.findByPk(id);

    if (!statusPengerjaan) {
      return handleResponseNotFound(res);
    }

    if (statusPengerjaan.id === id) {
      await TeknisiPengujian.update(
        {
          status_task: status_task,
          status_pengerjaan: status_pengerjaan,
          status_penugasan: "1", // SELESAI
          file_task_pengujian: req.file
            ? req.file.filename
            : statusPengerjaan.file_task_pengujian,
        },
        { where: { id: id } }
      );
    }
    return handleResponseAuthorization(
      res,
      200,
      "Berhasil Perubahaan Task Selanjutnya"
    );
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.viewTaskPengujianPDF = async (req, res) => {
  const { name } = req.params;

  try {
    // Mencari informasi file dari database berdasarkan nama file
    const pdf = await TeknisiPengujian.findOne({
      where: { file_task_pengujian: name },
    });
    if (!pdf) {
      res.status(404).send("File tidak ditemukan");
    } else {
      // Membaca file PDF
      const filePath = `uploads/filePdf/task-pengujian/${pdf.file_task_pengujian}`; // Ganti dengan direktori file PDF yang sesuai
      const fileStream = fs.createReadStream(filePath);
      res.setHeader("Content-Type", "application/pdf");
      fileStream.pipe(res);
    }
  } catch (error) {
    res.status(500).send("Terjadi kesalahan saat membaca file");
  }
};

exports.downloadTaskPengujianPDF = async (req, res) => {
  const { name } = req.params;

  try {
    // Mencari informasi file dari database berdasarkan nama file
    const pdf = await TeknisiPengujian.findOne({
      where: { file_task_pengujian: name },
    });
    if (!pdf) {
      res.status(404).send("File tidak ditemukan");
    } else {
      // Membaca file PDF menggunakan pdfjs-dist
      const filePath = `uploads/filePdf/task-pengujian/${pdf.file_task_pengujian}`;
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${pdf.file_task_pengujian}`
      );
      res.setHeader("Content-Type", "application/pdf");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  } catch (error) {
    res.status(500).send("Terjadi kesalahan saat membaca file");
  }
};
