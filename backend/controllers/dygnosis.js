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
exports.getAllDygnoses = exports.createDygnosis = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("@models/user"));
const dygnosis_1 = __importDefault(require("@models/dygnosis"));
const createDygnosis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let _user_id = req.userID;
        let user = yield user_1.default.findById(_user_id);
        if (user === null) {
            return res.status(401).json({ message: "invalid token, user not found" });
        }
        else if (user.userType != "admin") {
            return res.status(401).json({ message: "only admin can access it" });
        }
        else {
            let errors = (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty() === false) {
                return res.status(422).json({ errors });
            }
            let { dygnosis } = req.body;
            let dygnosis_ = yield dygnosis_1.default.findOne({
                dygnosis: dygnosis,
            });
            if (dygnosis_ != null) {
                return res.status(422).json({ message: "dygnosis already exists" });
            }
            dygnosis_ = new dygnosis_1.default();
            dygnosis_.dygnosis = dygnosis;
            yield dygnosis_.save();
            return res.json({ dygnosis: dygnosis_ });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.createDygnosis = createDygnosis;
const getAllDygnoses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let user_id = req.userID;
        let user = yield user_1.default.findById(user_id);
        if (user === null) {
            return res.status(401).json({ message: "invalid token no user found" });
        }
        else {
            let dygnoses = yield dygnosis_1.default.find();
            return res.json({ dygnoses });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllDygnoses = getAllDygnoses;
