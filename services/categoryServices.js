import Category from "../models/category.js";

export const createCategoryServices = async (name_category) => {
  try {
    const category = await Category.create({
      name_category,
    });
    return category;
  } catch (err) {
    return err;
  }
};

export const updateCategoryServices = async (
  id,
  nama_category,
) => {
  try {
    const updatedCategory = await Category.update(
      {
        nama_category,
      },
      {
        where: { id: id },
      }
    );
    console.log(updatedCategory);
    return updatedCategory[0] === 1;
  } catch (error) {
    return error;
  }
};

export const deleteCategoryServices = async (id) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: id },
    });
    return deletedCategory === 1;
  } catch (error) {
    return error;
  }
};
