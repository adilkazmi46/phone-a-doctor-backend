"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save_new_passwordValidation = exports.verifyForgotPasswordOTPValidation = exports.sendForgotPasswordCodeValidation = exports.changePasswordValidation = exports.signinUserValidation = exports.registerUserValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerUserValidation = [
    (0, express_validator_1.check)("phone_number")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("required")
        .isMobilePhone("any")
        .withMessage("invalid format"),
    (0, express_validator_1.check)("full_name")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 3 })
        .withMessage("minimum 3 characters are required"),
    (0, express_validator_1.check)("password")
        .exists()
        .withMessage("required")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
        .withMessage("must contain min 8 characters with 1 upper case, 1 lower case, 1 number, 1 special character"),
    (0, express_validator_1.check)("userType", "user type is required").isIn([
        "doctor",
        "patient",
        "admin",
    ]),
];
exports.signinUserValidation = [
    (0, express_validator_1.body)("phone_number")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("required"),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("required")
        .isString()
        .isLength({ min: 1 })
        .withMessage("required"),
];
exports.changePasswordValidation = [
    (0, express_validator_1.check)("password", "password is required"),
    (0, express_validator_1.check)("new_password")
        .exists()
        .withMessage("new password is required")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    }),
    (0, express_validator_1.check)("confirm_new_password").custom((confirmPassword, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const password = req.body.password;
        if (password !== confirmPassword) {
            throw new Error("Passwords must be same");
        }
    })),
];
exports.sendForgotPasswordCodeValidation = [
    (0, express_validator_1.check)("phone_number", "phone number is required"),
];
exports.verifyForgotPasswordOTPValidation = [
    (0, express_validator_1.check)("phone_number", "phone number is required"),
    (0, express_validator_1.check)("otp_code", "otp code is required"),
];
exports.save_new_passwordValidation = [
    (0, express_validator_1.check)("phone_number", "phone number is required"),
    (0, express_validator_1.check)("otp_code", "otp code is required"),
    (0, express_validator_1.check)("new_password")
        .exists()
        .withMessage("new password is required")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
        .withMessage("password must contain min 8 characters with 1 upper case, 1 lower case, 1 number, 1 special character"),
    (0, express_validator_1.check)("confirm_new_password").custom((confirmPassword, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const password = req.body.new_password;
        if (password !== confirmPassword) {
            throw new Error("Passwords must be same");
        }
    })),
];
