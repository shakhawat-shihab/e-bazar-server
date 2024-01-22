const { body, query, param, check } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const path = require("path");

const cartValidator = {
  addToCartValidator: [
    body("userId")
      .exists()
      .withMessage("User Id must be provided")
      .bail()
      .matches(/^[a-f\d]{24}$/i)
      .withMessage("User Id is not in valid mongoDB format"),

    body("productId")
      .exists()
      .withMessage("Product Id must be provided")
      .bail()
      .matches(/^[a-f\d]{24}$/i)
      .withMessage("Product Id is not in valid mongoDB format"),
  ],
};

export { cartValidator };
