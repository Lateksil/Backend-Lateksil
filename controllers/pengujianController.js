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
    description,
    sampler,
    catatan_khusus,
    price,
  } = req.body;
  const image = req.file.path;
  console.log(req.file)

  try {
    const pengujian = await createPengujianServices(
      image,
      jenis_pengujian,
      code,
      category,
      description,
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
    description,
    sampler,
    catatan_khusus,
    price,
  } = req.body;
  try {
    const pengujian = await updatePengujianServices(
      id,
      jenis_pengujian,
      code,
      category,
      description,
      sampler,
      catatan_khusus,
      price
    );
    if (pengujian) {
      return handleResponseUpdateSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
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
      "sampler",
      "catatan_khusus",
      "price",
    ];
    return handlePagination(req, res, viewData, Pengujian);
  } catch (error) {
    return handleResponseError(res);
  }
};
