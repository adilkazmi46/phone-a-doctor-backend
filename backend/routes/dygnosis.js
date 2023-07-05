"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
const dygnosis_1 = require("@validations/dygnosis");
const dygnosis_2 = require("@controllers/dygnosis");
var router = express_1.default.Router();
router.post("/add-dygnosis", auth_1.ensureAuthenticated, dygnosis_1.createDygnosisValidation, dygnosis_2.createDygnosis);
router.get("/get-all-dygnoses", auth_1.ensureAuthenticated, dygnosis_2.getAllDygnoses);
module.exports = router;
