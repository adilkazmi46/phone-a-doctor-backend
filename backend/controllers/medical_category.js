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
exports.addMedicalCategory = exports.getAllMedicalCategories = void 0;
const express_validator_1 = require("express-validator");
const medical_categories_1 = __importDefault(require("@models/medical_categories"));
const user_1 = __importDefault(require("@models/user"));
const getAllMedicalCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let medical_categories = yield medical_categories_1.default.find();
        console.log("medical_categories 123=", medical_categories);
        return res.json({ medical_categories });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getAllMedicalCategories = getAllMedicalCategories;
const addMedicalCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty() === false) {
            return res
                .status(422) //@ts-ignore
                .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
        }
        //@ts-ignore
        let _user_id = req.userID;
        let user = yield user_1.default.findById(_user_id);
        if (user === null) {
            return res.status(401).json({ message: "invalid token, user not found" });
        }
        if (user.userType != "admin") {
            return res.status(401).json({ message: "only admins can access it" });
        }
        let { category } = req.body;
        let medical_category = yield medical_categories_1.default.findOne({
            category: category,
        });
        if (medical_category != null) {
            return res.status(422).json({ message: "category already exists" });
        }
        medical_category = new medical_categories_1.default();
        medical_category.category = category;
        yield medical_category.save();
        return res.json({ medical_category });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.addMedicalCategory = addMedicalCategory;
