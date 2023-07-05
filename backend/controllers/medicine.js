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
exports.getAllMedicines = exports.createMedicine = void 0;
const medicine_1 = __importDefault(require("@models/medicine"));
const user_1 = __importDefault(require("@models/user"));
const express_validator_1 = require("express-validator");
const createMedicine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let _user_id = req.userID;
        let user = yield user_1.default.findOne({
            _id: _user_id,
        }).select("-password");
        if (user === null) {
            return res.status(401).json({ message: "invalid token user not found" });
        }
        else if (user.userType != "admin") {
            return res.status(401).json({
                message: "only admin can access",
            });
        }
        else {
            let errors = yield (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty() === false) {
                return res.status(422).json(errors);
            }
            let { generic_name, brand_name, medicineType } = req.body;
            let medicine = yield medicine_1.default.findOne({
                brand_name: brand_name,
            });
            if (medicine != null) {
                return res
                    .status(422)
                    .json({ message: "brand name of the medicine should be unique" });
            }
            else {
                medicine = new medicine_1.default();
                medicine.generic_name = generic_name;
                medicine.brand_name = brand_name;
                medicine.medicineType = medicineType;
                medicine.user_id = user._id;
                yield medicine.save();
                return res.json({ medicine });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.createMedicine = createMedicine;
const getAllMedicines = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let user_id = req.userID;
        let user = yield user_1.default.findById(user_id);
        if (user === null) {
            return res.status(401).json({ message: "invalid token no user found" });
        }
        else {
            let medicines = yield medicine_1.default.find();
            return res.json({ medicines });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllMedicines = getAllMedicines;
