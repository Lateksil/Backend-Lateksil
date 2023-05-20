import fs from "fs";
import path from "path";
import Pengujian from "../models/pengujian.js";
import {
  createPengujianServices,
  deletePengujianServices,
  updatePengujianServices,
} from "../services/pengujianServices.js";
import { handlePagination } from "../utils/handlePagination.js";
import {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} from "../utils/handleResponse.js";

export const createPengujian = async (req, res) => {
  const {
    jenis_pengujian,
    code,
    category,
    tempat_pengujian,
    description,
    min_quantity,
    sampler,
    catatan_khusus,
    price,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const pengujian = await createPengujianServices(
      image,
      jenis_pengujian,
      code,
      category,
      tempat_pengujian,
      description,
      min_quantity,
      sampler,
      catatan_khusus,
      price
    );
    return handleResponseSuccess(res, pengujian);
  } catch (error) {
    return handleResponseError(res);
  }
};

export const updatePengujian = async (req, res) => {
  const { id } = req.params;
  const {
    jenis_pengujian,
    code,
    category,
    tempat_pengujian,
    description,
    min_quantity,
    sampler,
    catatan_khusus,
    price,
  } = req.body;

  try {
    const pengujian = await Pengujian.findByPk(id);

    if (!pengujian) {
      return handleResponseNotFound(res);
    }

    // console.log('DATA PENGUJIAN ===========', pengujian.image)
    if (req.file) {
      if (pengujian.image !== null) {
        fs.unlinkSync(`uploads/pengujian/${pengujian.image}`);
      }
    }

    await Pengujian.update(
      {
        jenis_pengujian,
        code,
        category,
        tempat_pengujian,
        description,
        min_quantity,
        sampler,
        catatan_khusus,
        price,
        image: req.file ? req.file.filename : pengujian.image,
      },
      {
        where: { id: id },
      }
    );
    return handleResponseUpdateSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const deletePengujian = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deletePengujianServices(id);
    if (deleted) {
      return handleResponseDeleteSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    return handleResponseError(res);
  }
};

export const getAllPengujian = (req, res) => {
  try {
    const viewData = [
      "id",
      "image",
      "jenis_pengujian",
      "code",
      "category",
      "description",
      "tempat_pengujian",
      "min_quantity",
      "sampler",
      "catatan_khusus",
      "price",
    ];

    const searchFilterData = [
      "jenis_pengujian",
      "code",
      "category",
      "description",
      "tempat_pengujian",
      "min_quantity",
      "sampler",
      "catatan_khusus",
      "price",
    ];

    return handlePagination(req, res, viewData, searchFilterData, Pengujian);
  } catch (error) {
    return handleResponseError(res);
  }
};
