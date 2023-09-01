const Item = require("../models/itemOrder.js");
const Order = require("../models/order.js");
const Pengujian = require("../models/pengujian.js");
const Peralatan = require("../models/peralatan.js");
const PeralatanPengujian = require("../models/peralatanPengujian.js");
const Project = require("../models/project.js");
const Status = require("../models/status.js");
const TeknisiPengujian = require("../models/teknisiPengujian.js");
const Users = require("../models/user.js");
const {
  handleResponseAuthorization,
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} = require("../utils/handleResponse.js");

exports.createPeralatan = async (req, res) => {
  const { pengujian_id, nama_alat } = req.body;
  try {
    const pengujian = await Pengujian.findByPk(pengujian_id);

    if (!pengujian) {
      return handleResponseAuthorization(res, 404, "Pengujian not found");
    }

    const addPeralatan = await Peralatan.create({
      nama_alat: nama_alat,
      PengujianId: pengujian_id,
    });

    return handleResponseSuccess(res, addPeralatan);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.deletePeralatan = async (req, res) => {
  const { id } = req.params;
  try {

    const peralatan = await Peralatan.findByPk(id)

    if (!peralatan) {
      return handleResponseNotFound(res);
    }

    if (peralatan.id === id) {
      await peralatan.destroy();
      return handleResponseDeleteSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
    
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
}

exports.getAllPeralatan = async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Pengujian.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      attributes: ["id", "jenis_pengujian", "category", "code"],
      include: [
        {
          model: Peralatan,
          as: "peralatan",
          attributes: ["id", "nama_alat"],
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


exports.GetOrderPeralatan = async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await Order.findAndCountAll({
      offset,
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
            status_transaction: "3",
          },
          attributes: ["status_transaction"],
        },
        {
          model: Project,
          as: "proyek",
          attributes: ["nama_proyek"],
        },
        {
          model: PeralatanPengujian,
          as: "status_alat",
          attributes: { exclude: ["id"] },
        },
        {
          model: Item,
          attributes: ["id"],
          include: [
            {
              model: Pengujian,
              attributes: ["id", "jenis_pengujian"],
              include: [
                {
                  model: Peralatan,
                  as: "peralatan",
                  attributes: ["id", "nama_alat"],
                },
              ],
            },
          ],
          through: { attributes: [] },
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

exports.StatusPeralatan = async (req, res) => {
  const { id, status_peralatan } = req.body;
  try {
    const statusPeralatan = await TeknisiPengujian.findByPk(id);

    if (!statusPeralatan) {
      return handleResponseNotFound(res);
    }

    if (statusPeralatan.id === id) {
      await TeknisiPengujian.update(
        {
          status_peralatan: status_peralatan,
        },
        { where: { id: id } }
      );
    }
    return handleResponseAuthorization(res, 200, "Pengambilan alat selesai");
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.createPengajuanAlatInOrder = async (req, res) => {
  const { id_order, status_peralatan, catatan_khusus } = req.body;
  try {
    const order = await Order.findByPk(id_order);

    if (!order) {
      return handleResponseNotFound(res);
    }

    await PeralatanPengujian.create({
      id: id_order,
      status_peralatan,
      catatan_khusus,
    });
    return handleResponseAuthorization(
      res,
      200,
      "Pengajuan Ke Peralatan Terkirim"
    );
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.uploadBuktiAlat = async (req, res) => {
  const { id_order } = req.params;
  const { status_peralatan } = req.body;
  try {
    const statusPengajuan = await PeralatanPengujian.findByPk(id_order);

    if (!statusPengajuan) {
      return handleResponseNotFound(res);
    }

    await PeralatanPengujian.update(
      {
        status_peralatan,
        image_pengajuan_alat: req.file
          ? req.file.filename
          : statusPengajuan.image_pengajuan_alat,
      },
      {
        where: { id: id_order },
      }
    );
    return handleResponseUpdateSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.getStatusPerlatan = async (req, res) => {
  const { id } = req.params;

  try {
    const statusPeralatan = await PeralatanPengujian.findByPk(id);

    if (!statusPeralatan) {
      return handleResponseNotFound(res);
    }

    return handleResponseSuccess(res, statusPeralatan);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.createCatatanToPeralatan = async (req, res) => {
  try {
    const { order_id, catatan_khusus } = req.body;

    const TahapPengujian = await Status.findByPk(order_id);

    await PeralatanPengujian.create({
      id: order_id,
      catatan_khusus,
    });

    await Status.update(
      {
        status_transaction: "3",
        status_pengujian: "3",
      },
      {
        where: { id: order_id },
      }
    );

    await TahapPengujian.reload();

    return handleResponseSuccess(res, TahapPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
