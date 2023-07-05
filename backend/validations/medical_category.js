"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMedicalCategoryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addMedicalCategoryValidation = [
    (0, express_validator_1.body)("category")
        .exists()
        .withMessage("required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("required"),
];
