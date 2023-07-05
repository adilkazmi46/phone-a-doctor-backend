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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
const user_1 = require("@controllers/user");
const user_2 = require("@validations/user");
const user_3 = require("@controllers/user");
var router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.post("/register-user", user_2.registerUserValidation, user_1.registerUser);
router.post("/signin", user_2.signinUserValidation, user_1.signinUser);
router.post("/change-password", auth_1.ensureAuthenticated, user_3.changePassword);
router.get("/get-user-attributes", auth_1.ensureAuthenticated, user_1.getUserAttribtues);
router.post("/send-forgot-password-code", user_2.sendForgotPasswordCodeValidation, user_1.sendForgotPasswordCode);
router.post("/verify-forgot-password-otp", user_2.verifyForgotPasswordOTPValidation, user_1.verifyForgotPasswordOTP);
router.post("/save-new-password", user_2.save_new_passwordValidation, user_1.save_new_password);
router.get("/payment-sheet", auth_1.ensureAuthenticated, user_1.stripeCreateCustomer);
router.post("/payment-sheet-filled", auth_1.ensureAuthenticated, user_1.stripePaymentSheetFilled);
router.post("/stripe-testing", user_1.createStripeAccount);
router.get("/stripe-return-url", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({});
}));
router.get("/stripe-account-url", auth_1.ensureAuthenticated, user_1.getStripeAccountLink);
module.exports = router;
