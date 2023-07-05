"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicineValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createMedicineValidation = [
    (0, express_validator_1.body)("generic_name")
        .exists()
        .withMessage("generic name is required")
        .isString()
        .withMessage("generic name  must be a string")
        .isLength({ min: 1 })
        .withMessage("generic name is required"),
    (0, express_validator_1.body)("brand_name")
        .exists()
        .withMessage("brand name is required")
        .isString()
        .withMessage("brand name  must be a string")
        .isLength({ min: 1 })
        .withMessage("brand name is required"),
    (0, express_validator_1.body)("medicineType")
        .exists()
        .withMessage("medicine type is required")
        .isString()
        .withMessage("medicine type must be a string")
        .isLength({ min: 1 })
        .withMessage("medicine type is required"),
];
