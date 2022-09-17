const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController')
const productController = require('../controller/productController')

/**
 * Handling all the  CRUD API's controller function related to the category
 */

router.post('/category', categoryController.createCategory);

router.get('/category', categoryController.getCategory);

router.get('/category/:categoryId', categoryController.getOneCategory);

router.put('/category/:categoryId', categoryController.updateCategory);

router.delete('/category/:categoryId', categoryController.deleteCategory);

/**
 * Handling all the  CRUD API's controller function related to the product
 */

router.post('/product', productController.createProduct);

router.get('/product', productController.getProduct);

router.get('/product/:productId', productController.getProductByID)

router.put('/product/:productId', productController.updateProduct);

router.delete('/product/:productId', productController.deleteProduct);

/**
 * exporting router functions to use it into other file
 */

module.exports = router