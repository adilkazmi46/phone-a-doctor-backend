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
const patient_1 = require("@validations/patient");
const patient_2 = require("@controllers/patient");
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const patient_3 = require("@controllers/patient");
var router = express_1.default.Router();
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        cb(null, "uploads/patients");
    }),
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        cb(null, Date.now() + "-" + file.originalname);
    }),
});
let upload = (0, multer_1.default)({
    storage: storage,
});
router.post("/update-patient-profile", auth_1.ensureAuthenticated, patient_1.patientProfileValidation, patient_2.updatePatientProfile);
router.post("/update-patient-information", auth_1.ensureAuthenticated, patient_1.patientInformationValidation, patient_2.savePatientInformation);
router.post("/upload-profile-pic", auth_1.ensureAuthenticated, upload.single("profile_pic"), patient_2.uploadProfilePic);
router.get("/get-patient-attributes", auth_1.ensureAuthenticated, patient_3.getPatientAttributes);
router.post("/add-relative-patient", auth_1.ensureAuthenticated, patient_1.addRelativePatientValidation, patient_2.addRelativePatient);
module.exports = router;
