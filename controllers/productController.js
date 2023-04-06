import Product from "../models/productPengujian.js";
import { createProductServices } from "../services/productServices.js";
import { createCategoryServices } from "../services/categoryServices.js";
import {
  handleResponseError,
  handleResponseSuccess,
} from "../utils/handleResponse.js";

export const createProduct = async (req, res) => {
  const { name, description, price, name_category } = req.body;
  try {
    const product = await createProductServices(name, description, price);
    const category = await createCategoryServices(name_category, product.id);
    const ProductAndCategory = { product, category: category.name_category };
    return handleResponseSuccess(res, ProductAndCategory);
  } catch (error) {
    return handleResponseError(res);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: "category" });
    return handleResponseSuccess(res, products);
  } catch (error) {
    return handleResponseError(res);
  }
};
