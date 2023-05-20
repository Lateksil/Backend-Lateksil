import fs from "fs";
import path from "path";
import Pengujian from "../models/pengujian.js";
import { handleResponseNotFound } from "../utils/handleResponse.js";

export const createPengujianServices = async (
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
) => {
  try {
    const pengujian = await Pengujian.create({
      image,
      jenis_pengujian,
      code,
      category,
      tempat_pengujian,
      description,
      min_quantity,
      sampler,
      catatan_khusus,
      price,
    });
    return pengujian;
  } catch (error) {
    return error;
  }
};

export const updatePengujianServices = async (
  id,
  jenis_pengujian,
  code,
  category,
  tempat_pengujian,
  description,
  min_quantity,
  sampler,
  catatan_khusus,
  price
) => {
  try {
    const pengujian = await Pengujian.findByPk(id);

    if (pengujian.image) {
      fs.unlinkSync(
        path.join(__dirname, "uploads/pengujian/", pengujian.image)
      );
    }
    const updatedPengujian = await Pengujian.update(
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
        // image,
      },
      {
        where: { id: id },
      }
    );
    return updatedPengujian[0] === 1;
  } catch (error) {
    return error;
  }
};

export const deletePengujianServices = async (id) => {
  try {
    const pengujian = await Pengujian.findByPk(id);

    if (pengujian.image) {
      fs.unlinkSync(`uploads/pengujian/${pengujian.image}`);
    }

    const deletedPengujian = await Pengujian.destroy({
      where: { id: id },
    });
    return deletedPengujian === 1;
  } catch (error) {
    return error;
  }
};
