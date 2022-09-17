# NIT-Assignment

Key points

Validations
Please include all the basic validations in code this time. For example you should write your own code to ensure that a Id passed as the path param must be a valid ObjectId and in such a case the error should be handled within the try block and not the catch block. This applies to all the validations whose failure lead to a 500 error. A valid error should be 400, 401, 403 or 404, as the case may be.

Project conventions

In this project  will work feature wise. That means we pick one resource/ sub-resource like category and product at a time. All the apis on one specific resource would come under one feature. The steps would be:

We create it's model.
We build it's APIs.
We test these APIs.
We will repeat steps from Step 1 to Step 3 for both feature in this project

This project is divided into 2 features namely Category and Product. work on a single feature at a time. Once that is completed as per above mentioned steps. You will be instructed to move to the next Feature.


Create a database Database`. You can clean the db you previously used and reuse that.

This should have a single git branch. You branch will be checked as part of the demo. Branch name should follow the naming convention project/NIT-Project

Follow the naming conventions exactly as instructed

## FEATURE I - Category
### Models
- Category Model
```yaml
{ 
  categoryName: {string, mandatory},
  subCategory: {string, mandatory},
  description: {string, mandatory},
  totalCount : {Number, default : 0}
  isDeleted : {Boolean, default : false}
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

## Category APIs 
### POST /addcategory
- Create a categorydocument from request body. Request body must contain mandatory details.
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Category added successfully!",
    "data": {
        "categoryName": "electronics",
        "description": "good batery life",
        "subCategory": "mobile",
        "totalCount": 0,
        "isDeleted": false,
        "_id": "6323385dc9e2076e867cd626",
        "createdAt": "2022-09-15T14:36:13.552Z",
        "updatedAt": "2022-09-15T14:36:13.552Z",
        "__v": 0
    }
}
```
### GET /getcateory 
- category to fetch details of their categories.
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "category details",
    "data": [
        {
            "_id": "632336ad6446ccd4e7008286",
            "categoryName": "clothes",
            "description": "good quality",
            "subCategory": "cotton"
        }
    ]
}
```
### GET   /category/:categoryId
Get category of one ID
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)


### PUT  /category/:categoryId
Updates a category by changing at least one or all fields
- Check if the categoryId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### DELETE /category/:categoryId
- Deletes a category by category id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure

## FEATURE II - Product
### Models
- Product Model
```yaml
{ 
  productName: {string, mandatory},
  description: {string, mandatory},
  productNumber: {string, mandatory},
  category : {string, mandatory},
  categroyId : {ObjectId, refs to Category model, mandatory},
  isDeleted : {Boolean, default : false},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```
## Product APIs 
### POST /product
- Create a product document from request body.
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
``` yaml
{
    "status": true,
    "message": "product added successfully",
    "data": {
        "productName": "t-shirt",
        "description": "best quality",
        "productNumber": 2,
        "category": "clothes",
        "categoryId": "632336ad6446ccd4e7008286",
        "isDeleted": false,
        "_id": "6323416a523dbb8daa5eeaf3",
        "createdAt": "2022-09-15T15:14:50.183Z",
        "updatedAt": "2022-09-15T15:14:50.183Z",
        "__v": 0
    }
}
```
### GET /product
-category to fetch details of their products.
- get the product by using queryFilter to filter the query at least one and fetch all details
- if queryFilter not match with item then throw error
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
```

### GET /product/:productId
- Returns product details by product id
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the product documents. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### PUT /product/:productId
- Updates a product by changing at least one or all fields
- Check if the productId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### DELETE /product/:productId
- Deletes a product by product id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```