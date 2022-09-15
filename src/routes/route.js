const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController')
const productController = require('../controller/productController')

/**
 * Handling all the  CRUD API's controller function related to the category
 */

router.post('/addcategory', categoryController.createCategory);

router.get('/getcateory', categoryController.getCategory);

router.put('/updatecategory/:categoryId', categoryController.updateCategory);

router.delete('/deletecategory/:categoryId', categoryController.deleteCategory);

/**
 * Handling all the  CRUD API's controller function related to the product
 */

router.post('/addproduct', productController.createProduct);

router.get('/getproductlist', productController.getProduct);

router.get('/getproductbyID/:productId', productController.getProductByID)

router.put('/updateproduct/:productId', productController.updateProduct);

router.delete('/deleteproduct/:productId', productController.deleteProduct);

module.exports = router