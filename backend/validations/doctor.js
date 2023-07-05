"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeDoctorValidation = exports.doctorInformationValidation = exports.updateAvailabilitySlotsValidation = exports.personalProfileValidation = exports.professionalProfileValidation = exports.bankDetailsValidation = void 0;
const express_validator_1 = require("express-validator");
const week_days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "satday",
    "sunday",
];
exports.bankDetailsValidation = [
    (0, express_validator_1.body)("bank_name")
        .exists()
        .withMessage("bank name is required")
        .isString()
        .withMessage("bank name must be a string")
        .isLength({ min: 1 })
        .withMessage("bank name is required"),
    (0, express_validator_1.body)("bank_address")
        .exists()
        .withMessage("bank address is required")
        .isString()
        .withMessage("bank address must be a string")
        .isLength({ min: 1 })
        .withMessage("bank address is required"),
    (0, express_validator_1.body)("swift_code")
        .exists()
        .withMessage("swift code is required")
        .isString()
        .withMessage("swift code must be a string")
        .isLength({ min: 1 })
        .withMessage("swift code is required")
        .isBIC()
        .withMessage("invalid swift code"),
    (0, express_validator_1.body)("mobile_account", "mobile account is required")
        .exists()
        .withMessage("mobile account is required")
        .isString()
        .withMessage("mobile account must be a string")
        .isLength({ min: 1 })
        .withMessage("mobile account is required"),
    (0, express_validator_1.body)("account_number", "account number is required")
        .exists()
        .withMessage("account number is required")
        .isString()
        .withMessage("account number must be a string")
        .isLength({ min: 1 })
        .withMessage("account number is required")
        .isIBAN()
        .withMessage("invalid account number"),
    (0, express_validator_1.body)("branch", "branch is required")
        .exists()
        .withMessage("branch is required")
        .isString()
        .withMessage("branch must be a string")
        .isLength({ min: 1 })
        .withMessage("branch is required"),
    (0, express_validator_1.body)("account_holder_name")
        .exists()
        .withMessage("account holder name is required")
        .isString()
        .withMessage("account holder name must be a string")
        .isLength({ min: 1 })
        .withMessage("account holder name is required"),
];
exports.professionalProfileValidation = [
    (0, express_validator_1.body)("about")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 250 })
        .withMessage("required"),
    (0, express_validator_1.body)("degree")
        .exists()
        .withMessage("degree is required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("degree is required"),
    (0, express_validator_1.body)("institute")
        .exists()
        .withMessage("institute is required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("degree is required"),
    (0, express_validator_1.body)("is_24_7")
        .exists()
        .withMessage("is_24_7 is required")
        .isBoolean()
        .withMessage("is_24_7 must be a boolean value"),
    (0, express_validator_1.body)("follow_up_fee")
        .exists()
        .withMessage("follow up fee is required")
        .isFloat()
        .withMessage("follow up fee must be a float type"),
    (0, express_validator_1.body)("consultation_fee")
        .exists()
        .withMessage("consultation fee is required")
        .isFloat()
        .withMessage("cunsultation fee must be a float type"),
    (0, express_validator_1.body)("chamber_or_hospital_address")
        .exists()
        .withMessage("chamber/Hospital Address is required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("chamber/Hospital Address is required"),
    (0, express_validator_1.body)("medical_field")
        .exists()
        .withMessage("medical field is required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("medical field is required"),
    (0, express_validator_1.body)("medical_category")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("medical_speciality")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("gov_id_number")
        .exists()
        .withMessage("gov id number is required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("gov id number is required"),
    (0, express_validator_1.body)("certificate_number")
        .exists()
        .withMessage("medical certificate number is required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("medical certificate number is required"),
    (0, express_validator_1.body)("experience").exists().withMessage("experience is required").isInt(),
];
exports.personalProfileValidation = [
    (0, express_validator_1.body)("phone_number", "phone number is required"),
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail(),
    (0, express_validator_1.body)("title")
        .exists()
        .withMessage("is required")
        .isIn(["dr", "consultant", "professor"])
        .withMessage("invalid value, title must be dr,consultant or professor"),
    (0, express_validator_1.body)("dob")
        .exists()
        .withMessage("is required")
        .isISO8601({ strict: false, strictSeparator: false })
        .withMessage("date format should be yyyy-mm-dd")
        .toDate(),
    (0, express_validator_1.body)("gender")
        .exists()
        .withMessage("required")
        .isIn(["male", "female"])
        .withMessage("invalid value, gender must be male or female"),
    (0, express_validator_1.body)("city", "required").isString(),
    (0, express_validator_1.body)("country", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("area").isString().optional({ nullable: true }),
    (0, express_validator_1.body)("address", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("language", "required").isString().isLength({ min: 1 }),
    (0, express_validator_1.body)("division").isString().optional({ nullable: true }),
    (0, express_validator_1.body)("timezone_code").exists().withMessage("required"),
    (0, express_validator_1.body)("timezone_utc").exists().withMessage("required"),
    (0, express_validator_1.body)("full_name")
        .exists()
        .withMessage("required")
        .isString()
        .withMessage("must be a string")
        .isLength({ min: 3 })
        .withMessage("minimum 3 characters required"),
];
exports.updateAvailabilitySlotsValidation = [
    (0, express_validator_1.body)("from_time")
        .exists()
        .withMessage("required")
        .matches(/(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/)
        .withMessage("invalid value, format must be HH:MM AM|PM"),
    (0, express_validator_1.body)("to_time")
        .exists()
        .withMessage("required")
        .matches(/(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/),
    (0, express_validator_1.body)("available_days")
        .exists()
        .withMessage("are required")
        .custom((weekDays) => {
        if (weekDays.length === 0) {
            return false;
        }
        return weekDays.every((item) => {
            if (week_days.includes(item.toLowerCase()) && item.length > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    })
        .withMessage("invalid value, week days required"),
];
exports.doctorInformationValidation = [
    (0, express_validator_1.body)("title")
        .exists()
        .withMessage("title required")
        .isIn(["dr", "consultant", "professor"])
        .withMessage("invalid value, title must be dr,consultant or professor"),
    (0, express_validator_1.body)("email").optional().isEmail().withMessage("invalid format"),
    (0, express_validator_1.body)("isSkipedEmail").isBoolean().exists().withMessage("isSkiped required"),
];
exports.likeDoctorValidation = [
    (0, express_validator_1.body)("doctor_id")
        .exists()
        .withMessage("is required")
        .isMongoId()
        .withMessage("invalid id format")
        .isLength({ min: 1 })
        .withMessage("is required"),
];
