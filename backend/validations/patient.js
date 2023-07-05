"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRelativePatientValidation = exports.patientInformationValidation = exports.patientProfileValidation = void 0;
const express_validator_1 = require("express-validator");
exports.patientProfileValidation = [
    (0, express_validator_1.body)("full_name")
        .exists()
        .withMessage("required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 3 })
        .withMessage("minimum 3 characters required"),
    (0, express_validator_1.body)("gender")
        .exists()
        .withMessage(" required")
        .isIn(["male", "female"])
        .withMessage("invalid value,  must be male or female"),
    (0, express_validator_1.body)("city", "required").isString(),
    (0, express_validator_1.body)("country", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("area", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("address", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("language", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("division", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("weight")
        .exists()
        .withMessage("required")
        .isInt({ min: 1 })
        .withMessage("invalid value, must be integer greater than 0"),
    (0, express_validator_1.body)("height_ft", "required")
        .isInt({ min: 1 })
        .withMessage("invalid value, must be integer greate than 0"),
    (0, express_validator_1.body)("height_inches")
        .exists()
        .withMessage("required")
        .isInt({
        min: 1,
        max: 11,
    })
        .withMessage("invalid value, must be less than 12 and greater than 0"),
    (0, express_validator_1.body)("timezone_code").exists().withMessage("required"),
    (0, express_validator_1.body)("timezone_utc").exists().withMessage("required"),
    (0, express_validator_1.body)("dob")
        .exists()
        .withMessage("required")
        .isISO8601({ strict: false, strictSeparator: false })
        .withMessage("format should be yyyy-mm-dd")
        .toDate(),
];
exports.patientInformationValidation = [
    (0, express_validator_1.body)("email")
        .optional()
        .isEmail()
        .withMessage("invalid value,  must be a valid email"),
    (0, express_validator_1.body)("isSkipedEmail").isBoolean().exists().withMessage("isSkiped required"),
    (0, express_validator_1.body)("phone_number").exists().withMessage(" required"),
    (0, express_validator_1.body)("gender")
        .exists()
        .withMessage(" required")
        .isIn(["male", "female"])
        .withMessage("invalid value,  must be male or female"),
    (0, express_validator_1.body)("bloodGroup")
        .exists()
        .withMessage(" required")
        .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .withMessage("invalid value"),
    (0, express_validator_1.body)("diseases_or_conditions")
        .exists()
        .withMessage("required")
        .isArray({ min: 0 })
        .withMessage("must be array of strings with atleast one element"),
    (0, express_validator_1.body)("dob")
        .exists()
        .withMessage("required")
        .isISO8601({ strict: false, strictSeparator: false })
        .withMessage("format should be yyyy-mm-dd")
        .toDate(),
    (0, express_validator_1.body)("timezone_code").exists().withMessage("required"),
    (0, express_validator_1.body)("timezone_utc").exists().withMessage("required"),
    (0, express_validator_1.body)("height_ft", "required")
        .isInt({ min: 1 })
        .withMessage("invalid value, must be integer greate than 0"),
    (0, express_validator_1.body)("height_inches")
        .exists()
        .withMessage("required")
        .isInt({
        min: 1,
        max: 11,
    })
        .withMessage("invalid value, must be less than 12 and greater than 0"),
    (0, express_validator_1.body)("is_under_doctor_care")
        .exists()
        .withMessage("is required")
        .isBoolean()
        .withMessage("must be a boolean"),
    (0, express_validator_1.body)("weight")
        .exists()
        .withMessage("required")
        .isInt({ min: 1 })
        .withMessage("invalid value, must be integer greater than 0"),
    (0, express_validator_1.body)("language", "required").isString().isLength({ min: 1 }),
];
exports.addRelativePatientValidation = [
    (0, express_validator_1.body)("full_name")
        .exists()
        .withMessage("required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 3 })
        .withMessage("minimum 3 characters required"),
    (0, express_validator_1.body)("gender")
        .exists()
        .withMessage(" required")
        .isIn(["male", "female"])
        .withMessage("invalid value,  must be male or female"),
    (0, express_validator_1.body)("bloodGroup")
        .exists()
        .withMessage(" required")
        .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .withMessage("invalid value"),
    (0, express_validator_1.body)("diseases_or_conditions")
        .exists()
        .withMessage("required")
        .isArray({ min: 0 })
        .withMessage("must be array of strings with atleast one element"),
    (0, express_validator_1.body)("dob")
        .exists()
        .withMessage("required")
        .isISO8601({ strict: false, strictSeparator: false })
        .withMessage("format should be yyyy-mm-dd")
        .toDate(),
    (0, express_validator_1.body)("height_ft", "required")
        .isInt({ min: 1 })
        .withMessage("invalid value, must be integer greate than 0"),
    (0, express_validator_1.body)("height_inches")
        .exists()
        .withMessage("required")
        .isInt({
        min: 1,
        max: 11,
    })
        .withMessage("invalid value, must be less than 12 and greater than 0"),
    (0, express_validator_1.body)("is_under_doctor_care")
        .exists()
        .withMessage("is required")
        .isBoolean()
        .withMessage("must be a boolean"),
    (0, express_validator_1.body)("weight")
        .exists()
        .withMessage("required")
        .isInt({ min: 1 })
        .withMessage("invalid value, must be integer greater than 0"),
];
