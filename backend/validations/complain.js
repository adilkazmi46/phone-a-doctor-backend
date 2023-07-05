"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComplainValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createComplainValidation = [
    (0, express_validator_1.body)("complain")
        .exists()
        .withMessage("complain is required")
        .isString()
        .withMessage("complain must be a string")
        .isLength({ min: 1 })
        .withMessage("complain is required"),
];
