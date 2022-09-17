const mongoose = require('mongoose');

/** 
 * handling validations related to the objectId
*/

const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId);
}

/**
 * handling all the validation for input field with type string
 */

const isValidString = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'number' && value.toString().trim().length === 0) return false
    if(typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

/**
* handling all the validation for number type
 */

const isValidNumber = function(value){
    if( isNaN(value) && value.toString().trim().length !== 0) return false;
    return true;
}

/**
 * handling the requestbody validation
 */

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

/**
 * exporting all the validations function
 */

module.exports = {
    isValidObjectId,
    isValidString,
    isValidNumber,
    isValidRequestBody
}