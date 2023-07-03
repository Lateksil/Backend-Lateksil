import fs from "fs";
import path from "path";

import Users from "../models/user.js";
import Order from "../models/order.js";
import TeknisiPengujian from "../models/teknisiPengujian.js";
import {
  handleResponseAuthorization,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
} from "../utils/handleResponse.js";
import Status from "../models/status.js";
import Project from "../models/project.js";
import Item from "../models/itemOrder.js";
import Pengujian from "../models/pengujian.js";
import { Op } from "sequelize";
import Teknisi from "../models/teknisi.js";

export const GetAllTeknisi = async (req, res) => {
  try {
    const teknisi = await Users.findAll({
      where: {
        role: "teknisi",
      },
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
        },
      ],
    });

    return handleResponseSuccess(res, teknisi);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const CreateTeknisiPengujian = async (req, res) => {
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

export const GetAllTeknisiPengujian = async (req, res) => {
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

export const GetTeknisiByOrder = async (req, res) => {
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

export const GetTeknisiByUserId = async (req, res) => {
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

export const StatusPengerjaanTeknisi = async (req, res) => {
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

export const viewTaskPengujianPDF = async (req, res) => {
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

export const downloadTaskPengujianPDF = async (req, res) => {
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

///TESSTINGGG

export const addTeknisi = async (req, res) => {
  try {
    const teknisiAdd = await Teknisi.create({
      UserId: "131b0e64-c236-47d7-99b0-99de52fe1973",
    });

    return handleResponseSuccess(res, teknisiAdd);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
