const categoryModel = require("../models/categoryModel");
const validator = require("../utils/validator");

/**
 * API function for adding category using input details in req.body
 */

const createCategory = async (req, res) => {
  try {
    let requestBody = req.body;
    if (Object.keys(requestBody).length === 0) {
      return res.status(400).send({
        status: false,
        message: `Invalid input. Please enter all details!`,
      });
    }
    const { categoryName, subCategory, description } = requestBody;

    if (!requestBody.categoryName) {
      return res
        .status(400)
        .send({ status: false, message: `category is required!` });
    }
    if (!validator.isValidString(categoryName)) {
      return res.status(400).send({
        status: false,
        message: `categoryName must be filled with string!`,
      });
    }

    if (!requestBody.subCategory) {
      return res
        .status(400)
        .send({ status: false, message: `subCategory is required!` });
    }
    if (!validator.isValidString(subCategory)) {
      return res.status(400).send({
        status: false,
        message: `subCategory must be filled with string!`,
      });
    }

    if (!requestBody.description) {
      return res
        .status(400)
        .send({ status: false, message: `description is required!` });
    }
    if (!validator.isValidString(description)) {
      return res.status(400).send({
        status: false,
        message: `description must be filled with string!`,
      });
    }

    const category = await categoryModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: `Category added successfully!`,
      data: category,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function to get category by using  pageSize,pageNumber in query
 */

const getCategory = async (req, res) => {
  try {
    try {
      const { pageSize, pageNumber } = req.query;
      const categoryDetail = await categoryModel
        .find({ isDeleted: false })
        .select({
          categoryName: 1,
          subCategory: 1,
          description: 1,
          created: 1,
          updated: 1,
        })
        .sort({ _id: -1 })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1));
      res.status(200).send({
        status: true,
        message: `category details`,
        data: categoryDetail,
        totalCount: await categoryModel.find({ isDeleted: false }).count(),
      });
    } catch (err) {
      res
        .status(500)
        .send({ status: false, message: "Error", err: err.message });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function for updating category using categoryId in params 
 */

const updateCategory = async (req, res) => {
  try {
    let { categoryId: _id } = req.params;
    if (!validator.isValidObjectId(_id)) {
      return res.status(400).send({ status: false, msg: `Invalid ID!` });
    }

    let requestBody = req.body;
    let { categoryName, subCategory, description } = requestBody;
    let finalFilter = {};

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: `Atleast one input is required to update`,
      });
    }

    const categoryData = await categoryModel.findById(_id);
    if (!categoryData) {
      return res
        .status(404)
        .send({ status: false, msg: `${_id} is not present in DB!` });
    }

    if (categoryName) {
      if (!validator.isValidString(categoryName)) {
        return res
          .status(400)
          .send({ status: false, message: `categoryName must be filled!` });
      }
      finalFilter["categoryName"] = categoryName;
    }

    if (subCategory) {
      if (!validator.isValidString(subCategory)) {
        return res
          .status(400)
          .send({ status: false, message: `subCategory  must be filled` });
      }
      finalFilter["subCategory"] = subCategory;
    }

    if (description) {
      if (!validator.isValidString(description)) {
        return res
          .status(400)
          .send({ status: false, message: `description  must be filled` });
      }
      finalFilter["description"] = description;
    }

    const updatedCategoryDetails = await categoryModel.findOneAndUpdate(
      { _id: _id },
      { $set: finalFilter },
      { new: true }
    );
    if (Object.keys(updatedCategoryDetails) <= 0) {
      return res.status(404).send({ status: false, message: `data not found` });
    }
    const countData = await categoryModel.find({
      categoryId: categoryData,
      isDeleted: false,
    });

    const countOfCategories = countData.length;
    const totalCount = countOfCategories;
    return res.status(200).send({
      status: true,
      message: `category updated successfully `,
      data: updatedCategoryDetails,
      totalCount,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function for deleting category using productId in params 
 */

const deleteCategory = async (req, res) => {
  try {
    let { categoryId: _id } = req.params;
    if (!validator.isValidObjectId(_id)) {
      return res.status(400).send({ status: false, msg: `Invalid ID!` });
    }

    const checkID = await categoryModel.findById(_id);

    if (!checkID) {
      return res
        .status(404)
        .send({ status: false, msg: `${_id} is not present in DB!` });
    }
    const idAlreadyDeleted = await categoryModel.findOne({ _id: _id });
    if (idAlreadyDeleted.isDeleted === true) {
      return res
        .status(400)
        .send({ status: false, msg: `Book already deleted!` });
    }

    const categoryData = await categoryModel.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: `deleted successfully`,
      data: categoryData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function for get one category details using categoryId in params 
 */

const getOneCategory = async (req, res) => {
  try {
    let { categoryId: _id } = req.params;
    if (!validator.isValidObjectId(_id)) {
      return res.status(400).send({ status: false, msg: `Invalid ID!` });
    }

    const checkID = await categoryModel.findById(_id);
    return res
      .status(200)
      .send({ status: false, msg: `Fetched Single Record!`, data: checkID });
  } catch (error) {}
};

/**
 * exporting all the API functions to used it into other files
 */

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getOneCategory,
};
