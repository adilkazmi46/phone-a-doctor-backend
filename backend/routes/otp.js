"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_1 = require("@controllers/otp");
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post("/verify-otp", auth_1.ensureAuthenticated, otp_1.verify_otp);
router.post("/resend-otp", auth_1.ensureAuthenticated, otp_1.resend_otp);
module.exports = router;
