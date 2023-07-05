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
const auth_1 = require("@middleware/auth");
const express_1 = __importDefault(require("express"));
const doctor_1 = require("@controllers/doctor");
const multer_1 = __importDefault(require("multer"));
const doctor_2 = require("@validations/doctor");
const uniqid_1 = __importDefault(require("uniqid"));
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
var s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "us-west-1",
});
var uploadS3ProfilePic = (0, multer_1.default)({
    storage: multerS3({
        s3: s3,
        bucket: "profile-pic-doctor-mobile-24-7",
        acl: "public-read",
        //@ts-ignore
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        //@ts-ignore
        key: function (req, file, cb) {
            cb(null, (0, uniqid_1.default)() + "-" + file.originalname);
        }, //@ts-ignore
    }),
});
// fileFilter: function (req: any, file: any, cb: any) {
//   console.log("multer files=", req);
//   // if (!whiteListImages.includes(file.mimetype)) {
//   //   req.image_error = "invalid mime type";
//   //   return cb(null, false, req.image_error);
//   // }
//   // cb(null, true);
// },
var uploadS3DoctorProfileFiles = (0, multer_1.default)({
    fileFilter: function (req, file, cb) {
        console.log("multer req=", req);
        console.log("multer file=", file);
        // if (!whiteListImages.includes(file.mimetype)) {
        //   req.image_error = "invalid mime type";
        //   return cb(null, false, req.image_error);
        // }
        cb(null, true);
    },
    storage: multerS3({
        s3: s3,
        bucket: "profile-pic-doctor-mobile-24-7",
        acl: "public-read",
        //@ts-ignore
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        //@ts-ignore
        key: function (req, file, cb) {
            cb(null, (0, uniqid_1.default)() + "-" + file.originalname);
        }, //@ts-ignore
    }),
});
let whiteListImages = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
let storage_protected = multer_1.default.diskStorage({
    destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        cb(null, "assets/protected/doctors");
    }),
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        cb(null, (0, uniqid_1.default)() + "-" + file.originalname);
    }),
});
let storage_public = multer_1.default.diskStorage({
    destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        cb(null, "assets/public/doctors");
    }),
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        cb(null, (0, uniqid_1.default)() + "-" + file.originalname);
    }),
});
let upload_protected = (0, multer_1.default)({
    storage: storage_protected,
    fileFilter: function (req, file, cb) {
        console.log("multer files=", req.files);
        if (!whiteListImages.includes(file.mimetype)) {
            req.image_error = "invalid mime type";
            return cb(null, false, req.image_error);
        }
        cb(null, true);
    },
});
let upload_public = (0, multer_1.default)({
    storage: storage_public,
    fileFilter: function (req, file, cb) {
        console.log("multer files=", req.files);
        if (!whiteListImages.includes(file.mimetype)) {
            req.image_error = "invalid mime type";
            return cb(null, false, req.image_error);
        }
        cb(null, true);
    },
});
var router = express_1.default.Router();
const upload_profesionl_filesupload = uploadS3DoctorProfileFiles.fields([
    { name: "gov_id_front", maxCount: 1 },
    { name: "gov_id_back", maxCount: 1 },
    { name: "certificate_file", maxCount: 1 },
]);
router.post("/update-professional-profile", auth_1.ensureAuthenticated, upload_profesionl_filesupload, doctor_2.professionalProfileValidation, doctor_1.updateProfessionalProfile);
router.post("/update-personal-profile", auth_1.ensureAuthenticated, doctor_2.personalProfileValidation, doctor_1.updatePersonalProfile);
router.post("/upload-profile-pic", auth_1.ensureAuthenticated, uploadS3ProfilePic.single("profile_pic"), doctor_1.uploadProfilePic);
router.post("/update-availablity-slots", auth_1.ensureAuthenticated, doctor_2.updateAvailabilitySlotsValidation, doctor_1.updateAvailability);
router.post("/update-bank-details", auth_1.ensureAuthenticated, doctor_2.bankDetailsValidation, doctor_1.UpdateDoctorBankDetails);
router.post("/save-information", auth_1.ensureAuthenticated, doctor_2.doctorInformationValidation, doctor_1.save_doctor_information);
// router.post(
//   "/like-doctor",
//   ensureAuthenticated,
//   likeDoctorValidation,
//   like_doctor
// );
router.get("/get-all-doctors-local", auth_1.ensureAuthenticated, doctor_1.gotAllDoctorsLocal);
router.get("/get-all-doctors-foreign", auth_1.ensureAuthenticated, doctor_1.gotAllDoctorsForeign);
router.get("/get-doctor-attributes", auth_1.ensureAuthenticated, doctor_1.getDoctorAttributes);
router.get("/search-doctor", auth_1.ensureAuthenticated, doctor_1.searchDoctor);
module.exports = router;
