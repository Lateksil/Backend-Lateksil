const MethodTransaction = require("../models/methodTransaction.js");
const { handlePagination } = require("../utils/handlePagination.js");
const {
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseDeleteSuccess,
} = require("../utils/handleResponse.js");

exports.CreateMethodTransaction = async (req, res) => {
  const { type_transaction, bank, name_bank, no_rek } = req.body;

  try {
    const createMethod = await MethodTransaction.create({
      type_transaction,
      bank,
      name_bank,
      no_rek,
    });

    return handleResponseSuccess(res, createMethod);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.getAllMethodTransaction = async (req, res) => {
  try {
    const viewData = [
      "id",
      "type_transaction",
      "bank",
      "name_bank",
      "no_rek",
      "is_Active",
    ];

    const searchFilterData = [
      "type_transaction",
      "bank",
      "name_bank",
      "no_rek",
      "is_Active",
    ];

    return handlePagination(
      req,
      res,
      viewData,
      searchFilterData,
      MethodTransaction
    );
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.ActiveMethodTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const findId = await MethodTransaction.findByPk(id);

    if (!findId) {
      return handleResponseNotFound(res);
    }
    await MethodTransaction.update({ is_Active: "0" }, { where: {} });

    await MethodTransaction.update({ is_Active: "1" }, { where: { id: id } });

    return handleResponseSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.getActiveMethodTransaction = async (req, res) => {
  try {
    const activeMethod = await MethodTransaction.findOne({
      where: { is_Active: "1" },
      attributes: { exclude: ["is_Active", "createdAt", "updatedAt"] },
    });

    return handleResponseSuccess(res, activeMethod);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.deleteMethodTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const methodTransaction = await MethodTransaction.findByPk(id);

    if (!methodTransaction) {
      return handleResponseNotFound(res);
    }

    await methodTransaction.destroy();
    return handleResponseDeleteSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
