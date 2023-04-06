import Pengujian from "../models/pengujian.js";

export const createPengujianServices = async (
  image,
  jenis_pengujian,
  code,
  category,
  description,
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
  sampler,
  catatan_khusus,
  price
) => {
  try {
    const updatedPengujian = await Pengujian.update(
      {
        jenis_pengujian,
        code,
        category,
        description,
        sampler,
        catatan_khusus,
        price,
      },
      {
        where: { id: id },
      }
    );
    console.log(updatedPengujian);
    return updatedPengujian[0] === 1;
  } catch (error) {
    return error;
  }
};

export const deletePengujianServices = async (id) => {
  try {
    const deletedPengujian = await Pengujian.destroy({
      where: { id: id },
    });
    return deletedPengujian === 1;
  } catch (error) {
    return error;
  }
};
