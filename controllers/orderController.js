import db from "../config/database.js";
import fs from "fs";
import { Op } from "sequelize";
import Cart from "../models/cart.js";
import Item from "../models/itemOrder.js";
import Order from "../models/order.js";
import OrderPengujian from "../models/orderPengujian.js";
import Pengujian from "../models/pengujian.js";
import Project from "../models/project.js";
import Status from "../models/status.js";
import Users from "../models/user.js";
import {
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseAuthorization,
  handleResponseUpdateSuccess,
} from "../utils/handleResponse.js";
import Payment from "../models/payment.js";

export const CreateOrder = async (req, res) => {
  const {
    user_id,
    total_price,
    nama_proyek,
    tujuan_proyek,
    no_whatsApp_proyek,
  } = req.body;

  const t = await db.transaction();
  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return handleResponseNotFound(res);
    }

    const cart = await Cart.findAll({
      where: {
        UserId: user_id,
      },
      attributes: ["id", "quantity", "PengujianId"],
    });

    if (cart.length === 0) {
      return handleResponseAuthorization(res, 404, "Cart not found");
    }

    const order = await Order.create(
      {
        UserId: user_id,
        total_price,
        proyek: {
          nama_proyek,
          tujuan_proyek,
          no_whatsApp_proyek,
        },
        status: {
          status_persetujuan: "1",
        },
      },
      {
        include: [
          { model: Status, as: "status" },
          { model: Project, as: "proyek" },
        ],
      }
    );

    for (const product of cart) {
      await Item.create(
        {
          id: product.id,
          UserId: user_id,
          PengujianId: product.PengujianId,
          quantity: product.quantity,
        },
        { transaction: t }
      );

      await OrderPengujian.create(
        {
          orderId: order.id,
          quantity: product.quantity,
          itemOrderId: product.id,
        },
        { transaction: t }
      );
    }

    await Cart.destroy({ where: { UserId: user_id } });

    await t.commit();

    return handleResponseSuccess(res, "Order Berhasil!");
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const getOrderByUser = async (req, res) => {
  const { user_id, page = 1, status_transaction = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Order.findAndCountAll({
      where: {
        UserId: user_id,
      },
      offset,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit, 10),
      distinct: true,
      include: [
        {
          model: Users,
          attributes: ["id", "full_name", "company_name"],
        },
        {
          model: Status,
          as: "status",
          where: {
            status_transaction: status_transaction.toString(),
          },
          attributes: ["id", "status_transaction", "status_payment"],
        },
        {
          model: Project,
          as: "proyek",
        },
        {
          model: Payment,
          as: "payment",
          attributes: ["image_kwitansi"],
        },
        {
          model: Item,
          where: {
            UserId: user_id,
          },
          attributes: ["id"],
          through: { attributes: ["quantity"] },
        },
      ],
      attributes: { exclude: ["UserId", "updatedAt"] },
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

export const getAllOrder = async (req, res) => {
  const {
    page = 1,
    status_persetujuan = "",
    search = "",
    limit = 10,
  } = req.body;

  let whereClauseUsers = {};

  const offset = (page - 1) * limit;

  const searchDataUsers = ["full_name", "company_name"];

  if (search !== "") {
    const searchUsers = searchDataUsers.map((user) => ({
      [user]: { [Op.iLike]: `%${search}%` },
    }));

    whereClauseUsers = {
      [Op.or]: searchUsers,
    };
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "full_name", "company_name"],
        },
        {
          model: Status,
          as: "status",
          where: {
            status_persetujuan: {
              [Op.like]: `%${status_persetujuan}%`,
            },
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Project,
          as: "proyek",
          attributes: ["nama_proyek", "tujuan_proyek"],
        },
      ],
      attributes: { exclude: ["UserId", "updatedAt"] },
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

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
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
            "status_persetujuan", // PERSETUJUAN
            "status_transaction", // STATUS TRANSACTION
            "status_payment", // PAY OR NOT PAY
            "accept_payment", // LUNAS
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
    });

    if (!order) {
      return handleResponseAuthorization(res, 404, "Order not found");
    }

    return handleResponseSuccess(res, order);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

//MANAGERS
export const getAllPersetujuanPesanan = async (req, res) => {
  const {
    page = 1,
    status_persetujuan = "1",
    search = "",
    limit = 10,
  } = req.body;

  let whereClauseUsers = {};

  const offset = (page - 1) * limit;

  const searchDataUsers = [
    "full_name",
    "email",
    "no_whatsapp",
    "address",
    "company_name",
  ];

  if (search !== "") {
    const searchUsers = searchDataUsers.map((user) => ({
      [user]: { [Op.iLike]: `%${search}%` },
    }));

    whereClauseUsers = {
      [Op.or]: searchUsers,
    };
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "full_name", "company_name"],
        },
        {
          model: Status,
          as: "status",
          where: {
            status_persetujuan: {
              [Op.like]: `%${status_persetujuan}%`,
            },
            is_send_manager: "1", //TERIKIRIM MANAGER
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Project,
          as: "proyek",
          attributes: [
            "nama_proyek",
            "tujuan_proyek",
            "tanggal_mulai",
            "tanggal_selesai",
          ],
        },
      ],
      attributes: { exclude: ["UserId", "updatedAt"] },
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

export const getAllTahapPengerjaan = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.body;

  let whereClauseUsers = {};

  const offset = (page - 1) * limit;

  const searchDataUsers = [
    "full_name",
    "email",
    "no_whatsapp",
    "address",
    "company_name",
  ];

  if (search !== "") {
    const searchUsers = searchDataUsers.map((user) => ({
      [user]: { [Op.iLike]: `%${search}%` },
    }));

    whereClauseUsers = {
      [Op.or]: searchUsers,
    };
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "full_name", "company_name"],
        },
        {
          model: Status,
          as: "status",
          order: [["updatedAt", "DESC"]],
          where: {
            status_transaction: "3", //STATUS CLIENT IN PROGRESS
            status_pengujian: "3", //STATUS TAHAP PENGERJAAN IN PROGRESS
            status_payment: "1", // SUDAH BAYAR
            accept_payment: "1", //SUDAH UPLOAD KWITANSI
          },
          attributes: ["status_payment"],
        },
        {
          model: Project,
          as: "proyek",
          attributes: [
            "id",
            "nama_proyek",
            "tujuan_proyek",
            "tanggal_mulai",
            "no_identifikasi",
            "tanggal_selesai",
          ],
        },
      ],
      attributes: { exclude: ["UserId"] },
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

export const uploadResultFileByIdOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return handleResponseNotFound(res);
    }

    if (order.file_result_pengujian !== null) {
      return handleResponseAuthorization(res, 404, "Result Sudah Terkirim");
    } else {
      await Order.update(
        {
          file_result_pengujian: req.file
            ? req.file.filename
            : order.file_result_pengujian,
        },
        {
          where: { id: id },
        }
      );
    }

    return handleResponseUpdateSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const downloadResultFilePDF = async (req, res) => {
  const { name } = req.params;

  try {
    // Mencari informasi file dari database berdasarkan nama file
    const pdf = await Order.findOne({
      where: { file_result_pengujian: name },
    });
    if (!pdf) {
      res.status(404).send("File tidak ditemukan");
    } else {
      // Membaca file PDF menggunakan pdfjs-dist
      const filePath = `uploads/filePdf/result-pengujian/${pdf.file_result_pengujian}`;
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${pdf.file_result_pengujian}`
      );
      res.setHeader("Content-Type", "application/pdf");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  } catch (error) {
    res.status(500).send("Terjadi kesalahan saat membaca file");
  }
};
