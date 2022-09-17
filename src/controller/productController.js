const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const validator = require("../utils/validator");

/**
 * API function for adding product by providing input details in req.body
 */

const createProduct = async (req, res) => {
  try {
    const requestBody = req.body;
    if (Object.keys(requestBody).length === 0) {
      return res
        .status(400)
        .send({
          status: false,
          message: `Invalid input. Please enter all details!`,
        });
    }

    const { productName, description, productNumber, category, categoryId } =
      requestBody;

    if (!requestBody.productName) {
      return res
        .status(400)
        .send({ status: false, message: `productName is required!` });
    }
    if (!validator.isValidString(productName)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `productName must be filled with string!`,
        });
    }

    if (!requestBody.description) {
      return res
        .status(400)
        .send({ status: false, message: `description is required!` });
    }
    if (!validator.isValidString(description)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `description must be filled with string!`,
        });
    }

    if (!requestBody.productNumber) {
      return res
        .status(400)
        .send({ status: false, message: `productNumber is required!` });
    }
    if (!validator.isValidNumber(productNumber)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `productNumber must be filled with number!`,
        });
    }

    if (!requestBody.category) {
      return res
        .status(400)
        .send({ status: false, message: `category is required!` });
    }
    if (!validator.isValidString(category)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `category must be filled with string!`,
        });
    }

    if (!requestBody.categoryId) {
      return res
        .status(400)
        .send({ status: false, message: `categoryId is required!` });
    }
    if (!validator.isValidString(categoryId)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `categoryId must be filled with string!`,
        });
    }

    const product = await productModel.create(requestBody);
    return res
      .status(201)
      .send({
        status: true,
        message: `product added successfully`,
        data: product,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function for getting product details by providing input in query
 */

const getProduct = async (req, res) => {
  try {
    const { pageSize, pageNumber } = req.query;
    const products = await productModel
      .find({ isDeleted: false })
      .populate("categoryId")
      .sort({ _id: -1 })
      .select({
        _id: 1,
        productName: 1,
        description: 1,
        productNumber: 1,
        category: 1,
        categoryId: 1,
      })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1));

    if (!(products.length > 0)) {
      return res
        .status(404)
        .send({ status: false, msg: `No product found with matching filter!` });
    }

    res
      .status(200)
      .send({
        status: true,
        message: `products details get successfully`,
        data: products,
        totalCount:   await productModel.find({ isDeleted: false }).count(),
        pageSize:pageSize
      });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/*
 * API function to get product details by productId as input in params
 */

const getProductByID = async (req, res) => {
  try {
    let { productId: _id } = req.params;

    if (!validator.isValidObjectId(_id)) {
      return res.status(400).send({ status: false, message: `Invalid ID!` });
    }

    const productData = await productModel.findById(_id);
    if (!productData) {
      return res
        .status(404)
        .send({ status: false, message: `${_id} is not present in DB!` });
    }

    const productDetail = await productModel
      .findById({ _id: _id, isDeleted: false })
      .populate("categoryId");
      res
      .status(200)
      .send({ status: true, message: `Product  details`, data: productDetail });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function for update product details by providing productId in params
 * also by providing any input details in req.body
 */

const updateProduct = async (req, res) => {
  try {
    let { productId: _id } = req.params;
    if (!validator.isValidObjectId(_id)) {
      return res.status(400).send({ status: false, msg: `Invalid ID!` });
    }

    let requestBody = req.body;
    let { productName, description, productNumber, category, categoryId } =
      requestBody;
    let finalFilter = {};

    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `Atleast one input is required to update`,
        });
    }

    const productData = await productModel.findById(_id);
    if (!productData) {
      return res
        .status(404)
        .send({ status: false, msg: `${_id} is not present in DB!` });
    }

    if (productName) {
      if (!validator.isValidString(productName)) {
        return res
          .status(400)
          .send({ status: false, message: `productName must be filled!` });
      }
      finalFilter["productName"] = productName;
    }

    if (description) {
      if (!validator.isValidString(description)) {
        return res
          .status(400)
          .send({ status: false, message: `description  must be filled` });
      }
      finalFilter["description"] = description;
    }

    if (productNumber) {
      if (!validator.isValidString(productNumber)) {
        return res
          .status(400)
          .send({ status: false, message: `productNumber must be filled!` });
      }
      finalFilter["productNumber"] = productNumber;
    }

    if (category) {
      if (!validator.isValidString(category)) {
        return res
          .status(400)
          .send({ status: false, message: `category must be filled!` });
      }
      finalFilter["category"] = category;
    }

    if (categoryId) {
      if (!validator.isValidString(categoryId)) {
        return res
          .status(400)
          .send({ status: false, message: `categoryId must be filled!` });
      }
      finalFilter["categoryId"] = categoryId;
    }

    const updatedProductDetails = await productModel.findOneAndUpdate(
      { _id: _id },
      { $set: finalFilter },
      { new: true }
    );
    if (Object.keys(updatedProductDetails) <= 0) {
      return res.status(404).send({ status: false, message: `data not found` });
    }

    return res
      .status(200)
      .send({
        status: true,
        message: `category updated successfully `,
        data: updatedProductDetails,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * API function for deleting product using productId in params 
 */

const deleteProduct = async (req, res) => {
  try {
    let { productId: _id } = req.params;
    if (!_id) {
      return res.status(400).send({ status: false, msg: `Invalid ID!` });
    }
    const checkID = await productModel.findById(_id);

    if (!checkID) {
      return res
        .status(404)
        .send({ status: false, msg: `${_id} is not present in DB!` });
    }
    const idAlreadyDeleted = await productModel.findOne({ _id: _id });
    if (idAlreadyDeleted.isDeleted === true) {
      return res
        .status(400)
        .send({ status: false, msg: `Book already deleted!` });
    }

    const productData = await productModel.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true }
    );
    res
      .status(200)
      .send({
        status: true,
        message: `deleted successfully`,
        data: productData,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Error", error: error.message });
  }
};

/**
 * exporting all the API functions to used it into other files
 */

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getProductByID,
  deleteProduct,
};
