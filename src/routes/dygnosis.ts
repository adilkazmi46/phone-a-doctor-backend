import { ensureAuthenticated } from "@middleware/auth";
import express from "express";
import { createDygnosisValidation } from "@validations/dygnosis";
import { createDygnosis, getAllDygnoses } from "@controllers/dygnosis";

var router = express.Router();

router.post(
  "/add-dygnosis",
  ensureAuthenticated,
  createDygnosisValidation,
  createDygnosis
);
router.get("/get-all-dygnoses", ensureAuthenticated, getAllDygnoses);
module.exports = router;
