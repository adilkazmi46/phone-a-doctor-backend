"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrescriptionValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createPrescriptionValidation = [
    (0, express_validator_1.body)("appointment_id")
        .exists()
        .withMessage("appointment id required")
        .isMongoId()
        .withMessage("invalid appointment id"),
    (0, express_validator_1.body)("dose_duration")
        .exists()
        .withMessage("dose duration is required")
        .isString()
        .withMessage("dose duration is required")
        .isLength({ min: 1 })
        .withMessage("dose duration is required")
        .isIn(["once", "days", "weeks", "months", "continue", "not required"]),
    (0, express_validator_1.body)("instruction")
        .exists()
        .withMessage("instruction is required")
        .isString()
        .withMessage("instruction is required")
        .isLength({ min: 1 })
        .withMessage("instruction is required"),
    (0, express_validator_1.body)("advice")
        .exists()
        .withMessage("advice is required")
        .isString()
        .withMessage("advice is required")
        .isLength({ min: 1 })
        .withMessage("advice is required"),
    (0, express_validator_1.body)("medicine_id")
        .exists()
        .withMessage("medicine id is required")
        .isMongoId()
        .withMessage("invalid medicine id"),
    (0, express_validator_1.body)("med_brand_name")
        .exists()
        .withMessage("medicine brand name is required")
        .isString()
        .withMessage("medicine brand name must be a string")
        .isLength({ min: 1 })
        .withMessage("medicine brand name is required"),
    (0, express_validator_1.body)("need_follow_up_consultation")
        .exists()
        .withMessage("follow up consultation is required")
        .isBoolean()
        .withMessage("need foolow up consultation must be a boolean"),
];
