import { ensureAuthenticated } from "@middleware/auth";
import express, { Request, Response, NextFunction } from "express";
import {
  createStripeAccount,
  getStripeAccountLink,
  getUserAttribtues,
  registerUser,
  save_new_password,
  sendForgotPasswordCode,
  signinUser,
  stripeCreateCustomer,
  stripePaymentSheetFilled,
  verifyForgotPasswordOTP,
} from "@controllers/user";
import {
  registerUserValidation,
  save_new_passwordValidation,
  sendForgotPasswordCodeValidation,
  signinUserValidation,
  verifyForgotPasswordOTPValidation,
} from "@validations/user";
import { changePassword } from "@controllers/user";

var router = express.Router();

/* GET users listing. */

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/register-user", registerUserValidation, registerUser);

router.post("/signin", signinUserValidation, signinUser);
router.post("/change-password", ensureAuthenticated, changePassword);
router.get("/get-user-attributes", ensureAuthenticated, getUserAttribtues);

router.post(
  "/send-forgot-password-code",
  sendForgotPasswordCodeValidation,
  sendForgotPasswordCode
);
router.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOTPValidation,
  verifyForgotPasswordOTP
);
router.post(
  "/save-new-password",
  save_new_passwordValidation,
  save_new_password
);
router.get("/payment-sheet", ensureAuthenticated, stripeCreateCustomer);

router.post(
  "/payment-sheet-filled",
  ensureAuthenticated,
  stripePaymentSheetFilled
);

router.post("/stripe-testing", createStripeAccount);

router.get("/stripe-return-url", async (req, res, next) => {
  return res.json({});
});

router.get("/stripe-account-url", ensureAuthenticated, getStripeAccountLink);

module.exports = router;
