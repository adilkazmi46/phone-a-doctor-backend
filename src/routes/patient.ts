import {
  patientProfileValidation,
  patientInformationValidation,
  addRelativePatientValidation,
} from "@validations/patient";
import {
  updatePatientProfile,
  uploadProfilePic,
  savePatientInformation,
  addRelativePatient,
} from "@controllers/patient";
import { ensureAuthenticated } from "@middleware/auth";
import express, { Request, Response, NextFunction } from "express";

import multer from "multer";
import { getPatientAttributes } from "@controllers/patient";

var router = express.Router();

let storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, "uploads/patients");
  },
  filename: async (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

router.post(
  "/update-patient-profile",
  ensureAuthenticated,
  patientProfileValidation,
  updatePatientProfile
);

router.post(
  "/update-patient-information",
  ensureAuthenticated,
  patientInformationValidation,
  savePatientInformation
);
router.post(
  "/upload-profile-pic",
  ensureAuthenticated,
  upload.single("profile_pic"),
  uploadProfilePic
);

router.get(
  "/get-patient-attributes",
  ensureAuthenticated,
  getPatientAttributes
);

router.post(
  "/add-relative-patient",
  ensureAuthenticated,
  addRelativePatientValidation,
  addRelativePatient
);

module.exports = router;
