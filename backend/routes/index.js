"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@middleware/auth");
const medical_speciality_1 = require("./../validations/medical_speciality");
const index_1 = require("@controllers/index");
const medical_speciality_2 = require("@controllers/medical_speciality");
const express_1 = __importDefault(require("express"));
const medical_category_1 = require("@controllers/medical_category");
const medical_category_2 = require("@validations/medical_category");
var router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.get("/get-time-slots", index_1.getTimeSlotsList);
router.post("/save-diseases", index_1.save_diseases);
router.post("/add-medical-specialities", auth_1.ensureAuthenticated, medical_speciality_1.addMedicalSpecialityValidation, medical_speciality_2.addMedicalSpeciality);
router.get("/get-medical-specialities", medical_speciality_2.getAllMedicalSpecialities);
router.post("/add-medical-category", auth_1.ensureAuthenticated, medical_category_2.addMedicalCategoryValidation, medical_category_1.addMedicalCategory);
router.get("/get-medical-categories", medical_category_1.getAllMedicalCategories);
router.get("/blood-groups");
module.exports = router;
