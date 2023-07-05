"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDygnosisValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createDygnosisValidation = [
    (0, express_validator_1.body)("dygnosis")
        .exists()
        .withMessage("dygnosis is required")
        .isString()
        .withMessage("dygnosis must be a string")
        .isLength({ min: 1 })
        .withMessage("dygnosis is required"),
];
