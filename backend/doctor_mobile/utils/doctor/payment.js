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
exports.savePaymentInformation = exports.getPaymentInformation = void 0;
const axios_1 = __importDefault(require("axios"));
const getPaymentInformation = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPaymentInformation = getPaymentInformation;
const savePaymentInformation = ({ BankName, BankAddress, Branch, SwiftCode, AccountHolderName, AccountNumber, MobileAccount, }) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield axios_1.default
        .post(process.env.API_URL + 'doctor/update-bank-details', {
        bank_name: BankName,
        bank_address: BankAddress,
        swift_code: SwiftCode,
        mobile_account: MobileAccount,
        account_holder_name: AccountHolderName,
        account_number: AccountNumber,
        branch: Branch,
    })
        .then((res) => {
        console.log('res.data=', res.data);
        return { bank_details: res.data.bank_details };
    })
        .catch((err) => {
        console.log('error_response=', err.response.data);
        return {
            error: true,
            message: err.response.data.message,
            err_code: err.response.status,
        };
    });
    return res;
});
exports.savePaymentInformation = savePaymentInformation;
