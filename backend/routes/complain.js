"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
const complain_1 = require("@validations/complain");
const complain_2 = require("@controllers/complain");
var router = express_1.default.Router();
router.post("/add-complain", auth_1.ensureAuthenticated, complain_1.createComplainValidation, complain_2.createComplain);
router.get("/get-all-complains", auth_1.ensureAuthenticated, complain_2.getAllComplains);
module.exports = router;
