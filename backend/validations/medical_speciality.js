"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMedicalSpecialityValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addMedicalSpecialityValidation = [
    (0, express_validator_1.body)("speciality")
        .exists()
        .withMessage("required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("required"),
];
