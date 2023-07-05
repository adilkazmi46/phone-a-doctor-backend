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
exports.getAllComplains = exports.createComplain = void 0;
const complain_1 = __importDefault(require("@models/complain"));
const user_1 = __importDefault(require("@models/user"));
const express_validator_1 = require("express-validator");
const createComplain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            let errors = (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty() === false) {
                return res.status(442).json({ errors });
            }
            let { complain } = req.body;
            let complain_ = yield complain_1.default.findOne({
                complain: complain,
            });
            if (complain_ != null) {
                return res.status(422).json({ message: "complain alredy exists" });
            }
            complain_ = new complain_1.default();
            complain_.complain = complain;
            yield complain_.save();
            res.json({ complain: complain_ });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});
exports.createComplain = createComplain;
const getAllComplains = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let user_id = req.userID;
        let user = yield user_1.default.findById(user_id);
        if (user === null) {
            return res.status(401).json({ message: "invalid token no user found" });
        }
        else {
            let complains = yield complain_1.default.find();
            return res.json({ complains });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllComplains = getAllComplains;
