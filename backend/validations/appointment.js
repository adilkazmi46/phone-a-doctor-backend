"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishAppointmentValidation = exports.writePrescriptionValidation = exports.cancelAppointmentValidation = exports.rejectAppointmentRequestValidation = exports.acceptAppointmentRequestValidation = exports.requestAppointmentValidation = void 0;
const express_validator_1 = require("express-validator");
exports.requestAppointmentValidation = [
    (0, express_validator_1.body)("doctor_id")
        .exists()
        .withMessage("doctor id is required")
        .isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.body)("appointment_day").exists().withMessage("appointment day is required"),
    (0, express_validator_1.body)("appointment_date")
        .exists()
        .withMessage("appointment date is required")
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("format should be yyyy-mm-dd"),
    (0, express_validator_1.body)("from_slot_time")
        .exists()
        .withMessage("required")
        .matches(/(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/)
        .withMessage("invalid value, format must be HH:MM AM|PM"),
    (0, express_validator_1.body)("to_slot_time")
        .exists()
        .withMessage("required")
        .matches(/(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/)
        .withMessage("invalid value, format must be HH:MM AM|PM"),
    (0, express_validator_1.body)("is_relative").isBoolean().exists().withMessage("required"),
];
exports.acceptAppointmentRequestValidation = [
    (0, express_validator_1.body)("appointment_id")
        .exists()
        .withMessage("doctor id is required")
        .isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.body)("appointment_date")
        .exists()
        .withMessage("appointment date is required")
        .isISO8601({ strict: false, strictSeparator: false })
        .withMessage("date format should be yyyy-mm-dd"),
    (0, express_validator_1.body)("from_slot_time")
        .exists()
        .withMessage("required")
        .matches(/(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/)
        .withMessage("invalid value, format must be HH:MM AM|PM"),
    (0, express_validator_1.body)("to_slot_time")
        .exists()
        .withMessage("required")
        .matches(/(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/)
        .withMessage("invalid value, format must be HH:MM AM|PM"),
];
exports.rejectAppointmentRequestValidation = [
    (0, express_validator_1.body)("appointment_id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("invalid id format"),
];
exports.cancelAppointmentValidation = [
    (0, express_validator_1.body)("appointment_id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("invalid id format"),
];
exports.writePrescriptionValidation = [
    (0, express_validator_1.body)("appointment_id", "required")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.body)("patient_id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.body)("need_follow_up_consultation")
        .exists()
        .withMessage("is required")
        .isBoolean()
        .withMessage("must be a boolean")
        .isIn([true, false])
        .withMessage("value must be true or false"),
    (0, express_validator_1.body)("complains")
        .exists()
        .withMessage("is required")
        .isArray({ min: 1 })
        .withMessage("must be  array of string"),
    (0, express_validator_1.body)("dygnosis")
        .exists()
        .withMessage("is required")
        .isArray({ min: 1 })
        .withMessage("must be array of string"),
    (0, express_validator_1.body)("medicines")
        .isArray({ min: 1 })
        .withMessage("medicines must be a array"),
    (0, express_validator_1.body)("medicines.*._id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("invalid id format")
        .isLength({ min: 1 })
        .withMessage("is required"),
    (0, express_validator_1.body)("medicines.*.dose_frequency")
        .exists()
        .withMessage("is required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("medicines.*.instructions")
        .exists()
        .withMessage("is required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("advice")
        .exists()
        .withMessage("is required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("investigation")
        .exists()
        .withMessage("is required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("medicines.*.duration_unit")
        .exists()
        .withMessage("is required")
        .isIn(["once", "days", "weeks", "months", "continue", "not required"]),
    (0, express_validator_1.body)("medicines.*.dose_duration")
        .exists()
        .withMessage("is required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 1 })
        .withMessage("is required"),
];
exports.finishAppointmentValidation = [
    (0, express_validator_1.body)("appointment_id")
        .exists()
        .withMessage("doctor id is required")
        .isMongoId()
        .withMessage("invalid id format"),
];
