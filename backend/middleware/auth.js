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
exports.decodeJWT = exports.ensureAuthenticated = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const createJWT = (user) => {
    var payload = {
        sub: user._id,
        iat: (0, moment_1.default)().unix(),
        exp: (0, moment_1.default)().add(14, "days").unix(),
    };
    if (process.env.TOKEN_SECRET)
        return jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
        });
};
exports.createJWT = createJWT;
const ensureAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.header("Authorization")) {
        return res.status(401).send({
            message: "not authenticated",
        });
    }
    var token = yield req.header("Authorization").split(" ")[1];
    var payload = null;
    try {
        if (process.env.TOKEN_SECRET) {
            payload = yield (0, exports.decodeJWT)(token);
        }
    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }
    if (payload.exp <= (0, moment_1.default)().unix()) {
        return res.status(401).json({ message: "token has expired" });
    }
    req.userID = payload.sub;
    next();
});
exports.ensureAuthenticated = ensureAuthenticated;
const decodeJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.TOKEN_SECRET) {
        let payload = yield jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        return payload;
    }
});
exports.decodeJWT = decodeJWT;
