import fs from "fs";
import Pengujian from "../models/pengujian.js";

export const createPengujianServices = async (
  image,
  jenis_pengujian,
  code,
  category,
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
  description,
  min_quantity,
  sampler,
  catatan_khusus,
  price,
  image
) => {
  try {
    const pengujian = await Pengujian.findByPk(id);

    if (pengujian.image) {
      fs.unlinkSync(`uploads/${pengujian.image}`);
    }

    const updatedPengujian = await Pengujian.update(
      {
        jenis_pengujian,
        code,
        category,
        description,
        min_quantity,
        sampler,
        catatan_khusus,
        price,
        image,
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
      fs.unlinkSync(`uploads/${pengujian.image}`);
    }

    const deletedPengujian = await Pengujian.destroy({
      where: { id: id },
    });
    return deletedPengujian === 1;
  } catch (error) {
    return error;
  }
};
