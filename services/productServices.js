import Product from "../models/productPengujian.js";

export const createProductServices = async (name, description, price) => {
  try {
    const product = await Product.create({
      name,
      description,
      price,
    });
    return product;
  } catch (err) {
    return err;
  }
};
