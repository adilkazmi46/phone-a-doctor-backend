"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const complainSchema = new Schema({
    complain: {
        type: String,
        required: false,
    },
});
const Complain = mongoose_1.default.model("complain", complainSchema);
exports.default = Complain;
