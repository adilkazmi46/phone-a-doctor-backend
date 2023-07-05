import { body } from "express-validator";

export const createDygnosisValidation = [
  body("dygnosis")
    .exists()
    .withMessage("dygnosis is required")
    .isString()
    .withMessage("dygnosis must be a string")
    .isLength({ min: 1 })
    .withMessage("dygnosis is required"),
];
