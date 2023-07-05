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
exports.resendVerificationCode = exports.getUserAttributes = exports.login = exports.signUp = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const axios_1 = __importDefault(require("axios"));
const signUp = (phone, password, fullName, userType) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('process env api askdjaskljd=', process.env.API_URL);
    let res = yield axios_1.default
        .post(process.env.API_URL + 'user/register-user', {
        userType: userType,
        phone_number: phone,
        full_name: fullName,
        password: password,
    })
        .then((res) => {
        return { user: res.data.user, token: res.data.token, success: true };
    })
        .catch((err) => {
        console.log('error singup =', err);
        return {
            error: true,
            message: err.response.data.message,
            err_code: err.response.status,
        };
    });
    return res;
});
exports.signUp = signUp;
const login = ({ password, phone, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('process env api lkjlkjkl 1234567890 =====', process.env.API_URL);
    console.log(process.env.API_URL + 'user/signin');
    let res = yield axios_1.default
        .post(process.env.API_URL + 'user/signin', {
        phone_number: phone,
        password: password,
    }, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('signin response=');
        console.log(res.data);
        yield async_storage_1.default.setItem('jwt_token', res.data.token);
        return { success: true, data: res.data };
    }))
        .catch((err) => {
        console.log('error=', err);
        console.log('error_code=', err.response.status);
        console.log('err_message=', err.response.data);
        return {
            error: true,
            message: err.response.data.message,
            err_code: err.response.status,
        };
    });
    return res;
});
exports.login = login;
const getUserAttributes = () => __awaiter(void 0, void 0, void 0, function* () {
    let token = yield async_storage_1.default.getItem('jwt_token');
    if (token === null) {
        return { isError: true, message: 'no token found', err_code: 401 };
    }
    else {
        console.log('url=', process.env.API_URL + 'user/get-user-attributes');
        let res = yield axios_1.default
            .get(process.env.API_URL + 'user/get-user-attributes')
            .then((res) => {
            let user = res.data.user;
            return { success: true, user: user };
        })
            .catch((err) => {
            return {
                error: true,
                message: err.response.data.message,
                err_code: err.response.status,
            };
        });
        return res;
    }
});
exports.getUserAttributes = getUserAttributes;
const resendVerificationCode = ({ username, }) => __awaiter(void 0, void 0, void 0, function* () { });
exports.resendVerificationCode = resendVerificationCode;
