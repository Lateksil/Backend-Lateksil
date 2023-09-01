const fs = require("fs");
const path = require("path");
const Pengujian = require("../models/pengujian.js");

exports.createPengujianServices = async (
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

exports.updatePengujianServices = async (
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

exports.deletePengujianServices = async (id) => {
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
