"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
const medicine_1 = require("@controllers/medicine");
const medicine_2 = require("@validations/medicine");
var router = express_1.default.Router();
router.post("/add-medicine", auth_1.ensureAuthenticated, medicine_2.createMedicineValidation, medicine_1.createMedicine);
router.get("/get-all-medicines", auth_1.ensureAuthenticated, medicine_1.getAllMedicines);
module.exports = router;
